import React, { Component } from "react";
const todoDB = window.firebase.database().ref("todos");
let todo;

class EditTodo extends Component {
  state = { title: "", completed: false };
  componentDidMount() {
    todo = todoDB.child(`${this.props.match.params.id}`);
    todo.once("value", snapshot => {
      this.setState(snapshot.val());
    });
  }

  updateTodoTitle = event => {
    this.setState({ title: event.target.value });
  };

  updateTodo = event => {
    event.preventDefault();
    todo.update(this.state);
    this.props.history.push("/");
    this.props.showSuccess({ message: "To do item saved." });
  };

  updateStatus = () => {
    this.setState(state => {
      return {
        completed: !state.completed
      };
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.updateTodo}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={this.state.title}
              onChange={this.updateTodoTitle}
            />
          </div>
          <div>
            Completed:
            <input
              type="checkbox"
              checked={this.state.completed}
              onChange={this.updateStatus}
            />
          </div>
          <div>
            <button type="submt" onClick={this.updateTodo}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditTodo;
