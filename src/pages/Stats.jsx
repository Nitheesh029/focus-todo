import React from "react";
import { useSelector } from "react-redux";
import { Calendar, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

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

  // Chart Data
  const priorityData = {
    labels: Object.keys(stats.priorityStats),
    datasets: [
      {
        data: Object.values(stats.priorityStats),
        backgroundColor: ["#f87171", "#fbbf24", "#34d399", "#9ca3af"], // Red, Yellow, Green, Gray
        borderWidth: 1,
      },
    ],
  };

  const taskStatusData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [stats.completed, stats.pending],
        backgroundColor: ["#22c55e", "#eab308"], // Green, Yellow
      },
    ],
  };

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: Calendar,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-500",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-500",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      borderColor: "border-yellow-500",
    },
    {
      title: "Completion Rate",
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-500",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Priority Overview
          </h2>

          {Object.keys(stats.priorityStats).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(stats.priorityStats).map(([priority, count]) => {
                const priorityColors = {
                  High: {
                    bg: "bg-red-50",
                    text: "text-red-700",
                    accent: "text-red-600",
                  },
                  Medium: {
                    bg: "bg-yellow-50",
                    text: "text-yellow-700",
                    accent: "text-yellow-600",
                  },
                  Low: {
                    bg: "bg-green-50",
                    text: "text-green-700",
                    accent: "text-green-600",
                  },
                };

                const colors = priorityColors[priority] || {
                  bg: "bg-gray-50",
                  text: "text-gray-700",
                  accent: "text-gray-600",
                };

                return (
                  <div
                    key={priority}
                    className={`${colors.bg} rounded-lg p-6 text-center`}
                  >
                    <h3
                      className={`font-medium ${colors.text} mb-2 text-sm uppercase tracking-wide`}
                    >
                      {priority} Priority
                    </h3>
                    <p className={`text-3xl font-bold ${colors.accent} mb-1`}>
                      {count}
                    </p>
                    <p className="text-sm text-gray-500">
                      {count === 1 ? "task" : "tasks"}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto" />
              </div>
              <p className="text-gray-500 text-lg mb-2">
                No tasks available yet
              </p>
              <p className="text-gray-400 text-sm">
                Create some tasks to see your priority breakdown
              </p>
            </div>
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Priority Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Priority Distribution
            </h2>
            {Object.keys(stats.priorityStats).length > 0 ? (
              <Pie data={priorityData} />
            ) : (
              <p className="text-gray-500 text-center">No data available</p>
            )}
          </div>

          {/* Completed vs Pending Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Task Status
            </h2>
            {stats.total > 0 ? (
              <Bar data={taskStatusData} />
            ) : (
              <p className="text-gray-500 text-center">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
