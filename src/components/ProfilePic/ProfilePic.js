import React, { Component } from "react";

class ProfilePic extends Component {
  render() {
    console.log(this.props.user);
    return (
      <div style={{ float: "right" }}>
        <img width="50" height="50" src={this.props.user.photoURL} />
      </div>
    );
  }
}

export default ProfilePic;
