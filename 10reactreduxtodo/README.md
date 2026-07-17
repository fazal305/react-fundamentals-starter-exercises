# 10reactreduxtodo - Redux Todo Lab

A React Fundamentals exercise rebuilding `09reactcontexttodo`'s feature with Redux Toolkit and `react-redux` instead of the Context API, to compare the two state-management approaches directly.

## Learning Goals

- Understand why Redux Toolkit exists.
- Understand how `react-redux` connects React components to a Redux store.
- Configure a store with `configureStore()`.
- Create a feature slice with `createSlice()`.
- Understand the `(state, action)` reducer signature.
- Learn where `action.payload` comes from.
- Understand why draft mutation is safe inside Redux Toolkit reducers.
- Keep reducers pure by generating IDs and timestamps in components.
- Dispatch generated action creators with `useDispatch()`.
- Read store state with `useSelector()`.
- Persist Redux state with `preloadedState` and `store.subscribe()`.
- Compare Redux Toolkit directly with the Context version from `09reactcontexttodo`.

## Concepts Covered

### Why Redux Toolkit Exists

Plain Redux often required hand-writing action type strings, action creators, reducers with `switch` statements, DevTools setup, and middleware setup.

Redux Toolkit reduces that boilerplate. `createSlice()` generates action types and action creators. `configureStore()` sets up the store with good defaults, including DevTools and middleware.

This project installs both:

- `@reduxjs/toolkit` for store and slice tooling.
- `react-redux` for React bindings.

### react-redux as the Bridge (and How It Parallels Your Own Context Bridge)

In `09reactcontexttodo`, `TodoProvider` and `useTodo()` connected React components to shared todo state.

In this project, `react-redux` provides a mature version of that bridge:

- `<Provider store={store}>` makes the store available.
- `useSelector()` reads store state.
- `useDispatch()` sends actions to the store.

This scales to one global store with multiple feature slices.

### configureStore

`configureStore()` creates the single Redux store:

```javascript
const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: {
    todos: loadPersistedTodos(),
  },
});
```

The `reducer` map uses one key per feature slice. This project has one slice: `todos`.

### createSlice

`createSlice()` groups a slice name, initial state, and reducers:

```javascript
createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo() {},
  },
});
```

It automatically generates:

- The slice reducer.
- One action creator per reducer key.
- Action type strings such as `todos/addTodo`.

### The (state, action) Reducer Signature

Each slice reducer receives:

- `state`: the current value of this slice only.
- `action`: the dispatched action object.

The action has a `type` field and usually a `payload` field.

When code calls:

```javascript
dispatch(updateTodoText({ id: todo.id, text: newText }));
```

Redux receives an action whose `payload` is:

```javascript
{ id: todo.id, text: newText }
```

### Why "Mutating" State Is Safe Inside a createSlice Reducer

`09reactcontexttodo` correctly taught that plain React state must not be mutated directly.

Inside a Redux Toolkit `createSlice` reducer, the rule is different because Redux Toolkit uses Immer. Immer gives the reducer a draft. Writing to the draft records the change and produces a new immutable state behind the scenes.

This is correct inside a slice reducer:

```javascript
addTodo(state, action) {
  state.push(action.payload);
}
```

That is not the same as:

```javascript
todos.push(newTodo);
setTodos(todos);
```

The same-looking syntax means something different when Immer is involved.

### Two Valid Immer Patterns, Never Mixed

Inside a slice reducer, either mutate the draft and return nothing, or return a brand-new value.

This project uses draft mutation for:

- `addTodo`
- `updateTodoText`
- `toggleTodo`

It returns a new array for:

- `deleteTodo`

Do not mutate the draft and return a separate new value in the same reducer.

### Keeping Reducers Pure

Reducers should be pure. The same input should produce the same output.

This project generates IDs and timestamps in `TodoForm`, before dispatching:

```javascript
const newTodo = {
  id: crypto.randomUUID(),
  text: trimmedText,
  completed: false,
  createdAt: new Date().toISOString(),
};

dispatch(addTodo(newTodo));
```

The reducer only appends the object it receives.

### useDispatch and useSelector

`useDispatch()` returns the store dispatch function:

```javascript
const dispatch = useDispatch();
dispatch(addTodo(newTodo));
```

