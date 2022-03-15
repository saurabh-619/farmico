export const __dev__ = process.env.NODE_ENV === "development";
export const __isServer__ = typeof window === "undefined";

// Routes
export const ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  ME: "/user/me",
  UPDATE_PROFILE: "/user/update-profile",
  USERNAME: "/user/username",
  GET_BLOGS: "/blogs",
};
