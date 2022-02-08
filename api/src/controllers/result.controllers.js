const Result = require("../models/Result.model");
const createError = require("http-errors");
const { resultSchema } = require("../utils/validation.schema");

exports.getResults = async (req, res, next) => {
  try {
    const results = await Result.find({ user: req.userId })
      .populate("user", "_id name username email")
      .sort({
        createdAt: "desc",
      });
    res.status(200).json({ ok: true, results });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.getResult = async (req, res, next) => {
  const { id } = req.params;
  console.log({ id });

  try {
    const result = await Result.findOne({ _id: id, user: req.userId }).populate(
      "user",
      "_id name username email"
    );
    res.status(200).json({ ok: true, result });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};

exports.postResult = async (req, res, next) => {
  try {
    const { model_type, label } = await resultSchema.validateAsync(req.body);

    const isDiseaseModel = model_type === "disease";

    let isUnhealthy;
    if (isDiseaseModel && label) {
      isUnhealthy = label.split("healthy").length === 1;
    }

    const result = new Result({
      ...req.body,
      user: req.userId,
      ...(isDiseaseModel && { isUnhealthy }),
    });

    await result.save();
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

exports.deleteResult = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Result.find({ _id: id, user: req.userId });
    if (!result) {
      throw new createError.NotFound("Result couldn't find");
    }

    await Result.deleteOne({ id });
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log({ error: error.message });
    next(error);
  }
};
