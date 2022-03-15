import { useStore } from "@/lib/store";

const useUser = () => {
  const { isAuthenticated, user, setUser, setIsAuthenticated, logout } =
    useStore((state) => state);
  return { isAuthenticated, user, setUser, setIsAuthenticated, logout };
};

export default useUser;
