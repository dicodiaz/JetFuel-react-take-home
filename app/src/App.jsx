import { useEffect, useState } from 'react';
import { Button, Container, Row, Spinner } from 'react-bootstrap';
import './App.css';
import Campaign from './components/Campaign';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchAndSetData = async () => {
    setError(null);

    const localStorageData = localStorage.getItem('data');
    if (localStorageData) {
      setData(JSON.parse(localStorageData));
      return;
    }

    try {
      const response = await fetch('https://www.plugco.in/public/take_home_sample_feed');
      const responseData = await response.json();
      setData(responseData);
      localStorage.setItem('data', JSON.stringify(responseData));
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  if (error) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Row className="mx-0 g-0">
          <h1>Apologies, there has been an error</h1>
          <Button onClick={fetchAndSetData}>Try again</Button>
        </Row>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner />
      </Container>
    );
  }

  return (
    <Container className="py-5 px-0">
      {data.campaigns.map((campaign) => {
        return <Campaign key={campaign.id} campaign={campaign} />;
      })}
    </Container>
  );
};

export default App;
