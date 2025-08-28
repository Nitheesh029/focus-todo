import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice.js";
import { saveToLocalStorage } from "../utils/localStorage.js";

export const store = configureStore({
  reducer: { todos: todoReducer },
});

store.subscribe(() => {
  saveToLocalStorage(store.getState().todos);
});
