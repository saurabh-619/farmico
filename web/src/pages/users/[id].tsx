import * as apiHelpers from "@/api/api.helper";
import { handleRequest } from "@/api/client";
import AdminBadge from "@/components/profile/AdminBadge";
import AppAvatar from "@/elements/AppAvatar";
import AppBadge from "@/elements/AppBadge";
import useLocale from "@/hooks/useLocale";
import * as appHelpers from "@/utils/helpers";
import { ISubtitleProps, UserType } from "@/utils/types";
import { AtSignIcon, CalendarIcon, EmailIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";

interface IUserProps {
  user: UserType;
}

const User: NextPage<IUserProps> & ISubtitleProps = ({ user }) => {
  const { locale, t } = useLocale();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="65vh"
      p="8"
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w="60%"
        h="100%"
      >
        <Box pos="relative">
          <Box
            boxSize="2xl"
            boxShadow="2xl"
            height="125px"
            width="125px"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {user && <AppAvatar src={user?.profilePhoto!} />}
          </Box>
          {user.isAdmin && <AdminBadge />}
        </Box>
        <Flex mt="10" justifyContent="center" alignItems="center">
          <Heading as="h2" fontSize="2xl" fontWeight="semibold">
            {user?.name}
          </Heading>
          {user.isAdmin && <AppBadge text={t.admin} ml="3" />}
        </Flex>
        <Flex mt="6" w="65%" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" flexDirection="row" mx="2">
            <AtSignIcon fontSize="lg" mr="2" color="text.light" />
            <Heading
              as="h4"
              fontSize="md"
              fontWeight="normal"
              color="text.light"
            >
              {user?.username}
            </Heading>
          </Box>
          <NextLink href={`mailto:${user?.email}`} passHref>
            <Link mx="2">
              <Box display="flex" alignItems="center" flexDirection="row">
                <EmailIcon fontSize="lg" mr="2" color="text.light" />
                <Heading
                  as="h4"
                  fontSize="md"
                  fontWeight="normal"
                  color="text.light"
                >
                  {user?.email}
                </Heading>
              </Box>
            </Link>
          </NextLink>
          <Box display="flex" alignItems="center" flexDirection="row" mx="2">
            <CalendarIcon fontSize="lg" mr="2" color="text.light" />
            <Heading
              as="h4"
              fontSize="md"
              fontWeight="normal"
              color="text.light"
            >
              {appHelpers.getDateTimeString(user?.createdAt!, locale)}
            </Heading>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

User.subtitle = "Profile";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id as string;

  console.log({ id });

  if (!id) {
    return {
      notFound: true,
    };
  }
  // @ts-ignore
  const { data } = await handleRequest(apiHelpers.getAUser, { id, context });

  let user = {};

  if (data.ok) {
    user = data.user;
  }

  return {
    props: {
      user,
    },
  };
};

export default User;
