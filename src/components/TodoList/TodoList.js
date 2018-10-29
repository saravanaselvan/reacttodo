import React, { Component } from "react";
import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";

class TodoList extends Component {
  render() {
    const list = this.props.showCompleted
      ? this.props.todolist.filter(item => item.completed)
      : this.props.todolist.filter(item => !item.completed);

    return (
      <div className="TodoList">
        <div>
          {this.props.showCompleted && list.length > 0 ? "Completed" : ""}
        </div>
        <ul>
          {list.map((item, i) => {
            return (
              <TodoItem
                key={item.id}
                item={item}
                updateStatus={() => this.props.updateStatus(item)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TodoList;
