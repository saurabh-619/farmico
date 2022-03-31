import {
  DeleteCommentData,
  IBlogQueries,
  LoginDataType,
  PostBlogType,
  PostCommentData,
  PostModelResult,
  RegisterDataType,
  UpdateUserDataType,
} from "@/utils/types";
import { GetServerSidePropsContext } from "next";
import { axiosCommunity, axiosModel } from "./client";

// Auth
export const login = (loginData?: LoginDataType) =>
  axiosCommunity.post("/auth/login", loginData);

export const refreshToken = () => axiosCommunity.post("/auth/refresh-token");

export const register = (registerData?: RegisterDataType) =>
  axiosCommunity.post("/auth/register", registerData);

export const logout = () => axiosCommunity.delete("/auth/logout");

// User
export const loggedInUser = () => axiosCommunity.get("/user/me");

export const getAUser = ({
  id,
  context,
}: {
  id: string;
  context: GetServerSidePropsContext<any, any>;
}) =>
  axiosCommunity.get(`/user/${id}`, {
    headers: { Cookie: context.req.headers.cookie || "" },
  });

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
  return axiosCommunity.get(`/blogs/slug/${slug}`);
};

export const getUsersBlog = () => {
  return axiosCommunity.get(`/blogs/user`);
};

export const searchBlogs = (text?: string) => {
  return axiosCommunity.get(`blogs/search?text=${text}`, {
    params: { limit: 5 },
  });
};

export const voteABlog = (blogId?: string) => {
  return axiosCommunity.put(`/blogs/vote/${blogId}`);
};

export const postABlog = (postBlogData?: PostBlogType) => {
  return axiosCommunity.post(`/blogs`, { ...postBlogData });
};

export const updateABlog = (updateBlogData?: PostBlogType) => {
  const id = new String(updateBlogData?._id);
  delete updateBlogData?._id;
  return axiosCommunity.put(`/blogs/${id}`, updateBlogData);
};

export const deleteBlog = (id?: string) => {
  return axiosCommunity.delete(`/blogs/${id}`);
};

export const postAComment = (postCommentData?: PostCommentData) => {
  return axiosCommunity.put(`/blogs/comment/${postCommentData?.blogId}`, {
    body: postCommentData?.body,
  });
};

export const deleteAComment = (deleteCommentData?: DeleteCommentData) => {
  return axiosCommunity.delete(
    `/blogs/comment/${deleteCommentData?.blogId}/${deleteCommentData?.commentId}`
  );
};

// Results
export const getResult = ({
  id,
  context,
}: {
  id: string;
  context: GetServerSidePropsContext<any, any>;
}) => {
  return axiosCommunity.get(`/results/${id}`, {
    headers: { Cookie: context.req.headers.cookie || "" },
  });
};

export const getResults = () => {
  return axiosCommunity.get(`/results`);
};

export const deleteResult = (id?: string) => {
  return axiosCommunity.delete(`/results/${id}`);
};

// Models
export const helloModels = () => {
  return axiosModel.get("/");
};

export const plantDiseaseDetection = (plantDiseaseDetectionData: any) => {
  return axiosModel.post("/plant-disease", plantDiseaseDetectionData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const weedDetection = (weedDetectionData: any) => {
  return axiosModel.post("/weed-detection", weedDetectionData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const postADiseaseResult = (resultData?: PostModelResult) => {
  return axiosCommunity.post("/results", resultData);
};

export const postAWeedResult = (resultData?: PostModelResult) => {
  return axiosCommunity.post("/results", resultData);
};
