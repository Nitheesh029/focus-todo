import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { v4 as uuidv4 } from "uuid";
const initialState = [
  {
    id: 1,
    todo: "Learn DSA",
    completed: false,
    priority: 0,
    createdAt: new Date().toISOString(),
  },
];

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
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index >= 0) {
        const existingTodo = state.todos[index];
        state.todos[index] = {
          ...existingTodo,
          ...action.payload,
          id: existingTodo.id,
          createdAt: existingTodo.createdAt,
        };
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleCompleted: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, toggleCompleted } =
  todoSlice.actions;
export default todoSlice.reducer;
