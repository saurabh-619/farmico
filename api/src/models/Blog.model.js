const { mongoose, Schema, model } = require("../lib");

const blogSchema = new Schema(
  {
    creator: {
      type: Schema.Types,
      ref: "User",
      required: true,
    },
    language: {
      type: String,
      enum: ["en", "mr", "hi"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 80,
      index: true,
    },
    slug: {
      type: String,
      index: true,
    },
    subtitle: {
      type: String,
    },
    body: {
      type: String,
      minlength: 0,
      maxlength: 80,
    },
    readTime: {
      type: Number,
      minlength: 50,
      maxlength: 1000,
      required: true,
    },
  },
  { timestamps: true }
);

exports.Blog = model("Blog", blogSchema);
