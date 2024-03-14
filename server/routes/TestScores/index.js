const express = require("express");
const routes = express.Router();
const { verifyToken }= require("../../middleware/VerifyToken")
const {gettbtestscoringcriteria,gettbtestreservation,gettbmemberinfo,getalldataTestscores,gettoscoreresvcode,Inserteditscore,appovescore,test,gettbtestresult,getperscore,getTbtestscoringcriteria,getalldataTestscoresall,gettoscoreresvcodeContentPageListTestScores,getalldataDivisionScores,getalldataContentPageListTestScoresDivision,getPagePrintTestScore,getIpv4Address} = require('./allscores');

routes.get('/getalldataTestscores/:currentMonthCount/:currentYear',verifyToken,getalldataTestscores);


routes.get('/gettoscoreresvcode/:testresvcode',verifyToken,gettoscoreresvcode);
routes.post('/Inserteditscore/:testresultcode/:edit/:pers_id',verifyToken,Inserteditscore);
routes.post('/appovescore/:testresvcode/:pers_id',verifyToken,appovescore);


routes.get('/gettbtestresult',verifyToken,gettbtestresult);
routes.get('/gettbmemberinfo',verifyToken,gettbmemberinfo);
routes.get('/gettbtestreservation',verifyToken,gettbtestreservation);
routes.get('/gettbtestscoringcriteria',verifyToken,gettbtestscoringcriteria);

routes.get('/getperscore/:pers_id',verifyToken,getperscore);

routes.get('/test',test);
routes.get('/getTbtestscoringcriteria',verifyToken,getTbtestscoringcriteria);
routes.get('/getalldataTestscoresall/:selectMissions',verifyToken,getalldataTestscoresall);
routes.get('/gettoscoreresvcodeContentPageListTestScores/:testscoringcriteria/:testreqdate/:testreqtime',verifyToken,gettoscoreresvcodeContentPageListTestScores);
routes.get('/getalldataDivisionScores/:company',verifyToken,getalldataDivisionScores);
routes.get('/getalldataContentPageListTestScoresDivision/:company/:datebook',verifyToken,getalldataContentPageListTestScoresDivision);
routes.get('/getPagePrintTestScore/:perid/:testappvcode',verifyToken,getPagePrintTestScore);
routes.get('/api/ipv4',getIpv4Address);


module.exports = routes;

