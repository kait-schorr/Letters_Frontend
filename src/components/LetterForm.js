import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class LetterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letterDate: '',
      letterOutbound: '',
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
          date: this.state.letterDate,
          outbound: this.state.letterOutbound,
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
    );
  }
}

export default withRouter(LetterForm);
