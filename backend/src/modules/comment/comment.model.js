// Comment - owned by CommentManager
// A comment in the moderated discussion under a video.
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    video: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true },
    userId: { type: String, required: [true, "userId is required"], trim: true }, // TODO: User reference once auth exists
    userName: { type: String, required: true, trim: true },
    body: { type: String, required: [true, "Comment body is required"], trim: true, maxlength: 2000 },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }, // set for replies
    status: { type: String, enum: ["pending", "approved", "hidden"], default: "pending" },
    moderatedBy: { type: String, trim: true, default: "" },
    likes: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);