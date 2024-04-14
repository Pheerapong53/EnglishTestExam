const express = require("express");
const routes = express.Router();
// const bodyParser = require("body-parser");
// const jsonParser = bodyParser.json();
// const { verifyToken } = require("../../middleware/VerifyToken");
// const { upload } = require("../../middleware/uploadImages");
const path = require("path");
const CLTestMgmt = require('./CLTestMgmt');
const { convertToEngDate } = require('../../function/GlobalFunctions');
const { ChoiceRndFunc } = require('../../function/RandomFunc');
const multer = require('multer');
const fs = require('fs');

/*---------------- upload video ------------------*/
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        cb(null, path.resolve('./videoupload'));
    },
    filename: async (req, file, cb) => {
        //cb(null, Date.now() + '-' + file.originalname);
        cb(null, file.originalname);
    },
    fileFilter: async (req, file, cb) => {
        const ext = path.extname(file.originalname);
        //console.log('file.originalname = ', file.originalname, ' : ', ext)
        if (ext !== '.mp3' || ext !== '.mp4') {
            return cb(res.status(400).end('only mp3 and mp4 are allowed...', false));
        }
        cb(null, true);
    }
});

const videoupload = multer({ storage: storage });

/*-------------------------------- Routes ------------------------*/
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

    /*---------------------------- added on 25-02-2024 ----------------------------*/
    .put('/testmgmt/grptestfrm/resvcode', async (req, res) => {
        const { resvcode, persid, form } = req.body;
        let grptestfrm = await CLTestMgmt.genGrpTestFormWithRandomQnAndChoice(resvcode, persid, form);
        res.send(grptestfrm);
    })

    .get('/testmgmt/creategrptestfrm/form/:form', async (req, res) => {
        const { form } = req.params;
        let frm_1 = await CLTestMgmt.randomQnAndChoiceForGrpTestFrm(form);
        let frm_1_copy = frm_1.status.map(obj => ([...obj])); //->Copy to prevent changing the original array object
        let frm_2 = frm_1_copy.map(f => { return ChoiceRndFunc(f) });
        res.send({ 'form_A': frm_1.status, 'form_B': frm_2 });
    })
    /*-----------------------------------------------------------------------------*/

    .get('/testmgmt/fetchtestformbyresvcodepersid/resvcodepersid/:resvcodepersid', async (req, res) => {
        const { resvcodepersid } = req.params;
        let result = await CLTestMgmt.fetchTestFormByResvcodePersid(resvcodepersid);
        res.send(result);
    })

    .get('/testmgmt/fetchtestformbyresvcode/resvcode/:resvcode', async (req, res) => {
        const { resvcode } = req.params;
        //console.log('resvcode ---> ', resvcode);
        let result = await CLTestMgmt.fetchTestFormByResvcode(resvcode);
        //console.log('resvcode result ===> ', result)
        res.send(result);
    })

    .delete('/testmgmt/deltestformbyresvcodepersid/resvcodepersid/:resvcodepersid', async (req, res) => {
        const { resvcodepersid } = req.params;
        //console.log('deltestformbyresvcodepersid --> resvcodepersid : ', resvcodepersid)
        let result = await CLTestMgmt.delTestFormByResvcodePersid(resvcodepersid);
        //console.log('result ===> ', result)
        res.send(result);
    })

    .delete('/testmgmt/delalltestformbyresvcode/allfrmresvcode/:allfrmresvcode', async (req, res) => {
        const { allfrmresvcode } = req.params;
        let result = await CLTestMgmt.delAllTestFormByResvcode(allfrmresvcode);
        //console.log('delalltestformbyresvcode result ===> ', result)
        res.send(result);
    })

    .get('/testmgmt/genhardcopytestformbyresvcode/resvcode/:resvcode', async (req, res) => {
        const { resvcode } = req.params;
        let result = await CLTestMgmt.genHardCopyTestFormByResvcode(resvcode);
        //console.log('genhardcopytestformbyresvcode --> result ===> ', result)
        res.send(result);
    })

    /*-------------------- Video File Management : added on 13-03-2024 ---------------------*/
    .post('/testmgmt/videoupload', videoupload.single('file'), async (req, res) => {
        let result = await CLTestMgmt.insertIntroFile(req.file);
        res.send(result);
    })

    .get('/testmgmt/introvideofiles', async (req, res) => {
        let result = await CLTestMgmt.getIntroVideoFiles();
        res.send(result);
        //let res_list = result.map(rs => { return rs['introvdotitle'] });
        //res.send(res_list);
    })

    .get('/testmgmt/singleintrovideofile/:singlevideo', async (req, res) => {
        const { singlevideo } = req.params;
        await CLTestMgmt.streamVideoFile(singlevideo, req, res);
    })

    .delete('/testmgmt/delintrovideofile', async (req, res) => {
        const { introvdoid, introvdotitle } = req.body;
        let del_success = await CLTestMgmt.delVideoFile(introvdoid);
        // let filepath = path.resolve('./videoupload').concat('\\', introvdotitle).replace('\\', '\\\\');
        let filepath = path.resolve('./videoupload').concat('/', introvdotitle);

        // console.log('del_success : ', filepath);
 
        try {
            if (del_success.stream_success) {
                fs.access(filepath, fs.constants.F_OK, (err) => {
                    if (!err) {
                        fs.unlink(filepath, (err) => {
                            if (err) {
                                if (err.code === 'ENOENT') {
                                    console.error('File does not exist.');
                                } else {
                                    throw err;
                                }
                            } else {
                                console.log('File deleted!');
                            }
                        });
                    }
                });
                res.send({ 'delfile_success': true });
            }
        } catch (err) {
            res.send({ 'delfile_success': false });
        }
    })

module.exports = routes;
