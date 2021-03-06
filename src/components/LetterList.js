import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Letter from './Letter';
import LetterForm from './LetterForm';

class LetterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: [],
    };
    this.getLetters = this.getLetters.bind(this);
  }

  getLetters() {
    let config = {
      headers: { Authorization: `Token ${localStorage.getItem('authToken')}` },
    };
    axios
      .get(`https://penpaldjango.herokuapp.com/api/letters`, config)
      .then(response => {
        this.setState({ letters: response.data });
        console.log('Response from letter call: ', response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getLetters();
  }

  render() {
    console.log('Penpal: ', this.props.penpal);
    return (
      <Container>
        <Row>
          <h1 className="col-12">Letters: </h1>
          {this.state.letters.map(letter => <Letter letter={letter} />)}
        </Row>
        <LetterForm getLetters={this.getLetters} penpal={this.props.penpal} />
      </Container>
    );
  }
}

export default LetterList;
