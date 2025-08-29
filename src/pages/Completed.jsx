import { useSelector, useDispatch } from "react-redux";
import {
  Filter,
  ArrowUpDown,
  Plus,
  Trash2,
  Trash,
  X,
  ChevronDown,
} from "lucide-react";
import { TodoItems } from "../components";
import { deleteAll } from "../store/todoSlice";
import { message, Popconfirm } from "antd";
import { useEffect, useState } from "react";

const Completed = () => {
  const todos = useSelector((state) => state.todos || []);
  const [disableOptions, setDisableOptions] = useState(true);

  // Filter and Sort States
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all"); // all, completed, pending
  const [filterPriority, setFilterPriority] = useState("all"); // all, high, medium, low
  const [sortBy, setSortBy] = useState("createdAt"); // createdAt, priority, title, completed
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc

  useEffect(() => {
    setDisableOptions(todos.length === 0);
  }, [todos.length]);

  // Filter and Sort Logic
  const getFilteredAndSortedTodos = () => {
    let filteredTodos = [...todos];

    // Apply status filter
    if (filterStatus === "completed") {
      filteredTodos = filteredTodos.filter((todo) => todo.completed === true);
    } else if (filterStatus === "pending") {
      filteredTodos = filteredTodos.filter((todo) => todo.completed === false);
    }

    // Apply priority filter
    if (filterPriority !== "all") {
      const priorityValue =
        filterPriority === "low" ? 0 : filterPriority === "medium" ? 1 : 2;
      filteredTodos = filteredTodos.filter(
        (todo) => parseInt(todo.priority) === priorityValue
      );
    }

    // Apply sorting
    filteredTodos.sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case "title":
          valueA = a.todo.toLowerCase();
          valueB = b.todo.toLowerCase();
          break;
        case "priority":
          // Priority mapping: 0=low, 1=medium, 2=high
          valueA = parseInt(a.priority) || 0;
          valueB = parseInt(b.priority) || 0;
          break;
        case "completed":
          valueA = a.completed ? 1 : 0;
          valueB = b.completed ? 1 : 0;
          break;
        case "createdAt":
        default:
          valueA = new Date(a.createdAt);
          valueB = new Date(b.createdAt);
          break;
      }

      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });

    return filteredTodos;
  };

  const filteredAndSortedTodos = getFilteredAndSortedTodos();
  const completedTodo = todos.filter((todo) => todo.completed !== false);
  const pendingTodo = todos.filter((todo) => todo.completed === false);

  // Filter Functions
  const handleFilterClick = () => {
    if (disableOptions) return;
    setShowFilterMenu(!showFilterMenu);
    setShowSortMenu(false);
  };

  const handleSortClick = () => {
    if (disableOptions) return;
    setShowSortMenu(!showSortMenu);
    setShowFilterMenu(false);
  };

  const handleFilterChange = (status, priority) => {
    setFilterStatus(status);
    setFilterPriority(priority);
    setShowFilterMenu(false);
  };

  const handleSortChange = (sortField, order) => {
    setSortBy(sortField);
    setSortOrder(order);
    setShowSortMenu(false);
  };

  const clearFilters = () => {
    setFilterStatus("all");
    setFilterPriority("all");
    setSortBy("createdAt");
    setSortOrder("desc");
    setShowFilterMenu(false);
    setShowSortMenu(false);
  };

  const confirm = (e) => {
    dispatch(deleteAll());
    message.success("Deleted Successfully!");
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const dispatch = useDispatch();

  // Check if any filters are active
  const hasActiveFilters =
    filterStatus !== "all" ||
    filterPriority !== "all" ||
    sortBy !== "createdAt" ||
    sortOrder !== "desc";

  return (
    <div className="mt-10 w-[100%] md:max-w-7xl mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          Todo List
        </div>

        {/* Filter and Sort Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
          <div className="flex gap-3 relative">
            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={handleFilterClick}
                className={`flex items-center gap-2 px-4 py-2 ${
                  filterStatus !== "all" || filterPriority !== "all"
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "bg-blue-600"
                } text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer ${
                  disableOptions ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={disableOptions}
              >
                <Filter size={18} />
                {(filterStatus !== "all" || filterPriority !== "all") && (
                  <span className="bg-white text-blue-600 rounded-full text-xs px-2 py-0.5 font-bold">
                    {[
                      filterStatus !== "all" ? 1 : 0,
                      filterPriority !== "all" ? 1 : 0,
                    ].reduce((a, b) => a + b, 0)}
                  </span>
                )}
              </button>

              {/* Filter Dropdown */}
              {showFilterMenu && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">
                        Filter Options
                      </h3>
                      <button
                        onClick={() => setShowFilterMenu(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Status Filter */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Tasks</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>

                    {/* Priority Filter */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Priorities</option>
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleFilterChange(filterStatus, filterPriority)
                        }
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                      >
                        Apply
                      </button>
                      <button
                        onClick={clearFilters}
                        className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sort Button */}
            <div className="relative">
              <button
                onClick={handleSortClick}
                className={`flex items-center gap-2 px-4 py-2 ${
                  sortBy !== "createdAt" || sortOrder !== "desc"
                    ? "bg-gray-700 ring-2 ring-gray-300"
                    : "bg-gray-600"
                } text-white rounded-lg hover:bg-gray-700 transition-colors font-medium cursor-pointer ${
                  disableOptions ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={disableOptions}
              >
                <ArrowUpDown size={18} />
                {(sortBy !== "createdAt" || sortOrder !== "desc") && (
                  <span className="bg-white text-gray-600 rounded-full text-xs px-2 py-0.5 font-bold">
                    ●
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              {showSortMenu && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">
                        Sort Options
                      </h3>
                      <button
                        onClick={() => setShowSortMenu(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Sort By */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="createdAt">Date Created</option>
                        <option value="title">Task Name</option>
                        <option value="priority">Priority</option>
                        <option value="completed">Completion Status</option>
                      </select>
                    </div>

                    {/* Sort Order */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order
                      </label>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSortChange(sortBy, sortOrder)}
                        className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                      >
                        Apply
                      </button>
                      <button
                        onClick={clearFilters}
                        className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

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
            {hasActiveFilters && (
              <span className="ml-2 text-blue-600 font-semibold">
                | Filtered: {filteredAndSortedTodos.length}
              </span>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600">Active filters:</span>
            {filterStatus !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Status: {filterStatus}
                <button
                  onClick={() => setFilterStatus("all")}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {filterPriority !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Priority: {filterPriority}
                <button
                  onClick={() => setFilterPriority("all")}
                  className="text-green-600 hover:text-green-800"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {(sortBy !== "createdAt" || sortOrder !== "desc") && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                Sort: {sortBy} ({sortOrder})
                <button
                  onClick={() => {
                    setSortBy("createdAt");
                    setSortOrder("desc");
                  }}
                  className="text-purple-600 hover:text-purple-800"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Todo List Container */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">All Todos</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {/* Todo items will go here */}
            <div className="p-4 space-y-2">
              {filteredAndSortedTodos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {todos.length === 0 ? (
                    <>
                      <p className="text-lg">No todos found!</p>
                      <p className="text-sm mt-1">
                        Start by adding your first todo
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg">No todos match your filters!</p>
                      <p className="text-sm mt-1">
                        Try adjusting your filter criteria
                      </p>
                      <button
                        onClick={clearFilters}
                        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        Clear Filters
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-gray-600 text-center py-4">
                    {filteredAndSortedTodos.map((todo) => (
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

      {/* Click outside to close dropdowns */}
      {(showFilterMenu || showSortMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowFilterMenu(false);
            setShowSortMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default Completed;
