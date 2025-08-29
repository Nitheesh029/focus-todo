import { useSelector, useDispatch } from "react-redux";
import { Filter, ArrowUpDown, Plus, Trash2, Trash } from "lucide-react";
import { TodoItems } from "../components";
import { deleteAll } from "../store/todoSlice";
import { message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
const Completed = () => {
  const todos = useSelector((state) => state.todos || []);
  const [disableOptions, setDisableOptions] = useState(true);

  useEffect(() => {
    setDisableOptions(todos.length === 0);
  }, [todos.length]);

  const completedTodo = todos.filter((todo) => todo.completed !== false);
  const pendingTodo = todos.filter((todo) => todo.completed === false);

  const confirm = (e) => {
    dispatch(deleteAll());
    message.success("Deleted Successfully!");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const dispatch = useDispatch();
  return (
    <div className="mt-10 w-[100%] md:max-w-7xl mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          Todo List
        </div>

        {/* Filter and Sort Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
              disabled={disableOptions}
            >
              <Filter size={18} />
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium cursor-pointer"
              disabled={disableOptions}
            >
              <ArrowUpDown size={18} />
            </button>
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer"
            >
              <Plus size={18} />
            </a>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              disabled={disableOptions}
            >
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium cursor-pointer"
                disabled={disableOptions}
              >
                <Trash size={18} />
              </button>
            </Popconfirm>
          </div>

          {/* Todo Count */}
          <div className="text-gray-600 font-medium">
            Total: {todos.length} | Completed: {completedTodo.length} | Pending:{" "}
            {pendingTodo.length}
          </div>
        </div>

        {/* Todo List Container */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">All Todos</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {/* Todo items will go here */}
            <div className="p-4 space-y-2">
              {todos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">No todos found!</p>
                  <p className="text-sm mt-1">
                    Start by adding your first todo
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Placeholder for todo items */}
                  <div className="text-gray-600 text-center py-4">
                    {todos.map((todo) => (
                      <TodoItems
                        key={todo.id}
                        title={todo.todo}
                        priority={todo.priority}
                        id={todo.id}
                        completed={todo.completed}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completed;
