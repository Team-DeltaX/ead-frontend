import axiosInstance from "./axiosInstance";

export interface DashboardRev {
  totalRev: number;
  todayRev: number;
  thisWeekRev: number;
  thisMonthRev: number;
}

export interface DashboardOrd {
  totalOrders: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

export const dashboardOrdService = {
  getDashboardOrd: async () => {
    const response = await axiosInstance.get("/orders/stat");
    return response.data;
  },
  getDashboardRev: async () => {
    const response = await axiosInstance.get("/orders/revstat");
    return response.data;
  },
};
