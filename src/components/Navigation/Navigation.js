import React from "react";
import { Link } from "react-router-dom";

const Navigation = props => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about/">About</Link>
        </li>
      </ul>
      <button type="button" onClick={props.login}>Log In</button>
      <button type="button" onClick={props.logout}>Log Out</button>
    </nav>
  );
};

export default Navigation;
