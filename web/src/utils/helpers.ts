import { en, hi, mr } from "../locales";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import * as apiHelper from "@/api/api.helper";
import { LocaleType } from "./types";

export const getLocal = (local: string | undefined) => {
  if (local === "en") return en;
  if (local === "mr") return mr;
  if (local === "hi") return hi;
};

export const isTokenExpired = (token: string | undefined) => {
  if (!token || token === "undefined") return true;
  const decodedToken = jwtDecode(token);
  return decodedToken?.exp * 1000 < Date.now();
};

export const reLoginUserWithRefreshToken = async () => {
  try {
    const {
      data: { accessToken },
      status,
    } = await apiHelper.refreshToken();
    localStorage.setItem("accessToken", accessToken);
    return status === 200 ? accessToken : {};
  } catch (error: any) {
    console.log({ myerror: error });
    localStorage.removeItem("accessToken");
    if (error.response.data.hasRefreshTokenExpired) {
      window.location.href = "/login";
    }
    return { error };
  }
};

export const getDateString = (date: string) => {
  return dayjs(date).format("DD MMM YYYY");
};

export const getDateTimeString = (date: string) => {
  return dayjs(date).format("DD MMM YYYY, h:mm A");
};

export const timeAgo = (date: string) => {
  return dayjs(date).fromNow();
};

export const getLocaleString = (locale: LocaleType) => {
  if (locale === "en") return "english";
  if (locale === "mr") return "मराठी";
  return "हिंदी";
};
