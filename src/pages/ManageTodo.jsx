import React from "react";
import { Card, Statistic } from "antd";
import { ClockAlert, ClipboardCheck, CircleCheckBig } from "lucide-react";
import { useSelector } from "react-redux";
import { StatsCard, TodoForm, TodoItems } from "../components";

const ManageTodo = () => {
  const todos = useSelector((state) => state.todos || []);

  const completedTodo = (todos || []).filter(
    (todo) => todo.completedTodo === true
  ).length;

  const totalTasks = todos.length;
  const pendingTasks = totalTasks - completedTodo;

  return (
    <div className="mt-10 w-[100%] md:max-w-7xl mx-auto p-6">
      <div className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
        Dashboard
      </div>
      <div className="flex w-full flex-col md:flex-row mx-auto text-center mt-10">
        <div className="flex md:flex-col w-full md:w-[20%] gap-1 items-center border-2 border-gray-200 py-5 rounded-md">
          <StatsCard
            title={"Total Task"}
            icon={<ClipboardCheck />}
            value={totalTasks}
            color={"text-blue-600"}
          />
          <StatsCard
            title={"Completed"}
            icon={<CircleCheckBig />}
            value={completedTodo}
            color={"text-green-500"}
          />
          <StatsCard
            title={"Pending"}
            icon={<ClockAlert />}
            value={pendingTasks}
            color={"text-orange-500"}
          />
        </div>

        <div className="flex flex-col flex-1 w-[100%] md:w-[70%] mt-8 md:mt-0 md:ml-8">
          <Card className="min-h-[400px]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-left">
              Todo Management
            </h2>
            <div className="flex flex-col p-3">
              <TodoForm />
              <div className="w-full mt-2 flex flex-col gap-3">
                {todos.map((todo) => (
                  <TodoItems
                    key={todo.id}
                    title={todo.todo}
                    priority={todo.priority}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageTodo;
