import * as apiHelper from "@/api/api.helper";
import BlogCard from "@/components/blogs/BlogCard";
import SearchBlogs from "@/components/blogs/SearchBlogs";
import withAuth from "@/lib/withAuth";
import { BlogType, ISubtitleProps } from "@/utils/types";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

interface IBlogs {
  page: number;
  size: number;
  blogs: [];
}

const Blogs: NextPage<IBlogs> & ISubtitleProps = ({ blogs, page, size }) => {
  console.log({ blogs, page, size });

  return (
    <Box pt="8" minH="75vh">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading
          as="h3"
          fontSize={"x-large"}
          fontWeight="semibold"
          color="text.dark"
        >
          blogs
        </Heading>
        <SearchBlogs />
      </Flex>
      {blogs.length ? (
        <Flex flexDirection="column" w="60%" mt={8} mx="auto">
          {blogs.map((blog: BlogType) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" h="50vh">
          <Heading
            as="h4"
            fontSize={"md"}
            fontWeight="normal"
            color="text.dark"
          >
            No blogs written yet. Be the first one😎
          </Heading>
        </Flex>
      )}
    </Box>
  );
};

Blogs.subtitle = "Blogs";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    data: { ok, page, size, blogs },
  } = await apiHelper.getBlogs({
    limit: 10,
    order: "asc",
    page: 1,
    sortBy: "readTime",
  });

  if (!ok) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      page,
      size,
      blogs,
    },
  };
};

export default withAuth(Blogs);
