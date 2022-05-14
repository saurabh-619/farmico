import AppAvatar from "@/elements/AppAvatar";
import AppBadge from "@/elements/AppBadge";
import AppButton from "@/elements/AppButton";
import useLocale from "@/hooks/useLocale";
import useUser from "@/hooks/useUser";
import * as appHelpers from "@/utils/helpers";
import { LocaleType } from "@/utils/types";
import { AtSignIcon, CalendarIcon, EmailIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Icon, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FiGlobe } from "react-icons/fi";
import AdminBadge from "./AdminBadge";

const Info = () => {
  const { user, logout } = useUser();
  const { locale, t } = useLocale();
  const router = useRouter();

  return (
    <Flex direction="column" alignItems="center">
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
        <AdminBadge />
      </Box>
      <Flex mt="5" justifyContent="center" alignItems="center">
        <Heading as="h2" fontSize="2xl" fontWeight="semibold">
          {user?.name}
        </Heading>
        {user?.isAdmin && <AppBadge text={t.admin} ml="3" />}
      </Flex>
      <Flex mt="6" w="70%" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" flexDirection="row" mx="2">
          <AtSignIcon fontSize="lg" mr="2" color="text.light" />
          <Heading as="h4" fontSize="md" fontWeight="normal" color="text.light">
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
          <Heading as="h4" fontSize="md" fontWeight="normal" color="text.light">
            {/* {new Date(user?.createdAt!).toLocaleDateString()} */}
            {appHelpers.getDateTimeString(user?.createdAt!, locale)}
          </Heading>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="row" mx="2">
          <Icon fontSize="lg" mr="2" color="text.light" as={FiGlobe} />
          <Heading as="h4" fontSize="md" fontWeight="normal" color="text.light">
            {appHelpers.getLocaleString(locale as LocaleType)}
          </Heading>
        </Box>
        <AppButton
          ml="4"
          text={t.logout}
          onClick={() => {
            router.replace("/login");
            setTimeout(() => {
              logout();
            }, 500);
          }}
          width="100px"
        />
      </Flex>
    </Flex>
  );
};

export default Info;
