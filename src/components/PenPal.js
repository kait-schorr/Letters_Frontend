import React, { Component } from 'react';
import axios from 'axios';

class PenPal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      penpalName: '',
      penpalAddress: '',
    };
  }

  componentDidMount() {
    let penpal = this.props.penPals.filter(penpal => {
      if (penpal.name === this.props.match.params.name) {
        return penpal;
      }
    });
    console.log('Props', this.props);
    console.log(penpal);
  }

  render() {
    return <div>PENPAL PROFILE</div>;
  }
}

export default PenPal;
