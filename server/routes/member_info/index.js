// var routes = require('express').Router();
const express = require("express");
const routes = express.Router();
//const { addMember } = require("./member");
const member = require("./member");
const { response } = require("express");
const { verifyToken } = require("../../middleware/VerifyToken");

//เพิ่มroutesใหม่
routes.get("/get",verifyToken, (request, response) => {
  return response.send("Test GetMember");
});

//test route
routes.post("/addmemberandright",verifyToken, async (req, res,next)=>{
  if(req !== undefined){
    res.send(await member.addMemberAndRight(req, res, next));
  }else{
    res.send("Cannot get req");
  }
});

//test token
routes.post("/addmemberandrighttest",verifyToken, async (req, res,next)=>{
  if(req !== undefined){
    res.send("Test Token");
  }else{
    res.send("Cannot get req");
  }
});

routes.get("/getmemberinfo",verifyToken, async (req, res) => {
  res.send(await member.getmemberinfo());
});

routes.put("/editmember",verifyToken, async(req, res) => {
  res.send(await member.editmember(req, res));
});

routes.delete("/delmember/:id",verifyToken, async(req, res) => {
  res.send(await member.delmember(req, res));
})

module.exports = routes;
