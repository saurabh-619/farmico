import { useStore } from "@/lib/store";
import React from "react";

const useAppLoading = () => {
  const { appLoading, setAppLoading } = useStore((state) => state);
  return { appLoading, setAppLoading };
};

export default useAppLoading;
