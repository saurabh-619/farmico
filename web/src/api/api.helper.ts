import {
  IBlogQueries,
  LoginDataType,
  RegisterDataType,
  UpdateUserDataType,
} from "@/utils/types";
import { axiosCommunity } from "./client";

// Auth
export const login = (loginData?: LoginDataType) =>
  axiosCommunity.post("/auth/login", loginData);

export const refreshToken = () => axiosCommunity.post("/auth/refresh-token");

export const register = (registerData?: RegisterDataType) =>
  axiosCommunity.post("/auth/register", registerData);

export const logout = () => axiosCommunity.delete("/auth/logout");

// User
export const loggedInUser = () => axiosCommunity.get("/user/me");

export const updateUser = (updateInfo?: UpdateUserDataType) =>
  axiosCommunity.put("/user/update-profile", updateInfo);

export const checkIfUsernameAvailable = (username?: string) =>
  axiosCommunity.get(`/user/username?value=${username}`);

// Blogs
export const getBlogs = (queryData?: IBlogQueries) => {
  const { page, limit, sortBy, order } = queryData!;
  return axiosCommunity.get(
    `/blogs?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`
  );
};

export const getBlog = (slug?: string) => {
  return axiosCommunity.get(`/blogs/slug`, { data: { slug } });
};
