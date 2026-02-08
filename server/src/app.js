const express = require("express");
const cors = require("cors");
const albumRoutes = require("./routes/albumRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const path = require("path");
const os = require("os");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/media",
  express.static(path.join(os.homedir(), "AlbumsMedia"))
);
app.get("/", (req, res) => {
  res.send("Albums API running");
});
app.use("/albums", albumRoutes);
app.use("/media", mediaRoutes);
module.exports = app;
