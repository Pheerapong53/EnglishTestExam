const express = require("express");
const routes = express.Router();
const multer = require("multer");
const app = express();
const fs = require("fs");
const { verifyToken } = require("../../middleware/VerifyToken");

//Upload Video
const storageVideo = multer.diskStorage({
  destination: "./routes/video_doTest/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadVideo = multer({ storage: storageVideo });

routes.post(
  "/upload-video",
  verifyToken,
  uploadVideo.single("video"),
  (req, res) => {
    console.log(req.file);
    res.send("Upload Video");
  }
);

routes.get("/latest-video", (req, res) => {
  const filePath = __dirname + "/VDO_doTest.mp4";
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading the file");
    } else {
      var base64File = new Buffer(data, "binary").toString("base64");
      res.json(base64File);
    }
  });
});

routes.get("/getvideo", verifyToken, (req, res) => {
  res.send("https://youtu.be/1lJDJFZ82R0");
});

module.exports = routes;
