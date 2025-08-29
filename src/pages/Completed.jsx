import { useSelector } from "react-redux";
import { Filter, ArrowUpDown, Plus } from "lucide-react";
import { TodoItems } from "../components";
const Completed = () => {
  const todos = useSelector((state) => state.todos || []);

  const completedTodo = todos.filter((todo) => todo.completed !== false);
  const pendingTodo = todos.filter((todo) => todo.completed === false);

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
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Filter size={18} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
              <ArrowUpDown size={18} />
              Sort
            </button>
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Plus size={18} />
              Add More
            </a>
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
