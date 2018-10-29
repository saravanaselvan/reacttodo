import React, { Component } from "react";
import "./Alert.css";

class Alert extends Component {
  render() {
    return (
      <div className="Alert">
        <span className={this.props.type}>{this.props.alertMessage}</span>
      </div>
    );
  }
}

export default Alert;
