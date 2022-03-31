import * as apiHelper from "@/api/api.helper";
import { handleRequest } from "@/api/client";
import AppAvatar from "@/elements/AppAvatar";
import useAppToast from "@/hooks/useAppToast";
import useLocale from "@/hooks/useLocale";
import * as appHelpers from "@/utils/helpers";
import { BlogType } from "@/utils/types";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface ISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const SearchModal: React.FC<ISearchModalProps> = ({ isOpen, onClose }: any) => {
  const { t } = useLocale();

  const { triggerErrorToast } = useAppToast();
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);

  const SearchResultCard = ({ result }: { result: BlogType }) => (
    <NextLink
      href={{
        pathname: `blogs/${result.slug}`,
      }}
      prefetch={true}
    >
      <Flex
        key={result._id}
        w="full"
        h="70px"
        bg="text.100"
        borderRadius="md"
        my="2"
        px="4"
        py="2"
        alignItems="center"
        className="cursor"
        _hover={{
          bg: "gray.200",
        }}
      >
        <AppAvatar src={result.author.profilePhoto} size={"40px"} />
        <Heading
          as="h3"
          fontWeight="medium"
          color="text.dark"
          fontSize="md"
          ml="3"
        >
          {result.title}
        </Heading>
      </Flex>
    </NextLink>
  );

  const searchBlog = async (newText: string) => {
    if (newText.length < 3) {
      setResults([]);
      return;
    }

    try {
      const res = await handleRequest(apiHelper.searchBlogs, newText);
      if (res?.data?.blogs?.length)
        // @ts-ignore
        setResults((prev) => res.data.blogs);
    } catch (error) {
      console.log({ error });
      triggerErrorToast("Error in the search", error);
    } finally {
    }
  };

  const handleSearchBlog = appHelpers.debounceAFunction(searchBlog, 750);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setText("");
        setResults([]);
      }}
    >
      <ModalOverlay />
      <ModalContent mt="24" w="50%" maxW="auto">
        <ModalBody w="full">
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            w="full"
          >
            {/* Search */}
            <Box display="flex" alignItems="center" w="full">
              <FiSearch size={22} color="brand.main" />
              <Input
                placeholder={t.search_blogs_with_atleast_3_char}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  handleSearchBlog(e.target.value);
                }}
                ml="4"
                variant="unstyled"
                fontSize="md"
                w="full"
                px="2"
                py="4"
              />
            </Box>
            {results?.length !== 0 && <Divider />}
            {/* Results */}
            {results?.length !== 0 && (
              <Box w="full">
                {results.map((result: BlogType) => (
                  <SearchResultCard result={result} />
                ))}
              </Box>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
