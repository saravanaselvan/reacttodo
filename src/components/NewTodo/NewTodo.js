import React, { Component } from "react";
import "./NewTodo.css";

class NewTodo extends Component {
  state = { todo: "" };

  addTodo = event => {
    event.preventDefault();
    const todolist = this.props.todolist.map(item => item);
    todolist.push({
      id: Math.floor(Math.random() * 100),
      title: this.state.todo,
      completed: false
    });
    this.setState({
      todolist: todolist,
      todo: ""
    });
    this.props.updateMainList(todolist);
  };

  updateTodo = event => {
    this.setState({
      todo: event.target.value
    });
  };

  render() {
    return (
      <div className="NewTodo">
        <form onSubmit={this.addTodo}>
          <input
            type="text"
            value={this.state.todo}
            onChange={this.updateTodo}
          />
          <button
            type="submit"
            onClick={this.addTodo}
            disabled={!this.state.todo}
            className={!this.state.todo ? "button-disabled" : ""}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default NewTodo;
