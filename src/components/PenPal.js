import React, { Component } from 'react';
import LetterList from './LetterList';
import axios from 'axios';

class PenPal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      penpal: null,
    };
  }

  componentDidMount() {
    let penpal = this.props.penPals.filter(penpal => {
      if (penpal.name === this.props.match.params.name) {
        return penpal;
      }
    });
    this.setState({ penpal: penpal[0] });
    console.log('Props', this.props);
    console.log(penpal);
  }

  render() {
    return (
      <div>
        {this.state.penpal != null ? (
          <div>
            <h1>{this.state.penpal.name}</h1>
            <h3>{this.state.penpal.address.street_address}</h3>
            <h3>
              {this.state.penpal.address.city},{' '}
              {this.state.penpal.address.state},{' '}
              {this.state.penpal.address.zipcode}
            </h3>

            <LetterList />
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    );
  }
}

export default PenPal;
