import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
const TodoForm = () => {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState(0);

  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos || []);

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo({ todo: input, priority: priority }));
      setInput("");
      setPriority(0);
      console.log(todos);
    }
  };

  const priorityOptions = [
    { value: 0, label: "Low", color: "text-green-500" },
    { value: 1, label: "Medium", color: "text-yellow-500" },
    { value: 2, label: "High", color: "text-red-500" },
  ];

  return (
    <>
      <div className="w-full p-3 hidden md:flex items-center flex-row">
        <input
          type="text"
          className="flex-1 px-4 py-3 border-1 border-gray-500 rounded-l-lg outline-none text-lg"
          placeholder="Enter your todo...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="px-3 py-3 border border-gray-400  outline-none text-lg bg-white ring-1 ring-gray-400 cursor-pointer"
        >
          {priorityOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={`${option.color}`}
            >
              {option.label}
            </option>
          ))}
        </select>
        <button
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold border-1 border-blue-500 cursor-pointer rounded-r-lg text-lg"
          onClick={addTodoHandler}
        >
          ADD
        </button>
      </div>
      <div className="w-full flex flex-col md:hidden gap-3 p-3">
        <div className="w-full">
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-500 rounded-lg outline-none text-lg"
            placeholder="Enter your todo...."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full">
          <select
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="flex-1 md:px-3 px-2 py-3 border border-gray-400 rounded-lg outline-none md:text-lg text-md bg-white ring-1 ring-gray-400 cursor-pointer"
          >
            {priorityOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className={`${option.color}`}
              >
                {option.label}
              </option>
            ))}
          </select>
          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold border border-blue-500 cursor-pointer rounded-lg md:text-lg text-md"
            onClick={addTodoHandler}
          >
            ADD
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoForm;
