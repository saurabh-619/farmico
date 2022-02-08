const Blog = require("../models/Blog.model");
const createError = require("http-errors");
const { blogSchema, blogCommentSchema } = require("../utils/validation.schema");

exports.getBlogs = async (req, res, next) => {
  try {
    let { page, limit, sortBy, order } = req.query;

    sortBy = sortBy || "createdAt";
    order = order || "asc";

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .select("-likes -comments")
      .populate("author", "_id name username")
      .limit(limit)
      .skip(skip)
      .sort({
        [sortBy]: order,
      });
    res.status(200).json({
      ok: true,
      page,
      size: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.getBlog = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new createError.NotFound("Blog couldn't found.");
  try {
    const blog = await Blog.findById(id)
      .populate("author", "_id name username email")
      .populate("likes.user", "_id name username email")
      .populate("comments.user", "_id name username email");
    if (!blog) throw new createError.NotFound("Blog couldn't found.");
    res.status(200).json({
      ok: true,
      blog,
    });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.searchBlogs = async (req, res, next) => {
  try {
    const { text } = req.query;

    const blogs = await Blog.find(
      { $text: { $search: text } },
      { score: { $meta: "textScore" } }
    )
      .select("title subtitle locale slug")
      .populate("author", "id username name")
      .sort({
        score: "desc",
      })
      .limit(12);

    res.status(200).json({ ok: true, blogs });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new createError.NotFound("Blog couldn't found.");
    const blog = await Blog.findById(id);
    if (!blog) throw new createError.NotFound("Blog couldn't found.");

    const isAuthor = blog.author.toString() === req.userId;
    if (!isAuthor)
      throw new createError.Forbidden(
        "You don't have enough privilege to proceed this request."
      );

    await blog.remove();
    res.status(201).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.likeABlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new createError.NotFound("Blog couldn't found.");
    const blog = await Blog.findById(id);
    if (!blog) throw new createError.NotFound("Blog couldn't found.");

    if (
      blog.likes.find((like) => like.user.toString() === req.userId.toString())
    ) {
      // Dislike
      console.log("Disliking the post");
      blog.likes = blog.likes.filter(
        (like) => like.user.toString() !== req.userId.toString()
      );
      blog.likesCount--;
    } else {
      // like
      console.log("liking the post");
      blog.likes.push({ user: req.userId });
      blog.likesCount++;
    }

    await blog.save();

    res.status(201).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.commentABlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) throw new createError.NotFound("Blog couldn't found.");
    const blog = await Blog.findById(id);
    if (!blog) throw new createError.NotFound("Blog couldn't found.");

    const { body: comment } = await blogCommentSchema.validateAsync(req.body);

    blog.comments.push({ user: req.userId, body: comment });
    blog.commentsCount++;

    await blog.save();

    res.status(201).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

const getReadTime = (body) => {
  const WPM = 225;
  const words = body.trim().split(/\s+/).length;
  return Math.ceil(words / WPM);
};

const getSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/^-+/g, "")
    .replace(/[^\w-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/-+$/g, "");
};

exports.createABlog = async (req, res, next) => {
  try {
    const { locale, title, subtitle, body } = await blogSchema.validateAsync(
      req.body
    );

    const slug = getSlug(title);

    const readTime = getReadTime(body);

    const blog = new Blog({
      author: req.userId,
      locale,
      title,
      slug,
      subtitle,
      body,
      readTime,
    });

    await blog.save();

    res.status(201).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};
