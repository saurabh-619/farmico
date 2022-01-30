const { Schema, model, Types } = require("mongoose");

const likeSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: "User",
            unique: true,
        },
    },
    { timestamps: true }
);

const commentSchema = new Schema(
    {
        body: {
            type: String,
            trim: true,
            minlength: 35,
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
        likes: {
            type: [likeSchema],
        },
        comments: {
            type: [commentSchema],
        },
    },
    { timestamps: true }
);

blogSchema.virtual("likesCount").get(function () {
    return this.likes.length;
});

blogSchema.virtual("commentsCount").get(() => {
    return this.comments.length;
});

module.exports = model("Blog", blogSchema);
