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

  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.voteABlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.commentABlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};
