import * as apiHelper from "@/api/api.helper";
import { StoreState } from "@/lib/store";
import { SetState } from "zustand";

export const storeLogout = async (set: SetState<StoreState>) => {
  try {
    localStorage.removeItem("accessToken");
    await apiHelper.logout();
    set({ isAuthenticated: false, user: null });
  } catch (err) {
    console.log({ err });
  }
};
