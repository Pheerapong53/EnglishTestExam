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
routes.get("/introvideo",async(req, res) => {
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
  try {
    const result = await exam.editquestionandchoice(req);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in editchoice route:", error.message || error);
    return res.status(500).json({ msg: "Error editing choices" });
  }
})
routes.delete("/delcefrlevel/:id",verifyToken, async(req,res) =>{
    res.send(await exam.delcefrlevel(req, res));
})
routes.delete("/delquestionandchoice/:questioncode",verifyToken, async(req,res) =>{
  res.send(await exam.delquestionandchoice(req, res));
})
routes.delete("/delform/:formcode",verifyToken, async(req,res) =>{
  res.send(await exam.delform(req, res));
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

module.exports = routes;