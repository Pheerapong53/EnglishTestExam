const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { verifyToken } = require("../../middleware/VerifyToken");
const { upload } = require("../../middleware/uploadImages");
const path = require("path");
const CLTestMgmt = require('./CLTestMgmt');
const { convertToEngDate } = require('../../function/GlobalFunctions');
//const CLBookDate = require('../pg_bookdate/CLBookDate');

/*const th_month = [
    'ม.ค.', 'ก.พ', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];
const convertToEngDate = (thdate) => {
    let d = thdate.split(' ');
    d[1] = (th_month.indexOf(d[1]) + 1) < 10 ? '0'.concat((th_month.indexOf(d[1]) + 1).toString()) : (th_month.indexOf(d[1]) + 1).toString();
    d[2] = (Number(d[2]) - 543).toString();
    return (d.reverse().join('-'));
}*/

routes
    .put('/testmgmt/showscoringcriteria/rsrvcode/:rsrvcode/scoringshowed/:scoringshowed', async (req, res) => {
        const { rsrvcode, scoringshowed } = req.params;
        res.send(await CLTestMgmt.setShowScoringCriteria(rsrvcode, scoringshowed));
    })

    .put('/testmgmt/invigilator/rsrvcode/:rsrvcode/invigilator_id/:invigilator_id', async (req, res) => {
        const { rsrvcode, invigilator_id } = req.params;
        res.send(await CLTestMgmt.updateTestInvigilator(rsrvcode, invigilator_id));
    })

    .put('/testmgmt/seltesttype/rsrvcode/:rsrvcode/testtype/:testtype', async (req, res) => {
        const { rsrvcode, testtype } = req.params;
        res.send(await CLTestMgmt.updateTestType(rsrvcode, testtype));
    })

    .put('/testmgmt/indvseltesttype/testresultcode/:testresultcode/testtype/:testtype', async (req, res) => {
        const { testresultcode, testtype } = req.params;
        res.send(await CLTestMgmt.updateIndvTestType(testresultcode, testtype));
    })

    .put('/testmgmt/loc_inv/:data', async (req, res) => {
        let reqdata = JSON.parse(req.params.data);
        //console.log('/testmgmt/loc_inv/...', reqdata);
        res.send(await CLTestMgmt.updateTestLocationAndInvigilator(reqdata));
    })

    .get('/testmgmt/gettestresultbydatetime/resvcode/:resvcode/date/:reqdate/time/:reqtime', async (req, res) => {
        const { resvcode, reqdate, reqtime } = req.params;
        res.send(await CLTestMgmt.fetchTestResultByDateAndTime(resvcode, convertToEngDate(reqdate), reqtime));
    })

    /*----------------------------- added on 01-11-2023 --------------------------*/
    .get('/testmgmt/testresultbydatetimelabroom/labroom/:labroom/date/:reqdate/time/:reqtime', async (req, res) => {
        const { labroom, reqdate, reqtime } = req.params;
        console.log('/testmgmt ---> ', req.params);
        //res.send(await CLTestMgmt.fetchTestResultByDateAndTime(resvcode, convertToEngDate(reqdate), reqtime));
    })

    /*----------------------------- added on 03-11-2023 -----------------------------------------------*/
    .get('/testmgmt/alltestresultbydateandtime/date/:date/time/:time', async (req, res) => {
        const { date, time } = req.params;
        res.send(await CLTestMgmt.getAllTestResultByDateTime(date, time));
    })

    /*----------------------------- added on 03-11-2023 -----------------------------------------------*/
    .put('/testmgmt/updatetestinvigilatorbydatetime/date/:date/time/:time/labroom/:labroom/newinvigilator/:newinvigilator', async (req, res) => {
        const { date, time, labroom, newinvigilator } = req.params;
        //console.log('===========---------> ', req.params)
        res.send(await CLTestMgmt.updateTestInvigilatorByDateAndTime(date, time, labroom, newinvigilator));
    })

    /*----------------------------- added on 11-11-2023 -----------------------------------------------*/
    .put('/testmgmt/updatelabroombyindvtestresultcode/testresultcode/:testresultcode/labroom/:labroom/invigilator/:invigilator',
        async (req, res) => {
            const { testresultcode, labroom, invigilator } = req.params;
            //console.log('updatelabroombyindvtestresultcode ===-->', req.params);
            let tmpinv = invigilator;
            if (tmpinv === 'undefined') {
                tmpinv = null;
            }
            res.send(await CLTestMgmt.updateLabroomByIndvTestResultCode(testresultcode, labroom, tmpinv));
        })

    /*----------------------------- added on 11-11-2023 : Test Form  -----------------------------------------------*/
    .get('/testmgmt/fetchalltestform', async (req, res) => {
        let testfrm = await CLTestMgmt.fetchAllTestForm();
        //console.log('testfrm ----> ', testfrm); 
        res.send(testfrm);
    })

    .put('/testmgmt/resvcode/:resvcode/persid/:persid/form/:form', async (req, res) => {
        const { resvcode, persid, form } = req.params;
        let result = await CLTestMgmt.genTestFormWithRandomQnAndChoice(resvcode, persid, form);
        res.send(result);
    })

    .get('/testmgmt/fetchtestformbyresvcodepersid/resvcodepersid/:resvcodepersid', async (req, res) => {
        const { resvcodepersid } = req.params;
        let result  = await CLTestMgmt.fetchTestFormByResvcodePersid(resvcodepersid);
        res.send(result);
    })

    .get('/testmgmt/fetchtestformbyresvcode/resvcode/:resvcode', async (req, res) => {
        const { resvcode } = req.params;
        //console.log('resvcode ---> ', resvcode);
        let result  = await CLTestMgmt.fetchTestFormByResvcode(resvcode);
        //console.log('resvcode result ===> ', result)
        res.send(result);
    })

    .delete('/testmgmt/deltestformbyresvcodepersid/resvcodepersid/:resvcodepersid', async (req, res) => {
        const { resvcodepersid } = req.params;
        //console.log('deltestformbyresvcodepersid --> resvcodepersid : ', resvcodepersid)
        let result  = await CLTestMgmt.delTestFormByResvcodePersid(resvcodepersid);
        //console.log('result ===> ', result)
        res.send(result);
    })

    .delete('/testmgmt/delalltestformbyresvcode/allfrmresvcode/:allfrmresvcode', async (req, res) => {
        const { allfrmresvcode } = req.params;
        let result  = await CLTestMgmt.delAllTestFormByResvcode(allfrmresvcode);
        console.log('delalltestformbyresvcode result ===> ', result)
        res.send(result);
    })

    .get('/testmgmt/genhardcopytestformbyresvcode/resvcode/:resvcode', async (req, res) => {
        const { resvcode } = req.params;
        let result  = await CLTestMgmt.genHardCopyTestFormByResvcode(resvcode);
        console.log('genhardcopytestformbyresvcode --> result ===> ', result)
        //res.send(result);
    })

module.exports = routes;
