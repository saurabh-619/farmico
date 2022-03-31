const createError = require("http-errors");
const User = require("../models/User.model");
const {
  registerSchema,
  updateUserSchema,
} = require("../utils/validation.schema");

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

exports.getAUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log({ id });
    const user = await User.findById(id).select("-password");

    if (!user) throw new createError.NotFound("User couldn't found.");

    res.status(200).json({ ok: true, user });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, username, email, password, profilePhoto } =
      await updateUserSchema.validateAsync(req.body);

    console.log({ password });

    const { userId } = req.payload;
    const user = await User.findById(userId);

    if (!user) throw new createError.NotFound("User couldn't found.");

    // Update profile

    await User.updateOne(
      { _id: userId },
      {
        $set: {
          ...req.body,
        },
      }
    );

    // user.email = email;
    // user.password = password;
    // user.username = username;
    // user.name = name;
    // await user.save();
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.checkIfUsernameAvailable = async (req, res, next) => {
  try {
    const { value } = req.query;
    const count = await User.countDocuments({ username: value });
    res.status(200).json({ isAvailable: count === 0, count });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};
