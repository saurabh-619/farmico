import * as apiHelpers from "@/api/api.helper";
import { handleRequest } from "@/api/client";
import AppActionIcon from "@/elements/AppActionIcon";
import AppCancelModal from "@/elements/AppCancelModal";
import AppDate from "@/elements/AppDate";
import AppStatElement from "@/elements/AppStatElement";
import useAppToast from "@/hooks/useAppToast";
import useLocale from "@/hooks/useLocale";
import { BlogType } from "@/utils/types";
import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface BlogCardProps {
  blog: Partial<BlogType>;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { t } = useLocale();
  const { triggerToast, triggerErrorToast } = useAppToast();
  const { onClose, onOpen, isOpen } = useDisclosure();

  const handleDelete = async () => {
    try {
      const { data } = await handleRequest(apiHelpers.deleteBlog, blog._id);
      if (data.ok) {
        triggerToast(t.success, t.blog_deleted_successfully);
      }
    } catch (error) {
      console.log({ error });
      triggerErrorToast(t.delete_failed, error);
    }
  };

  return (
    <Box
      h="170px"
      w="90%"
      p="4"
      border="1px"
      borderColor="text.200"
      borderRadius="sm"
      my="3"
      display="flex"
      flexDir="column"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      {/* Header */}
      <Flex
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <NextLink passHref prefetch={true} href={`/blogs/${blog.slug}`}>
          <Heading
            as="h3"
            fontWeight="medium"
            fontSize="lg"
            mr="4"
            className="cursor"
            color="brand.main"
            _hover={{ opacity: 0.85 }}
          >
            {blog.title}
          </Heading>
        </NextLink>
        {/* actions */}
        <Flex alignItems="center">
          <NextLink passHref href={`/blogs/edit/${blog.slug}`}>
            <Link>
              <AppActionIcon
                icon={FiEdit}
                iconClassName="app-action-icon-edit"
              />
            </Link>
          </NextLink>
          <Box onClick={onOpen}>
            <AppActionIcon
              icon={FiTrash2}
              iconClassName="app-action-icon-delete"
            />
            <AppCancelModal
              isOpen={isOpen}
              onClose={onClose}
              onAccept={handleDelete}
            />
          </Box>
        </Flex>
      </Flex>
      {/* Body */}
      <Heading
        as="h4"
        fontWeight="normal"
        fontSize="sm"
        color="text.dark"
        mt="0"
        lineHeight="1.5rem"
        w="90%"
      >
        {blog && blog.bodyPreview && blog.bodyPreview?.length > 250
          ? `${blog.bodyPreview.substring(0, 250)}....`
          : blog.bodyPreview}
      </Heading>
      {/* Footer */}
      <Flex alignItems="center" mt="4">
        <AppStatElement stat={blog.likesCount || 0} isLike={true} />
        <AppStatElement stat={blog.commentsCount || 0} ml="4" />
        <AppDate
          date={blog.createdAt!}
          isTimeString={true}
          size="sm"
          weight="normal"
          color="text.lighter"
          ml="4"
        />
      </Flex>
    </Box>
  );
};

export default BlogCard;
