import { create } from "zustand";
import {
  getHomeDataAPI
} from "../Api/Dashboard.api.js"
export const useDashboardStore = create((set, get) => ({
 // Home page data
  Dashboard: null,
  loading:false,
    fetchDashBoard: async () => {
    set({
      loading: true,
    });
    try {
      const response = await getHomeDataAPI();
      set({
        Dashboard: response,
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
      });
      console.error(`error at fetchDashBoard ${error}`);
    }
  },
}))