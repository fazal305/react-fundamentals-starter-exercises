import { useState } from "react";
import { useTodo } from "../context";

function TodoForm() {
  const [todoText, setTodoText] = useState("");
  const { addTodo } = useTodo();

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedText = todoText.trim();

    if (!trimmedText) {
      return;
    }

    addTodo(trimmedText);
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
