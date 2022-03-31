import AppLink from "@/elements/AppLink";
import useAppLoading from "@/hooks/useAppLoading";
import useUser from "@/hooks/useUser";
import { Avatar, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useLocale from "@/hooks/useLocale";

const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useUser();
  const { appLoading } = useAppLoading();

  const { t } = useLocale();

  const isCurrentRoute = useCallback(
    (route: string) => {
      return router.asPath === route;
    },
    [router]
  );

  return (
    <Flex
      as="nav"
      w="100%"
      align="center"
      justifyContent="space-between"
      className="nav"
    >
      <NextLink passHref href="/">
        <Text fontSize={"4xl"} fontWeight="bold" className="link-hover">
          {t.farmico}
          <Heading as="small" color="brand.main">
            .
          </Heading>
        </Text>
      </NextLink>
      {!appLoading && (
        <HStack spacing={8}>
          {isAuthenticated && (
            <>
              <NextLink href={"/models"} passHref>
                <AppLink
                  fontSize={"medium"}
                  text={t.aiTools}
                  color={isCurrentRoute("/models") ? "brand.500" : "black"}
                  className="link-hover"
                />
              </NextLink>
              <NextLink href={"/blogs"} passHref>
                <AppLink
                  fontSize={"medium"}
                  text={t.blogs}
                  color={isCurrentRoute("/blogs") ? "brand.500" : "black"}
                  className="link-hover"
                />
              </NextLink>
            </>
          )}
          {/* <NextLink href={"/about"} passHref>
            <AppLink
              fontSize={"medium"}
              text="about"
              color={isCurrentRoute("/about") ? "brand.500" : "black"}
              className="link-hover"
            />
          </NextLink> */}
          {!isAuthenticated && (
            <NextLink href={"/login"} passHref>
              <AppLink
                fontSize={"medium"}
                text={t.login}
                color={isCurrentRoute("/login") ? "brand.500" : "black"}
                className="link-hover"
              />
            </NextLink>
          )}
          {isAuthenticated && (
            <NextLink href="/profile" passHref>
              <a>
                <Avatar src={user?.profilePhoto!} className="hover-link" />
              </a>
            </NextLink>
          )}
        </HStack>
      )}
    </Flex>
  );
};

export default Navbar;
