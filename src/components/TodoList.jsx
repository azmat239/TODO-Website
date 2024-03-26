import React, { useState } from "react";
import { useTodo } from "../contexts";

const TodoList = ({ todo }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsEditable(false);
  };

  const deleteTodoItem = () => {
    deleteTodo(todo.id);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };
  return (
    <div
      className={`${
        todo.complete
          ? "bg-gradient-to-r from-red-300 to-red-700 w-[55vw] m-auto my-4 rounded-xl"
          : "bg-gradient-to-r from-red-700 to-red-300"
      } w-[55vw] bg-white m-auto my-4 rounded-xl flex justify-around items-center`}
    >
      <div className="flex justify-evenly items-center">
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={toggleCompleted}
          className="h-5 w-5 text-red-500 border-blue-300 rounded-lg focus:ring-blue-400 focus:ring-offset-0"
        />
        <input
          type="text"
          placeholder={todo.todo}
          onChange={(e) => setTodoMsg(e.target.value)}
          value={todoMsg}
          readOnly={!isEditable}
          className={`${
            todo.complete
              ? "bg-gradient-to-r from-red-300 to-red-400 "
              : "bg-gradient-to-r from-red-700 to-red-400"
          } outline-none text-xl text-white placeholder:text-black w-[40vw] py-1`}
        />
      </div>
      <div className="flex justify-evenly items-center gap-10">
        <button
          onClick={() => {
            if (todo.complete) return;
            if (isEditable) {
              editTodo();
            } else setIsEditable((prev) => !prev);
          }}
          disabled={todo.complete}
          className="px-4 py-2 bg-transparent hover:bg-red-300"
        >
          {isEditable ? "📁" : "✏️"}
        </button>

        <button
          onClick={deleteTodoItem}
          className="px-4 py-2 bg-transparent hover:bg-red-300"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default TodoList;
