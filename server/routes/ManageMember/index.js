// var routes = require('express').Router();
const express = require("express");
const routes = express.Router();
const {getUser,getAccess,getPerIdAccess1,getPerIdAccess2,getPerIdAccess3,getPerIdAccess4,getPerIdAccess5,deleteUser} = require('./managemember');
const { verifyToken }= require("../../middleware/VerifyToken")


routes.get('/getUser',verifyToken, getUser);
routes.get('/getAccess',verifyToken, getAccess);
routes.put('/getPerIdAccess1/:pers_id/:valueAccess',verifyToken, getPerIdAccess1);
routes.put('/getPerIdAccess2/:pers_id/:valueAccess',verifyToken, getPerIdAccess2);
routes.put('/getPerIdAccess3/:pers_id/:valueAccess',verifyToken, getPerIdAccess3);
routes.put('/getPerIdAccess4/:pers_id/:valueAccess',verifyToken, getPerIdAccess4);
routes.put('/getPerIdAccess5/:pers_id/:valueAccess',verifyToken, getPerIdAccess5);
// routes.put('/getPerIdAccess1/:pers_id/:valueAccess', getPerIdAccess1);
// routes.put('/getPerIdAccess2/:pers_id/:valueAccess', getPerIdAccess2);
// routes.put('/getPerIdAccess3/:pers_id/:valueAccess', getPerIdAccess3);
// routes.put('/getPerIdAccess4/:pers_id/:valueAccess', getPerIdAccess4);
// routes.put('/getPerIdAccess5/:pers_id/:valueAccess', getPerIdAccess5);
routes.put('/deleteUser/:pers_id',verifyToken, deleteUser);
module.exports = routes;

