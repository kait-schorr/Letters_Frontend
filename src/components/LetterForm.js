import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';

class LetterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letterDate: moment().format(),
      letterOutbound: false,
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmit = event => {
    event.preventDefault();
    let config = {
      headers: { Authorization: `Token ${localStorage.getItem('authToken')}` },
    };
    axios
      .post(
        'https://penpaldjango.herokuapp.com/api/letters/',
        {
          date: '2018-07-11T21:25:53Z',
          outbound: this.state.letterOutbound,
          penpal: this.props.penpal.url,
        },
        config
      )
      .then(response => {
        this.props.getLetters();
        console.log('Letter Post: ', response);
      })
      .catch(err => {
        console.log(err);
        alert(
          `Sincerest apologies, there was a hiccup in creating a new Letter: ${err}`
        );
      });
    document.getElementById('letterform').reset();
  };

  render() {
    return (
      <Col sm="12" md={{ size: 8, offset: 2 }}>
        <Form
          id="letterform"
          onChange={this.handleChange}
          onSubmit={this.formSubmit}
        >
          <FormGroup>
            <Label for="letterDate">Letter Date</Label>
            <Input
              type="date"
              name="letterDate"
              id="letterDate"
              placeholder="Select date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="letterOutbound">Outbound Letter</Label>
            <Input type="checkbox" name="letterOutbound" id="letterOutbound" />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Col>
    );
  }
}

export default withRouter(LetterForm);