`useSelector()` reads data from the store:

```javascript
const todos = useSelector((state) => state.todos);
```

After selecting the data, rendering and mapping are ordinary JavaScript and JSX.

### useSelector Re-renders vs. Context Re-renders

`useSelector(selectorFn)` re-renders a component only when the selector result changes by strict/reference equality.

In the Context version, a component using `useTodo()` received the shared context value object. When that object changed, consumers using it could re-render even if they only cared about one part.

`useSelector` allows more granular subscriptions. This is an architectural difference, not a claim that Redux is always better.

### Persisting the Store

Persistence uses Redux APIs instead of React effects.

`preloadedState` loads saved todos once at store creation:

```javascript
preloadedState: {
  todos: loadPersistedTodos(),
}
```

`store.subscribe()` writes changes after every store update:

```javascript
store.subscribe(() => {
  window.localStorage.setItem(
    TODOS_STORAGE_KEY,
    JSON.stringify(store.getState().todos)
  );
});
```

This parallels `09reactcontexttodo`: `preloadedState` is like the lazy `useState` initializer, and `store.subscribe()` is like the persistence `useEffect`.

### What Doesn't Belong in Redux

The text currently being typed into `TodoForm` is local and temporary. It belongs in local `useState`, not the Redux store.

The shared todo list belongs in Redux because multiple components read or update it.

## Project Structure

```text
10reactreduxtodo/
  src/
    app/
      store.js
    features/
      todos/
        todosSlice.js
    components/
      TodoForm.jsx
      TodoItem.jsx
      TodoList.jsx
    constants/
      todo.js
    App.jsx
    main.jsx
    index.css
  index.html
  package.json
  vite.config.js
  README.md
```

The `app/` plus `features/<name>/` structure is the common Redux Toolkit convention. App-wide store setup lives in `app/`, and feature-specific Redux logic lives in `features/todos/`.

## Components

### TodoForm

Owns local draft input state, builds the complete todo object, and dispatches `addTodo(newTodo)`.

### TodoItem

Receives one todo as a prop and dispatches toggle, update, and delete actions.

### TodoList

Reads `state.todos` with `useSelector()`, renders an empty state, and maps todos with stable `todo.id` keys.

### todosSlice

Defines the todo reducers and generated action creators.

### store

Creates the Redux store, hydrates from localStorage, and subscribes to persist changes.

## How To Run

```powershell
npm install
npm run dev
```

Then open the local URL Vite prints, usually:

```text
http://localhost:5173/
```

## Comparing This to 09reactcontexttodo

| Concern | Context version | Redux Toolkit version |
|---|---|---|
| Shared state bridge | `TodoProvider` | `<Provider store={store}>` |
| Read state | `useTodo()` | `useSelector()` |
| Trigger changes | Provider actions | `useDispatch()` plus action creators |
| Update logic | Provider functions | Slice reducers |
| Persistence read | Lazy `useState` initializer | `preloadedState` |
| Persistence write | Provider `useEffect` | `store.subscribe()` |

## Experiments To Try

- Add a `clearCompleted` reducer and matching dispatch.
- Open Redux DevTools and watch actions/state as you use the app.
- Temporarily move ID generation into the reducer and discuss why that is worse.
- Add a second slice, such as a UI preferences slice.

## Lessons Learned

- Redux Toolkit reduces plain Redux boilerplate.
- `react-redux` connects React components to the store.
- `configureStore()` creates the store.
- `createSlice()` creates reducers and action creators.
- Slice reducers receive slice state, not the whole store.
- `action.payload` comes from the value passed to the generated action creator.
- Immer makes draft mutation safe inside `createSlice` reducers.
- Do not mix draft mutation and returning new state in the same reducer.
- Reducers should stay pure.
- IDs and timestamps should be generated before dispatching.
- `useDispatch()` sends actions.
- `useSelector()` reads selected state and subscribes to changes.
- Form draft text can stay as local component state.
- Store persistence can use `preloadedState` and `store.subscribe()`.

## Future Improvements

- Add Redux Toolkit's `createAsyncThunk` for a simulated async todo fetch.
- Add a filter: all, active, completed.
- Add tests for the slice reducers in isolation.
- Compare this store's DevTools timeline to the Context version's plain console logs.
