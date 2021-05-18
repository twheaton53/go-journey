import React from 'react';
import { Container, Button } from 'react-bootstrap';
import DaysList from './DaysList.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props)
    console.log(props);
    this.state = {
      trip: props.trip
    }
  }

  render() {
    const { trip } = this.state;
    const { setShowTrip } = this.props;
    return (
      <>
        <h1 className="go-journey">Go Journey!</h1>
        <Container fluid="sm" className="days">
          <DaysList days={trip.days} />
          <Button aria-label="back" className="back-button" name="back" onClick={setShowTrip}>Back</Button>
        </Container>
      </>
    )
  }
}

export default Overview;