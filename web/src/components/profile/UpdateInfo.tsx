import * as apiHelper from "@/api/api.helper";
import { handleRequest } from "@/api/client";
import AppAvatar from "@/elements/AppAvatar";
import useAppToast from "@/hooks/useAppToast";
import { useFirebaseStorage } from "@/hooks/useFirebaseStorage";
import useUser from "@/hooks/useUser";
import { UpdateUserDataType } from "@/utils/types";
import * as validationSchema from "@/utils/validation.schema";
import { AddIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AppFormButton from "../form/AppFormButton";

const UpdateInfo = () => {
  const router = useRouter();
  const { user, isAuthenticated, setUser } = useUser();
  const { triggerToast, triggerErrorToast } = useAppToast();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<UpdateUserDataType>({
    resolver: yupResolver(validationSchema.updateUser),
    mode: "onChange",
    defaultValues: {
      ...user,
    },
  });
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(user?.username);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const imgPickRef = useRef(null);
  const [imgSrc, setImgSrc] = useState({
    src: user?.profilePhoto,
    fileName: "img.png",
    file: null,
  });

  const { progress } = useFirebaseStorage(user?._id!, imgSrc.file, setImgSrc);

  const handleAvatarClicked = () => {
    // @ts-ignore
    imgPickRef?.current?.click();
  };

  const handleImgPicked = (e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files![0];

    if (!imgFile) return;

    if (imgFile.size / 1024 > 1500) {
      return triggerToast(
        "Not allowed",
        "Image size can't exceed 1.5MB",
        "error"
      );
    }

    // @ts-ignore
    setImgSrc((prev) => ({ ...prev, file: imgFile }));
  };

  const checkIfUsernameAvailble = useCallback(
    async (e: any) => {
      const username = e.target.value;
      setUsername(username);
      if (username?.length > 3) {
        const { data } = await apiHelper.checkIfUsernameAvailable(username!);
        setIsUsernameAvailable(data.isAvailable);
      }
    },
    [username]
  );

  const handleUpdate = async () => {
    setLoading(true);
    const { name, email, password } = getValues();

    try {
      await handleRequest<UpdateUserDataType>(apiHelper.updateUser, {
        name,
        username,
        email,
        profilePhoto: imgSrc.src,
        ...(password?.length && { password }),
      });

      const { data } = await handleRequest(apiHelper.loggedInUser);
      setUser(data.user);
      router.push("/profile");
      triggerToast("Success", "Profile updated successfully");
    } catch (error: any) {
      console.log({ error });
      triggerErrorToast("Error", error.data.response.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {isAuthenticated && (
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
            position="relative"
          >
            {progress !== null && progress !== 100 ? (
              <CircularProgress
                value={progress}
                color="brand.main"
                size="80px"
                thickness="8px"
              >
                <CircularProgressLabel>
                  <Heading
                    as="h3"
                    fontWeight="semibold"
                    fontSize="large"
                    color={"text.dark"}
                  >
                    {progress}%
                  </Heading>
                </CircularProgressLabel>
              </CircularProgress>
            ) : (
              <AppAvatar src={imgSrc.src} />
            )}
            <Box
              boxShadow="2xl"
              height="25px"
              width="25px"
              borderRadius="full"
              position="absolute"
              backgroundColor="white"
              bottom="2"
              right="2"
              zIndex="1"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className="cursor"
              onClick={handleAvatarClicked}
            >
              <AddIcon color="green.400" fontWeight="bold" />
            </Box>
            <Input
              type="file"
              accept="image/*"
              ref={imgPickRef}
              onChange={handleImgPicked}
              hidden
            />
          </Box>
          <form onSubmit={handleSubmit(handleUpdate)} style={{ width: "45%" }}>
            <FormControl isInvalid={errors.name !== undefined} my="8">
              <FormLabel htmlFor="name">name</FormLabel>
              <Input
                py="4"
                px="3"
                borderColor="gray.100"
                focusBorderColor="gray.600"
                borderRadius="2px"
                id="name"
                placeholder="john doe"
                {...register("name")}
              />
              {errors.name?.message && (
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={username?.length! < 4 || !isUsernameAvailable}
              my="6"
            >
              <FormLabel htmlFor="username">username</FormLabel>
              <Input
                py="4"
                px="3"
                borderColor="gray.100"
                focusBorderColor="gray.600"
                borderRadius="2px"
                id="username"
                placeholder="johnbhai"
                name="username"
                value={username}
                onChange={checkIfUsernameAvailble}
              />
              {(username?.length! < 4 && (
                <FormErrorMessage>
                  username can't be smaller than 4 characters
                </FormErrorMessage>
              )) ||
                (!isUsernameAvailable && (
                  <FormErrorMessage>
                    username not available 😢. try different.
                  </FormErrorMessage>
                ))}
            </FormControl>
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
            <FormControl isInvalid={errors.confPassword !== undefined} my="6">
              <FormLabel htmlFor="confirm-password">confirm password</FormLabel>
              <InputGroup>
                <Input
                  py="4"
                  px="3"
                  borderColor="gray.100"
                  focusBorderColor="gray.600"
                  borderRadius="2px"
                  id="confirm-password"
                  placeholder="•••••••••••••"
                  type={showConfPass ? "text" : "password"}
                  {...register("confPassword")}
                />
                <InputRightElement
                  className="cursor"
                  onClick={() => setShowConfPass((c) => !c)}
                >
                  {showConfPass ? <ViewIcon /> : <ViewOffIcon />}
                </InputRightElement>
              </InputGroup>
              {errors.confPassword?.message && (
                <FormErrorMessage>
                  {errors.confPassword?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <AppFormButton loading={loading} text="update" />
          </form>
        </Flex>
      )}
    </Box>
  );
};

export default UpdateInfo;
