import React, { useState } from 'react';
import { Button, Collapse, Row, Col, Container, Card } from 'react-bootstrap';

const DaysView = ( { day, viewItinerary, dayId } ) => {
  console.log('day in DaysView is ', day);
  const [open, setOpen] = useState(false);
  const [itinerary, setItinerary] = useState(day.itinerary);

  if (dayId != day.id) {
    return (
      <>
        <Card className="days-view">
            <Card.Body>
            <Card.Title as="h2">{day.date}</Card.Title>
            <Card.Subtitle as="h4">{day.title}</Card.Subtitle>
            <Card.Text>
              Attending:&nbsp;
              {day.attending.map((person, index) => (
                <>{person}, &nbsp;</>
                ))}
            </Card.Text>
            <Row>
            <Button aria-label="Edit day" className="itinerary-button" name={day.id}>Edit</Button>
            <Button aria-label="see itinerary" className="itinerary-button" name={day.id} onClick={viewItinerary}>See Itinerary</Button>
            </Row>
            </Card.Body>
        </Card>
        <Container>
            <Collapse in={open}>
              <div>
              {itinerary.map((plan, index) => (
                <>
                  <p key={index}>{plan.title}</p>
                  <p>{plan.time}</p>
                  <p>{plan.notes}</p>
                  <p>Attending:&nbsp;{plan.attending}</p>
                </>
              ))}
              </div>
            </Collapse>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Card className="highlighted-days-view">
            <Card.Body>
            <Card.Title as="h2">{day.date}</Card.Title>
            <Card.Subtitle as="h4">{day.title}</Card.Subtitle>
            <Card.Text>
              Attending:&nbsp;
              {day.attending.map((person, index) => (
                <>{person}, &nbsp;</>
                ))}
            </Card.Text>
            <Row>
              <Button aria-label="Edit day" className="itinerary-button" name={day.id}>Edit</Button>
              <Button aria-label="see itinerary" className="itinerary-button" name={day.id} onClick={viewItinerary}>See Itinerary</Button>
            </Row>
            </Card.Body>
        </Card>
        <Container>
            <Collapse in={open}>
              <div>
              {itinerary.map((plan, index) => (
                <>
                  <p key={index}>{plan.title}</p>
                  <p>{plan.time}</p>
                  <p>{plan.notes}</p>
                  <p>Attending:&nbsp;{plan.attending}</p>
                </>
              ))}
              </div>
            </Collapse>
        </Container>
      </>
    );
  }
};

export default DaysView;
{/* <Accordion.Toggle as={Card.Header} eventKey={day.id}>
  {day.date}
</Accordion.Toggle>
<Accordion.Collapse eventKey={day.id}>
  <Card>Here's some text!</Card>
</Accordion.Collapse> */}


// <Row as="h2">
//   {day.title}
// </Row>
// <Row as="h5">
//   {day.date}
    // </Row>
    // <Row>
    //   {day.attending.map((person, index) => (
    //     <p key={index}>{person}, &nbsp;</p>
    //   ))}
    // </Row>