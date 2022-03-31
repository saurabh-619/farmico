import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { css } from "@emotion/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    main: "#fa4eab",
    200: "#ffedf7",
    300: "#fecae6",
    400: "#fda7d5",
    500: "#fc83c4",
    600: "#fb60b3",
    700: "#c83e89",
    800: "#962f67",
    900: "#4b1733",
  },
  // primary: {
  //   main: "#fa4eab",
  // },
  secondary: {
    main: "#FFF2F9",
  },
  bg: {
    main: "#fff2f9",
  },
  "dark-bg": {
    main: "#323232",
  },
  success: {
    400: "#48BB78",
  },
  danger: {
    400: "#F56565",
  },
  black: {
    main: "#000",
  },
  white: {
    main: "#fff",
  },
  text: {
    50: "#f7fafc",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    main: "#000",
    lighter: "#A0AEC0",
    light: "#718096",
    dark: "#4A5568",
  },
  "dark-text": {
    main: "#fff",
  },
};

const fonts = {
  heading: "Inter, sans-serif",
  body: "Inter, sans-serif",
};

export const theme = extendTheme({ config, colors, fonts });

export const globleStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;
