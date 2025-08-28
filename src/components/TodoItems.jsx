import { File, Pen, PenIcon, Save, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, updateTodo } from "../store/todoSlice";
const TodoItems = ({ title, priority, id }) => {
  const [todo, setTodo] = useState(title);
  const [isEditable, setIsEditable] = useState(true);

  const todos = useSelector((state) => state.todos || []);

  const color = getColor(priority);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (todo.trim()) {
      console.log(todos);
      dispatch(updateTodo({ id: id, todo: todo }));
      setIsEditable(false);
    }
  };

  const handleDelete = () => {
    console.log(todos);
    dispatch(deleteTodo({ id }));
  };

  function getColor(priority) {
    if (priority === 0) return "border-l-green-600";
    else if (priority === 1) return "border-l-yellow-600";
    else if (priority === 2) return "border-l-red-600";
    else return "border-l-gray-600";
  }

  return (
    <div
      className={`flex items-center justify-between border-l-4 ${color} border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm rounded-r-md`}
    >
      <div className="p-3">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        />
      </div>
      <div className="flex-1 p-3 outline-none">
        <input
          type="text"
          className="w-full border-none outline-none bg-transparent text-gray-800 font-medium placeholder-gray-400"
          placeholder="Enter todo..."
          value={todo}
          disabled={isEditable}
          onChange={(e) => setTodo(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3 p-3">
        <Trash
          className="w-5 h-5 text-red-600 hover:text-red-700 cursor-pointer transition-colors"
          onClick={handleDelete}
        />
        {isEditable ? (
          <PenIcon
            className="w-5 h-5 text-blue-600 hover:text-blue-700 cursor-pointer transition-colors"
            onClick={handleUpdate} // ✅ save and exit edit mode
          />
        ) : (
          <Save
            className="w-5 h-5 text-blue-600 hover:text-blue-700 cursor-pointer transition-colors"
            onClick={() => setIsEditable(true)}
          />
        )}
      </div>
    </div>
  );
};

export default TodoItems;
