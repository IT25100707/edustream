// Favorite - owned by FavoriteManager
// A playlist a learner has saved to their favourites.
const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: [true, "userId is required"], trim: true }, // TODO: User reference once auth exists
    playlist: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist", required: true },
  },
  { timestamps: true }
);

// A learner can only favourite the same playlist once
favoriteSchema.index({ userId: 1, playlist: 1 }, { unique: true });
module.exports = mongoose.model("Favorite", favoriteSchema);