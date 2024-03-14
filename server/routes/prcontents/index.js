// var routes = require('express').Router();
const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const {getContents, getByid, addContents, editContents, delByid, delmediaByid, delpubrelaByid, getListBy, getList} = require('./prcontents');
const { verifyToken } = require ("../../middleware/VerifyToken");
const { upload } = require ("../../middleware/uploadImages");
// const { uploadVideo } = require ("../../middleware/uploadVideo");

routes.get('/getallcontents',verifyToken, getContents);
routes.post('/addcontents',jsonParser, verifyToken, upload, addContents);
routes.get('/getpubrelbyid/:id',verifyToken, getByid);
routes.put('/editcontents',jsonParser, verifyToken, upload, editContents);
routes.delete('/delcontents/:id',verifyToken, delByid);
routes.post('/delmedia',jsonParser, verifyToken, delmediaByid);
routes.delete('/delpubrela/:id',verifyToken ,delpubrelaByid);

routes.get('/getlistby/:count', verifyToken, getListBy);
routes.post('/getlist', jsonParser, verifyToken, getList);

module.exports = routes;
