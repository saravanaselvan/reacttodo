import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./components/About/About";
import Navigation from "./components/Navigation/Navigation";
import EditTodo from "./components/EditTodo/EditTodo";
import WithError from "./hoc/WithError/WithError";

class App extends Component {
  state = { alertType: "success", alertMessage: "", show: false };

  showSuccessAlert = data => {
    this.setState({
      alertType: "success",
      alertMessage: data.message,
      show: true
    });
    setTimeout(() => {
      this.setState({
        show: false
      });
    }, 2000);
  };
  render() {
    return (
      <WithError alert={this.state}>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route
            path="/todo/:id/edit"
            render={props => (
              <EditTodo {...props} showSuccess={this.showSuccessAlert} />
            )}
          />
        </Switch>
      </WithError>
    );
  }
}

export default App;
