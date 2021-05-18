import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Overview from './Overview/Overview.jsx';
import Trips from './Trips/Trips.jsx';
import tripData from '../../dist/data.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trips: tripData,
      showTrip: false,
      trip: {}
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    let selectedTrip = null
    for (const property in tripData) {
      if (tripData[property].location === e.target.name) {
        selectedTrip = tripData[property];
      }
    }
    this.setState({
      showTrip: true,
      trip: selectedTrip
    });
  }

  render () {
    const { trip, trips, showTrip } = this.state;

    if (!showTrip) {
      return (
        <>
          <h1 className="go-journey">Go Journey!</h1>
          <Trips trips={trips} setShowTrip={this.handleClick} />
        </>
      )
    }

    return (
      <Overview trip={trip} />
    )
  }
}

export default App;