import React, { Component } from "react";
import TodoList from "./components/TodoList/TodoList";
import NewTodo from "./components/NewTodo/NewTodo";
import firebase from "./config/firebase";

class Home extends Component {
  state = { todolist: [], loading: false };

  componentDidMount() {
    this.setState({ loading: true });

    firebase
      .database()
      .ref(`todos/${firebase.auth().currentUser.uid}`)
      .once("value")
      .then(snapshot => {
        const todolist = [];
        snapshot.forEach(data => {
          todolist.push({ ...data.val(), id: data.key });
        });
        this.setState({
          todolist: todolist
        });
        this.setState({ loading: false });
      });
  }

  updateMainList = todolist => {
    this.setState({
      todolist: todolist
    });
  };

  updateStatus = item => {
    const updatedList = this.state.todolist.map(todo => {
      return item.id === todo.id
        ? { ...todo, completed: !todo.completed }
        : todo;
    });
    const todo = firebase
      .database()
      .ref(`todos/${firebase.auth().currentUser.uid}`)
      .child(`${item.id}`);
    todo.once("value", snapshot => {
      todo.update({ completed: !snapshot.val().completed });
    });
    this.setState({
      todolist: updatedList
    });
  };
  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <NewTodo
          updateMainList={this.updateMainList}
          todolist={this.state.todolist}
        />
        <TodoList
          todolist={this.state.todolist}
          updateStatus={this.updateStatus}
        />
        <TodoList
          todolist={this.state.todolist}
          updateStatus={this.updateStatus}
          showCompleted={true}
        />
      </div>
    );
  }
}

export default Home;
