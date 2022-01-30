const Blog = require("../models/Blog.model");
const createError = require("http-errors");

exports.getBlogs = async (req, res, next) => {
  try {
    let { page, limit, sortBy = "createdAt", dir = "asc" } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .limit(limit)
      .skip(skip)
      .sort({
        [sortBy]: dir,
      });
    res.status(200).json({ ok: true, page, size: blogs.length, blogs });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.getBlog = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new createError.NotFound("Blog couldn't found.");
  try {
    const blog = await Blog.findById(id);
    if (!blog) throw new createError.NotFound("Blog couldn't found.");
    res.status(200).json({ ok: true, blog });
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
    await blog.remove();
    res.status(200).json({ ok: true });
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

    if (blog.likes.includes(req.userId)) {
      blog.likes.filter((like) => like.user !== req.userId);
    } else {
      blog.likes.push({ user: req.userId });
    }

    await blog.save();

    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.commentABlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { id } = req.params;
    if (!id) throw new createError.NotFound("Blog couldn't found.");
    const blog = await Blog.findById(id);
    if (!blog) throw new createError.NotFound("Blog couldn't found.");

    const { body: comment } = await registerSchema.validateAsync(req.body);

    blog.comment.push({ user: req.userId, body: comment });

    await blog.save();

    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.createABlog = async (req, res, next) => {
  try {
    const { language, title, subtitle, body } =
      await registerSchema.validateAsync(req.body);

    const blog = new Blog({
      language,
      title,
      subtitle,
      body,
      author: req.userId,
    });

    await blog.save();

    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};
