exports.getResults = (req, res, next) => {
  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.getResult = (req, res, next) => {
  const { id } = req.params;

  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.postResult = (req, res, next) => {
  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.deleteResult = (req, res, next) => {
  const { id } = req.params;

  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};
