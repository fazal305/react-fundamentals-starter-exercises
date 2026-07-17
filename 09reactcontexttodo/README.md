# 09reactcontexttodo — Todo Context Lab

A React Fundamentals exercise applying the Context API pattern from `08reactcontexttheme` to a full CRUD todo list, with real localStorage persistence, immutable state updates, and a barrel `index.js` for cleaner imports.

## Learning Goals

- Reuse the Context/Provider/custom-hook pattern for a real data model.
- Store an array of todo objects and CRUD actions in Context.
- Use immutable state updates for add, update, delete, and toggle operations.
- Generate stable todo IDs and use them as React keys.
- Avoid array indexes as identity.
- Use a barrel `index.js` file to reduce repeated import paths.
- Read persisted data once with a lazy `useState` initializer.
- Persist todo changes with `useEffect`.
- Use `JSON.stringify` and `JSON.parse` with localStorage.
- Build controlled form inputs.
- Split the feature into `TodoForm`, `TodoItem`, and `TodoList`.

## Concepts Covered

### Reusing the Context Pattern for Real Data

`08reactcontexttheme` shared one string: `themeMode`.

This project shares an array of todo objects plus action functions:

```javascript
{
  todos,
  addTodo,
  updateTodoText,
  deleteTodo,
  toggleTodo
}
```

The Context pattern does not change: create a context, build a provider that owns state, and read it through a custom hook.

### Immutable State Updates (Add / Update / Delete / Toggle)

The most important rule in this project is: do not mutate state directly.

Add creates a new array:

```javascript
setTodos((currentTodos) => [...currentTodos, newTodo]);
```

Do not use `todos.push(newTodo); setTodos(todos)`. `push()` mutates the existing array, and React may see the same reference and skip the update.

Update uses `map()` and returns a new object only for the matching todo:

```javascript
setTodos((currentTodos) =>
  currentTodos.map((todo) =>
    todo.id === id ? { ...todo, text: newText } : todo
  )
);
```

Delete uses `filter()` to return a new shorter array:

```javascript
setTodos((currentTodos) =>
  currentTodos.filter((todo) => todo.id !== id)
);
```

Do not use `splice()` because it mutates the array.

Toggle uses `map()` and flips `completed` only for the matching todo:

```javascript
setTodos((currentTodos) =>
  currentTodos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
);
```

### Stable IDs vs. Array-Index Keys

Each todo receives a real unique `id` when created. The app uses `crypto.randomUUID()` when available, with a timestamp-plus-random fallback.

React keys use `todo.id`, not the array index.

If a todo is deleted from the middle of the list, every item after it shifts to a new index. Index keys can make React associate row state, such as edit mode, with the wrong todo.

### Barrel index.js for Import Reduction

`src/context/index.js` re-exports:

```javascript
export { default as TodoProvider } from "./TodoProvider.jsx";
export { default as useTodo } from "../hooks/useTodo.js";
```

This is a convenience pattern only. It does not change how Context works. It simply allows imports like:

```javascript
import { TodoProvider, useTodo } from "../context";
```

instead of importing from multiple deeper paths.

### localStorage Persistence

localStorage stores strings only. The todos array is saved with `JSON.stringify` and read with `JSON.parse`.

The provider reads saved todos with a lazy `useState` initializer:

```javascript
const [todos, setTodos] = useState(getInitialTodos);
```

This reads localStorage once before the first render. Reading in a mount effect would first render an empty list, then render again after loading saved data.

Writing happens in a separate effect:

```javascript
useEffect(() => {
  window.localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}, [todos]);
```

### JSON.parse/JSON.stringify and the null Case

`window.localStorage.getItem(key)` returns the real JavaScript value `null` if the key was never set.

`JSON.parse(null)` does not throw because `JSON.parse` coerces the value to the string `"null"`, which is valid JSON and parses back to `null`.

The real risk is corrupted data or an empty string, such as `JSON.parse("")`, which throws a `SyntaxError`. That is why the localStorage read is wrapped in `try/catch`.

### Controlled Form Input

`TodoForm` controls its input with `value` and `onChange`.

On submit, it calls `event.preventDefault()`, trims the value, ignores empty input, calls `addTodo(text)`, and clears the input.

### Provider Action Stability and Memoization

Provider actions use `useCallback`, and the context value uses `useMemo`:

```javascript
const contextValue = useMemo(
  () => ({ todos, addTodo, updateTodoText, deleteTodo, toggleTodo }),
  [todos, addTodo, updateTodoText, deleteTodo, toggleTodo]
);
```

This keeps action references stable. It does not prevent every consumer re-render. Consumers that read `todos` should re-render when `todos` changes.

### Custom useTodo Hook

`useTodo()` reads the current context value and throws a clear error when used outside `TodoProvider`.

This gives components one safe, consistent API for todo data and actions.

## Project Structure

```text
09reactcontexttodo/
  src/
    components/
      TodoForm.jsx
      TodoItem.jsx
      TodoList.jsx
    context/
      TodoContext.js
      TodoProvider.jsx
      index.js
    hooks/
      useTodo.js
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

## Components

### TodoProvider

Owns the todo array, CRUD actions, localStorage reading, and localStorage writing.

### TodoForm

Owns only its local input text state and calls `addTodo` from context.

### TodoItem

Receives one `todo` as a prop and reads shared actions from context. It can toggle, edit, save, cancel, and delete.

### TodoList

Reads `todos` from context, renders an empty state, and maps todos with stable `todo.id` keys.

## How To Run

```powershell
npm install
npm run dev
```

Then open the local URL Vite prints, usually:

```text
http://localhost:5173/
```

## Experiments To Try

- Add a "clear completed" action to the provider.
- Add a filter: all, active, completed.
- Deliberately mutate todos directly in one action and observe the bug.
- Corrupt the localStorage value manually in devtools and confirm the fallback works.
- Add a due-date field to each todo.

## Lessons Learned

- Context can share arrays, objects, primitive values, and actions.
- Provider state can model full CRUD data, not only simple theme state.
- State arrays must be updated immutably.
- `push()` and `splice()` mutate arrays and should not be used for React state updates.
- `map()` is useful for updating or toggling one matching item.
- `filter()` is useful for deleting an item.
- Stable IDs are safer than array indexes for keys and identity.
- A barrel `index.js` is an import convenience, not a Context feature.
- localStorage stores strings only.
- `JSON.stringify` saves arrays and objects as strings.
- `JSON.parse` restores saved JSON strings.
- A lazy `useState` initializer reads persisted data before the first render.
- A separate `useEffect` writes todos when they change.
- Controlled inputs use `value` and `onChange`.
- Custom context hooks should throw clear provider errors.
- Provider actions can use `useCallback`, and provider values can use `useMemo`.

## Future Improvements

- Filter and sort todos.
- Drag-to-reorder with stable IDs preserved.
- Sync todos across browser tabs using the `storage` event.
- Split todos and todo actions into separate contexts.
- Add basic tests for the CRUD reducer logic.
