import { Heading, Flex } from "@chakra-ui/react";
import React from "react";

interface ISomethingWentWrong {
  w?: string;
  h?: string;
  text?: string;
  subtitle?: string;
}

const SomethingWentWrong: React.FC<ISomethingWentWrong> = ({
  h = "70%",
  w = "full",
  text = "something went wrong",
  subtitle = "",
}) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      w={w}
      h={h}
    >
      <Heading as="h3" fontWeight="medium" fontSize="3xl">
        {text}
      </Heading>
      <Heading
        as="h3"
        fontWeight="normal"
        fontSize="md"
        mt="3"
        color="text.400"
      >
        {subtitle}
      </Heading>
    </Flex>
  );
};

export default SomethingWentWrong;
