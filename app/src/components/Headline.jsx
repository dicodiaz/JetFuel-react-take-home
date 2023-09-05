import { Col, Image, Row } from 'react-bootstrap';

const Headline = ({ icon, name, payPerInstall }) => {
  return (
    <Row className="mx-0 g-0 px-3 my-2">
      <Col xs={3} className="p-2">
        <Image src={icon} fluid rounded></Image>
      </Col>
      <Col className="d-flex flex-column justify-content-center ps-2">
        <h5 className="mb-1 fw-bold">{name}</h5>
        <p className="mb-0 text-success">
          <span className="fw-bold">{payPerInstall}</span> per install
        </p>
      </Col>
    </Row>
  );
};

export default Headline;
