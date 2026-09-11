// Content - owned by ContentCreator
// A short video tutorial uploaded by a tutor.
const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true, maxlength: 120 },
    description: { type: String, trim: true, default: "" },
    videoUrl: { type: String, required: [true, "Video URL is required"], trim: true },
    thumbnailUrl: { type: String, trim: true, default: "" },
    durationSeconds: { type: Number, min: 0, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    tutorName: { type: String, required: true, trim: true }, // TODO: replace with a User reference once auth exists
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);