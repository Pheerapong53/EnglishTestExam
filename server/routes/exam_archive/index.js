const express = require("express");
const routes = express.Router();
const multer = require('multer');
const app = express();
const exam = require("./exam");
const {verifyToken} = require("../../middleware/VerifyToken");
const path = require("path");
const fs = require("fs");
//const upload = multer({dest:'../fileexam/'});

routes.get("/indvform",verifyToken,async(req,res) => {
  res.send(await exam.getindvform(req));
});
routes.get('/introvideo',async(req, res) => {
  await exam.introVideo(req, res);
});
routes.get("/getquestion", async(req, res) =>{
  res.send(await exam.getquestion());
});
routes.get("/getchoice", async(req, res) =>{
  res.send(await exam.getchoice());
});
routes.get("/getquestioninfo",verifyToken, async(req, res) => {
    res.send(await exam.getquestioninfo());
});
routes.get("/getquestionfilterbycerfcode/:cerfcode",verifyToken, async(req,res) => {
  res.send(await exam.getquestionfilterbycerfcode(req));
})
routes.get("/getquestionlist",verifyToken, async(req, res) => {
    res.send(await exam.getquestionlists());
})
routes.get("/getchoicebyquestioncode/:questioncode",verifyToken, async(req,res) => {
  res.send(await exam.getchoiceByQuestioncode(req));
})
routes.get("/getchoicelist",verifyToken, async(req, res) => {
  res.send(await exam.getchoicelists());
})
routes.put("/editcefrlevel", async(req,res, next) => {
  res.send(await exam.editcefrlevel(req,res, next));
})
routes.put("/editquestionandchoice", async(req,res) => {
  res.send(await exam.editquestionandchoice(req,res));
})
routes.put("/editchoice", async(req,res) => {
  try {
    const result = await exam.editchoice(req);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in editchoice route:", error.message || error);
    return res.status(500).json({ msg: "Error editing choices" });
  }
})
routes.delete("/delcefrlevel/:id",verifyToken, async(req,res) =>{
    res.send(await exam.delcefrlevel(req, res));
})
routes.delete("/delquestionandchoice/:questioncode", async(req,res) =>{
  res.send(await exam.delquestionandchoice(req, res));
})
routes.post("/addexamone",verifyToken, async(req,res,next) => {
    res.send(await exam.addexamone(req,res,next));
})
routes.post("/addcefrlevel",verifyToken, async(req,res,next) =>{
  res.send(await exam.addcefrlevel(req,res,next));
  //res.send(req.body);
})
routes.post("/addmanyexam",verifyToken, async(req,res) => {
  //res.send(req.body);
  res.send(await exam.addmanyexam(req,res));
})
routes.get("/getcefrlevel/:cefrlevel",verifyToken, async(req,res) => {
  res.send(await exam.getcefrlevel(req));
})


//Upload Files
const ensureDirectoryExistence = (dir) => {
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, {recursive: true});
  }
};
const storagetext = multer.diskStorage({
    destination: ('./fileproblem/text/'),
    filename: function (req, file, cb) {
      // null as first argument means no error
    
      cb(null, file.originalname)
    },
  })

const storagesoundfix = multer.diskStorage({
  
    destination: (`./routes/fileproblem/sound/`),
    filename: function (req, file, cb) {
      // null as first argument means no error
    
      cb(null, file.originalname)
    },
  });

  const storagesound = multer.diskStorage({
  
    destination: (req, file, cb) => {
      const { formcode } = req.body;
  
      // Log formcode to check if it's undefined
      console.log('Received formcode:', formcode);
  
      if (!formcode) {
        return cb(new Error('Formcode is missing'));
      }
  
      const uploadDir = path.join(__dirname, `../routes/fileproblem/sound/${formcode}`);
      
      // Ensure the directory exists
      ensureDirectoryExistence(uploadDir);
  
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const { problem } = req.body;
  
      // Log problem to check if it's undefined
      console.log('Received problem:', problem);
  
      if (!problem) {
        return cb(new Error('Problem is missing'));
      }
  
      cb(null, problem);
    },
  });

const uploadtext = multer({storage: storagetext})
const uploadsound = multer({storage: storagesoundfix})

routes.post('/upload',verifyToken,uploadtext.single('file'),(req,res) => {
    console.log(req.file);
    res.send("file save on server");
});

routes.post('/uploadsound',verifyToken,uploadsound.single('file'),(req,res) => {
  console.log(req.file);
 res.send("File mp3 was saved on server");
});

module.exports = routes;