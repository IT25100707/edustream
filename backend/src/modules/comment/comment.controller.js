// Comment controller - owned by CommentManager
// getAll and create are implemented as a starting point.
// TODO (CommentManager): implement getOne, update and remove, then add any
// module-specific actions (see the Category module for the pattern).
const Comment = require("./comment.model");

// GET /api/comments
exports.getAll = async (req, res) => {
  const items = await Comment.find().populate("video", "title").sort({ createdAt: -1 });
  res.json(items);
};

// GET /api/comments/:id
exports.getOne = async (req, res) => {
  const item = await Comment.findById(req.params.id).populate("video", "title");
  if (!item) return res.status(404).json({ message: "Comment not found" });
  res.json(item);
};

// POST /api/comments
exports.create = async (req, res) => {
  const { video, userId, userName, body, parent } = req.body;
  const item = await Comment.create({ video, userId, userName, body, parent });
  res.status(201).json(item);
};

// PUT /api/comments/:id
exports.update = async (req, res) => {
  // TODO (CommentManager): whitelist the fields that may be updated
  const item = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: "Comment not found" });
  res.json(item);
};

// DELETE /api/comments/:id
exports.remove = async (req, res) => {
  const item = await Comment.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Comment not found" });
  res.json({ message: "Comment deleted", id: item._id });
};