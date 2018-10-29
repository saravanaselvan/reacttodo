import React, { Component } from "react";
import "./NewTodo.css";
import { todoDB } from "../../config/firebase";

class NewTodo extends Component {
  state = { todo: "" };

  addTodo = event => {
    event.preventDefault();
    const todolist = this.props.todolist.map(item => item);
    const todo = {
      id: Math.floor(Math.random() * 100),
      title: this.state.todo,
      completed: false
    };
    todolist.push(todo);
    todoDB.push(todo);

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
    const buttonClass = !this.state.todo ? "button-disabled" : "";
    return (
      <div className="NewTodo">
        <form onSubmit={this.addTodo}>
          <input
            className="right-button"
            type="text"
            value={this.state.todo}
            onChange={this.updateTodo}
          />
          <button
            className={`right-add-on ${buttonClass}`.trim()}
            type="submit"
            onClick={this.addTodo}
            disabled={!this.state.todo}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default NewTodo;
