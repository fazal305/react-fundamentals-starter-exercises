import { useCallback, useEffect, useMemo, useState } from "react";
import { TODOS_STORAGE_KEY } from "../constants/todo";
import { TodoContext } from "./TodoContext";

function createTodoId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getInitialTodos() {
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

function TodoProvider({ children }) {
  const [todos, setTodos] = useState(getInitialTodos);

  const addTodo = useCallback((text) => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    const newTodo = {
      id: createTodoId(),
      text: trimmedText,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  }, []);

  const updateTodoText = useCallback((id, newText) => {
    const trimmedText = newText.trim();

    if (!trimmedText) {
      return;
    }

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  useEffect(() => {
    window.localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const contextValue = useMemo(
    () => ({
      todos,
      addTodo,
      updateTodoText,
      deleteTodo,
      toggleTodo,
    }),
    [todos, addTodo, updateTodoText, deleteTodo, toggleTodo]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
}

export default TodoProvider;
