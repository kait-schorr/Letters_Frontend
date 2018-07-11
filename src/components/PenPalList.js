import React, { Component } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Card,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class PenPalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      penpals: [],
    };
  }
  getPenpals() {
    let config = {
      headers: { Authorization: `Token ${localStorage.getItem('authToken')}` },
    };
    console.log(config);
    axios
      .get(`https://penpaldjango.herokuapp.com/api/penpals/`, config)
      .then(response => {
        console.log('Penpals: ', response);
        this.setState({ penpals: response.data });
        this.props.setPenPals(this.state.penpals);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.user) {
      this.getPenpals();
    }
  }

  render() {
    return (
      <Container>
        <Row>
          {this.state.penpals.map(penpal => (
            <Link className="penpal-cards" to={`penpals/${penpal.name}`}>
              <Card>
                <CardBody>
                  <CardTitle>{penpal.name}</CardTitle>
                  <CardText>
                    {penpal.address.city}, {penpal.address.state}
                  </CardText>
                </CardBody>
              </Card>
            </Link>
          ))}
        </Row>
      </Container>
    );
  }
}

export default PenPalList;
