exports.getResults = async (req, res, next) => {
  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.getResult = async (req, res, next) => {
  const { id } = req.params;

  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.postResult = async (req, res, next) => {
  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.deleteResult = async (req, res, next) => {
  const { id } = req.params;

  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};
