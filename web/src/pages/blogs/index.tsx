import * as apiHelper from "@/api/api.helper";
import BlogCard from "@/components/blogs/BlogCard";
import SearchBlogs from "@/components/blogs/SearchBlogs";
import useLocale from "@/hooks/useLocale";
import AppHeading from "@/layout/AppHeading";
import SomethingWentWrong from "@/layout/SomethingWentWrong";
import withAuth from "@/lib/withAuth";
import { BlogsFetcherArgs, BlogType, ISubtitleProps } from "@/utils/types";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { InfiniteData, useInfiniteQuery } from "react-query";

interface IBlogs {
  initialPage: number;
  size: number;
  totalBlogs: number;
  blogsData: InfiniteData<BlogType>;
}

const Blogs: NextPage<IBlogs> & ISubtitleProps = ({
  blogsData,
  initialPage,
  size,
  totalBlogs,
}) => {
  const { t } = useLocale();

  const { ref, inView } = useInView();
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery<BlogType, Error>(
      "blogs",
      ({ pageParam = 1 }) =>
        nextFetcher({
          page: pageParam,
        }),
      {
        refetchOnMount: true,
        initialData: { pageParams: 1, pages: blogsData } as any,
        getNextPageParam: (_, allPages): number | undefined => {
          return allPages.flatMap((page) => page)?.length < totalBlogs
            ? pageNumber + 1
            : undefined;
        },
      }
    );

  const allItems = useMemo(() => data?.pages.flatMap((page) => page), [data]);

  if (isLoading) {
    return <SomethingWentWrong h="70vh" subtitle={t.loading} />;
  }

  if (isError) {
    return (
      <SomethingWentWrong h="70vh" subtitle={t.blogs_couldnt_be_fetched} />
    );
  }

  useEffect(() => {
    console.log("Fetching");
    if (inView && hasNextPage) {
      console.log("Start Fetching");
      setPageNumber((p) => p + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Box pt="8" minH="75vh">
      <Flex alignItems="center" justifyContent="space-between">
        <AppHeading title={t.blogs} />
        <SearchBlogs />
      </Flex>
      {allItems?.length ? (
        <Flex flexDirection="column" w="60%" mt={8} mx="auto">
          {allItems?.map((blog: BlogType) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
          <Box visibility="hidden" ref={ref} />
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" h="50vh">
          <Heading
            as="h4"
            fontSize={"md"}
            fontWeight="normal"
            color="text.dark"
          >
            {t.no_blogs_written_yet}
          </Heading>
        </Flex>
      )}
    </Box>
  );
};

Blogs.subtitle = "Blogs";

const nextFetcher = async ({
  limit = 10,
  order = "asc",
  page = 1,
  sortBy = "createdAt",
}: BlogsFetcherArgs) => {
  const { data } = await apiHelper.getBlogs({
    limit,
    order,
    page,
    sortBy,
  });

  return data.blogs;
};

const fetcher = async ({
  limit = 10,
  order = "asc",
  page = 1,
  sortBy = "createdAt",
}: BlogsFetcherArgs) => {
  const { data } = await apiHelper.getBlogs({
    limit,
    order,
    page,
    sortBy,
  });

  return data;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ok, page, size, blogs, totalBlogs } = await fetcher({});

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
      initialPage: page,
      size,
      blogsData: blogs,
      totalBlogs,
    },
  };
};

export default withAuth(Blogs);
