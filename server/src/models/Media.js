const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    name: String,
    type: {
      type: String,
      enum: ["image", "video"],
    },
    path: String,
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", mediaSchema);
