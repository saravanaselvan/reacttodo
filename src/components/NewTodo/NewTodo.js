import React, { Component } from "react";
import "./NewTodo.css";
import firebase from "../../config/firebase";
import {
  Form,
  FormGroup,
  Input,
  Button,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

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
    todo.id = firebase
      .database()
      .ref(`todos/${firebase.auth().currentUser.uid}`)
      .push(todo).key;
    todolist.push(todo);

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
        <Form>
          <FormGroup>
            <InputGroup>
              <Input
                className="right-button"
                type="text"
                value={this.state.todo}
                onChange={this.updateTodo}
              />
              <InputGroupAddon addonType="append">
                <Button
                  color="primary"
                  className={`right-add-on ${buttonClass}`.trim()}
                  type="submit"
                  onClick={this.addTodo}
                  disabled={!this.state.todo}
                >
                  Add
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default NewTodo;
