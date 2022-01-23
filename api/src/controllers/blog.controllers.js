exports.getBlogs = async (req, res, next) => {
  try {
    res.status(200).json({ ok: true });
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
