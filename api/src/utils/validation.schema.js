const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(0),
  profilePhoto: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().trim().required(),
});

const blogSchema = Joi.object({
  locale: Joi.string().trim().lowercase().valid("en", "mr", "hi").required(),
  title: Joi.string().min(10).max(150).trim().required(),
  subtitle: Joi.string().trim(),
  body: Joi.string().min(200).max(10000).trim().required(),
});

const blogCommentSchema = Joi.object({
  body: Joi.string().min(10).trim().required(),
});

const resultSchema = Joi.object({
  model_type: Joi.string().valid("disease", "weed").required(), //"disease" or  "weed"
  confidence: Joi.number().required(),
  // 1. Disease detection model
  label: Joi.string(),
  isUnhealthy: Joi.boolean(),
  // 2. Weed detection model
  hasWeed: Joi.boolean(),
  ogImg: Joi.string(),
  resultImg: Joi.string(),
});

module.exports = {
  registerSchema,
  updateUserSchema,
  loginSchema,
  blogSchema,
  blogCommentSchema,
  resultSchema,
};
