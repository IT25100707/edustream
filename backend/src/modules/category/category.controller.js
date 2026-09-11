// Category controller — owned by CategoryManager
// Each function handles one request. Errors thrown here are caught by
// asyncHandler and sent to the central errorHandler.
const Category = require("./category.model");

// GET /api/categories
exports.getAll = async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
};

// GET /api/categories/:id
exports.getOne = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
};

// POST /api/categories
exports.create = async (req, res) => {
  const { name, description, icon, isActive } = req.body;
  const category = await Category.create({ name, description, icon, isActive });
  res.status(201).json(category);
};

// PUT /api/categories/:id
exports.update = async (req, res) => {
  const { name, description, icon, isActive } = req.body;
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, description, icon, isActive },
    { new: true, runValidators: true }
  );
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
};

// DELETE /api/categories/:id
exports.remove = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json({ message: "Category deleted", id: category._id });
};
