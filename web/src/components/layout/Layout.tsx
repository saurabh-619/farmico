import ThemeSwitchButton from "@/elements/ThemeSwitchButton";
import { Box } from "@chakra-ui/react";
import React from "react";
import { Head } from "./Head";
import Navbar from "./Navbar";

interface ILayout {
  subtitle?: string;
}

const Layout: React.FC<ILayout> = ({ subtitle, children }) => {
  return (
    <Box
      minHeight="100vh"
      w="100%"
      pt={8}
      pb={16}
      px={12}
      mx="auto"
      className="layout-height"
    >
      <Head subtitle={subtitle} />
      <Navbar />
      {children}
      <Box position="fixed" right="12" bottom="5">
        <ThemeSwitchButton />
      </Box>
    </Box>
  );
};

export default Layout;
