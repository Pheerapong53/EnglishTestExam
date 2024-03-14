const express = require("express");
const routes = express.Router();
const app = express();
const fs = require("fs");
const { verifyToken } = require("../../middleware/VerifyToken");

routes.get("/getfiletext/:form/:fileId",verifyToken, (req, res) => {
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

routes.get("/getfilesound/:form/:fileId",verifyToken, (req, res) => {
  const form = req.params.form;
  const fileId = req.params.fileId;
  //const filesound = "/F0001/F0001L1A1001.mp3"
  const filePath = __dirname + `/sound/${form}/` + fileId;

  fs.readFile(filePath, (err, data) => {
    if(err) {
        console.error(err);
        res.status(500).send("Error reading the file");
    }else{
        var base64File = new Buffer(data, 'binary').toString('base64');
        res.json(base64File);
    }
  });
});

module.exports = routes;
