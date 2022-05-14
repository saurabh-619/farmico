import * as apiHelper from "@/api/api.helper";
import { handleRequest } from "@/api/client";
import LocaleToggle from "@/components/blog/create/LocaleToggle";
import TextEditor from "@/components/blog/create/TextEditor";
import AppButton from "@/elements/AppButton";
import useAppToast from "@/hooks/useAppToast";
import useLocale from "@/hooks/useLocale";
import {
  BlogType,
  BLOG_LOCALE_TYPE,
  ISubtitleProps,
  LocaleType,
} from "@/utils/types";
import * as validationSchema from "@/utils/validation.schema";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

type BlogForm = {
  title: string;
  subtitle: string;
};

interface IUpdateBlogProps {
  currentBlog: BlogType;
}

const getLocaleType = (locale: LocaleType) => {
  if (locale === "mr") return BLOG_LOCALE_TYPE.MARATHI;
  if (locale === "en") return BLOG_LOCALE_TYPE.ENGLISH;
  return BLOG_LOCALE_TYPE.HINDI;
};

const UpdateBlog: NextPage<IUpdateBlogProps> & ISubtitleProps = ({
  currentBlog,
}) => {
  const { t } = useLocale();

  const router = useRouter();
  const { triggerToast } = useAppToast();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(currentBlog.body);
  const [bodyPreview, setBodyPreview] = useState(currentBlog.bodyPreview);
  const [locale, setLocale] = useState<BLOG_LOCALE_TYPE>(
    getLocaleType(currentBlog.locale as LocaleType)
  );

  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm<BlogForm>({
    resolver: yupResolver(validationSchema.blog),
    mode: "onChange",
    defaultValues: {
      title: currentBlog.title,
      subtitle: currentBlog.subtitle,
    },
  });

  const updateBlog = async () => {
    const { title, subtitle } = getValues();
    try {
      if (content.length < 210) {
        return triggerToast(t.error, t.body_length_atleast_250, "error");
      }

      const response = await handleRequest(apiHelper.updateABlog, {
        _id: currentBlog._id,
        title,
        body: content,
        locale,
        subtitle,
        bodyPreview,
      });
      if (response.data.ok) {
        triggerToast(t.success, t.blog_edited_successfully);
        router.replace("/blogs");
      }
    } catch (error: any) {
      console.log({ error: error?.data?.response?.error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(updateBlog)}>
      <Box w="60%" mx="auto" mt="0">
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
          content={content}
          setContent={setContent}
          setBodyPreview={setBodyPreview}
          mt="3"
        />
        <Flex justifyContent="flex-end">
          <Flex alignItems="center">
            <LocaleToggle locale={locale} setLocale={setLocale} />
            <AppButton
              text={t.update}
              variant="solid"
              ml="5"
              loading={loading}
            />
          </Flex>
        </Flex>
      </Box>
    </form>
  );
};

UpdateBlog.subtitle = "Update blog";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;

  if (!id) {
    return {
      notFound: true,
    };
  }
  const { data } = await handleRequest(apiHelper.getBlog, id);

  let currentBlog = {};

  if (data.ok) {
    currentBlog = data.blog;
  }

  return {
    props: { currentBlog },
  };
};

export default UpdateBlog;
