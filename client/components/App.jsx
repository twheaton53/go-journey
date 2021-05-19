import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
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
      displayModal: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleDisplayModal = this.handleDisplayModal.bind(this);
  }

  handleClick = (e) => {
    e.preventDefault();
    if (e.target.name === 'back') {
      this.setState({
        showTrip: false,
        trip: {}
      });
    } else {
      let selectedTrip = null;
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
  }

  handleDisplayModal = (e) => {
    e.preventDefault();
    if (e.target.name === 'invite') {
      this.setState({
        displayModal: true
      });
    } else {
      this.setState({
        displayModal: false
      });
    }
  }

  render () {
    const { trip, trips, showTrip, displayModal } = this.state;

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
        </>
      )
    }

    return (
      <Overview trip={trip} setShowTrip={this.handleClick} />
    )
  }
}

export default App;