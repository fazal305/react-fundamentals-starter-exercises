import { configureStore } from "@reduxjs/toolkit";
import { TODOS_STORAGE_KEY } from "../constants/todo";
import todosReducer from "../features/todos/todosSlice";

function loadPersistedTodos() {
  const savedTodos = window.localStorage.getItem(TODOS_STORAGE_KEY);

  if (!savedTodos) {
    return [];
  }

  try {
    const parsedTodos = JSON.parse(savedTodos);

    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch (error) {
    console.error("Could not parse saved todos, starting empty.", error);
    return [];
  }
}

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: {
    todos: loadPersistedTodos(),
  },
});

store.subscribe(() => {
  window.localStorage.setItem(
    TODOS_STORAGE_KEY,
    JSON.stringify(store.getState().todos)
  );
});

export default store;
