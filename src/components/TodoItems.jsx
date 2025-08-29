import { File, Pen, PenIcon, Save, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleCompleted, updateTodo } from "../store/todoSlice";

const TodoItems = ({ title, priority, id, completed }) => {
  const [todo, setTodo] = useState(title);
  const [isEditing, setIsEditing] = useState(false); // Changed from isEditable

  const todos = useSelector((state) => state.todos || []);
  const color = getColor(priority);
  const dispatch = useDispatch();

  // Update local state when title prop changes
  useEffect(() => {
    setTodo(title);
  }, [title]);

  const handleUpdate = () => {
    if (todo.trim() && todo !== title) {
      dispatch(updateTodo({ id: id, todo: todo.trim() }));
    }
    setIsEditing(false); // Exit edit mode
  };

  const handleDelete = () => {
    dispatch(deleteTodo({ id }));
  };

  function getColor(priority) {
    if (priority === 0) return "border-l-green-600";
    else if (priority === 1) return "border-l-yellow-600";
    else if (priority === 2) return "border-l-red-600";
    else return "border-l-gray-600";
  }

  const handleComplete = () => {
    dispatch(toggleCompleted({ id }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTodo(title); // Reset to original value
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div
      className={`flex items-center justify-between border-l-4 ${color} border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm rounded-r-md relative ${
        completed ? "opacity-80" : ""
      }`}
    >
      {completed && (
        <span className="absolute left-0 right-0 top-1/2 border-t-2 border-gray-500"></span>
      )}
      <div className="p-3">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          checked={completed}
          onChange={handleComplete}
        />
      </div>
      <div className="flex-1 p-3 outline-none">
        <input
          type="text"
          className="w-full border-none outline-none bg-transparent text-gray-800 font-medium placeholder-gray-400"
          placeholder="Enter todo..."
          value={todo}
          disabled={!isEditing} // Fixed: now properly controls edit state
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleUpdate} // Save on blur
        />
      </div>
      <div className="flex items-center gap-3 p-3">
        <Trash
          className="w-5 h-5 text-red-600 hover:text-red-700 cursor-pointer transition-colors"
          onClick={handleDelete}
        />
        {isEditing ? (
          <>
            <Save
              className="w-5 h-5 text-green-600 hover:text-green-700 cursor-pointer transition-colors"
              onClick={handleUpdate}
            />

            <button
              className="text-gray-500 hover:text-gray-700 text-sm"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        ) : (
          <PenIcon
            className="w-5 h-5 text-blue-600 hover:text-blue-700 cursor-pointer transition-colors"
            onClick={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default TodoItems;
