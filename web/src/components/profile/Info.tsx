import AppAvatar from "@/elements/AppAvatar";
import AppButton from "@/elements/AppButton";
import useUser from "@/hooks/useUser";
import { AtSignIcon, CalendarIcon, EmailIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Info = () => {
  const { user, logout } = useUser();
  const router = useRouter();

  return (
    <Flex direction="column" alignItems="center">
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
      <Box mt="5">
        <Heading as="h2" fontSize="2xl" fontWeight="semibold">
          {user?.name}
        </Heading>
      </Box>
      <Flex mt="6" w="45%" alignItems="center" justifyContent="space-evenly">
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
            {new Date(user?.createdAt!).toLocaleDateString()}
          </Heading>
        </Box>
        <AppButton
          // @ts-ignore
          ml="8"
          text="logout"
          onClick={() => {
            router.replace("/login");
            setTimeout(() => {
              logout();
            }, 500);
          }}
          width="50%"
        />
      </Flex>
    </Flex>
  );
};

export default Info;
