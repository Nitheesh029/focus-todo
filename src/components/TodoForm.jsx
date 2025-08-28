import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
const TodoForm = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos || []);
  const addTodoHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
      console.log(todos);
    }
  };
  return (
    <div className="w-full p-3 flex items-center">
      <input
        type="text"
        className="flex-1 px-4 py-3 border-1 border-gray-400 rounded-l-lg outline-none text-lg"
        placeholder="Enter your todo...."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold border-1 border-blue-500 cursor-pointer rounded-r-lg text-lg"
        onClick={addTodoHandler}
      >
        ADD
      </button>
    </div>
  );
};

export default TodoForm;
