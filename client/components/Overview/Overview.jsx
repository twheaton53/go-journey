import React from 'react';
import { Collapse, Card, Container, Col, Row, Button, Form } from 'react-bootstrap';
import DaysList from './DaysList.jsx';
import ItineraryList from './ItineraryList.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      trip: props.trip,
      dayId: null,
      displayItinerary: false,
      displayPlanMaker: false,
      itinerary: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.handlePlan = this.handlePlan.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  closeForm = (e) => {
    e.preventDefault();
    this.setState({
      displayPlanMaker: false
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
    console.log(formDataObj);
    console.log(itinerary)

    const newItinerary = itinerary.concat(formDataObj);
    this.setState({
      itinerary: newItinerary,
      displayPlanMaker: false
    });
  }

  render() {
    const { trip, displayItinerary, displayPlanMaker, itinerary, dayId } = this.state;
    const { setShowTrip } = this.props;

    if (!displayItinerary) {
      return (
        <>
          <h1 className="go-journey">Go Journey!</h1>
          <Row md={4}>
            <Col>
              <Container className="days">
                <DaysList days={trip.days} dayId={dayId} viewItinerary={this.handleClick} />
                <Button aria-label="back" className="back-button" name="back" onClick={setShowTrip}>Back</Button>
              </Container>
            </Col>
            {/* <Col>
              <Container>
                <Collapse in={displayItinerary}>
                  <ItineraryList itinerary={itinerary} />
                </Collapse>
              </Container>
            </Col> */}
          </Row>
        </>
      )
    }

    if (displayPlanMaker) {
      return (
        <>
        <h1 className="go-journey">Go Journey!</h1>
        <Row md={4}>
          <Col>
            <Container className="days">
              <DaysList days={trip.days} dayId={dayId} viewItinerary={this.handleClick} />
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
            <Form className="plan-maker" onSubmit={this.handleSubmit}>
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
                <Form.Control type="text" name="time" required placeholder="Ex: 1:35PM" />
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
                <Button aria-label="submit form" className="plan-button" type="submit">Submit Plan</Button>
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
        <Row md={4}>
          <Col>
            <Container className="days">
              <DaysList days={trip.days} dayId={dayId} viewItinerary={this.handleClick} />
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