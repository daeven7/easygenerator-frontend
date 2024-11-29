import api from "../config/axiosConfig";

export const appService = {
  getData: async (): Promise<void> => {
    // const { data } = await api.post<Token>("/auth/signup", {
    //   ...userInfo,
    // });

    // console.log("inside authservice signup", data);
    // localStorage.setItem("accessToken", data.accessToken);
    // localStorage.setItem("refreshToken", data.refreshToken);

    // const { data } = await api.get<void>("/auth/health");
    const { data } = await api.get<void>("/dashboard/data");

    console.log(" inside health service", data);
    return data;
  },
};
