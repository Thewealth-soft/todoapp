import React, { useState, useEffect } from "react";
import "../index.css";
import { MdAdd } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrSave } from "react-icons/gr";
function TodoList() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("todoList");
    return savedTodoList
      ? JSON.parse(savedTodoList)
      : ["watch movie", "code in python"];
  });

  // State to store the new todo item
  const [newTodo, setNewTodo] = useState("");
  const [editTodoIndex, setEditTodoIndex] = useState(-1); // indicating No editing
  const [editTodo, setEditTodo] = useState(""); //storing the edited todo item

  // useEffect hook to save todo
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // Function to add a new todo
  function addTodo() {
    if (newTodo.trim() !== "") {
      // Create a new todo list by adding the new todo item
      setTodoList([...todoList, newTodo]);
      // Clear the input field after adding the todo item
      setNewTodo("");
    }
  }

  // Function to handle editing of todo item
  function editTodoItem(index) {
    setEditTodoIndex(index);
    setEditTodo(todoList[index]);
  }

  // Function to update the todo item after editing
  function updateTodoItem(index) {
    const updatedTodoList = [...todoList];
    updatedTodoList[index] = editTodo;
    setTodoList(updatedTodoList);
    setEditTodoIndex(-1); // Reset editTodoIndex after editing
  }

  // Function to handle deleting a todo item
  const deleteTodo = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
  };
// Function to handle enter click
  function enterClick(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTodo();
    }
  }

  return (
    <>
      <div>
        <div className="heading">Task_Sphere</div>
        <form
          className="inputValue"
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={enterClick}
            placeholder="Enter a new item "
          />
          <button onClick={addTodo}>
            <MdAdd className="MdAdd" />{" "}
          </button>
        </form>
        <div>
          {todoList.map((todo, index) => (
            <div key={index} className="inputDisplay">
              {editTodoIndex === index ? (
                <input
                  className="editInput"
                  type="text"
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                />
              ) : (
                <p>{todo}</p>
              )}
              <div className="rightsideDisplay">
                {editTodoIndex === index ? (
                  <div onClick={() => updateTodoItem(index)}>
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
          ))}
        </div>
      </div>
    </>
  );
}

export default TodoList;
