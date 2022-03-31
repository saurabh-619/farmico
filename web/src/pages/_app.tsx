import Layout from "@/layout/Layout";
import "@/styles/globals.scss";
import { globleStyles, theme } from "@/utils/themes";
import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import "focus-visible/dist/focus-visible";
import type { AppProps } from "next/app";
import { Hydrate, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "@/api/queryClient";
import { __dev__, __isServer__ } from "@/utils/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import RouteProgress from "@/layout/RouteProgress";
import { useStore } from "@/lib/store";
import SmallDevice from "@/layout/SmallDevice";
interface IMyApp {
  Component: AppProps["Component"] & { subtitle?: string };
  pageProps: any;
}

function MyApp({ Component, pageProps }: IMyApp) {
  const router = useRouter();
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

  return (
    <ChakraProvider theme={theme}>
      <Global styles={globleStyles} />
      <RouteProgress isAnimating={isAnimating} />
      <Layout subtitle={Component.subtitle}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={__dev__} />
          {!__isServer__ && window.innerWidth < 950 ? (
            <SmallDevice />
          ) : (
            <Component {...pageProps} />
          )}
        </QueryClientProvider>
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
