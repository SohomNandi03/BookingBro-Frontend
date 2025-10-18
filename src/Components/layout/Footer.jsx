import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  let today = new Date();

  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {today.getFullYear()} BookingBro | All Rights Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

