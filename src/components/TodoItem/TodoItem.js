import React from "react";
import { Link } from "react-router-dom";
import "./TodoItem.css";

const TodoItem = props => {
  const item = props.item;
  return (
    <li
      className="TodoItem"
      style={
        item.completed
          ? { fontStyle: "italic", textDecoration: "line-through" }
          : {}
      }
    >
      <Link to={`/todo/${item.id}/edit`}>{item.title}</Link>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => props.updateStatus(item)}
      />
    </li>
  );
};

export default TodoItem;
