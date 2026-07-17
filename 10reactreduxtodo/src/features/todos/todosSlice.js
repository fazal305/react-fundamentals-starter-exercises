import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo(state, action) {
      state.push(action.payload);
    },
    updateTodoText(state, action) {
      const { id, text } = action.payload;
      const todo = state.find((item) => item.id === id);

      if (todo) {
        todo.text = text;
      }
    },
    deleteTodo(state, action) {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo(state, action) {
      const todo = state.find((item) => item.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, updateTodoText, deleteTodo, toggleTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
