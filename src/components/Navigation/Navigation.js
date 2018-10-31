import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../config/firebase";
import ProfilePic from "../ProfilePic/ProfilePic";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarBrand
} from "reactstrap";

const Navigation = props => {
  return (
    <Navbar expand="md" light color="light">
      <NavbarBrand href="/" className="mr-auto">
        To Do
      </NavbarBrand>
      <Collapse navbar>
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
            {firebase.auth() && firebase.auth().currentUser ? (
              <ProfilePic user={firebase.auth().currentUser} />
            ) : null}
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={props.logout}>
              Log out
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/milk/">Milk</Link>
        </li>
        <li style={{ float: "right" }}>
          <a href="#" onClick={props.logout}>
            Log out
          </a>
        </li>
      </ul> */}
    </Navbar>
  );
};

export default Navigation;
