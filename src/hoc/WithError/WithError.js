import React from "react";
import Alert from "../../components/Alert/Alert";
import "../../App.css";

const WithError = props => {
  return (
    <div>
      {props.alert.show ? <Alert {...props.alert} /> : null}
      {props.children}
    </div>
  );
};

export default WithError;
