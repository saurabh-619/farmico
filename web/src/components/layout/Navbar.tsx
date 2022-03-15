import AppLink from "@/elements/AppLink";
import useAppLoading from "@/hooks/useAppLoading";
import useUser from "@/hooks/useUser";
import { Avatar, Flex, Heading, HStack, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useUser();
  const { appLoading } = useAppLoading();
  console.log({ isAuthenticated });

  return (
    <Flex
      as="nav"
      w="100%"
      align="center"
      justifyContent="space-between"
      className="nav"
    >
      <Text fontSize={"4xl"} fontWeight="bold">
        farmico
        <Heading as="small" color="brand.main">
          .
        </Heading>
      </Text>
      {!appLoading && (
        <HStack spacing={8}>
          {isAuthenticated && (
            <>
              <NextLink href={"/models"} passHref>
                <AppLink fontSize={"medium"} text="AI tools" />
              </NextLink>
              <NextLink href={"/blogs"} passHref>
                <AppLink fontSize={"medium"} color={""} text="blogs" />
              </NextLink>
            </>
          )}
          <NextLink href={"/about"} passHref>
            <AppLink fontSize={"medium"} text="about" />
          </NextLink>
          {!isAuthenticated && (
            <NextLink href={"/login"} passHref>
              <AppLink fontSize={"medium"} text="login" />
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
