import React, { useState, useEffect } from "react";
import "../index.css";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import ConfirmationDialog from "./confirmtionDialog";

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

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

  function confirmDelete(index) {
    setIsDialogOpen(true);
    setTodoToDelete(index);
  }

  function handleDelete() {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(todoToDelete, 1);
    setTodoList(updatedTodoList);
    setIsDialogOpen(false);
    setTodoToDelete(null);
  }

  function handleCancel() {
    setIsDialogOpen(false);
    setTodoToDelete(null);
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
            deleteTodo={() => confirmDelete(index)}
            updateTodoItem={updateTodoItem}
          />
        ))}
      </div>
      {
        isDialogOpen && 
        <ConfirmationDialog
          message="Are you sure you want to delete this item?"
          onConfirm={handleDelete}
          onCancel={handleCancel}
        />
      }
    </div>
  );
}

export default TodoList;
