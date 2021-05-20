import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import ReactModal from 'react-modal'
import Overview from './Overview/Overview.jsx';
import Trips from './Trips/Trips.jsx';
import tripData from '../../dist/data.js';

ReactModal.setAppElement('#app');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trips: tripData,
      showTrip: false,
      trip: {},
      displayModal: false,
      makeTrip: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleDisplayModal = this.handleDisplayModal.bind(this);
    this.createTrip = this.createTrip.bind(this);
  }

  // componentDidMount() {
  //   axios.get('/trips')
  //     .then((res) => {
  //       this.setState({
  //         trips: res.data
  //       })
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // }

  createTrip = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { trips } = this.state;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    const start = formDataObj.arrivalDate;
    const end = formDataObj.departureDate;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const starting = startDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    const ending = endDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });

    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = endDate.getTime() - startDate.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);

    console.log(formDataObj);

    const tripObj = {
      location: formDataObj.destination,
      details: {
        arrival: starting,
        arrivalFlight: formDataObj.arrivalFlight,
        departure: ending,
        departureFlight: formDataObj.departureFlight
      },
      days: [
        // {
        //   id: 1,
        //   title: 'Arrival Day',
        //   date: starting,
        //   attending: [],
        //   itinerary: []
        // },
        // {
        //   id: 2,
        //   title: 'Departing Day',
        //   date: ending,
        //   attending: [],
        //   itinerary: []
        // }
      ]
    };

    this.setState({
      trips: trips.concat(tripObj),
      makeTrip: false
    });
    // axios({
    //   method: 'post',
    //   url: '/trips/add',
    //   data: {
    //     destination: formDataObj.destination,
    //     arrivalDate: formDataObj.arrivalDate,
    //     arrivalFlight: formDataObj.arrivalFlight,
    //     departureDate: formDataObj.departureDate,
    //     departureFlight: formDataObj.departureFlight,
    //     amountOfDays: diffInDays
    //   }
    // })
    //   .then((res) => {
    //     return axios.get('/trips');
    //   })
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  }

  handleClick = (e) => {
    e.preventDefault();
    const { trips } = this.state;
    console.log('target name is ,', e.target.name)
    console.log('Trips array is ', this.state.trips)

    if (e.target.name === 'back') {
      this.setState({
        showTrip: false,
        trip: {}
      });
    } else {
      let selectedTrip = '';
      for (const property in trips) {
        if (trips[property].location === e.target.name) {
          selectedTrip = trips[property];
          console.log('selected trip is ', selectedTrip)
        }
      }
      this.setState({
        trip: selectedTrip,
        showTrip: true
      });
    }
  }

  handleDisplayModal = (e) => {
    e.preventDefault();
    if (e.target.name === 'invite') {
      this.setState({
        displayModal: true
      });
    } else if (e.target.name === 'makeTrip') {
      this.setState({
        makeTrip: true
      });
    } else {
      this.setState({
        displayModal: false,
        makeTrip: false
      });
    }
  }

  render () {
    const { trip, trips, showTrip, displayModal, makeTrip } = this.state;

    if (trips.length === 0) {
      return (
        <>
          <h1 className="go-journey">Go Journey!</h1>
          <h3 className="go-journey">No trips found, let's plan one!</h3>
          <Button aria-label="make a trip" className="trip-button" name="makeTrip" onClick={this.handleDisplayModal}>Make a Trip</Button>
          <ReactModal
            isOpen={makeTrip}
            contentLabel="Plan a Journey!"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
              content: {
                backgroundColor: '#bcb8b1',
                fontFamily: 'Crimson Pro, serif',
              },
            }}
          >
            <Form onSubmit={this.createTrip}>
              <Form.Group controlId="Destination Input">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="destination"
                  placeholder="Ex. Santa Cruz"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a destination.</Form.Control.Feedback>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="Arrival Date Input">
                  <Form.Label>Arrival Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="arrivalDate"
                    placeholder="11/22/2021"
                  />
                  <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please enter an arrival date.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="Arrival Flight Input">
                  <Form.Label>Arrival Flight</Form.Label>
                  <Form.Control type="text" name="arrivalFlight" placeholder="Ex: Southwest F85HK" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="Departure Date Input">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="departureDate"
                    placeholder="11/29/2021"
                  />
                  <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please enter a departure date.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="Arrival Flight Input">
                  <Form.Label>Departure Flight</Form.Label>
                  <Form.Control type="text" name="departureFlight" placeholder="Ex: Southwest K89FH" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group>
                  <Button className='modal-button' aria-label="submit" type="submit">Submit</Button>
                  <Button className='modal-button' aria-label="close window" onClick={this.handleDisplayModal}>Close</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </ReactModal>
        </>
      )
    }

    if (!showTrip) {
      return (
        <>
          <h1 className="go-journey">Go Journey!</h1>
          <Trips trips={trips} setShowTrip={this.handleClick} displayModal={this.handleDisplayModal} />
          <ReactModal
            isOpen={displayModal}
            contentLabel="Add Someone to Trip"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
              content: {
                backgroundColor: '#bcb8b1',
                fontFamily: 'Crimson Pro, serif',
              },
            }}
          >
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="First Name Input">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="first name"
                    placeholder="Ex. John"
                  />
                  <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please enter a first name.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="Last Name Input">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="last name"
                    placeholder="Ex. Doe"
                  />
                  <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please enter a last name.</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="Email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Ex: johndoe43@email.com"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
              </Form.Group>
              <Form.Row>
                <Form.Group>
                  <Button className='modal-button' aria-label="submit" type="submit">Submit</Button>
                  <Button className='modal-button' aria-label="close window" onClick={this.handleDisplayModal}>Close</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </ReactModal>
          <ReactModal
            isOpen={makeTrip}
            contentLabel="Plan a Journey!"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
              content: {
                backgroundColor: '#bcb8b1',
                fontFamily: 'Crimson Pro, serif',
              },
            }}
          >
            <Form onSubmit={this.createTrip}>
              <Form.Group controlId="Destination Input">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="destination"
                  placeholder="Ex. Santa Cruz"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a destination.</Form.Control.Feedback>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="Arrival Date Input">
                  <Form.Label>Arrival Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="arrivalDate"
                    placeholder="11/22/2021"
                  />
                  <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please enter an arrival date.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="Arrival Flight Input">
                  <Form.Label>Arrival Flight</Form.Label>
                  <Form.Control type="text" name="arrivalFlight" placeholder="Ex: Southwest F85HK" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="Departure Date Input">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="departureDate"
                    placeholder="11/29/2021"
                  />
                  <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please enter a departure date.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="Arrival Flight Input">
                  <Form.Label>Departure Flight</Form.Label>
                  <Form.Control type="text" name="departureFlight" placeholder="Ex: Southwest K89FH" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group>
                  <Button className='modal-button' aria-label="submit" type="submit">Submit</Button>
                  <Button className='modal-button' aria-label="close window" onClick={this.handleDisplayModal}>Close</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </ReactModal>
        </>
      )
    }

    return (
      <Overview trip={trip} setShowTrip={this.handleClick} />
    )
  }
}

export default App;