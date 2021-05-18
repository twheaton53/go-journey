import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Trips from './Trips/Trips.jsx';
import tripData from '../../dist/data.js';

const App = () => {
  const [trips, setTrips] = useState(tripData);
  const [showTrip, setShowTrip] = useState(false);
  const [trip, setTrip] = useState();

  return (
    <>
      <h1 className="go-journey">Go Journey!</h1>
      <Trips trips={trips} setShowTrip={setShowTrip} />
    </>
  )
}

export default App;