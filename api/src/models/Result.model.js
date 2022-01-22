const { Schema, model } = require("mongoose");

const resultSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", (next) => {
//     next();
// })

module.exports = model("Result", resultSchema);
