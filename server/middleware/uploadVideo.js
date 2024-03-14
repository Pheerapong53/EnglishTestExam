const multer = require('multer');
const path = require('path');
const fs = require("fs");
const { StatusCodes } = require('http-status-codes')
const errorHandler = require('http-errors')

let filestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // const { prImage } = req.body
        // console.log("prImage: ", prImage)
        console.log("req.files: ", req.files)
        // console.log("req.body: ", req.body)
        // console.log("req.user: ", req.user)
        if (!fs.existsSync("../server/public/videos")) {
            fs.mkdirSync("../server/public/videos");
        }
        cb(null, '../server/public/videos')
        // cb(null, path.resolve(__dirname, '../server/public/videos'));
      },                    
      filename: function (req, file, cb) {
        const { pubrel_id } = req.body
        // const image_id = [] //รหัสภาพ
        const d = new Date();
        const month = d.getMonth()+1 <= 9 ? ("0" + (d.getMonth() + 1)).slice(-2) : d.getMonth()+1;
        const yearTh = d.getFullYear() + 543;
        const dateD = month + yearTh;
        // for(let j = 0; j < req.files.length; j++) {
          const primgcode = pubrel_id + dateD + "-VDO"+ d.getMinutes() + d.getMilliseconds();
          // const primgcode = `PR-${j+1}-` + dateD + "-IMG"+ d.getMinutes() + d.getMilliseconds();
          // image_id.push(primgcode)
          // cb(null,  image_id[j] + path.extname(file.originalname))
          cb(null, primgcode  + path.extname(file.originalname))
        // }
        // cb(null,  Date.now() + path.extname(file.originalname))
        // for(let i = 0; i < prImage.length; i++) {
        //     cb(null, prImage[i].primgcode + path.extname(file.originalname))
        // }
      } 
    });
exports.uploadVideo = multer({ 
    storage: filestorage,
    // limits: {
    //     fileSize: 100000000,
    // },
    fileFilter(req, file, cb) {
        var ext = path.extname(String(file.originalname));

        if (ext !== ".mp4" && ext !== ".mov") {
          // res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
          //   'Only .png and .jpg format allowed!',));
          req.fileValidationError = "Only .mov and .mov format allowed!";
          return cb(null, false, req.fileValidationError)
                  // 'Only videos are allowed!',)))
        }   
        cb(null, true);
    },
    preservePath: true,
 }).any('vdo')
//  }).any('images');
//  .single('prImage')