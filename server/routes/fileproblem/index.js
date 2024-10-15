const express = require("express");
const routes = express.Router();
const app = express();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { verifyToken } = require("../../middleware/VerifyToken");

routes.get("/getfiletext/:form/:fileId", verifyToken, (req, res) => {
  const form = req.params.form;
  const fileId = req.params.fileId;
  const filePath = __dirname + `/text/${form}/` + fileId;

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading the file");
    } else {
      res.send(data);
    }
  });
});

routes.get("/getfilesound/:form/:fileId", verifyToken, (req, res) => {
  const form = req.params.form;
  const fileId = req.params.fileId;
  //const filesound = "/F0001/F0001L1A1001.mp3"
  const filePath = __dirname + `/sound/${form}/` + fileId;

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

const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storagesound = multer.diskStorage({
  destination: function (req, file, cb) {
    const formcode = `sound/${req.params.formcode}/`;
    const uploadDir = path.join(__dirname, formcode);
    ensureDirectoryExistence(uploadDir);

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const storagetext = multer.diskStorage({
  destination: function (req, file, cb) {
    const formcode = `text/${req.params.formcode}/`;
    const uploadDir = path.join(__dirname, formcode);
    ensureDirectoryExistence(uploadDir);

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadsound = multer({ storage: storagesound });
const uploadtext = multer({ storage: storagetext });
//Upload File MP3
routes.post("/uploadsoundfile/:formcode", verifyToken, function (req, res) {
  uploadsound.single("file")(req, res, (err) => {
    console.log("File : ", req.file);

    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ message: "Multer error during upload", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Unknown error during upload", error: err });
    }

    res.json({
      message: "Sound file uploaded successfully",
      fileName: req.file.originalname,
    });
  });
});

routes.post("/uploadtextfile/:formcode", verifyToken, function (req, res) {
  uploadtext.single("file")(req, res, (err) => {
    console.log("File : ", req.file);

    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ message: "Multer error during upload", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Unknown error during upload", error: err });
    }

    res.json({
      message: "Text file uploaded successfully",
      fileName: req.file.originalname,
    });
  });
});

const storageManyFiles = multer.diskStorage({
  destination: function (req, file, cb) {
    const formcode = `sound/${req.params.formcode}/`;
    const uploadDir = path.join(__dirname, formcode);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadManyFiles = multer({
  storage: storageManyFiles,
}).array("files", 100);
routes.post("/uploadmanyfiles/:formcode", verifyToken, function (req, res) {
  uploadManyFiles(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).json({ message: "Multer error: " + err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json({ message: "Error: " + err.message });
    }

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    res.status(200).json({ message: "Files uploaded successfully!" });
  });
});

module.exports = routes;
