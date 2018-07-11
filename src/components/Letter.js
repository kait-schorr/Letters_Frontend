import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

class Letter extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>{this.props.letter.date}</CardTitle>
          <CardText>{this.props.letter.outbound}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default Letter;
