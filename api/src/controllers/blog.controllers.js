exports.getBlogs = (req, res, next) => {
  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.getBlog = (req, res, next) => {
  const { id } = req.params;

  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.deleteBlog = (req, res, next) => {
  try {
    const { id } = req.params;

    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.voteABlog = (req, res, next) => {
  const { id } = req.params;

  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.commentABlog = (req, res, next) => {
  const { id } = req.params;

  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};
