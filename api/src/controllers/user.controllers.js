exports.getLoggedInUser = (req, res, next) => {
  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.updateProfile = (req, res, next) => {
  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};
