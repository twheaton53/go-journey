import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';

const TripView = ( { trip, setShowTrip } ) => (
  <Container className="trip-view">
    <Row>
      <p>Our {trip.location} Vacation!</p>
    </Row>
    <Row>
      <Col>
        <p>Arrival: {trip.details.arrival}</p>
      </Col>
      <Col>
        <p>Flight: {trip.details.arrivalFlight}</p>
      </Col>
    </Row>
    <Row>
      <Col>
        <p>Departure: {trip.details.departure}</p>
      </Col>
      <Col>
        <p>Flight: {trip.details.departureFlight}</p>
      </Col>
    </Row>
    <Row>
      <Button aria-label="select trip" className="trip-button" onClick={setShowTrip}>Select Trip</Button>
      <Button className="trip-button" aria-label="Delete a Trip">Delete a Trip</Button>
    </Row>
  </Container>
);

export default TripView;