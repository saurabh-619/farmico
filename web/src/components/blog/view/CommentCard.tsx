import AppActionIcon from "@/elements/AppActionIcon";
import AppAvatar from "@/elements/AppAvatar";
import AppBadge from "@/elements/AppBadge";
import AppCancelModal from "@/elements/AppCancelModal";
import useLocale from "@/hooks/useLocale";
import useUser from "@/hooks/useUser";
import * as appHelpers from "@/utils/helpers";
import { CommentType } from "@/utils/types";
import { Box, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FiTrash2 } from "react-icons/fi";

interface ICommentCardProps {
  blogAuthorId:string,
  comment: CommentType;
  deleteAComment: (commentId: string) => void;
}

const CommentCard: React.FC<ICommentCardProps> = ({
  blogAuthorId,
  comment,
  deleteAComment,
}) => {
  const { locale, t } = useLocale();
  const { user } = useUser();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box
      w="100%"
      minH="130px"
      px="4"
      py="6"
      border="1px"
      borderColor="text.200"
      borderRadius="md"
      mb="4"
    >
      {/* Author */}
      <Flex justifyContent="space-between" alignItems="center">
        <NextLink passHref prefetch href={`/users/${comment.user._id}`}>
          <Box display="flex" alignItems="center" className="link-hover">
            <AppAvatar
              src={comment.user.profilePhoto}
              size="30"
              isAdmin={comment.user.isAdmin}
              badgeSize="14px"
              iconSize="8px"
              borderSize="1px"
              right="-3px"
              bottom="0px"
            />
            <Heading
              as="h4"
              fontWeight="medium"
              fontSize="sm"
              ml="3"
              color="text.dark"
            >
              {comment.user.name}
            </Heading>
            {blogAuthorId === user?._id && (
              <AppBadge text="author" bg="success.400" color="white" ml="3" />
            )}
          </Box>
        </NextLink>
        <Heading fontWeight="normal" fontSize="sm" color="text.dark">
          {appHelpers.getDateTimeString(comment.createdAt, locale)}
        </Heading>
      </Flex>
      {/* Body */}
      <Flex mt="6" justifyContent="space-between" alignItems="center" w="full">
        <Text fontSize="lg" color="gray.600" w="90%">
          {comment.body}
        </Text>
        {user?._id === comment.user._id && (
          <Box onClick={onOpen}>
            <AppActionIcon
              icon={FiTrash2}
              iconClassName="app-action-icon-delete"
            />
            <AppCancelModal
              isOpen={isOpen}
              onClose={onClose}
              onAccept={() => deleteAComment(comment._id)}
              actionText={t.add_comment}
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default CommentCard;
