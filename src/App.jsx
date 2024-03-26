import { useEffect, useState } from "react";
import { TodoContextProvider } from "./contexts";
import AddForm from "./components/AddForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, complete: !prevTodo.complete }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContextProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="h-[80vh] w-[60vw] bg-gray-900 m-auto my-10 font-mono">
        <h1 className="text-center text-2xl text-gray-500 p-10 font-extrabold">
          Todo App
        </h1>
        <div className="w-[55vw] bg-white m-auto rounded-xl">
          <AddForm />
        </div>
        <div>
          {todos.map((todo) => (
            <TodoList todo={todo} key={todo.id} />
          ))}
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
