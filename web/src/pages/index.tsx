import { BLOG_LOCALE_TYPE, ISubtitleProps, LocaleType } from "@/utils/types";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import * as appHelpers from "@/utils/helpers";

interface IHome {}

const Home: NextPage<IHome> & ISubtitleProps = () => {
  const [farmicoText, setFarmicoText] = useState<string>("farmico");

  const toggle = () => {
    if (farmicoText === "farmico") {
      setFarmicoText("फार्मिको");
    } else {
      setFarmicoText("farmico");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      toggle();
    }, 2000);

    return () => clearInterval(interval);
  }, [farmicoText]);

  return (
    <Box
      pos="absolute"
      top="0"
      left="0"
      zIndex={-1}
      h="100vh"
      w="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      id="home"
    >
      <Flex
        h="95%"
        w="75%"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          h="full"
          w="full"
          pos="absolute"
          className="home-mesh"
          zIndex={-1}
        />
        <Flex alignItems="center" justifyContent="flex-start" w="660px">
          <h3
            style={{
              fontWeight: "bold",
              fontSize: "3.5rem",
            }}
          >
            welcome to the
          </h3>
          <motion.h4
            key={farmicoText}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: [0, 0.3, 0.5, 0.7, 1], y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="home-brand-title"
          >
            {farmicoText}
            <Heading as="small" color="black">
              .
            </Heading>
          </motion.h4>
        </Flex>
        <Heading fontWeight="normal" fontSize="xl" mt="3">
          a community driven AI tool for precision farming
        </Heading>
      </Flex>
    </Box>
  );
};

Home.subtitle = "Home";

export default Home;
