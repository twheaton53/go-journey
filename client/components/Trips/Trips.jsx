import React from 'react';
import { Button, Row } from 'react-bootstrap';
import TripView from './TripView.jsx';

const Trips = ( { trips, setShowTrip } ) => (
  <>
      {trips.map((trip, index) => (
        <TripView trip={trip} key={index} setShowTrip={setShowTrip} />
      ))}
      <Row>
        <Button className="trip-button" aria-label="Add a Trip" >Add a Trip</Button>
      </Row>
  </>
);

export default Trips;