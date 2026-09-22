import {create} from "zustand";
import { getHomeData } from "../api/admin.api";
export const useAdminStore = create((set, get) => ({
  // Home page data
  Dashboard: null,
  loading: false,
  fetchDashBoard: async () => {
    set({
      loading: true,
    });
    try {
 
        const response = await getHomeData();
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
}));
