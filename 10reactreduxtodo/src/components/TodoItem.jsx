import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  updateTodoText,
} from "../features/todos/todosSlice";

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(todo.text);
  const dispatch = useDispatch();

  function handleSave() {
    const trimmedDraft = draftText.trim();

    if (!trimmedDraft) {
      return;
    }

    dispatch(updateTodoText({ id: todo.id, text: trimmedDraft }));
    setIsEditing(false);
  }

  function handleCancel() {
    setDraftText(todo.text);
    setIsEditing(false);
  }

  return (
    <li className="rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <input
            id={`todo-${todo.id}`}
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
            className="mt-1 h-5 w-5 accent-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          />

          <div className="min-w-0 flex-1">
            {isEditing ? (
              <div>
                <label htmlFor={`todo-edit-${todo.id}`} className="sr-only">
                  Edit todo text
                </label>
                <input
                  id={`todo-edit-${todo.id}`}
                  type="text"
                  value={draftText}
                  onChange={(event) => setDraftText(event.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            ) : (
              <label
                htmlFor={`todo-${todo.id}`}
                className={`block text-sm font-semibold ${
                  todo.completed
                    ? "text-slate-500 line-through"
                    : "text-slate-950"
                }`}
              >
                {todo.text}
              </label>
            )}

            <p className="mt-1 text-xs text-slate-500">
              {todo.completed ? "Completed" : "Active"} - Created{" "}
              {new Date(todo.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-md border border-green-600 bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-md border border-slate-400 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-md border border-slate-400 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Edit
            </button>
          )}

          <button
            type="button"
            onClick={() => dispatch(deleteTodo(todo.id))}
            className="rounded-md border border-red-400 px-3 py-2 text-sm font-semibold text-red-800 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default TodoItem;
