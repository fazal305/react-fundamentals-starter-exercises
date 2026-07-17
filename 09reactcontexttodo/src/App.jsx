import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            React Fundamentals
          </p>
          <h1 className="text-4xl font-bold text-slate-950">
            Todo Context Lab
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-700">
            A Context API CRUD exercise with immutable state updates, stable
            todo IDs, a custom useTodo hook, a barrel index.js, and real
            localStorage persistence.
          </p>
        </header>

        <TodoForm />
        <TodoList />

        <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            How this works
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            TodoProvider owns the todo array and all CRUD actions. TodoForm,
            TodoList, and TodoItem read the shared data or actions through the
            useTodo custom hook instead of manually passing the same props down
            through every layer.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Todos survive a full page reload because the provider reads saved
            data from localStorage with a lazy useState initializer and writes
            changes back with a separate useEffect.
          </p>
        </section>
      </div>
    </main>
  );
}

export default App;
