import React, { useState } from "react";
import "./TodoItem.css"
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrSave } from "react-icons/gr";

function TodoItem({ todo, index, editTodoItem, deleteTodo, updateTodoItem }) {
  const [editTodo, setEditTodo] = useState(todo.text);

  return (
    <div className="inputDisplay">
      {todo.isEditing ? (
        <input
          className="editInput"
          type="text"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : (
        <div>
          <p>{todo.text}</p>
          <small>{todo.date}</small>
        </div>
      )}
      <div className="rightsideDisplay">
        {todo.isEditing ? (
          <div onClick={() => updateTodoItem(index, editTodo)}>
            <GrSave className="GrSave" />
          </div>
        ) : (
          <div onClick={() => editTodoItem(index)}>
            <CiEdit className="CiEdit" />
          </div>
        )}
        <div onClick={() => deleteTodo(index)}>
          <RiDeleteBin6Line className="delete" />
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
