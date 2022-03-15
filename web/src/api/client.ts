import { reLoginUserWithRefreshToken } from "@/utils/helpers";
import axios, { AxiosResponse } from "axios";

export const axiosCommunity = axios.create({
  baseURL: process.env.NEXT_PUBLIC_COMMUNITY_API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosCommunity.interceptors.request.use((config) => {
  return config;
});

axiosCommunity.interceptors.response.use((config) => {
  return config;
});

export const axiosModel = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MODEL_API_BASE_URL,
});

export const handleRequest = async <T>(
  apiHandler: (body?: T) => Promise<AxiosResponse>,
  body?: T
): Promise<AxiosResponse> => {
  try {
    return !body ? await apiHandler() : await apiHandler(body);
  } catch (error: any) {
    console.log({ refError: error });
    if (error.response.data.hasAccessTokenExpired) {
      // refresh the token and try calling helper again
      console.log("Refreshing new access token...");
      await reLoginUserWithRefreshToken();
      return !body ? await apiHandler() : await apiHandler(body);
    }
    throw error;
  }
};
