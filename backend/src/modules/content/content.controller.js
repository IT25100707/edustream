// Content controller - owned by ContentCreator
// getAll and create are implemented as a starting point.
// TODO (ContentCreator): implement getOne, update and remove, then add any
// module-specific actions (see the Category module for the pattern).
const Content = require("./content.model");

// GET /api/content
exports.getAll = async (req, res) => {
  const items = await Content.find().populate("category", "name slug").sort({ createdAt: -1 });
  res.json(items);
};

// GET /api/content/:id
exports.getOne = async (req, res) => {
  const item = await Content.findById(req.params.id).populate("category", "name slug");
  if (!item) return res.status(404).json({ message: "Content not found" });
  res.json(item);
};

// POST /api/content
exports.create = async (req, res) => {
  const { title, description, videoUrl, thumbnailUrl, durationSeconds, category, tutorName, isPublished } = req.body;
  const item = await Content.create({ title, description, videoUrl, thumbnailUrl, durationSeconds, category, tutorName, isPublished });
  res.status(201).json(item);
};

// PUT /api/content/:id
exports.update = async (req, res) => {
  // TODO (ContentCreator): whitelist the fields that may be updated
  const item = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: "Content not found" });
  res.json(item);
};

// DELETE /api/content/:id
exports.remove = async (req, res) => {
  const item = await Content.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Content not found" });
  res.json({ message: "Content deleted", id: item._id });
};