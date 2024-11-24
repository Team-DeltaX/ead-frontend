"use client";
import { DashboardOrd, DashboardRev } from "@/services/dashboardrev.service";
import React, { useState, useEffect } from "react";
import { dashboardOrdService } from "@/services/dashboardrev.service";

const Dashboard: React.FC = () => {

  const[orders, setOrders] = useState<DashboardOrd>();
  const[revenue, setRevenue] = useState<DashboardRev>();
  const[isLoading, setIsLoading] = useState<boolean>(true);
  const[error, setError] = useState<string | null>(null);

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const response = await dashboardOrdService.getDashboardOrd();
      setOrders(response.data);
      console.log(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }
  const getRevenue = async () => {
    try {
      setIsLoading(true);
      const response = await dashboardOrdService.getDashboardRev();
      setRevenue(response.data);
      console.log(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch revenue. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getOrders();
    getRevenue();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="text-right">
        <h2 className="text-2xl text-right text-gray-800 font-semibold">
          Hello, <span className="font-bold text-black">Ashen</span>
        </h2>
      </div>

      <h1 className="text-black font-semibold mb-2">Orders</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">Today</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">{orders?.today}</p>
          <p className="text-gray-400 mt-1">2 orders today</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">This Week</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">{orders?.thisWeek}</p>
          <p className="text-gray-400 mt-1">12 orders this week</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">This Month</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">{orders?.thisMonth}</p>
          <p className="text-gray-400 mt-1">32 orders this month</p>
        </div>
      </div>

      <h1 className="text-black font-semibold mb-2">Revenue</h1>
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">Today</h3>
          <p className="text-4xl font-semibold text-gray-900 mt-2">${revenue?.TodayRev}</p>
          <p className="text-gray-400 mt-1">Revenue today</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">This Week</h3>
          <p className="text-4xl font-semibold text-gray-900 mt-2">${revenue?.ThisWeekRev}</p>
          <p className="text-gray-400 mt-1">Revenue this week</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">This Month</h3>
          <p className="text-4xl font-semibold text-gray-900 mt-2">${revenue?.ThisMonthRev}</p>
          <p className="text-gray-400 mt-1">Revenue this month</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold ">Total Orders</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">{orders?.totalOrders}</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold ">Total Revenue</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">${revenue?.TotalRev}</p>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
