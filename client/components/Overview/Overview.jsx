import React from 'react';
import { Collapse, Card, Container, Col, Row, Button, Form } from 'react-bootstrap';
import ReactModal from 'react-modal';
import moment from 'moment';
import DaysList from './DaysList.jsx';
import ItineraryList from './ItineraryList.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      trip: props.trip,
      days: props.trip.days,
      dayId: null,
      displayItinerary: false,
      displayPlanMaker: false,
      displayDayMaker: false,
      itinerary: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.handlePlan = this.handlePlan.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.makeDay = this.makeDay.bind(this);
  }

  closeForm = (e) => {
    e.preventDefault();
    this.setState({
      displayPlanMaker: false,
      displayDayMaker: false
    });
  }

  displayModal = (e) => {
    e.preventDefault();
    this.setState({
      displayDayMaker: true
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    const { trip, displayItinerary } = this.state;
    const id = e.target.name;
    let chosenDay = trip.days[id - 1];

    if (!displayItinerary) {
      this.setState({
        dayId: id,
        itinerary: chosenDay.itinerary,
        displayItinerary: true
      });
    } else {
      this.setState({
        dayId: id,
        itinerary: chosenDay.itinerary,
        displayItinerary: false
      });
    }
  }

  handlePlan = (e) => {
    e.preventDefault();
    this.setState({
      displayPlanMaker: true
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { itinerary } = this.state;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());
    const formTime = formDataObj.time;

    const adjustedDate = moment(formTime, ['H:mm a', 'hh:mm']).format('LT');
    formDataObj.time = adjustedDate;

    const newItinerary = itinerary.concat(formDataObj);

    this.setState({
      itinerary: newItinerary,
      displayPlanMaker: false
    });

    // if (e.target.name === 'dayMaker') {
    //   const newDays = days.concat(formDataObj);
    //   this.setState({
    //     days: newDays
    //   });
    // }
  }

  makeDay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let count = 0;
    const { days } = this.state;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    const dateObj = new Date(formDataObj.date);
    const date = dateObj.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });

    const attendingArray = formDataObj.attending.split(',');

    const daysObj = {
      id: count,
      title: formDataObj.title,
      date: date,
      attending: attendingArray,
      itinerary: []
    }
    if (days.length === 0) {
      console.log('inside first if')
      var newDays = [].concat(daysObj);
      console.log('newDays is ', newDays)
    } else {
      var newDays = days.concat(daysObj);
    }
    console.log('newDays is (above setState), ', newDays);
    this.setState({
      days: newDays,
      displayDayMaker: false
    }, () => console.log(newDays));
    }

  render() {
    const { trip, days, displayItinerary, displayPlanMaker, displayDayMaker, itinerary, dayId } = this.state;
    const { setShowTrip } = this.props;

    if(days.length === 0) {
      return (
        <>
          <h1 className="go-journey">Go Journey!</h1>
          <h3 className="go-journey">Let's Add Some Days!</h3>
          <Button aria-label="add a day" className="trip-button" name="addDay" onClick={this.displayModal}>Add a Day</Button>
          <ReactModal
            isOpen={displayDayMaker}
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
            <Form onSubmit={this.makeDay} autocomplete="off">
              <Form.Group controlId="Title Input">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="title"
                  placeholder="Ex. Arrival Day"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a title.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="Date Input">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="date"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a date.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="Attending">
                <Form.Label>Attending</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="attending"
                  placeholder="Ex. Daenerys, Joffrey, Cersei"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter some attendees.</Form.Control.Feedback>
              </Form.Group>

              <Form.Row>
                <Form.Group>
                  <Button className="modal-button" aria-label="submit" name="dayMaker" type="submit">Submit</Button>
                  <Button className="modal-button" aria-label="close window" onClick={this.closeForm}>Close</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </ReactModal>
        </>
      )
    }

    if (!displayItinerary) {
      return (
        <>
          <h1 className="go-journey">Go Journey!</h1>
          <Button aria-label="add a day" className="trip-button" name="addDay" onClick={this.displayModal}>Add a Day</Button>
          <ReactModal
            isOpen={displayDayMaker}
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
            <Form onSubmit={this.makeDay} autocomplete="off">
              <Form.Group controlId="Title Input">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="title"
                  placeholder="Ex. Arrival Day"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a title.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="Date Input">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="date"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a date.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="Attending">
                <Form.Label>Attending</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="attending"
                  placeholder="Ex. Daenerys, Joffrey, Cersei"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter some attendees.</Form.Control.Feedback>
              </Form.Group>

              <Form.Row>
                <Form.Group>
                  <Button className="modal-button" aria-label="submit" name="dayMaker" type="submit">Submit</Button>
                  <Button className="modal-button" aria-label="close window" onClick={this.closeForm}>Close</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </ReactModal>
          <Row md={4}>
            <Col>
              <Container className="days">
                <DaysList days={days} dayId={dayId} viewItinerary={this.handleClick} />
                <Button aria-label="back" className="back-button" name="back" onClick={setShowTrip}>Back</Button>
              </Container>
            </Col>
          </Row>
        </>
      )
    }

    if (displayPlanMaker) {
      return (
        <>
        <h1 className="go-journey">Go Journey!</h1>
        <Button aria-label="add a day" className="trip-button" name="addDay" onClick={this.displayModal}>Add a Day</Button>
          <ReactModal
            isOpen={displayDayMaker}
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
            <Form onSubmit={this.makeDay} autocomplete="off">
              <Form.Group controlId="Title Input">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="title"
                  placeholder="Ex. Arrival Day"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a title.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="Date Input">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="date"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a date.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="Attending">
                <Form.Label>Attending</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="attending"
                  placeholder="Ex. Daenerys, Joffrey, Cersei"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter some attendees.</Form.Control.Feedback>
              </Form.Group>

              <Form.Row>
                <Form.Group>
                  <Button className="modal-button" aria-label="submit" name="dayMaker" type="submit">Submit</Button>
                  <Button className="modal-button" aria-label="close window" onClick={this.closeForm}>Close</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </ReactModal>
        <Row md={4}>
          <Col>
            <Container className="days">
              <DaysList days={days} dayId={dayId} viewItinerary={this.handleClick} />
              <Button aria-label="back" className="back-button" name="back" onClick={setShowTrip}>Back</Button>
            </Container>
          </Col>
          <Col>
            <Container fluid="sm" className="itinerary">
                <ItineraryList itinerary={itinerary} />
                <Button aria-label="Add a plan" className="back-button" name="plan" onClick={this.handlePlan}>Add a Plan</Button>
            </Container>
          </Col>
          <Col>
            <Form className="plan-maker" name="planMaker" onSubmit={this.handleSubmit} autocomplete="off">
              <Form.Group controlId="titleInput">
                <Form.Label>
                  Title of Plan
                  <Form.Control type="text" name="title" required placeholder="Ex: Fishing at Lake Hughes" />
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="timeInput">
                <Form.Label>
                  Time of Plan
                </Form.Label>
                <Form.Control type="time" name="time" required placeholder="Ex: 1:35PM" />
              </Form.Group>

              <Form.Group controlId="notesInput">
                <Form.Label>
                  Additional Notes
                </Form.Label>
                <Form.Control type="text" name="notes" placeholder="Ex: Don't forget fishing bait and rod" />
              </Form.Group>

              <Form.Group controlId="attendingInput">
                <Form.Label>
                  Who&apos;s Attending?
                </Form.Label>
                <Form.Control type="text" name="attending" required placeholder="Ex: Johnathan, David, Mitchel" />
              </Form.Group>
              <Row>
                <Button aria-label="submit form" className="plan-button" name="planMaker" type="submit">Submit Plan</Button>
                <Button aria-label="close form" className="plan-button" onClick={this.closeForm}>Close Form</Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </>
      )
    }
      return (
        <>
        <h1 className="go-journey">Go Journey!</h1>
        <Button aria-label="add a day" className="trip-button" name="addDay" onClick={this.displayModal}>Add a Day</Button>
          <ReactModal
            isOpen={displayDayMaker}
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
            <Form onSubmit={this.makeDay} autcomplete="off">
              <Form.Group controlId="Title Input">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="title"
                  placeholder="Ex. Arrival Day"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a title.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="Date Input">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="date"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a date.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="Attending">
                <Form.Label>Attending</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="attending"
                  placeholder="Ex. Daenerys, Joffrey, Cersei"
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter some attendees.</Form.Control.Feedback>
              </Form.Group>

              <Form.Row>
                <Form.Group>
                  <Button className="modal-button" aria-label="submit" name="dayMaker" type="submit">Submit</Button>
                  <Button className="modal-button" aria-label="close window" onClick={this.closeForm}>Close</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </ReactModal>
        <Row md={4}>
          <Col>
            <Container className="days">
              <DaysList days={days} dayId={dayId} viewItinerary={this.handleClick} />
              <Button aria-label="back" className="back-button" name="back" onClick={setShowTrip}>Back</Button>
            </Container>
          </Col>
          <Col>
            <Container fluid="sm" className="itinerary">
                <ItineraryList itinerary={itinerary} />
                <Button aria-label="Add a plan" className="back-button" name="plan" onClick={this.handlePlan}>Add a Plan</Button>
            </Container>
          </Col>
          <Col>
          </Col>
        </Row>
      </>
      )
  }
}
{/* <Card className="days-view">
  {itinerary.map((plan, index) => (
    <>
      <p key={index}>{plan.title}</p>
      <p>{plan.time}</p>
      <p>{plan.notes}</p>
      <p>{plan.attending}</p>
    </>
  ))}
</Card> */}

export default Overview;