import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { v4 as uuidv4 } from "uuid";
import { getFromLocalStorage } from "../utils/localStorage";
const initialState = getFromLocalStorage() || [];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { todo, priority } = action.payload;
      const newTodo = {
        id: uuidv4(),
        todo,
        completed: false,
        priority,
        createdAt: new Date().toISOString(),
      };
      state.push(newTodo);
    },
    updateTodo: (state, action) => {
      const { id, todo: newText } = action.payload;
      const index = state.findIndex((t) => String(t.id) === String(id));
      if (index >= 0) {
        state[index].todo = newText;
      }
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      return state.filter((t) => String(t.id) !== String(id));
    },
    toggleCompleted: (state, action) => {
      const { id } = action.payload;
      const todo = state.find((t) => String(t.id) === String(id));
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, toggleCompleted } =
  todoSlice.actions;
export default todoSlice.reducer;
