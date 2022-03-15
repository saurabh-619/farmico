import * as apiHelper from "@/api/api.helper";
import useAppLoading from "@/hooks/useAppLoading";
import useAppToast from "@/hooks/useAppToast";
import useUser from "@/hooks/useUser";
import { isTokenExpired, reLoginUserWithRefreshToken } from "@/utils/helpers";
import { UserType } from "@/utils/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent: NextPage<any>) => {
  const isUserLoggedIn = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const isExpired = isTokenExpired(accessToken!);
    if (isExpired) {
      const { error } = await reLoginUserWithRefreshToken();
      return error === undefined;
    }
    return true;
  };

  const getUserInfo = async (
    setUser: (user: UserType) => void,
    setAppLoading: (appLoading: boolean) => void
  ) => {
    try {
      let userData;
      const { data, status } = await apiHelper.loggedInUser();
      userData = data.user;
      if (status === 401 && data.hasAccessTokenExpired) {
        const { data } = await reLoginUserWithRefreshToken();
        userData = data.user;
      }
      setUser(userData);
    } catch (error) {
      localStorage.removeItem("accessToken");
      console.log({ error: error.message });
    } finally {
      setAppLoading(false);
    }
  };

  return (props: any) => {
    const [verified, setVerified] = useState(false);
    const router = useRouter();
    const { user, setUser, isAuthenticated } = useUser();
    const { triggerToast } = useAppToast();
    const { setAppLoading } = useAppLoading();

    const checkIfLoggedIn = async () => {
      if (!(await isUserLoggedIn())) {
        router.replace("/login");
        triggerToast(
          "Unauthenticated request!",
          "Please login again. Session expired",
          "error"
        );
      } else {
        if (!user) {
          setAppLoading(true);
          getUserInfo(setUser, setAppLoading);
        }
        setVerified(true);
      }
    };

    useEffect(() => {
      checkIfLoggedIn();
    }, [isAuthenticated, verified]);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      // logout();
      return "not authenticated";
    }
  };
};

export default withAuth;
