import React from "react";

const StatsCard = ({ title, icon, value, color }) => {
  return (
    <div
      className={`w-[70%] border-b-2 border-gray-200 text-center font-semibold text-lg flex item-center justify-center flex-col gap-2 rounded-full cursor-pointer p-3 ${color} hover:border-b-10 hover:border-slate-900 transition-all`}
    >
      <span className="text-md text-gray-900">{title}</span>
      <div className="flex gap-2 w-full justify-center">
        <span>{value}</span>
        <span>{icon}</span>
      </div>
    </div>
  );
};

export default StatsCard;
