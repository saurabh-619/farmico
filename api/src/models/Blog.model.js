const { Schema, model, Types } = require("mongoose");

const likeSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      //   unique: true,
    },
  },
  { timestamps: true }
);

const commentSchema = new Schema(
  {
    body: {
      type: String,
      trim: true,
      minlength: 10,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const blogSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    locale: {
      type: String,
      enum: ["en", "mr", "hi"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 150,
    },
    slug: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    body: {
      type: String,
      minlength: 200,
      // maxlength: 10000,
    },
    bodyPreview: {
      type: String,
    },
    readTime: {
      // In min
      type: Number,
      required: true,
    },
    likes: {
      type: [likeSchema],
      default: [],
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Text index for search fast
blogSchema.index({ title: "text", slug: "text" });

// blogSchema.virtual("likesCount").get(function () {
//   return this.likes.length;
// });

// blogSchema.virtual("commentsCount").get(function () {
//   return this.comments.length;
// });

module.exports = model("Blog", blogSchema);
