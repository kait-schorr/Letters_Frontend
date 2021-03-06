import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
  Container,
  Col,
  Row,
  Card,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PenPalForm from './PenPalForm';
import LetterForm from './LetterForm';
import '../styles/PenPalList.css';

class PenPalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      penpals: [],
    };
    this.getPenpals = this.getPenpals.bind(this);
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
      <Fragment>
        <Container className="penpalCards">
          <Col sm="12" md={{ size: 8, offset: 2 }}>
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
          </Col>
        </Container>
        <PenPalForm getPenpals={this.getPenpals} />
      </Fragment>
    );
  }
}

export default PenPalList;
