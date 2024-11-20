import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-right">
        <h2 className="text-2xl text-right text-gray-800 font-semibold">
          Hello, <span className="font-bold text-black">Ashen</span>
        </h2>
      </div>

      <h1 className="text-black font-semibold mb-2">Orders</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">Today</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">32</p>
          <p className="text-gray-400 mt-1">2 orders today</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">This Week</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">12</p>
          <p className="text-gray-400 mt-1">12 orders this week</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">This Month</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">32</p>
          <p className="text-gray-400 mt-1">32 orders this month</p>
        </div>
      </div>

      <h1 className="text-black font-semibold mb-2">Revenue</h1>
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">Today</h3>
          <p className="text-4xl font-semibold text-gray-900 mt-2">$85,765</p>
          <p className="text-gray-400 mt-1">Revenue today</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">This Week</h3>
          <p className="text-4xl font-semibold text-gray-900 mt-2">$226,600</p>
          <p className="text-gray-400 mt-1">Revenue this week</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">This Month</h3>
          <p className="text-4xl font-semibold text-gray-900 mt-2">$230,093</p>
          <p className="text-gray-400 mt-1">Revenue this month</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold ">Total Orders</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">5,000</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold ">Total Revenue</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">$1,000,000</p>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
