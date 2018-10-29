import React from "react";
import Alert from "../../components/Alert/Alert";
import "../../App.css";

const WithError = props => {
  return (
    <div className="App">
      {props.alert.show ? <Alert {...props.alert} /> : null}
      {props.children}
    </div>
  );
};

export default WithError;
