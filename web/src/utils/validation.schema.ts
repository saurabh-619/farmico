import * as yup from "yup";

export const register = yup.object({
  name: yup.string().required(),
  // username: yup.string().min(4).required(),
  email: yup.string().email().lowercase().required(),
  password: yup.string().min(6).required(),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords should match"),
});

export const updateUser = yup.object({
  name: yup.string(),
  // @ts-ignore
  username: yup.string().min(4),
  email: yup.string().email().lowercase(),
  password: yup.string(),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords should match"),
});

export const login = yup.object({
  email: yup.string().email().trim().lowercase(),
  password: yup.string().trim(),
});

export const blog = yup.object({
  locale: yup.string().trim().lowercase().oneOf(["en", "mr", "hi"]).required(),
  title: yup.string().min(10).max(150).trim().required(),
  subtitle: yup.string().trim(),
  body: yup.string().min(200).max(10000).trim().required(),
});

export const blogComment = yup.object({
  body: yup.string().min(10).trim().required(),
});

export const result = yup.object({
  model_type: yup.string().oneOf(["disease", "weed"]).required(), //"disease" or  "weed"
  confidence: yup.number().required(),
  // 1. Disease detection model
  label: yup.string(),
  isUnhealthy: yup.boolean(),
  // 2. Weed detection model
  hasWeed: yup.boolean(),
  ogImg: yup.string(),
  resultImg: yup.string(),
});
