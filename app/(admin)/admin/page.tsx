"use client";
import { DashboardOrd, DashboardRev } from "@/services/dashboardrev.service";
import React, { useState, useEffect } from "react";
import { dashboardOrdService } from "@/services/dashboardrev.service";
import { useAuthContext } from "@/hooks/useAuthContext";
import isAuth from "@/components/isAuth";

const Dashboard: React.FC = () => {
  const { state } = useAuthContext();
  const { user } = state;
  const [orders, setOrders] = useState<DashboardOrd>();
  const [revenue, setRevenue] = useState<DashboardRev>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getOrdersAndRevenue = async () => {
    try {
      setIsLoading(true);
      const [ordersResponse, revenueResponse] = await Promise.all([
        dashboardOrdService.getDashboardOrd(),
        dashboardOrdService.getDashboardRev(),
      ]);
      setOrders(ordersResponse.data);
      setRevenue(revenueResponse.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please try again later. " + err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrdersAndRevenue();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
        <p className="text-gray-700 font-semibold mb-4">Loading ...</p>
          <div className="spinner border-t-4 border-b-4 border-gray-900 w-16 h-16 rounded-full animate-spin "></div>
          
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            onClick={getOrdersAndRevenue}
            className="mt-4 bg-gray-500  text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="text-right">
        <h2 className="text-2xl text-right text-gray-800 font-semibold">
          Hello, <span className="font-bold text-black">{user?.firstName}</span>
        </h2>
      </div>

      <h1 className="text-black font-semibold mb-2">Orders</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">Today</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">
            {orders?.today || 0}
          </p>
          <p className="text-gray-400 mt-1">2 orders today</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">This Week</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">
            {orders?.thisWeek || 0}
          </p>
          <p className="text-gray-400 mt-1">12 orders this week</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">This Month</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">
            {orders?.thisMonth || 0}
          </p>
          <p className="text-gray-400 mt-1">32 orders this month</p>
        </div>
      </div>

      <h1 className="text-black font-semibold mb-2">Revenue</h1>
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">Today</h3>
          <p className="text-4xl font-semibold text-gray-900 mt-2">
            <span className="text-3xl">Rs. </span>
            {revenue?.todayRev || 0}
          </p>
          <p className="text-gray-400 mt-1">Revenue today</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">This Week</h3>
          <p className="text-4xl font-semibold text-gray-900 mt-2">
            <span className="text-3xl">Rs. </span>
            {revenue?.thisWeekRev || 0}
          </p>
          <p className="text-gray-400 mt-1">Revenue this week</p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold uppercase">This Month</h3>
          <p className="text-4xl font-semibold text-gray-900 mt-2">
            <span className="text-3xl">Rs. </span>
            {revenue?.thisMonthRev || 0}
          </p>
          <p className="text-gray-400 mt-1">Revenue this month</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold ">Total Orders</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">
            {orders?.totalOrders || 0}
          </p>
        </div>
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 text-center transition-transform hover:scale-105">
          <h3 className="text-gray-500 font-semibold ">Total Revenue</h3>
          <p className="text-4xl font-semibold text-gray-800 mt-2">
            <span className="text-3xl">Rs. </span>
            {revenue?.totalRev || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default isAuth(Dashboard, { allowedRoles: ["ADMIN"] });
