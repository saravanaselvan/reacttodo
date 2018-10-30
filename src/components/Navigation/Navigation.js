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
        <li style={{ float: "right" }}>
          <a href="#" onClick={props.logout}>
            Log out
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
