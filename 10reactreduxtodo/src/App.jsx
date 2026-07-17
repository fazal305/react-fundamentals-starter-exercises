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
          <h1 className="text-4xl font-bold text-slate-950">Redux Todo Lab</h1>
          <p className="max-w-3xl text-base leading-7 text-slate-700">
            The same CRUD todo feature from 09reactcontexttodo, rebuilt with
            Redux Toolkit, React Redux, createSlice, useSelector, useDispatch,
            and store-level localStorage persistence.
          </p>
        </header>

        <TodoForm />
        <TodoList />

        <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            How this compares to the Context version
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
            <li>
              Context version: <code>TodoProvider</code> plus{" "}
              <code>useTodo()</code>. Redux version:{" "}
              <code>{`<Provider store={store}>`}</code> plus{" "}
              <code>useSelector()</code> and <code>useDispatch()</code>.
            </li>
            <li>
              Context version: provider action functions. Redux version: slice
              reducers and generated action creators.
            </li>
            <li>
              Context version: persistence effect inside the provider. Redux
              version: <code>preloadedState</code> and{" "}
              <code>store.subscribe()</code>.
            </li>
            <li>
              The UI stays intentionally similar so the state-management
              approach is the main difference.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export default App;
