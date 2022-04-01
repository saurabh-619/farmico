import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";

const AppLoader = () => {
  const logoVariant = {
    initial: {
      y: 0,
      rotate: 0,
    },
    animate: {
      y: 40,
      rotate: 360,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <div className="app-loader">
      <motion.img
        src="/logo-1.svg"
        // @ts-ignore
        variants={logoVariant}
        initial="initial"
        animate="animate"
      />
      <h3>farmico ...</h3>
    </div>
  );
};

export default AppLoader;
