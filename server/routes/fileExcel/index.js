const express = require("express");
const routes = express.Router();
const multer = require('multer');
const app = express();
const path = require('path');
const { verifyToken } = require("../../middleware/VerifyToken");

const storageFile = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname);
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    },
})
const uploadFile = multer({storage: storageFile});

routes.get("/download", async(req, res) => {
    const file = path.join(__dirname,'Template.xlsx');
    res.download(file, 'Template.xlsx');
})
routes.post("/uploadtemplate", verifyToken, function(req, res){
    uploadFile.single("file")(req, res, (err) => {
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
            message: "File Template uploaded successfully",
            fileName: req.file.originalname,
          });
    });
});

module.exports = routes;