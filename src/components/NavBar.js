import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import axios from 'axios';

class NavBar extends Component {
  logout() {
    axios
      .post('https://penpaldjango.herokuapp.com/rest-auth/logout/')
      .then(response => {
        console.log(response);
        this.props.history.push('/');
      })
      .catch(error => {
        console.log('error:', error);
      });
  }
  render() {
    return (
      <Container className="mt-5">
        <Navbar color="light" light expand="sm">
          <NavbarBrand href="/">Letters!</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/penpals">
                Pen Pals
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">About</NavLink>
            </NavItem>
            {this.props.user === undefined && (
              <NavItem>
                <NavLink tag={Link} to="/login">
                  Log In
                </NavLink>
              </NavItem>
            )}
            {this.props.user !== undefined && (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.user.username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="#">Account</DropdownItem>
                  <DropdownItem href="#">Help</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      this.logout();
                      this.props.setUser(undefined);
                    }}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Navbar>
      </Container>
    );
  }
}

export default withRouter(NavBar);
