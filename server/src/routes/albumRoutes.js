const express = require("express");
const {
  createAlbum,
  getAlbums,
} = require("../controllers/albumController");

const router = express.Router();

router.post("/", createAlbum);
router.get("/", getAlbums);

module.exports = router;
