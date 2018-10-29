import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./components/About/About";
import Navigation from "./components/Navigation/Navigation";
import EditTodo from "./components/EditTodo/EditTodo";
import WithError from "./hoc/WithError/WithError";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { auth, provider } from "./config/firebase";

class App extends Component {
  state = { alertType: "success", alertMessage: "", show: false, user: null, authenticated: false, pending: true };

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

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        this.setState({
          user: user
        });
      })
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        })
      })
  }

  componentWillMount = () => {
    console.log('component will mount');
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({
          authenticated: true,
          user: user,
          loading: false,
          pending: false
        });
      } else {
        this.setState({
          authenticated: false,
          user: null,
          loading: false,
          pending: false
        });
      }
    });
  }

  render() {
    return (
      <WithError alert={this.state}>
        <Navigation login={this.login} logout={this.logout}/>
        <Switch>
          <PrivateRoute exact path="/" component={Home} authenticated={this.state.authenticated} authPending={this.state.pending}/>
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
