import React, { Component } from "react";
import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import NewTodo from "./components/NewTodo/NewTodo";

class App extends Component {
  state = { todolist: [] };

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
    this.setState({
      todolist: updatedList
    });
  };
  render() {
    return (
      <div className="App">
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

export default App;
