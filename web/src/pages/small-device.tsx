import { Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { ISubtitleProps } from "@/utils/types";

const SmallDevice: NextPage & ISubtitleProps = () => {
  const [currLocale, setCurrLocale] = useState<string>("en");
  const [topText, setTopText] = useState<string>(
    "Hey there! farmico doesn't work on mobile devices yet 😢"
  );
  const [bottomText, setBottomText] = useState<string>("~ team farmico");

  const toggle = () => {
    if (currLocale === "en") {
      setCurrLocale("mr");
      setTopText("अहो! फार्मिको अद्याप मोबाइल डिव्हाइसवर काम करत नाही 😢");
      setBottomText("~ टीम फार्मिको");
    } else if (currLocale === "mr") {
      setCurrLocale("hi");
      setTopText("फार्मिको अभी तक मोबाइल उपकरणों पर काम नहीं करता है 😢");
      setBottomText("~ टीम फ़ार्मिको");
    } else {
      setCurrLocale("en");
      setTopText("Hey there! farmico doesn't work on mobile devices yet 😢");
      setBottomText("~ team farmico");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      toggle();
    }, 2000);

    return () => clearInterval(interval);
  }, [currLocale]);

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      width="auto"
      height="100vh"
      p="0 2rem"
    >
      <motion.div
        key={bottomText}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: [0, 0.3, 0.5, 0.7, 1], y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Heading
          as="h3"
          fontSize="lg"
          fontWeight="medium"
          color="text.dark"
          textAlign="center"
        >
          {topText}
        </Heading>
        <Heading
          as="h5"
          fontSize="md"
          fontWeight="normal"
          color="brand.main"
          mt="3"
          textAlign="center"
        >
          {bottomText}
        </Heading>
      </motion.div>
    </Flex>
  );
};

SmallDevice.showLayout = false;

export default SmallDevice;
