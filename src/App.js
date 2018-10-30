import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./Home";
import About from "./components/About/About";
import Navigation from "./components/Navigation/Navigation";
import EditTodo from "./components/EditTodo/EditTodo";
import WithError from "./hoc/WithError/WithError";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/Login/Login";
import { auth, provider } from "./config/firebase";

class App extends Component {
  state = {
    alertType: "success",
    alertMessage: "",
    show: false,
    user: null,
    authenticated: false,
    loading: true
  };

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

  login = user => {
    this.setState({
      user: user,
      authenticated: true
    });
    if (user) this.props.history.push("/");
  };

  logout = event => {
    event.preventDefault();
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
    this.props.history.push("/");
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          user: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          user: null,
          loading: false
        });
      }
    });
  };

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    return (
      <WithError alert={this.state}>
        {this.state.user ? (
          <Navigation login={this.login} logout={this.logout} />
        ) : null}
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={Home}
            authenticated={this.state.authenticated}
          />
          <PrivateRoute
            path="/about"
            component={About}
            authenticated={this.state.authenticated}
          />
          <Route
            path="/todo/:id/edit"
            render={props => (
              <EditTodo {...props} showSuccess={this.showSuccessAlert} />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => <Login login={this.login} logout={this.logout} />}
          />
        </Switch>
      </WithError>
    );
  }
}

export default withRouter(App);
