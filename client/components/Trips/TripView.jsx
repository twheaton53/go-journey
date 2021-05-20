import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';

const TripView = ( { trip, setShowTrip, displayModal } ) => {
  // const arrivalDateStr = trip.arrivaldate;
  // const departureDateStr = trip.departuredate;
  // const arrDateObj = new Date(arrivalDateStr);
  // const depDateObj = new Date(departureDateStr);
  // const arrivalDate = arrDateObj.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
  // const departureDate = depDateObj.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <Container className="trip-view">
      <Row>
        <h3>Our {trip.location} Vacation!</h3>
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
        <Button aria-label="select trip" name={trip.location} value={trip}className="trip-button" onClick={setShowTrip}>Select Trip</Button>
        <Button aria-label="Invite someone to trip" name="invite" className="trip-button" onClick={displayModal}>Invite Someone to Trip!</Button>
        <Button className="trip-button" aria-label="Delete a Trip">Delete Trip</Button>
      </Row>
    </Container>
  );
};

export default TripView;
