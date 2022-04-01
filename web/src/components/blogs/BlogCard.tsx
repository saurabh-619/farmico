import AppAvatar from "@/elements/AppAvatar";
import AppStatElement from "@/elements/AppStatElement";
import useLocale from "@/hooks/useLocale";
import * as appHelpers from "@/utils/helpers";
import { BlogType } from "@/utils/types";
import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FiBook } from "react-icons/fi";

interface IBlogCard {
  blog: BlogType;
}

const BlogCard: React.FC<IBlogCard> = ({ blog }) => {
  const { t } = useLocale();

  return (
    <NextLink
      href={{
        pathname: `blogs/${blog.slug}`,
      }}
      prefetch={true}
    >
      <Box
        className="cursor"
        minH="250px"
        w="100%"
        my="2"
        boxShadow="md"
        py="5"
        px="7"
        borderRadius="5px"
        borderTop="1px"
        borderColor="gray.100"
      >
        {/* Header */}
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" className="left">
            <AppAvatar
              src={blog.author.profilePhoto}
              size="45px"
              isAdmin={blog.author.isAdmin}
              right="-4px"
              bottom="0px"
            />
            <Flex mx="3" direction="column">
              <Heading
                as="h4"
                fontWeight="medium"
                fontSize="sm"
                color="text.dark"
              >
                {blog.author.name}
              </Heading>
              <Heading
                as="h4"
                fontWeight="normal"
                fontSize="xs"
                color="text.lighter"
              >
                {appHelpers.timeAgo(blog.createdAt)}
              </Heading>
            </Flex>
          </Flex>
          <Box className="right">
            <Flex alignItems="center" justifyContent="center" mr="3">
              <Icon as={FiBook} fontSize="md" color="text.lighter" mr="2" />
              <Heading fontWeight="medium" fontSize="xs" color="text.lighter">
                {blog.readTime} {t.mins_read}
              </Heading>
            </Flex>
          </Box>
        </Flex>
        {/* Body */}
        <Box my="5">
          <Heading as="h3" fontWeight="medium" fontSize="lg">
            {blog.title}
          </Heading>
          <Heading
            as="h4"
            fontWeight="normal"
            fontSize="sm"
            color="text.light"
            mt="2"
            lineHeight="1.5rem"
          >
            {blog.bodyPreview.length > 300
              ? `${blog.bodyPreview.substring(0, 300)}....`
              : blog.bodyPreview}
          </Heading>
        </Box>
        {/* Footer */}
        <Flex alignItems="center" justifyContent="flex-start">
          <AppStatElement stat={blog.likesCount} isLike mr="3" />
          <AppStatElement stat={blog.commentsCount} />
        </Flex>
      </Box>
    </NextLink>
  );
};

export default BlogCard;
