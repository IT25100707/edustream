// Express app: middleware + one router per stakeholder module.
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./middleware/errorHandler");

// One module per stakeholder — each member owns one folder under src/modules
const categoryRoutes = require("./modules/category/category.routes");
const contentRoutes = require("./modules/content/content.routes");
const playlistRoutes = require("./modules/playlist/playlist.routes");
const favoriteRoutes = require("./modules/favorite/favorite.routes");
const commentRoutes = require("./modules/comment/comment.routes");
const supportRoutes = require("./modules/support/support.routes");

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());
app.use(morgan("dev"));

// Health check — open http://localhost:5000/api/health to confirm the API is up
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "edustream-api" });
});

app.use("/api/categories", categoryRoutes);   // CategoryManager
app.use("/api/content", contentRoutes);       // ContentCreator
app.use("/api/playlists", playlistRoutes);    // PlaylistManager
app.use("/api/favorites", favoriteRoutes);    // FavoriteManager
app.use("/api/comments", commentRoutes);      // CommentManager
app.use("/api/support", supportRoutes);       // TechnicalSupporter

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use(errorHandler);

module.exports = app;
