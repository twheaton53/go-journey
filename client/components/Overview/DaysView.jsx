import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const DaysView = ( { day } ) => (
  <Container className="days-view">
    <Row as="h2">
      {day.title}
    </Row>
    <Row as="h5">
      {day.date}
    </Row>
    <Row>
      {day.attending.map((person, index) => (
        <p key={index}>{person}, &nbsp;</p>
      ))}
    </Row>
  </Container>
);

export default DaysView;