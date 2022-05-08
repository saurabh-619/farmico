const Blog = require("../models/Blog.model");
const createError = require("http-errors");
const { blogSchema, blogCommentSchema } = require("../utils/validation.schema");

exports.getBlogs = async (req, res, next) => {
  try {
    let { page, limit, sortBy, order } = req.query;
    console.log({ page, limit, sortBy, order });

    sortBy = sortBy || "createdAt";
    order = order || "asc";

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const totalBlogs = await Blog.countDocuments();

    const blogs = await Blog.find()
      .select("-likes -comments")
      .populate("author", "_id name username profilePhoto isAdmin")
      .limit(limit)
      .skip(skip)
      .sort({
        [sortBy]: order,
      });
    res.status(200).json({
      ok: true,
      page,
      totalBlogs,
      size: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.getLoggedInUsersBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ author: req.userId })
      .select("-likes -comments -body")
      .sort({
        ["createdAt"]: "desc",
      });
    res.status(200).json({
      ok: true,
      size: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.getBlog = async (req, res, next) => {
  const { slug } = req.params;

  if (!slug) throw new createError.NotFound("Blog couldn't found.");

  try {
    // const blog = await Blog.findById(id)
    const blog = await Blog.findOne({ slug })
      .populate("author", "_id name username email profilePhoto isAdmin")
      .populate("likes.user", "_id name username email profilePhoto isAdmin")
      .populate(
        "comments.user",
        "_id name username email profilePhoto isAdmin"
      );
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
    const { text, limit = 7 } = req.query;

    const blogs = await Blog.find(
      { $text: { $search: text } },
      { score: { $meta: "textScore" } }
    )
      .select("title subtitle locale slug")
      .populate("author", "id username name profilePhoto isAdmin")
      .sort({
        score: "desc",
      })
      .limit(limit);

    res.status(200).json({ ok: true, blogs });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const { locale, title, subtitle, body, bodyPreview } =
      await blogSchema.validateAsync(req.body);

    const { id } = req.params;
    if (!id) throw new createError.NotFound("Blog couldn't found.");

    let blog = await Blog.findById(id);
    if (!blog) throw new createError.NotFound("Blog couldn't found.");

    const isAuthor = blog.author.toString() === req.userId;
    if (!isAuthor)
      throw new createError.Forbidden(
        "You don't have enough privilege to proceed this request."
      );

    // update
    blog.locale = locale;
    blog.title = title;
    blog.subtitle = subtitle;
    blog.body = body;
    blog.bodyPreview = bodyPreview;

    const savedBlog = await blog.save();
    res.status(201).json({ ok: true, savedBlog });
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

    let isLike = false;

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
      isLike = true;
      console.log("liking the post");
      blog.likes.push({ user: req.userId });
      blog.likesCount++;
    }

    await blog.save();

    res.status(201).json({
      ok: true,
      likeChange: isLike ? 1 : -1,
    });
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

    const savedBlog = await blog.save();

    res.status(201).json({
      ok: true,
      newComment: savedBlog.comments.find((com) => com.body === comment),
    });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.deleteAComment = async (req, res, next) => {
  const { blogId, commentId } = req.params;

  try {
    if (!blogId) throw new createError.NotFound("Blog couldn't found.");
    const blog = await Blog.findById(blogId);
    if (!blog) throw new createError.NotFound("Blog couldn't found.");

    if (
      blog.comments.find(
        (com) => com._id.toString() === commentId.toString()
      ) === undefined
    ) {
      throw new createError.NotFound("Comment couldn't found.");
    }

    blog.comments = blog.comments.filter(
      (com) => com._id.toString() !== commentId.toString()
    );
    blog.commentsCount--;

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

const getSlug = (title, locale = "en") => {
  if (locale !== "en") {
    return title.replace(/\s+/g, "-");
  }

  return title
    .toLowerCase()
    .replace(/^-+/g, "")
    .replace(/[^\w-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/-+$/g, "");
};

exports.createABlog = async (req, res, next) => {
  try {
    const { locale, title, subtitle, body, bodyPreview } =
      await blogSchema.validateAsync(req.body);

    const slug = getSlug(title, locale);

    const readTime = getReadTime(body);

    const blog = new Blog({
      author: req.userId,
      locale,
      title,
      slug,
      subtitle,
      body,
      readTime,
      bodyPreview,
    });

    await blog.save();

    res.status(201).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};
