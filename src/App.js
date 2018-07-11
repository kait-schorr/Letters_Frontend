import React, { Component, Fragment } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PenPalList from './components/PenPalList';
import PenPal from './components/PenPal';
import { Container } from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      penpals: [],
    };
    this.setPenPals = this.setPenPals.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    this.setState({ user: this.setState.user });
  }
  setUser(user) {
    console.log('Setting user to: ', user);
    this.setState({ user: user });
  }
  setPenPals(penpals) {
    this.setState({ penpals: penpals });
  }
  render() {
    return (
      <Fragment>
        <div className="App">
          <NavBar user={this.state.user} setUser={this.setUser} />
          <Container>
            <Route exact path="/" render={() => <SignUp />} />
            <Route
              exact
              path="/login"
              render={() => <Login setUser={this.setUser} />}
            />
            <Route
              exact
              path="/penpals"
              render={() => (
                <PenPalList
                  user={this.state.user}
                  setPenPals={this.setPenPals}
                />
              )}
            />
            <Route
              path="/penpals/:name"
              render={props => (
                <PenPal {...props} penPals={this.state.penpals} />
              )}
            />
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default App;
