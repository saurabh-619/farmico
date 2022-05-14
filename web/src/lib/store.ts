import { UserType } from "@/utils/types";
import create from "zustand";
import { devtools } from "zustand/middleware";
import * as storeHelpers from "./store.helper";

export interface StoreState {
  isAuthenticated: boolean;
  user: Partial<UserType> | null;
  appLoading: boolean;
  // locale: localeType;
  // locales: localesType;
  setAppLoading: (appLoadingState: boolean) => void;
  setIsAuthenticated: (authState: boolean) => void;
  // setCurrentLocale: (locale: localeType) => void;
  setUser: (user: UserType) => void;
  logout: () => void;

  // Route loading
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
}

const initialState = {
  isAuthenticated: false,
  user: null,
  appLoading: false,
  // locale: "en",
  // locales: ["en", "mr", "hi"],

  // Route loading
  isAnimating: false,
};

export const useStore = create<StoreState>(
  devtools((set) => ({
    ...initialState,
    setAppLoading: (appLoadingState: boolean) => {
      set({ appLoading: appLoadingState });
    },
    setIsAuthenticated: (authState: boolean) => {
      set({ isAuthenticated: authState });
    },
    setUser: (userData: Partial<UserType>) => {
      const user = {
        _id: userData._id,
        isAdmin: userData.isAdmin ?? false,
        name: userData.name,
        email: userData.email,
        username: userData.username,
        profilePhoto: userData.profilePhoto,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      };
      set({ user, isAuthenticated: true });
    },
    // setCurrentLocale: (locale: localeType) => {
    //   set({ locale });
    // },
    logout: () => storeHelpers.storeLogout(set),

    // Route loading
    setIsAnimating: (isAnimating) => set(() => ({ isAnimating })),
  }))
);
