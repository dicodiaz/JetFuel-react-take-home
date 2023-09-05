import { Row } from 'react-bootstrap';
import Media from './Media';

const Medias = ({ medias }) => {
  return (
    <Row className="mx-0 g-0 flex-nowrap overflow-scroll py-4 px-2 bg-custom1">
      {medias.map((media) => {
        return <Media key={media.download_url} media={media} />;
      })}
    </Row>
  );
};

export default Medias;
