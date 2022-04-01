import { queryClient } from "@/api/queryClient";
import AppLoader from "@/layout/AppLoader";
import Layout from "@/layout/Layout";
import RouteProgress from "@/layout/RouteProgress";
import { useStore } from "@/lib/store";
import "@/styles/globals.scss";
import { __dev__, __isServer__ } from "@/utils/constants";
import { globleStyles, theme } from "@/utils/themes";
import { ISubtitleProps } from "@/utils/types";
import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import "focus-visible/dist/focus-visible";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Head } from "@/components/layout/Head";
interface IMyApp {
  Component: AppProps["Component"] & ISubtitleProps;
  pageProps: any;
}

function MyApp({ Component, pageProps }: IMyApp) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isAnimating, setIsAnimating } = useStore((state) => state);

  const handleStart = () => setIsAnimating(true);
  const handleStop = () => setIsAnimating(false);

  useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  const routeToFirstPage = async () => {
    console.log(
      "%cI see! you're a dev, huh😎",
      "color:#fa4eab; font-size:30px"
    );
    if (!__isServer__ && window.innerWidth < 950) {
      await router.replace("/small-device");
    }
    setTimeout(() => setLoading(false), 1500);
  };

  useEffect(() => {
    routeToFirstPage();
  }, [__isServer__]);

  return loading ? (
    <>
      <Head />
      <AppLoader />
    </>
  ) : (
    <ChakraProvider theme={theme}>
      <Global styles={globleStyles} />
      <RouteProgress isAnimating={isAnimating} />
      {Component.showLayout === false ? (
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={__dev__} />
          <Component {...pageProps} />
        </QueryClientProvider>
      ) : (
        <Layout subtitle={Component.subtitle}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={__dev__} />
            <Component {...pageProps} />
          </QueryClientProvider>
        </Layout>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
