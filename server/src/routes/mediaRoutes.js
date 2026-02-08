const express = require("express");
const {
  addMedia,
  getMediaByAlbum,
} = require("../controllers/mediaController");

const router = express.Router();

router.post("/", addMedia);
router.get("/:albumId", getMediaByAlbum);

module.exports = router;
