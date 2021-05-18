import React from 'react';

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
    return (
      <h1>
        {trip.location}
      </h1>
    )
  }
}

export default Overview;