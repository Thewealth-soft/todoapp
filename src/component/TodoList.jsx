import React, { useState, useEffect } from "react";
import "../index.css";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

function TodoList() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("todoList");
    return savedTodoList
      ? JSON.parse(savedTodoList)
      : [
          {
            text: "watch movie",
            date: new Date().toLocaleString(),
            isEditing: false,
          },
          {
            text: "code in python",
            date: new Date().toLocaleString(),
            isEditing: false,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  function addTodo(text) {
    const newTodoItem = {
      text: text,
      date: new Date().toLocaleString(),
      isEditing: false,
    };
    setTodoList([...todoList, newTodoItem]);
  }

  function editTodoItem(index) {
    const updatedTodoList = [...todoList];
    updatedTodoList[index].isEditing = true;
    setTodoList(updatedTodoList);
  }

  function updateTodoItem(index, newText) {
    const updatedTodoList = [...todoList];
    updatedTodoList[index] = {
      ...updatedTodoList[index],
      text: newText,
      isEditing: false,
    };
    setTodoList(updatedTodoList);
  }

  function deleteTodo(index) {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
  }

  return (
    <div>
      <div className="heading">Task_Sphere</div>
      <TodoForm addTodo={addTodo} />
      <div>
        {todoList.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            editTodoItem={editTodoItem}
            deleteTodo={deleteTodo}
            updateTodoItem={updateTodoItem}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
