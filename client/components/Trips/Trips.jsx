import React from 'react';
import { Button, Row } from 'react-bootstrap';
import TripView from './TripView.jsx';

const Trips = ( { trips, setShowTrip, displayModal } ) => (
  <>
      {trips.map((trip, index) => (
        <TripView trip={trip} key={index} setShowTrip={setShowTrip} displayModal={displayModal} />
      ))}
      <Row>
        <Button className="trip-button" aria-label="Add a Trip" name="makeTrip" onClick={displayModal} >Add a Trip</Button>
      </Row>
  </>
);

export default Trips;