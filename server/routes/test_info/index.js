const express = require("express");
const routes = express.Router();
const test = require("./test");
const {verifyToken} = require("../../middleware/VerifyToken");

routes.get("/gettestreservationinfo",verifyToken, async(req,res) => {
    res.send(await test.gettestreservationinfo());
});
routes.get("/gettestresult",verifyToken, async (req,res) => {
    //res.send('test');
    res.send(await test.gettestresult(req));
    // const pers_id = req.query.pers_id;
    // res.send(pers_id);
})
routes.post("/testresult",verifyToken, async(req,res,next) => {
    res.send(await test.addTestResult(req,res,next));
});

module.exports = routes;