import React from "react";
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
      {item.title}
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => props.updateStatus(item)}
      />
    </li>
  );
};

export default TodoItem;
