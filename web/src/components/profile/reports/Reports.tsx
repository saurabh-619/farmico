import * as apiHelper from "@/api/api.helper";
import { handleRequest } from "@/api/client";
import useAppToast from "@/hooks/useAppToast";
import useLocale from "@/hooks/useLocale";
import AppHeading from "@/layout/AppHeading";
import { PostModelResult } from "@/utils/types";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReportCard from "./ReportCard";

const Reports = () => {
  const { t } = useLocale();

  const { triggerErrorToast } = useAppToast();
  const [results, setResults] = useState<PostModelResult[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllReports = async () => {
    setLoading(true);
    try {
      const { data } = await handleRequest(apiHelper.getResults);
      setResults(data.results);
      console.log({ data });
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
      <AppHeading title={t.all_reports} size="md" />
      {loading ? (
        <Flex h="60%" alignItems="center" justifyContent="center">
          <Spinner size="md" color="brand.main" />
        </Flex>
      ) : !loading && results.length === 0 ? (
        <Flex h="60%" alignItems="center" justifyContent="center">
          <Heading as="h3" fontWeight="normal" fontSize="md">
            {t.no_reports_yet}
          </Heading>
        </Flex>
      ) : (
        <Flex direction="column" alignItems="center" w="full" p="4">
          {results.map((result: PostModelResult) => (
            <ReportCard key={result._id} result={result} />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Reports;
