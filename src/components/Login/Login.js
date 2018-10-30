import React, { Component } from "react";
import { auth, provider } from "../../config/firebase";

class Login extends Component {
  login = () => {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.props.login(user);
    });
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.login}>
          Google Login
        </button>
      </div>
    );
  }
}

export default Login;
