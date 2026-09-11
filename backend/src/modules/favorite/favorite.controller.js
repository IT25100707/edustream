// Favorite controller - owned by FavoriteManager
// getAll and create are implemented as a starting point.
// TODO (FavoriteManager): implement getOne, update and remove, then add any
// module-specific actions (see the Category module for the pattern).
const Favorite = require("./favorite.model");

// GET /api/favorites
exports.getAll = async (req, res) => {
  const items = await Favorite.find().populate("playlist", "title level").sort({ createdAt: -1 });
  res.json(items);
};

// GET /api/favorites/:id
exports.getOne = async (req, res) => {
  const item = await Favorite.findById(req.params.id).populate("playlist", "title level");
  if (!item) return res.status(404).json({ message: "Favorite not found" });
  res.json(item);
};

// POST /api/favorites
exports.create = async (req, res) => {
  const { userId, playlist } = req.body;
  const item = await Favorite.create({ userId, playlist });
  res.status(201).json(item);
};

// PUT /api/favorites/:id
exports.update = async (req, res) => {
  // TODO (FavoriteManager): whitelist the fields that may be updated
  const item = await Favorite.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: "Favorite not found" });
  res.json(item);
};

// DELETE /api/favorites/:id
exports.remove = async (req, res) => {
  const item = await Favorite.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Favorite not found" });
  res.json({ message: "Favorite deleted", id: item._id });
};