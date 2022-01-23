const createError = require("http-errors");
const User = require("../models/User.model");
const { registerSchema } = require("../utils/validation.schema");

exports.getLoggedInUser = async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await User.findById(userId).select("-password");

    if (!user) throw new createError.NotFound("User couldn't found.");

    res.status(200).json({ ok: true, user });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, username, email, password } =
      await registerSchema.validateAsync(req.body);

    const { userId } = req.payload;
    const user = await User.findById(userId).select("-password");

    if (!user) throw new createError.NotFound("User couldn't found.");

    // Update profile

    user.email = email;
    user.password = password;
    user.username = username;
    user.name = name;
    await user.save();
    res.status(200).json({ ok: true, output });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};
