import * as apiHelper from "@/api/api.helper";
import AppFormButton from "@/components/form/AppFormButton";
import useAppToast from "@/hooks/useAppToast";
import useUser from "@/hooks/useUser";
import { ISubtitleProps, LoginDataType } from "@/utils/types";
import * as validationSchema from "@/utils/validation.schema";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Login: NextPage & ISubtitleProps = () => {
  const { setIsAuthenticated } = useUser();
  const router = useRouter();
  const { triggerToast, triggerErrorToast } = useAppToast();

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = React.useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginDataType>({
    resolver: yupResolver(validationSchema.login),
    mode: "onChange",
  });

  const handleLogin = async () => {
    setLoading(true);
    const { email, password } = getValues();
    try {
      const response = await apiHelper.login({
        email,
        password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      setIsAuthenticated(true);
      triggerToast("Success", "Welcome back to farmico");
      router.replace("/blogs");
    } catch (error: any) {
      console.log({ error });
      triggerErrorToast("Login error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex width="full" alignItems="center" minHeight="80vh" direction="column">
      <Box textAlign="center" mt="16">
        <Heading color="text">Login</Heading>
      </Box>
      <Box
        py="9"
        px="8"
        minWidth="530px"
        boxShadow="sm"
        mt="8"
        textAlign="left"
        borderWidth="thin"
        borderColor="gray.300"
        borderRadius="2px"
      >
        <form onSubmit={handleSubmit(handleLogin)}>
          <FormControl isInvalid={errors.email !== undefined} my="6">
            <FormLabel htmlFor="email">email</FormLabel>
            <Input
              py="4"
              px="3"
              borderColor="gray.100"
              focusBorderColor="gray.600"
              borderRadius="2px"
              id="email"
              placeholder="john.doe@example.com"
              {...register("email")}
            />
            {errors.email?.message && (
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.password !== undefined} my="6">
            <FormLabel htmlFor="password">password</FormLabel>
            <InputGroup>
              <Input
                py="4"
                px="3"
                borderColor="gray.100"
                focusBorderColor="gray.600"
                borderRadius="2px"
                id="password"
                placeholder="•••••••••••••"
                type={showPass ? "text" : "password"}
                {...register("password")}
              />
              <InputRightElement
                className="cursor"
                onClick={() => setShowPass((c) => !c)}
              >
                {showPass ? <ViewIcon /> : <ViewOffIcon />}
              </InputRightElement>
            </InputGroup>
            {errors.password?.message && (
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            )}
          </FormControl>
          <AppFormButton loading={loading} text="login" />
        </form>
      </Box>
      <Heading as="h5" fontSize="sm" fontWeight="normal" mt="5">
        Don't have an account?{" "}
        <NextLink href="/register" passHref>
          <Link>
            <Heading
              as="small"
              color="dark-bg"
              fontSize="sm"
              fontWeight="semibold"
            >
              create an account
            </Heading>
          </Link>
        </NextLink>
      </Heading>
    </Flex>
  );
};

Login.subtitle = "Login";

export default Login;
