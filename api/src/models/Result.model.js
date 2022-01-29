const { Schema, model, Types } = require("mongoose");

const resultSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    model_type: {
      type: String,
      enum: ["disease", "weed"],
      required: true,
    },
    confidence: {
      type: Types.Decimal128,
      required: true,
    },
    // 1. Disease detection model
    // Tomato healthy or Tomato Blind Spot
    label: {
      type: String,
      required: false,
    },
    // healthy images will have healthy written at end
    isUnhealthy: {
      type: Boolean,
      default: false,
    },
    // 2. Weed detection model
    hasWeed: {
      type: Boolean,
      default: false,
    },
    resultImg: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Result", resultSchema);
