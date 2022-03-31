import * as apiHelpers from "@/api/api.helper";
import { handleRequest } from "@/api/client";
import AppActionIcon from "@/elements/AppActionIcon";
import AppCancelModal from "@/elements/AppCancelModal";
import AppDate from "@/elements/AppDate";
import useAppToast from "@/hooks/useAppToast";
import useLocale from "@/hooks/useLocale";
import { ModelEnum, PostModelResult } from "@/utils/types";
import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FiTrash } from "react-icons/fi";

interface IReportCardProps {
  result: PostModelResult;
}

const ReportCard: React.FC<IReportCardProps> = ({ result }) => {
  const { t } = useLocale();
  const { triggerToast, triggerErrorToast } = useAppToast();
  const { onClose, onOpen, isOpen } = useDisclosure();

  const handleDelete = async () => {
    try {
      const { data } = await handleRequest(apiHelpers.deleteResult, result._id);
      if (data.ok) {
        triggerToast(t.success, t.model_result_deleted_successfully);
      }
    } catch (error) {
      console.log({ error });
      triggerErrorToast(t.delete_failed, error);
    }
  };

  return (
    <Box
      h="75px"
      w="90%"
      px="3"
      py="4"
      border="1px"
      borderColor="text.200"
      borderRadius="sm"
      my="3"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <NextLink passHref prefetch={true} href={`/result/${result._id}`}>
        <Flex w="90%" className="cursor">
          <Heading as="h3" fontWeight="medium" fontSize="lg" w="35%" mr="4">
            {result.model_type === ModelEnum.DISEASE
              ? t.plant_disease_detection
              : t.weed_detection}
          </Heading>
          <AppDate
            date={result.createdAt!}
            isTimeString={true}
            size="sm"
            weight="normal"
          />
        </Flex>
      </NextLink>
      <Box onClick={onOpen}>
        <AppActionIcon icon={FiTrash} iconClassName="app-action-icon-delete" />
        <AppCancelModal
          isOpen={isOpen}
          onClose={onClose}
          onAccept={handleDelete}
        />
      </Box>
    </Box>
  );
};

export default ReportCard;
