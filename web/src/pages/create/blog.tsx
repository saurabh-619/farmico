import React, { useState } from "react";
import { NextPage } from "next";
import { Box, Flex, Input } from "@chakra-ui/react";
import { ISubtitleProps } from "@/utils/types";
import TextEditor from "@/components/blog/TextEditor";
import AppButton from "@/elements/AppButton";
import LocaleToggle from "@/components/blog/LocaleToggle";

const CreateBlog: NextPage & ISubtitleProps = () => {
  const [content, setContent] = useState("");

  const createBlog = () => {
    console.log({ content });
  };

  return (
    <Box w="60%" mx="auto" mt="1">
      <Input
        px="0"
        py="8"
        borderColor="gray.100"
        focusBorderColor="gray.600"
        borderRadius="2px"
        id="title"
        placeholder="enter your title here ..."
        name="title"
        // value={username}
        // onChange={checkIfUsernameAvailble}
        fontWeight="semibold"
        fontSize="3xl"
        border="none"
        _focus={{
          outline: "none",
        }}
      />
      <Input
        px="0"
        py="6"
        borderColor="gray.100"
        focusBorderColor="gray.600"
        borderRadius="2px"
        id="subtitle"
        placeholder="subtitle"
        name="subtitle"
        // value={username}
        // onChange={checkIfUsernameAvailble}
        fontWeight="medium"
        fontSize="xl"
        border="none"
        _focus={{
          outline: "none",
        }}
        mb="3"
      />
      <TextEditor setContent={setContent} />
      <Flex justifyContent="flex-end">
        <Flex alignItems="center">
          <LocaleToggle />
          <AppButton text="publish" variant="solid" ml="5" />
        </Flex>
      </Flex>
    </Box>
  );
};

CreateBlog.subtitle = "Create blog";

export default CreateBlog;
