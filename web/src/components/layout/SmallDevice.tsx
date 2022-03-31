import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

const SmallDevice: React.FC = () => {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      w="auto"
      style={{ height: "500px" }}
    >
      <Heading as="h3" fontSize="lg" fontWeight="medium" color="text.dark">
        Hey There! farmico doesn't work on mobile devices yet
      </Heading>
      <Heading
        as="h5"
        fontSize="md"
        fontWeight="normal"
        color="brand.main"
        mt="3"
      >
        ~ team farmico
      </Heading>
    </Flex>
  );
};

export default SmallDevice;
