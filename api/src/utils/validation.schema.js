const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().trim().required(),
});

module.exports = { registerSchema, loginSchema };
