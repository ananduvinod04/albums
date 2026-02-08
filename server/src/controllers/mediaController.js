const Media = require("../models/Media");
exports.addMedia = async (req, res) => {
  const { name, type, albumId } = req.body;

  // 🔥 STORE URL PATH, NOT OS PATH
  const media = await Media.create({
    name,
    type,
    albumId,
    path: `/media/${name}`,
  });

  res.json(media);
};

exports.getMediaByAlbum = async (req, res) => {
  const media = await Media.find({
    albumId: req.params.albumId,
  });
  res.json(media);
};
