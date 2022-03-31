import { en, hi, mr } from "../locales";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/mr";
import "dayjs/locale/hi";

import * as apiHelper from "@/api/api.helper";
import { LocaleType } from "./types";
import { fStorage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { __isServer__ } from "./constants";

export const getLocal = (local: string | undefined) => {
  if (local === "en") return en;
  if (local === "mr") return mr;
  if (local === "hi") return hi;
};

export const isTokenExpired = (token: string | undefined) => {
  if (!token || token === "undefined") return true;
  const decodedToken = jwtDecode(token);
  // @ts-ignore
  return decodedToken?.exp * 1000 < Date.now();
};

export const reLoginUserWithRefreshToken = async () => {
  try {
    const {
      data: { accessToken },
      status,
    } = await apiHelper.refreshToken();
    if (!__isServer__) localStorage.setItem("accessToken", accessToken);
    return status === 200 ? accessToken : {};
  } catch (error: any) {
    console.log({ myerror: error });
    if (!__isServer__) {
      localStorage.removeItem("accessToken");
      if (error.response.data.hasRefreshTokenExpired) {
        window.location.href = "/login";
      }
    }
    return { error };
  }
};

export const reLoginUserWithRefreshTokenServer = async () => {
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

export const getDateString = (date: string, locale = "en") => {
  return dayjs(date).locale(locale).format("MMM DD, YYYY");
};

export const getDateTimeString = (date: string, locale = "en") => {
  return dayjs(date).locale(locale).format("DD MMM YYYY, h:mm A");
};

export const timeAgo = (date: string) => {
  return dayjs(date).fromNow();
};

export const getLocaleString = (locale: LocaleType) => {
  if (locale === "en") return "english";
  if (locale === "mr") return "मराठी";
  return "हिंदी";
};

export const uploadModelInputToFirebase = async (
  imgFile: Blob,
  pathOnFirebase: string
) => {
  const storageRef = ref(fStorage, pathOnFirebase);
  const snap = await uploadBytesResumable(storageRef, imgFile);
  const url = await getDownloadURL(storageRef);

  // console.log({ snap });
  return url;
};

export const debounceAFunction = (cb: Function, delay = 500) => {
  return (...args: any[]) => {
    setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export const scrollToBottom = () => {
  if (!__isServer__) {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    // window.scrollTo(0, document.body.scrollHeight, "smooth");
  }
};
