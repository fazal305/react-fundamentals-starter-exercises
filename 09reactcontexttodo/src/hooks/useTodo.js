import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export default function useTodo() {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error("useTodo must be used inside TodoProvider");
  }

  return context;
}
