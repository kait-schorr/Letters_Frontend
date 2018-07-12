import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import axios from 'axios';

class PenPalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      penPalName: '',
      street_address: '',
      city: '',
      state: '',
      zipcode: '',
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
        'https://penpaldjango.herokuapp.com/api/penpals/',
        {
          name: this.state.penPalName,
          address: {
            street_address: this.state.street_address,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
          },
        },
        config
      )
      .then(response => {
        this.props.getPenpals();
      })
      .catch(error => {
        alert('There was an error creating a new account');
      });
    document.getElementById('penpalform').reset();
  };
  componentDidMount() {}

  render() {
    return (
      <Col sm="12" md={{ size: 8, offset: 2 }}>
        <Form
          id="penpalform"
          onChange={this.handleChange}
          onSubmit={this.formSubmit}
        >
          <FormGroup>
            <Label for="penPalName">Pen Pal Name</Label>
            <Input
              type="text"
              name="penPalName"
              id="penPalName"
              placeholder="Enter Name Here"
            />
          </FormGroup>
          <FormGroup>
            <Label for="street_address">Street Address</Label>
            <Input
              type="text"
              name="street_address"
              id="street_address"
              placeholder="1234 Main St."
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              name="city"
              id="city"
              placeholder="1234 Main St."
            />
          </FormGroup>
          <FormGroup>
            <Label for="state">State</Label>
            <Input
              type="text"
              name="state"
              id="state"
              placeholder="1234 Main St."
            />
          </FormGroup>
          <FormGroup>
            <Label for="zipcode">Zip Code</Label>
            <Input
              type="text"
              name="zipcode"
              id="zipcode"
              placeholder="1234 Main St."
            />
          </FormGroup>

          <Button>Submit</Button>
        </Form>
      </Col>
    );
  }
}

export default withRouter(PenPalForm);
