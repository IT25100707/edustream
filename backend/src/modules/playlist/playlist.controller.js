// Playlist controller - owned by PlaylistManager
// getAll and create are implemented as a starting point.
// TODO (PlaylistManager): implement getOne, update and remove, then add any
// module-specific actions (see the Category module for the pattern).
const Playlist = require("./playlist.model");

// GET /api/playlists
exports.getAll = async (req, res) => {
  const items = await Playlist.find().populate("category", "name slug").populate("videos.video", "title durationSeconds").sort({ createdAt: -1 });
  res.json(items);
};

// GET /api/playlists/:id
exports.getOne = async (req, res) => {
  const item = await Playlist.findById(req.params.id).populate("category", "name slug").populate("videos.video", "title durationSeconds");
  if (!item) return res.status(404).json({ message: "Playlist not found" });
  res.json(item);
};

// POST /api/playlists
exports.create = async (req, res) => {
  const { title, description, category, tutorName, videos, level, isPublished } = req.body;
  const item = await Playlist.create({ title, description, category, tutorName, videos, level, isPublished });
  res.status(201).json(item);
};

// PUT /api/playlists/:id
exports.update = async (req, res) => {
  // TODO (PlaylistManager): whitelist the fields that may be updated
  const item = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: "Playlist not found" });
  res.json(item);
};

// DELETE /api/playlists/:id
exports.remove = async (req, res) => {
  const item = await Playlist.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Playlist not found" });
  res.json({ message: "Playlist deleted", id: item._id });
};