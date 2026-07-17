import { useTodo } from "../context";
import TodoItem from "./TodoItem";

function TodoList() {
  const { todos } = useTodo();

  if (todos.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">No todos yet</h2>
        <p className="mt-2 text-sm text-slate-600">
          Add your first todo to see Context-powered CRUD state in action.
        </p>
      </section>
    );
  }

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Todo list</h2>
          <p className="mt-1 text-sm text-slate-600">
            {completedCount} of {todos.length} completed
          </p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Keys use todo.id
        </p>
      </div>

      <ul className="mt-5 space-y-3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
