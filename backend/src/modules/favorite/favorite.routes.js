// Favorite routes - owned by FavoriteManager
// Mounted at /api/favorites in src/app.js
const router = require("express").Router();
const asyncHandler = require("../../utils/asyncHandler");
const controller = require("./favorite.controller");

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.post("/", asyncHandler(controller.create));
router.put("/:id", asyncHandler(controller.update));
router.delete("/:id", asyncHandler(controller.remove));

module.exports = router;