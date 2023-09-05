import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Campaign from './components/Campaign';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAndSetData = async () => {
      const localStorageData = localStorage.getItem('data');
      if (localStorageData) {
        setData(JSON.parse(localStorageData));
        return;
      }

      const response = await fetch('https://www.plugco.in/public/take_home_sample_feed');
      const responseData = await response.json();
      setData(responseData);
      localStorage.setItem('data', JSON.stringify(responseData));
    };
    fetchAndSetData();
  }, []);

  if (!data) return null;

  return (
    <Container className="py-5 px-0">
      {data.campaigns.map((campaign) => {
        return <Campaign key={campaign.id} campaign={campaign} />;
      })}
    </Container>
  );
};

export default App;
