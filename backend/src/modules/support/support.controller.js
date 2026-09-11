// SupportTicket controller - owned by TechnicalSupporter
// getAll and create are implemented as a starting point.
// TODO (TechnicalSupporter): implement getOne, update and remove, then add any
// module-specific actions (see the Category module for the pattern).
const SupportTicket = require("./support.model");

// GET /api/support
exports.getAll = async (req, res) => {
  const items = await SupportTicket.find().sort({ createdAt: -1 });
  res.json(items);
};

// GET /api/support/:id
exports.getOne = async (req, res) => {
  const item = await SupportTicket.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "SupportTicket not found" });
  res.json(item);
};

// POST /api/support
exports.create = async (req, res) => {
  const { userId, email, subject, message, category, priority } = req.body;
  const item = await SupportTicket.create({ userId, email, subject, message, category, priority });
  res.status(201).json(item);
};

// PUT /api/support/:id
exports.update = async (req, res) => {
  // TODO (TechnicalSupporter): whitelist the fields that may be updated
  const item = await SupportTicket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: "SupportTicket not found" });
  res.json(item);
};

// DELETE /api/support/:id
exports.remove = async (req, res) => {
  const item = await SupportTicket.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "SupportTicket not found" });
  res.json({ message: "SupportTicket deleted", id: item._id });
};