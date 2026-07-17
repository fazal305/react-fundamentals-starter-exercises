import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";

function createTodoId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function TodoForm() {
  // Draft form text is local and temporary, so it does not belong in Redux.
  const [todoText, setTodoText] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedText = todoText.trim();

    if (!trimmedText) {
      return;
    }

    const newTodo = {
      id: createTodoId(),
      text: trimmedText,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    dispatch(addTodo(newTodo));
    setTodoText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm"
    >
      <label
        htmlFor="todo-text"
        className="block text-sm font-semibold text-slate-700"
      >
        New todo
      </label>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id="todo-text"
          type="text"
          value={todoText}
          onChange={(event) => setTodoText(event.target.value)}
          placeholder="Write a todo..."
          className="min-w-0 flex-1 rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <button
          type="submit"
          className="rounded-md border border-blue-700 bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Add todo
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
