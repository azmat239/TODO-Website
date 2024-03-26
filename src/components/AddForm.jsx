import React, { useState } from "react";
import { useTodo } from "../contexts";

const AddForm = () => {
  const [todo, setTodo] = useState([]);
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;
    addTodo({ todo, complete: false });
    setTodo("");
  };
  return (
    <>
      <form onSubmit={add} className="flex justify-between">
        <input
          type="text"
          placeholder="Enter Your TODO Tasks"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="rounded-s-lg px-2 w-full outline-none font-serif font-semibold"
        />
        <button
          type="submit"
          className="rounded-e-lg bg-blue-900 py-3 px-4 text-lg text-white hover:bg-blue-500"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default AddForm;
