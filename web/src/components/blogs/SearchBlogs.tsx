import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";

const SearchBlogs = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <Flex
      alignItems="center"
      className="cursor"
      onClick={() => setModalOpen((p) => !p)}
    >
      <Heading as="h3" fontWeight={"normal"} fontSize="lg" color="brand.main">
        search
      </Heading>
      <Search2Icon color="brand.main" fontSize={"xl"} ml="3" />
    </Flex>
  );
};

export default SearchBlogs;
