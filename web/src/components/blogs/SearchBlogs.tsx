import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import SearchModal from "./SearchModal";

const SearchBlogs = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex alignItems="center">
      <Flex alignItems="center" className="cursor" onClick={onOpen}>
        <Search2Icon color="brand.main" fontSize={"xl"} />
        <SearchModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      </Flex>
      <NextLink passHref prefetch href={`/create/blog`}>
        <Box
          h="9"
          w="9"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="gray.200"
          className={`cursor`}
          ml="4"
          _hover={{
            bg: "gray.100",
          }}
        >
          <Icon as={AddIcon} fontSize="md" color={"success.400"} />
        </Box>
      </NextLink>
    </Flex>
  );
};

export default SearchBlogs;
