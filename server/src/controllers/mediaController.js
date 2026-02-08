const Media = require("../models/Media");

exports.addMedia = async (req, res) => {
  const media = await Media.create(req.body);
  res.json(media);
};

exports.getMediaByAlbum = async (req, res) => {
  const media = await Media.find({
    albumId: req.params.albumId,
  });
  res.json(media);
};
