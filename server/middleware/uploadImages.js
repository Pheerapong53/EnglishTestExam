const multer = require('multer');
const path = require('path');
const fs = require("fs");
let filestorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        // console.log("req.files upload vdo: ", req.files['vdo'][1])
        // console.log("req.files upload img: ", req.files['img'])
        // console.log("file.fieldname: ", file.fieldname)
        // console.log("file.mimetype: ", file.mimetype)
        // console.log("req.body: ", req.body)
        if (file.fieldname === "img") {
          if (!fs.existsSync("../server/public/images")) {
              fs.mkdirSync("../server/public/images");
          }
          cb(null, '../server/public/images')
        } else if (file.fieldname === "vdo") {
          if (!fs.existsSync("../server/public/videos")) {
            fs.mkdirSync("../server/public/videos");
          }
          cb(null, '../server/public/videos')
        }
      },                    
      filename: async function (req, file, cb) {
        const { pubrel_id } = await req.body
        // console.log("pub_id", pub_id)
        // console.log("req.body.pubrel_id", JSON.parse(req.body))
        // console.log("pubrel_id", await pubrel_id)
        // console.log("req.body filename", req.body)
        // const pubrel_id_vdo = pubrel_id
        const d = new Date();
        const month = d.getMonth()+1 <= 9 ? ("0" + (d.getMonth() + 1)).slice(-2) : d.getMonth()+1;
        const yearTh = d.getFullYear() + 543;
        const dateD = month + yearTh;
        // if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        if (file.fieldname === "img"){
          const primgcode = await pubrel_id + dateD + "-IMG"+ d.getMinutes() + d.getMilliseconds() + Math.floor(Math.random()*10);
          cb(null, primgcode  + path.extname(file.originalname))
        } else if (file.fieldname === "vdo") {
          const prvdocode = await "VDO-" + dateD + "-"+ d.getMinutes() + d.getMilliseconds() + Math.floor(Math.random()*10);
          cb(null, prvdocode  + path.extname(file.originalname))
        }
        
        
      } 
    });
exports.upload = multer({ 
    storage: filestorage,
    // limits: {
    //     fileSize: 100000000,
    // },
    fileFilter(req, file, cb) {
        var ext = path.extname(String(file.originalname));
        // console.log("ext: ", ext)

        if (ext !== ".png" && ext !== ".jpg" && ext !== ".mp4" && ext !== ".mov") {
          req.fileValidationError = "Only .png, .jpg, .mp4 and .mov format allowed!";
          return cb(null, false, req.fileValidationError)
        } 
        // else if (ext !== ".mp4" && ext !== ".mov") {
        //   req.fileValidationError = "Only .mp4 and .mov format allowed!";
        //   return cb(null, false, req.fileValidationError)
        // }
        cb(null, true);
    },
    preservePath: true,
 }).fields([
  { name: 'img', maxCount: 10 },
  { name: 'vdo', maxCount: 10 },
 ])
//  .any('img');
//  }).any('images');
//  .single('prImage')