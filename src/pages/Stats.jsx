import React from "react";
import { useSelector } from "react-redux";
import {
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  Target,
} from "lucide-react";

const Stats = () => {
  const todos = useSelector((state) => state.todos);

  // Calculate statistics
  const stats = React.useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const completed = todos.filter((todo) => todo.completed).length;
    const pending = todos.filter((todo) => !todo.completed).length;
    const total = todos.length;

    const weeklyTodos = todos.filter(
      (todo) => new Date(todo.createdAt) >= weekAgo
    ).length;

    const monthlyTodos = todos.filter(
      (todo) => new Date(todo.createdAt) >= monthAgo
    ).length;

    const priorityStats = todos.reduce((acc, todo) => {
      acc[todo.priority] = (acc[todo.priority] || 0) + 1;
      return acc;
    }, {});

    const mostCommonPriority =
      Object.entries(priorityStats).length > 0
        ? Object.entries(priorityStats).sort(([, a], [, b]) => b - a)[0]?.[0]
        : "None";

    return {
      total,
      completed,
      pending,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      weeklyTodos,
      monthlyTodos,
      mostCommonPriority,
      priorityStats,
    };
  }, [todos]);

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: Calendar,
      color: "blue",
      bgColor: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-500",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "green",
      bgColor: "from-green-50 to-green-100",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-500",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "yellow",
      bgColor: "from-yellow-50 to-yellow-100",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      borderColor: "border-yellow-500",
    },
    {
      title: "Completion Rate",
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: "purple",
      bgColor: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-500",
    },
    {
      title: "This Week",
      value: stats.weeklyTodos,
      icon: Target,
      color: "indigo",
      bgColor: "from-indigo-50 to-indigo-100",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      borderColor: "border-indigo-500",
    },
    {
      title: "This Month",
      value: stats.monthlyTodos,
      icon: AlertCircle,
      color: "pink",
      bgColor: "from-pink-50 to-pink-100",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      borderColor: "border-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Todo Statistics
          </h1>
          <p className="text-gray-600 text-lg">
            Track your productivity and progress
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${stat.borderColor} hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 ${stat.iconBg} rounded-full`}>
                    <IconComponent className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Priority Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Priority Breakdown
          </h2>

          {Object.keys(stats.priorityStats).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(stats.priorityStats).map(([priority, count]) => {
                const priorityColors = {
                  High: {
                    bg: "bg-red-100",
                    text: "text-red-800",
                    border: "border-red-200",
                  },
                  Medium: {
                    bg: "bg-yellow-100",
                    text: "text-yellow-800",
                    border: "border-yellow-200",
                  },
                  Low: {
                    bg: "bg-green-100",
                    text: "text-green-800",
                    border: "border-green-200",
                  },
                };

                const colors = priorityColors[priority] || {
                  bg: "bg-gray-100",
                  text: "text-gray-800",
                  border: "border-gray-200",
                };

                return (
                  <div
                    key={priority}
                    className={`${colors.bg} ${colors.border} border rounded-lg p-4 text-center`}
                  >
                    <h3 className={`font-semibold ${colors.text} mb-2`}>
                      {priority} Priority
                    </h3>
                    <p className={`text-2xl font-bold ${colors.text}`}>
                      {count}
                    </p>
                    <p className="text-sm text-gray-600">tasks</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No tasks available yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Create some tasks to see priority breakdown
              </p>
            </div>
          )}
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.completionRate}%</p>
              <p className="text-blue-100 text-sm">Overall Progress</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.weeklyTodos}</p>
              <p className="text-blue-100 text-sm">Tasks This Week</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.mostCommonPriority}</p>
              <p className="text-blue-100 text-sm">Most Common Priority</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.pending}</p>
              <p className="text-blue-100 text-sm">Tasks Remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
