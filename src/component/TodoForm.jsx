import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

function TodoForm({ addTodo }) {
  const [newTodo, setNewTodo] = useState("");

  function handleAddTodo() {
    if (newTodo.trim() !== "") {
      addTodo(newTodo);
      setNewTodo("");
    }
  }

  function enterClick(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTodo();
    }
  }

  return (
    <form
      className="inputValue"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTodo();
      }}
    >
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={enterClick}
        placeholder="Enter a new item"
      />
      <button type="button" onClick={handleAddTodo}>
        <MdAdd className="MdAdd" />
      </button>
    </form>
  );
}

export default TodoForm;
