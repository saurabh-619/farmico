import Layout from "@/layout/Layout";
import "@/styles/globals.scss";
import { globleStyles, theme } from "@/utils/themes";
import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import "focus-visible/dist/focus-visible";
import type { AppProps } from "next/app";

interface IMyApp {
  Component: AppProps["Component"] & { subtitle?: string };
  pageProps: any;
}

function MyApp({ Component, pageProps }: IMyApp) {
  return (
    <ChakraProvider theme={theme}>
      <Global styles={globleStyles} />
      <Layout subtitle={Component.subtitle}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
