// SupportTicket - owned by TechnicalSupporter
// A technical support request raised by a learner or tutor.
const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema(
  {
    userId: { type: String, required: [true, "userId is required"], trim: true }, // TODO: User reference once auth exists
    email: { type: String, required: [true, "Email is required"], trim: true, lowercase: true },
    subject: { type: String, required: [true, "Subject is required"], trim: true, maxlength: 150 },
    message: { type: String, required: [true, "Message is required"], trim: true, maxlength: 4000 },
    category: { type: String, enum: ["account", "video-playback", "payment", "bug", "other"], default: "other" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    status: { type: String, enum: ["open", "in-progress", "resolved", "closed"], default: "open" },
    assignedTo: { type: String, trim: true, default: "" },
    resolutionNote: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupportTicket", supportSchema);