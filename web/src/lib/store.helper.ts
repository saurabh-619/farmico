import { SetState } from "zustand";
import { StoreState } from "@/lib/store";
import * as apiHelper from "@/api/api.helper";

export const storeLogout = async (set: SetState<StoreState>) => {
  try {
    localStorage.removeItem("accessToken");
    await apiHelper.logout();
    set({ isAuthenticated: false, user: null });
  } catch (err) {
    console.log({ err });
  }
};
