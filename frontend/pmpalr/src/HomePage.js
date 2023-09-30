import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

const HomePage = () => {
  return (
    <Container className="home-container">
      <div className="rectangle">
        <h1 className="app-name">PM-PAL</h1>
        <Row className="buttons">
          <Col>
            <Button variant="primary">Create Profile</Button>
          </Col>
          <Col>
            <Button variant="primary">Login</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default HomePage;
