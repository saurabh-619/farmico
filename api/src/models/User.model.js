const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      index: true,
      unique: [true, "Username is already taken"],
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please use valid email",
      ],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (userInputPassword) {
  try {
    const isCorrect = await bcrypt.compare(userInputPassword, this.password);
    return isCorrect;
  } catch (error) {
    next(error);
  }
};

module.exports = model("User", userSchema);
