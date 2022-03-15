import { BlogDetailType, ISubtitleProps } from "@/utils/types";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import withAuth from "@/lib/withAuth";
import { handleRequest } from "@/api/client";
import * as apiHelper from "@/api/api.helper";

interface IBlogProps {
  blog: BlogDetailType;
}

const Blog: NextPage<IBlogProps> & ISubtitleProps = ({ blog }) => {
  console.log({ blog });
  return <div>Blog</div>;
};

Blog.subtitle = "Blog";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const { data } = await handleRequest<string>(
    apiHelper.getBlog,
    slug as string
  );

  let blog = {};

  if (data.ok) {
    blog = data.blog;
  }

  return {
    props: {
      blog,
    },
  };
};

export default withAuth(Blog);
