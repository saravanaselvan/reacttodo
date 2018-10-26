import React from "react";
import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = props => {
  const list = props.showCompleted
    ? props.todolist.filter(item => item.completed)
    : props.todolist.filter(item => !item.completed);

  return (
    <div className="TodoList">
      <div>{props.showCompleted && list.length > 0 ? "Completed" : ""}</div>
      <ul>
        {list.map((item, i) => {
          return (
            <TodoItem
              key={item.id}
              item={item}
              updateStatus={() => props.updateStatus(item)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
