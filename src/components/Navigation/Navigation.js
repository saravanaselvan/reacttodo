import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../config/firebase";
import ProfilePic from "../ProfilePic/ProfilePic";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarBrand,
  NavbarToggler
} from "reactstrap";

class Navigation extends Component {
  state = { isOpen: false };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <Navbar expand="md" light color="light">
        <NavbarBrand tag={Link} to="/" className="mr-auto">
          To Do
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/milk">
                Milk
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={this.props.logout}>
                Log out
              </NavLink>
            </NavItem>
            <NavItem>
              {firebase.auth() && firebase.auth().currentUser ? (
                <ProfilePic user={firebase.auth().currentUser} />
              ) : null}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
