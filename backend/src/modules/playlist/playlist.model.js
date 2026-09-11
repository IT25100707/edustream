// Playlist - owned by PlaylistManager
// An ordered list of videos that makes up a course.
const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true, maxlength: 120 },
    description: { type: String, trim: true, default: "" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    tutorName: { type: String, required: true, trim: true },
    videos: [
      {
        video: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true },
        order: { type: Number, required: true, min: 1 },
      },
    ],
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);