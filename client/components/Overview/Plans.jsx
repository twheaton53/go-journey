import React from 'react';
import { Card } from 'react-bootstrap';

class Plans extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plan: props.plan
    }

  }

  render() {
    const { plan } = this.state
    return (
      <Card className="highlighted-days-view">
        <Card.Body>
          <Card.Title>{plan.title}</Card.Title>
          <Card.Subtitle>{plan.time}</Card.Subtitle>
          <Card.Text>{plan.notes}</Card.Text>
          <Card.Text>Attending:&nbsp;{plan.attending}</Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default Plans;