import { useStore } from "@/lib/store";

const useAppLoading = () => {
  const { appLoading, setAppLoading } = useStore((state) => state);
  return { appLoading, setAppLoading };
};

export default useAppLoading;
