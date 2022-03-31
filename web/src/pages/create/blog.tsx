import * as apiHelper from "@/api/api.helper";
import { handleRequest } from "@/api/client";
import LocaleToggle from "@/components/blog/create/LocaleToggle";
import TextEditor from "@/components/blog/create/TextEditor";
import AppButton from "@/elements/AppButton";
import useAppToast from "@/hooks/useAppToast";
import useLocale from "@/hooks/useLocale";
import withAuth from "@/lib/withAuth";
import { BLOG_LOCALE_TYPE, ISubtitleProps } from "@/utils/types";
import * as validationSchema from "@/utils/validation.schema";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

type BlogForm = {
  title: string;
  subtitle: string;
};

const CreateBlog: NextPage & ISubtitleProps = () => {
  const { t } = useLocale();
  const router = useRouter();
  const { triggerToast } = useAppToast();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [bodyPreview, setBodyPreview] = useState("");
  const [locale, setLocale] = useState<BLOG_LOCALE_TYPE>(
    BLOG_LOCALE_TYPE.ENGLISH
  );

  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm<BlogForm>({
    resolver: yupResolver(validationSchema.blog),
    mode: "onChange",
  });

  const createBlog = async () => {
    const { title, subtitle } = getValues();
    try {
      if (content.length < 210) {
        return triggerToast(t.error, t.body_length_atleast_250, "error");
      }

      const response = await handleRequest(apiHelper.postABlog, {
        title,
        body: content,
        locale,
        subtitle,
        bodyPreview,
      });
      if (response.data.ok) {
        triggerToast(t.success, t.blog_published_successfully);
        router.replace("/blogs");
      }
    } catch (error: any) {
      console.log({ error: error?.data?.response?.error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(createBlog)}>
      <Box w="60%" mx="auto" mt="1">
        <FormControl isInvalid={errors.title !== undefined}>
          <Input
            px="0"
            py="8"
            borderColor="gray.100"
            focusBorderColor="gray.600"
            borderRadius="2px"
            id="title"
            placeholder={t.enter_title}
            fontWeight="semibold"
            fontSize="3xl"
            border="none"
            _focus={{
              outline: "none",
            }}
            errorBorderColor="transparent"
            {...register("title")}
          />
          <FormErrorMessage>* {errors.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.subtitle !== undefined}>
          <Input
            px="0"
            py="6"
            borderColor="gray.100"
            focusBorderColor="gray.600"
            borderRadius="2px"
            id="subtitle"
            placeholder={t.subtitle}
            fontWeight="medium"
            fontSize="xl"
            border="none"
            _focus={{
              outline: "none",
            }}
            errorBorderColor="transparent"
            {...register("subtitle")}
          />
          <FormErrorMessage>* {errors.subtitle?.message}</FormErrorMessage>
        </FormControl>
        <TextEditor
          setContent={setContent}
          setBodyPreview={setBodyPreview}
          // @ts-ignore
          mt="3"
        />
        <Flex justifyContent="flex-end">
          <Flex alignItems="center">
            <LocaleToggle locale={locale} setLocale={setLocale} />
            <AppButton
              text={t.publish}
              variant="solid"
              // @ts-ignore
              ml="5"
              loading={loading}
            />
          </Flex>
        </Flex>
      </Box>
    </form>
  );
};

CreateBlog.subtitle = "Create blog";

export default withAuth(CreateBlog);
