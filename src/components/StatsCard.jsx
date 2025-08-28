import React from "react";

const StatsCard = ({ title, icon, value, color }) => {
  return (
    <div
      className={`w-[70%] md:border-b-2 border-gray-200 text-center font-semibold md:text-lg flex item-center justify-center flex-col gap-2 md:rounded-full cursor-pointer py-2 md:p-3 ${color} hover:border-b-10 hover:border-slate-900 transition-all `}
    >
      <span className="text-md text-gray-900">{title}</span>
      <div className="flex gap-1 md:gap-2 w-full justify-center text-lg md:items-center">
        <span>{value}</span>
        <span>{icon}</span>
      </div>
    </div>
  );
};

export default StatsCard;
