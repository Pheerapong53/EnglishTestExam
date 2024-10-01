const express = require("express");
const routes = express.Router();
const app = express();
const fs = require("fs");
const multer = require('multer');
const path = require('path');
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


const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
const storagesoundfix = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Data : ", file ); 
    const formcode = "sound/F0001/"
    const uploadDir = path.join(__dirname, formcode);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
});
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    const formcode = `sound/${req.params.formcode}/`
    const uploadDir = path.join(__dirname, formcode);

    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
});
const uploadsound = multer({storage: storage})
//Upload File MP3
routes.post('/uploadsoundfile/:formcode',verifyToken,function(req,res){
  
  uploadsound.single('file')(req, res, (err) => {
    console.log("File : ", req.file);
    
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: 'Multer error during upload', error: err });
    } else if (err) {
      return res.status(500).json({ message: 'Unknown error during upload', error: err });
    }
    
    res.json({ message: 'Sound file uploaded successfully', fileName: req.file.originalname });
  });
})

module.exports = routes;
