import api from "../config/axiosConfig";
import { ENDPOINTS } from "../utils/constants.utils";

export const dashboardService = {
  getData: async (): Promise<void> => {
    const { data } = await api.get<void>(ENDPOINTS.GET_DASHBOARD_DATA);
    return data;
  },
};
