import * as apiHelper from "@/api/api.helper";
import { handleRequest } from "@/api/client";
import AppDate from "@/elements/AppDate";
import useLocale from "@/hooks/useLocale";
import AppHeading from "@/layout/AppHeading";
import withAuth from "@/lib/withAuth";
import * as appHelpers from "@/utils/helpers";
import {
  ISubtitleProps,
  ModelEnum,
  ModelType,
  PostModelResult,
} from "@/utils/types";
import { Box, Flex, Heading, Icon, Link } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import NextLink from "next/link";
import {
  FiActivity,
  FiCalendar,
  FiExternalLink,
  FiTarget,
} from "react-icons/fi";

interface IResultProps {
  result: PostModelResult;
}

const Result: NextPage<IResultProps> & ISubtitleProps = ({ result }) => {
  const { t, locale } = useLocale();

  const getSuggestedBlogUI = (title: string, url: string) => (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="65%"
      bg="text.50"
      py="6"
      px="4"
      borderRadius="sm"
      boxShadow="md"
      mt="12"
    >
      <Heading as="h4" fontWeight="normal" fontSize="md">
        {t.suggested_read} -
      </Heading>
      <NextLink passHref={true} prefetch={true} href={url}>
        <Link target="_blank" display="flex" alignItems="center">
          <Heading
            as="a"
            fontWeight="normal"
            fontSize="md"
            className="cursor"
            color="brand.500"
            _hover={{
              textDecoration: "underline",
            }}
            ml="3"
          >
            {title}
          </Heading>
          <Heading as="span" ml="2" color="brand.500">
            <FiExternalLink size={18} />
          </Heading>
        </Link>
      </NextLink>
    </Flex>
  );

  const getSuggestedBlog = (model_type: ModelType, locale = "en") => {
    let title = "";
    let url = "";

    if (model_type === "disease") {
      // disease
      if (locale === "en") {
        title = "Plant disease remedies";
        url = "/blogs/626ae118547894c07bdffdc3";
      } else if (locale === "mr") {
        title = "वनस्पती रोग उपाय";
        url = "/blogs/62911e0f015c7e00bc0f7228";
      } else {
        title = "पौधों की बीमारी के उपाय";
        url = "/blogs/62912700015c7e00bc0f7245";
      }
    } else {
      // Weed
      if (locale === "en") {
        title = "Weed control methods";
        url = "/blogs/627794f5b6aed94e1705d1b3";
      } else if (locale === "mr") {
        title = "तण नियंत्रण पद्धती";
        url = "/blogs/6280e4d0e2965390ba7d90b4";
      } else {
        title = "खरपतवार नियंत्रण के तरीके";
        url = "/blogs/6280e539e2965390ba7d90ce";
      }
    }

    return getSuggestedBlogUI(title, url);
  };

  const getDiseaseResultUI = (result: PostModelResult) => (
    <Box display="flex" flexDir="column" alignItems="center">
      {/* Header */}
      <Flex direction="column">
        <Image
          src={result.ogImg}
          height="250px"
          width="250px"
          objectFit="cover"
          alt="Original image"
        />
        <Heading
          as="h3"
          fontWeight="medium"
          fontSize="lg"
          color="text.light"
          mt="3"
          textAlign="center"
        >
          {result.label}
        </Heading>
      </Flex>
      {/* Body */}
      <Flex alignItems="center" justifyContent="space-between" w="50%" mt="12">
        {/* health */}
        <Flex alignItems="center">
          <Icon
            fontSize={20}
            color={result.isUnhealthy ? "danger.400" : "success.400"}
          >
            <FiActivity />
          </Icon>
          <Heading
            as="h3"
            fontSize="md"
            fontWeight="medium"
            color={result.isUnhealthy ? "danger.400" : "success.400"}
            ml="2"
          >
            {result.isUnhealthy ? t.unhealthy : t.healthy}
          </Heading>
        </Flex>

        <Flex alignItems="center">
          <Icon fontSize={20} color="gray.600">
            <FiTarget />
          </Icon>
          <Heading
            as="h3"
            fontSize="md"
            fontWeight="medium"
            color="gray.600"
            ml="2"
          >
            {(+result.confidence * 100).toFixed(2)} %
          </Heading>
        </Flex>
        <AppDate date={result.createdAt!} isTimeString={true} />
      </Flex>
      {/* Blog link */}
      {getSuggestedBlog(result.model_type, locale)}
    </Box>
  );

  const getWeedResultUI = (result: PostModelResult) => (
    <Box display="flex" flexDir="column" alignItems="center">
      {/* Header */}
      <Flex direction="column">
        <Flex alignItems="center">
          <Image
            src={result.ogImg}
            height="250px"
            width="250px"
            objectFit="cover"
            alt="Original image"
          />
          <Box mx="4" />
          <Image
            src={result.resultImg!}
            height="250px"
            width="250px"
            objectFit="cover"
            alt="Original image"
          />
        </Flex>
        <Heading
          as="h3"
          fontWeight="medium"
          fontSize="lg"
          color="text.light"
          mt="3"
          textAlign="center"
        >
          {t.weed} {result.hasWeed ? t.detected : t.not_detected}
        </Heading>
      </Flex>
      {/* Body */}
      <Flex alignItems="center" justifyContent="space-between" w="50%" mt="12">
        {/* health */}
        <Flex alignItems="center">
          <Icon
            fontSize={20}
            color={result.hasWeed ? "danger.400" : "success.400"}
          >
            <FiActivity />
          </Icon>
          <Heading
            as="h3"
            fontSize="md"
            fontWeight="medium"
            color={result.hasWeed ? "danger.400" : "success.400"}
            ml="2"
          >
            {result.hasWeed ? t.unhealthy : t.healthy}
          </Heading>
        </Flex>

        <Flex alignItems="center">
          <Icon fontSize={20} color="gray.600">
            <FiTarget />
          </Icon>
          <Heading
            as="h3"
            fontSize="md"
            fontWeight="medium"
            color="gray.600"
            ml="2"
          >
            {(+result.confidence * 100).toFixed(2)} %
          </Heading>
        </Flex>

        <Flex alignItems="center">
          <Icon fontSize={20} color="gray.600">
            <FiCalendar />
          </Icon>
          <Heading
            as="h3"
            fontSize="md"
            fontWeight="medium"
            color="gray.600"
            ml="2"
          >
            {appHelpers.getDateTimeString(result.createdAt!, locale)}
          </Heading>
        </Flex>
      </Flex>
      {/* Blog link */}
      {getSuggestedBlog(result.model_type, locale)}
    </Box>
  );

  const getUI = (result: PostModelResult) => {
    if (result.model_type === ModelEnum.DISEASE) {
      return getDiseaseResultUI(result);
    } else {
      return getWeedResultUI(result);
    }
  };

  return (
    <Box pt="8" minH="75vh">
      <AppHeading title={t.result} />
      <Box mt="12" w="70%" mx="auto">
        {getUI(result)}
      </Box>
    </Box>
  );
};

Result.subtitle = "Result";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const resultId = context?.params?.id as string;

  if (!resultId) {
    return {
      notFound: true,
    };
  }

  try {
    // @ts-ignore
    const { data } = await handleRequest(apiHelper.getResult, {
      id: resultId,
      context,
    });

    if (!data.ok) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        result: (data.result || {}) as PostModelResult,
      },
    };
  } catch (error: any) {
    console.log({
      error: error.message,
    });
    return {
      props: {
        result: {},
      },
    };
  }
};

export default withAuth(Result);
// export default Result;
