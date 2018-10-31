import React, { Component } from "react";
import "./ProfilePic.css";

class ProfilePic extends Component {
  render() {
    return (
      <div className="pic-container">
        <img width="50" height="50" src={this.props.user.photoURL} />
      </div>
    );
  }
}

export default ProfilePic;
