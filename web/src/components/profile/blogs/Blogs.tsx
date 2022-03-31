import * as apiHelper from "@/api/api.helper";
import { handleRequest } from "@/api/client";
import useAppToast from "@/hooks/useAppToast";
import useLocale from "@/hooks/useLocale";
import AppHeading from "@/layout/AppHeading";
import { BlogType } from "@/utils/types";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const { t } = useLocale();

  const { triggerErrorToast } = useAppToast();
  const [blogData, setBlogData] = useState<{
    size: number;
    blogs: Partial<BlogType>[];
  }>({
    size: 0,
    blogs: [],
  });
  const [loading, setLoading] = useState(false);

  const getAllReports = async () => {
    setLoading(true);
    try {
      const { data } = await handleRequest(apiHelper.getUsersBlog);
      setBlogData({
        size: data.size,
        blogs: data.blogs,
      });
      // console.log({ data });
    } catch (error) {
      triggerErrorToast(t.error_in_fetching, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllReports();
  }, []);

  return (
    <Box h="65vh" w="full">
      <Flex justifyContent="flex-start" alignItems="center">
        <AppHeading title={t.all_blogs} size="md" />
        <Heading as="h4" fontSize="sm" fontWeight="normal" ml="2">
          ({blogData.size})
        </Heading>
      </Flex>
      {loading ? (
        <Flex h="60%" alignItems="center" justifyContent="center">
          <Spinner size="md" color="brand.main" />
        </Flex>
      ) : !loading && blogData.blogs.length === 0 ? (
        <Flex h="60%" alignItems="center" justifyContent="center">
          <Heading as="h3" fontWeight="normal" fontSize="md">
            {t.no_blogs_yet}
          </Heading>
        </Flex>
      ) : (
        <Flex direction="column" alignItems="center" w="full" p="4">
          {blogData.blogs.map((blog: Partial<BlogType>) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Blogs;
