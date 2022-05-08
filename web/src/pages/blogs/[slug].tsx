import * as apiHelpers from "@/api/api.helper";
import { handleRequest } from "@/api/client";
import { queryClient } from "@/api/queryClient";
import CommentCard from "@/components/blog/view/CommentCard";
import CommentModal from "@/components/blog/view/CommentModal";
import AppActionIcon from "@/elements/AppActionIcon";
import AppAvatar from "@/elements/AppAvatar";
import AppButton from "@/elements/AppButton";
import useAppToast from "@/hooks/useAppToast";
import useLocale from "@/hooks/useLocale";
import useUser from "@/hooks/useUser";
import withAuth from "@/lib/withAuth";
import * as appHelpers from "@/utils/helpers";
import {
  BlogDetailType,
  CommentType,
  ISubtitleProps,
  LikeType,
  LocaleType,
} from "@/utils/types";
import { Box, Flex, Heading, Icon, useDisclosure } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiBook, FiCalendar, FiGlobe } from "react-icons/fi";
import { useQuery } from "react-query";
interface IBlogProps {
  blogData: BlogDetailType;
}

const Blog: NextPage<IBlogProps> & ISubtitleProps = ({ blogData }) => {
  const { t, locale } = useLocale();
  const { user } = useUser();
  const { triggerToast, triggerErrorToast } = useAppToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [commentText, setCommentText] = useState<string | null>(null);

  const { data: blog } = useQuery(
    `blog-${blogData.slug}`,
    () => fetchBlog(blogData.slug),
    {
      initialData: blogData,
    }
  );

  const hasUserLiked: boolean = useMemo(() => {
    // console.log("hasUserLiked called ....");
    return (
      blog?.likes?.find((like: LikeType) => like.user._id === user?._id) !==
      undefined
    );
  }, [blog, user]);

  const updateVotesCache = (data: any) => {
    queryClient.setQueryData(`blog-${blogData.slug}`, (old: any) => ({
      ...old,
      likesCount: old.likesCount + data.likeChange,
      likes:
        data.likeChange === 1
          ? [
              ...old.likes,
              {
                user: { _id: user?._id },
              },
            ]
          : old.likes.filter((lik: LikeType) => lik.user._id !== user?._id),
    }));
  };

  const voteTheBlog = async () => {
    try {
      const { data } = await handleRequest(apiHelpers.voteABlog, blogData._id);
      updateVotesCache(data);
      console.log({ data });
    } catch (error) {
      console.log({ error });
      triggerErrorToast(t.error_in_voting, error);
    }
  };

  const updateCommentCache = (data: any) => {
    queryClient.setQueryData(`blog-${blogData.slug}`, (old: any) => ({
      ...old,
      commentsCount: old.commentsCount + 1,
      comments: [
        ...old.comments,
        {
          ...data.newComment,
          user,
        },
      ],
    }));
    setTimeout(() => appHelpers.scrollToBottom(), 200);
  };

  const postAComment = async () => {
    if (commentText === null || commentText.trim().length === 0) {
      triggerToast(t.invalid_comment, t.comment_cant_be_empty, "error");
      return;
    }
    try {
      const { data } = await handleRequest(apiHelpers.postAComment, {
        blogId: blog._id,
        body: commentText,
      });
      updateCommentCache(data);
      // console.log({ data });
    } catch (error) {
      console.log({ error });
      triggerErrorToast(t.error_in_commenting, error);
    }
  };

  const deleteFromCommentCache = (commentId: string) => {
    queryClient.setQueryData(`blog-${blogData.slug}`, (old: any) => ({
      ...old,
      commentsCount: old.commentsCount - 1,
      comments: old.comments.filter(
        (com: CommentType) => com._id !== commentId
      ),
    }));
  };

  const deleteAComment = async (commentId: string) => {
    try {
      const { data } = await handleRequest(apiHelpers.deleteAComment, {
        blogId: blog._id,
        commentId,
      });
      deleteFromCommentCache(commentId);
      // console.log({ data });
    } catch (error) {
      console.log({ error });
      triggerErrorToast(t.error_in_deleting_a_comment, error);
    }
  };

  return (
    <Box w="65%" mx="auto" mt="12" id="blog">
      {/* Header */}
      <Flex w="100%" direction="column" alignItems="center" textAlign="center">
        <Heading as="h2" fontWeight="bold" fontSize="5xl">
          {blog.title}
        </Heading>
        <Heading
          as="h4"
          fontWeight="normal"
          fontSize="2xl"
          mt="6"
          color="text.400"
        >
          {blog.subtitle || ""}
        </Heading>
        {/* Author */}
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          mt="12"
        >
          {/* Avatar and  Name */}
          <NextLink passHref prefetch href={`/users/${blog.author._id}`}>
            <Box display="flex" alignItems="center" className="link-hover">
              <AppAvatar
                src={blog.author.profilePhoto}
                size="40"
                isAdmin={blog.author.isAdmin}
                right="-4px"
                bottom="0px"
              />
              <Heading
                as="h4"
                fontWeight="medium"
                fontSize="lg"
                ml="5"
                color="text.500"
              >
                {blog.author.name}
              </Heading>
            </Box>
          </NextLink>
          {/* Lang, Date and Read Time */}
          <Box display="flex" alignItems="center">
            <Flex alignItems="center" justifyContent="center">
              <Icon as={FiGlobe} fontSize="md" color="text.dark" mr="1" />
              <Heading fontWeight="normal" fontSize="md" color="text.dark">
                {appHelpers.getLocaleString(blog.locale as LocaleType)}
              </Heading>
            </Flex>
            <Flex alignItems="center" justifyContent="center" ml="8">
              <Icon as={FiBook} fontSize="md" color="text.dark" mr="1" />
              <Heading fontWeight="normal" fontSize="md" color="text.dark">
                {blog.readTime} {t.mins_read}
              </Heading>
            </Flex>
            <Flex alignItems="center" justifyContent="center" ml="8">
              <Icon as={FiCalendar} fontSize="md" color="text.dark" mr="1" />
              <Heading
                as="h4"
                fontWeight="normal"
                fontSize="md"
                color="text.dark"
              >
                {appHelpers.getDateString(blog.createdAt, locale)}
              </Heading>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      {/* Blog body */}
      <Box
        dangerouslySetInnerHTML={{ __html: blog.body }}
        mt="20"
        className="blogHtml"
      ></Box>
      {/* Likes and comments */}
      <Box mt="16">
        <Flex justifyContent="space-between" alignItems="center">
          {/* Comments */}
          <Heading as="small" fontWeight="bold" fontSize="2xl">
            {t.comments}
            <Heading as="small" fontWeight="medium" fontSize="lg" ml="3">
              ({blog.commentsCount})
            </Heading>
          </Heading>
          {/* Likes */}
          <Flex alignItems="center">
            <Box display="flex" alignItems="center" onClick={voteTheBlog}>
              <AppActionIcon
                icon={hasUserLiked ? FaHeart : FaRegHeart}
                color={hasUserLiked ? "danger.400" : "text.dark"}
              />
              <Heading fontWeight="normal" fontSize="md" color="text.dark">
                {blog.likesCount}
              </Heading>
            </Box>
            <AppButton
              text={t.add_comment}
              width="auto"
              btnColor="success.400"
              ml="4"
              onClick={onOpen}
            />
            <CommentModal
              isOpen={isOpen}
              onAccept={postAComment}
              onClose={onClose}
              commentText={commentText}
              setCommentText={setCommentText}
            />
          </Flex>
        </Flex>
        <Flex direction="column" my="8">
          {blog.comments.map((comment: CommentType) => (
            <CommentCard
              key={comment._id}
              blogAuthorId={blog.author._id.toString()}
              comment={comment}
              deleteAComment={deleteAComment}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

Blog.subtitle = "Blog";

const fetchBlog = async (slug: string) => {
  const { data } = await handleRequest<string>(apiHelpers.getBlog, slug);
  return data;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const data = await fetchBlog(slug as string);

  let blog = {};

  if (data.ok) {
    blog = data.blog;
  }

  return {
    props: {
      blogData: blog,
    },
  };
};

export default withAuth(Blog);
// export default Blog;
