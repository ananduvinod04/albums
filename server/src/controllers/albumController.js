const Album = require("../models/Album");

exports.createAlbum = async (req, res) => {
  const album = await Album.create(req.body);
  res.json(album);
};

exports.getAlbums = async (req, res) => {
  const albums = await Album.find();
  res.json(albums);
};
