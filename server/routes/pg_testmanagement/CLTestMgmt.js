const { sequelize } = require('../../models');
const { Op } = require('sequelize');
const ResrvModel = require('../../models')['tbtestreservation'];
// const ScoringCriteriaModel = require('../../models')['tbtestscoringcriteria'];
// const MemberModel = require('../../models')['tbmember'];
// const MemberInfoModel = require('../../models')['tbmemberinfo'];
const TestResultModel = require('../../models')['tbtestresult'];
// const LabRoomModel = require('../../models')['tblabroom'];
// const AccessRightsModel = require('../../models')['tbaccessrights'];
const QuestionModel = require('../../models')['tbquestion'];
const ChoiceModel = require('../../models')['tbchoice'];
const IndvFormModel = require('../../models')['tbindvform'];
const IntroFileModel = require('../../models')['tbintrovideo'];
const fs = require('fs');
var destroy = require('destroy');
// var http = require('http');
var onFinished = require('on-finished');
const moment = require('moment');
const path = require("path");

const { RndSortFunc, questiongrp } = require('../../function/RandomFunc');

const CLTestMgmt = {

    setShowScoringCriteria: async (rsrvcode, showed) => {
        //console.log('setShowScoringCriteria : ', rsrvcode, ' : ', showed);
        let scoringshowed = new Promise(async (resolve, reject) => {
            try {
                await TestResultModel.update({
                    'showscoringcriteria': showed
                }, {
                    where: {
                        'testresultcode': {
                            [Op.like]: `%${rsrvcode}%`
                        }
                    }
                })
                    .then(() => {
                        resolve({ 'completed': true, 'showscoringoperation': 'update' });
                    })
            }
            catch (err) {
                console.log('Backend :: CLTestMgmt : setShowScoringCriteria -> failed : ', err);
                reject({ 'completed': false, 'showscoringoperation': 'error' });
            };
        });
        return scoringshowed;
    },

    updateTestInvigilator: async (rsrvcode, invigilator_id) => {
        //console.log(rsrvcode,' ::: ' ,invigilator_id);
        let updateTestInvigilator = new Promise(async (resolve, reject) => {
            try {
                await TestResultModel.update({
                    'invigilator': invigilator_id !== 'null' ? invigilator_id : null
                }, {
                    where: {
                        'testresultcode': {
                            [Op.like]: `%${rsrvcode}%`
                        }
                    }
                })
                    .then(() => {
                        resolve({ 'completed': true, 'updateTestInvigilator': 'update' });
                    })
            }
            catch (err) {
                //console.log('errr-----------> ', err);
                reject({ 'completed': false, 'updateTestInvigilator': 'error' });
            };
        });
        return updateTestInvigilator;
    },

    updateTestType: async (rsrvcode, testtype_id) => {
        //console.log(rsrvcode,' ::: ' ,invigilator_id);
        let updateTestType = new Promise(async (resolve, reject) => {
            try {
                await TestResultModel.update({
                    'testtype': testtype_id
                }, {
                    where: {
                        'testresultcode': {
                            [Op.like]: `%${rsrvcode}%`
                        }
                    }
                })
                    .then(() => {
                        resolve({ 'completed': true, 'updateTestType': 'update' });
                    })
            }
            catch (err) {
                //console.log('errr-----------> ', err);
                reject({ 'completed': false, 'updateTestType': 'error' });
            };
        });
        return updateTestType;
    },

    updateIndvTestType: async (testresultcode, testtype_id) => {
        let updateIndvTestType = new Promise(async (resolve, reject) => {
            try {
                await TestResultModel.update({
                    'testtype': testtype_id
                }, {
                    where: {
                        'testresultcode': testresultcode
                    }
                })
                    .then(() => {
                        resolve({ 'completed': true, 'updateIndvTestType': 'update' });
                    })
            }
            catch (err) {
                //console.log('errr-----------> ', err);
                reject({ 'completed': false, 'updateIndvTestType': 'error' });
            };
        });
        return updateIndvTestType;
    },

    updateTestLocationAndInvigilator: async (dataset) => {
        const updateLabAndInvFunc = async (testresultcode, location, invigilator_id) => {
            //console.log('******************', testresultcode, location, invigilator_id);
            let res = new Promise(async (resolve, reject) => {
                try {
                    await TestResultModel.update({
                        'invigilator': invigilator_id !== 'null' ? invigilator_id : null,
                        'testlabroom': location
                    }, {
                        where: {
                            'testresultcode': testresultcode
                        },
                    }).then(() => {
                        resolve({ 'completed': true, 'updateLabAndInvFunc': 'update' });
                    });
                } catch (err) {
                    //console.log('errr-----------> ', err);
                    reject({ 'completed': false, 'updateLabAndInvFunc': 'error' });
                }
            })
            return res;
        }

        let updateTestLocAndInvPromise = new Promise(async (resolve, reject) => {
            try {
                await TestResultModel.findAndCountAll({
                    where: {
                        'testresvcode': dataset['lab1'].resvcode
                    },
                    raw: true,
                    //limit: labsum
                }).then((res) => {
                    let codearr = []
                    res.rows.filter(r => r.testlabroom === 'lab0').map(row => {
                        codearr.push(row.testresultcode);
                    });
                    //console.log('00000000000000->', res, ' : ', dataset, ' : ', codearr);
                    Object.keys(dataset).map(lb => {
                        switch (lb) {
                            case 'lab1':
                                if (dataset[lb].reqnum > 0) {
                                    codearr.slice(0, dataset[lb].reqnum).map(e => {
                                        updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                    });
                                }
                                break;
                            case 'lab2':
                                if (dataset[lb].reqnum > 0) {
                                    if (dataset['lab1'].reqnum > 0) {
                                        codearr.slice(
                                            dataset['lab1'].reqnum,
                                            dataset['lab1'].reqnum + dataset[lb].reqnum
                                        ).map(e => {
                                            updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                        });
                                    } else {// lab1 = 0
                                        codearr.slice(0, dataset[lb].reqnum).map(e => {
                                            updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                        });
                                    }
                                }
                                break;
                            case 'lab3':
                                if (dataset[lb].reqnum > 0) {
                                    if (dataset['lab1'].reqnum > 0) { // lab1 !== 0 && lab2 != 0
                                        if (dataset['lab2'].reqnum > 0) {
                                            codearr.slice(
                                                dataset['lab1'].reqnum + dataset['lab2'].reqnum,
                                                dataset['lab1'].reqnum + dataset['lab2'].reqnum + dataset[lb].reqnum
                                            ).map(e => {
                                                updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                            });
                                        } else { // lab1 !== 0 && lab2 = 0
                                            codearr.slice(
                                                dataset['lab1'].reqnum,
                                                dataset['lab1'].reqnum + dataset[lb].reqnum
                                            ).map(e => {
                                                updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                            });
                                        }
                                    } else { //lab1 = 0 && lab2 != 0
                                        if (dataset['lab2'].reqnum > 0) {
                                            codearr.slice(
                                                dataset['lab2'].reqnum,
                                                dataset['lab2'].reqnum + dataset[lb].reqnum
                                            ).map(e => {
                                                updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                            });
                                        } else { //lab1 = 0 && lab2 = 0 
                                            codearr.slice(0, dataset[lb].reqnum).map(e => {
                                                updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                            });
                                        }
                                    }
                                }
                                break;
                            case 'lab6':
                                if (dataset[lb].reqnum > 0) {
                                    //let lb6 = [];
                                    if (dataset['lab1'].reqnum > 0) {
                                        if (dataset['lab2'].reqnum > 0) {
                                            if (dataset['lab3'].reqnum > 0) {
                                                codearr.slice(
                                                    dataset['lab1'].reqnum + dataset['lab2'].reqnum + dataset['lab3'].reqnum,
                                                    dataset['lab1'].reqnum + dataset['lab2'].reqnum + dataset['lab3'].reqnum + dataset[lb].reqnum
                                                ).map(e => {
                                                    updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                                });
                                            } else { // lab1 !== 0 && lab2 !== 0 && lab3 = 0
                                                codearr.slice(
                                                    dataset['lab1'].reqnum + dataset['lab2'].reqnum,
                                                    dataset['lab1'].reqnum + dataset['lab2'].reqnum + dataset[lb].reqnum
                                                ).map(e => {
                                                    updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                                });
                                            }
                                        } else { // lab1 !== 0 && lab2 = 0 && lab3 != 0
                                            if (dataset['lab3'].reqnum > 0) {
                                                codearr.slice(
                                                    dataset['lab1'].reqnum + dataset['lab3'].reqnum,
                                                    dataset['lab1'].reqnum + dataset['lab3'].reqnum + dataset[lb].reqnum
                                                ).map(e => {
                                                    updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                                });
                                            } else { // lab1 !== 0 && lab2 = 0 && lab3 = 0
                                                codearr.slice(
                                                    dataset['lab1'].reqnum,
                                                    dataset['lab1'].reqnum + dataset[lb].reqnum
                                                ).map(e => {
                                                    updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                                });
                                            }
                                        }
                                    } else { // lab1 = 0 && lab2 != 0 
                                        if (dataset['lab2'].reqnum > 0) {
                                            if (dataset['lab3'].reqnum > 0) {
                                                codearr.slice(
                                                    dataset['lab2'].reqnum + dataset['lab3'].reqnum,
                                                    dataset['lab2'].reqnum + dataset['lab3'].reqnum + dataset[lb].reqnum
                                                ).map(e => {
                                                    updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                                });
                                            } else { // lab1 = 0 && lab2 != 0 && lab3 = 0 
                                                codearr.slice(
                                                    dataset['lab2'].reqnum,
                                                    dataset['lab2'].reqnum + dataset[lb].reqnum
                                                ).map(e => {
                                                    updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                                });
                                            }
                                        } else { // lab1 = 0 && lab2 = 0 && lab3 != 0
                                            if (dataset['lab3'].reqnum > 0) {
                                                codearr.slice(
                                                    dataset['lab3'].reqnum,
                                                    dataset['lab3'].reqnum + dataset[lb].reqnum
                                                ).map(e => {
                                                    updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                                });
                                            } else { // lab1 = 0 && lab2 = 0 && lab3 = 0
                                                codearr.slice(0, dataset[lb].reqnum).map(e => {
                                                    updateLabAndInvFunc(e, lb, dataset[lb].invigilatorid);
                                                });
                                            }
                                        }
                                    }
                                }
                                break;
                        }// end of switch
                    });
                    resolve({ 'completed': true, 'updateTestLocAndInvPromise': 'update' });
                });
            }
            catch (err) {
                reject({ 'completed': false, 'updateTestLocAndInvPromise': 'error' });
            };
        });
        return updateTestLocAndInvPromise;
    },

    fetchTestResultByDateAndTime: async (resvcode, date, time) => {
        const seatcountarr = [
            { 'lab0': 0, 'inivigator': null },
            { 'lab1': 0, 'inivigator': null },
            { 'lab2': 0, 'inivigator': null },
            { 'lab3': 0, 'inivigator': null },
            { 'lab6': 0, 'inivigator': null },
        ];
        let resultdatetime = new Promise(async (resolve, reject) => {
            try {
                await ResrvModel.findAndCountAll({
                    include: [
                        {
                            model: TestResultModel,
                        }
                    ],
                    where: {
                        [Op.and]: {
                            'testresvcode': resvcode,
                            'testreqdate': date,
                            'testreqtime': time
                        }
                    },
                    raw: true,
                    //limit: labsum
                })
                    .then((res) => {
                        res.rows.map(e => {
                            switch (e['tbtestresults.testlabroom']) {
                                case 'lab0':
                                    seatcountarr[0]['lab0'] += 1;
                                    seatcountarr[0]['inivigator'] = e['tbtestresults.invigilator'];
                                    break;
                                case 'lab1':
                                    seatcountarr[1]['lab1'] += 1;
                                    seatcountarr[1]['inivigator'] = e['tbtestresults.invigilator'];
                                    break;
                                case 'lab2':
                                    seatcountarr[2]['lab2'] += 1;
                                    seatcountarr[2]['inivigator'] = e['tbtestresults.invigilator'];
                                    break;
                                case 'lab3':
                                    seatcountarr[3]['lab3'] += 1;
                                    seatcountarr[3]['inivigator'] = e['tbtestresults.invigilator'];
                                    break;
                                case 'lab6':
                                    seatcountarr[4]['lab6'] += 1;
                                    seatcountarr[4]['inivigator'] = e['tbtestresults.invigilator'];
                                    break;
                            }
                        });
                        resolve(seatcountarr);
                    });
            }
            catch (err) {
                reject(`Backend :: CLTestMgmt : fetchTestResultByDateAndTime failed --> ${err}`);
            };
        });
        return resultdatetime;
    },
    /*-----------------------------------------------------------------------*/
    /*------------------------- added on 03-11-2023 -------------------------*/
    /*-----------------------------------------------------------------------*/
    getAllTestResultByDateTime: async (date, time) => {
        const condition = {
            include: [
                {
                    model: TestResultModel
                }
            ],
            where: {
                [Op.and]: [
                    { 'testreqdate': date },
                    { 'testreqtime': time }
                ]
            },
            raw: true
        };
        try {
            return await ResrvModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLTestMgmt : getAllTestResultByDateTime -> failed : ', err);
        }
    },

    /*-----------------------------------------------------------------------*/
    /*------------------------- added on 06-11-2023 -------------------------*/
    /*-----------------------------------------------------------------------*/
    updateTestInvigilatorByDateAndTime: async (date, time, labroom, newinvigilator) => {
        const condition = {
            include: [
                {
                    model: TestResultModel
                }
            ],
            where: {
                [Op.and]: [
                    { 'testreqdate': date },
                    { 'testreqtime': time }
                ]
            },
            raw: true
        };

        let resupdateinvigilator = new Promise(async (resolve, reject) => {
            let isError = false;
            try {
                await ResrvModel.findAll(condition)
                    .then(result => {
                        try {
                            result.map(async el => {
                                await TestResultModel.update({
                                    'invigilator': newinvigilator !== 'null' ? newinvigilator : null,
                                }, {
                                    where: {
                                        [Op.and]: [
                                            { 'testresultcode': el['tbtestresults.testresultcode'] },
                                            { 'testlabroom': labroom }
                                        ]
                                    },
                                });
                            });
                        } catch (err) {
                            //console.log('errr-----------> ', err);
                            isError = true;
                            reject({ 'completed': false, 'updateTestInvigilatorByDateAndTime': 'error' });
                        }
                    });
                if (!isError) {
                    resolve({ 'completed': true, 'updateTestInvigilatorByDateAndTime': 'update' });
                }
            } catch (err) {
                //console.log('errr-----------> ', err);
                reject({ 'completed': false, 'updateTestInvigilatorByDateAndTime': 'error' });
            }
        });//end of promise
        return resupdateinvigilator;
    },

    /*-----------------------------------------------------------------------*/
    /*------------------------- added on 11-11-2023 -------------------------*/
    /*-----------------------------------------------------------------------*/
    updateLabroomByIndvTestResultCode: async (testresultcode, labroom, invigilator) => {
        let updatestatus = new Promise(async (resolve, reject) => {
            let isError = false;
            try {
                await TestResultModel.findOne({
                    where: { 'testresultcode': testresultcode },
                    raw: true
                }).then(async res => {
                    try {
                        await TestResultModel.update(
                            {
                                'testlabroom': labroom,
                                'invigilator': labroom !== 'lab0' ? invigilator : null
                            },
                            {
                                where: { 'testresultcode': res.testresultcode },
                            });
                    }
                    catch (err) {
                        //console.log('errr-----------> ', err);
                        isError = true;
                        reject({ 'completed': false, 'updateLabroomByIndvTestResultCode': 'error' });
                    };
                });
                if (!isError) {
                    resolve({ 'completed': true, 'updateLabroomByIndvTestResultCode': 'update' });
                }
            } catch (err) {
                console.log('Backend :: CLTestMgmt : updateLabroomByIndvTestResultCode -> failed : ', err);
            }
        });
        return updatestatus;
    },

    /*---------------------------------------------------*/
    /*----------------- added on 24-12-2023 ----------------------*/
    /*---------------------------------------------------*/
    fetchAllTestForm: async () => {
        let formlist = [];
        try {
            await QuestionModel.findAll({
                attributes: [
                    'questioncode',
                    'formcode'
                ],
                /*include: [
                    ChoiceModel,
                ],*/
                raw: true
            }).then(res => {
                formlist = res.reduce((a, b) => {
                    if (!a.find((item) => item === b['formcode'])) {
                        a = [...a, b['formcode']];
                    }
                    return a;
                }, []);

                //console.log('Backend :: CLTestMgmt : fetchAllTestForm ---> formlist : ', formlist);
            })
        } catch (err) {
            console.log('Backend :: CLTestMgmt : fetchAllTestForm -> failed : ', err);
        }
        //console.log('formlist ---------> ', formlist);
        return formlist;
    },

    genTestFormWithRandomQnAndChoice: async (resvcode, persid, form) => {
        //console.log('00000000000000000--->', resvcode, ' : ', persid, ' : ', form)
        let success = new Promise(async (resolve, reject) => {
            try {
                await QuestionModel.findAll({
                    attributes: [
                        'questioncode',
                        'formcode'
                    ],
                    include: [{
                        model: ChoiceModel,
                        attributes: [
                            'choicecode'
                        ],
                    }],
                    where: {
                        'formcode': form
                    },
                    raw: true
                }).then(res => {
                    let wholeform = [];
                    Object.keys(questiongrp).map((qn, i) => {
                        let grp = res.filter(el => el['questioncode'].includes(form.concat(qn)));
                        wholeform = [...wholeform, ...RndSortFunc(grp, questiongrp[qn])];
                    });

                    let dataToInsert = wholeform.map(
                        (el, i) => {
                            let choice = [];
                            //console.log('elelelel --> ', typeof el, ' : ', Array.isArray(el), ' : ', el)
                            if (Array.isArray(el)) {
                                choice = el.map(e => {
                                    return (e['tbchoices.choicecode'])
                                });

                                return ({
                                    'indvtfrmcode': resvcode.concat('-', persid, '-', el[0]['questioncode']),
                                    'testresultcode': resvcode.concat('-', persid),
                                    'question_code': el[0]['questioncode'],
                                    'questionorder': i + 1,
                                    'A': choice[0],
                                    'B': choice[1],
                                    'C': choice[2],
                                    'D': choice[3],
                                    'frmcreatedate': moment().format('YYYY-MM-DD')
                                });
                            }
                        } //end map
                    );

                    //console.log('dataToInsert ---> ', dataToInsert);
                    IndvFormModel.bulkCreate(dataToInsert)
                        .then(res => resolve({ 'completed': true, 'status': res.length }));
                });
            } catch (err) {
                console.log('Backend :: CLTestMgmt : genTestFormWithRandomQnAndChoice -> failed : ', err);
                reject({ 'completed': false, 'status': err });
            }
        });
        return success;
    },

    /*-------------------------- added on 25-02-2024 -----------------------*/
    randomQnAndChoiceForGrpTestFrm: async (form) => {
        let success = new Promise(async (resolve, reject) => {
            try {
                await QuestionModel.findAll({
                    attributes: [
                        'questioncode',
                        'formcode'
                    ],
                    include: [{
                        model: ChoiceModel,
                        attributes: [
                            'choicecode'
                        ],
                    }],
                    where: {
                        'formcode': form
                    },
                    raw: true
                }).then(res => {
                    let wholeform = [];
                    Object.keys(questiongrp).map((qn, i) => {
                        let grp = res.filter(el => el['questioncode'].includes(form.concat(qn)));
                        wholeform = [...wholeform, ...RndSortFunc(grp, questiongrp[qn])];
                    });
                    resolve({ 'status': wholeform });
                });
            } catch (err) {
                console.log('Backend :: CLTestMgmt : randomQnAndChoiceForGrpTestFrm -> failed : ', err);
                reject({ 'status': err });
            }
        });
        return success;
    },

    genGrpTestFormWithRandomQnAndChoice: async (resvcode, persid, form) => {
        let success = new Promise(async (resolve, reject) => {
            try {
                let dataToInsert = form.map(
                    (el, i) => {
                        let choice = [];
                        if (Array.isArray(el)) {
                            choice = el.map(e => {
                                return (e['tbchoices.choicecode'])
                            });

                            return ({
                                'indvtfrmcode': resvcode.concat('-', persid, '-', el[0]['questioncode']),
                                'testresultcode': resvcode.concat('-', persid),
                                'question_code': el[0]['questioncode'],
                                'questionorder': i + 1,
                                'A': choice[0],
                                'B': choice[1],
                                'C': choice[2],
                                'D': choice[3],
                                'frmcreatedate': moment().format('YYYY-MM-DD')
                            });
                        }
                    } //end map
                );

                IndvFormModel.bulkCreate(dataToInsert)
                    .then(res => resolve({ 'completed': true, 'status': res.length }));
            } catch (err) {
                console.log('Backend :: CLTestMgmt : genGrpTestFormWithRandomQnAndChoice-> failed : ', err);
                reject({ 'completed': false, 'status': err });
            }
        });

        return success;
    },

    /*------------------------------------------------------------------------*/
    fetchTestFormByResvcodePersid: async (resvcode_persid) => {
        let result = new Promise(async (resolve, reject) => {
            try {
                await IndvFormModel.findOne({
                    attributes: [
                        'testresultcode',
                        'question_code'
                    ],
                    where: {
                        'testresultcode': resvcode_persid
                    },
                    raw: true
                }).then(res => {
                    //console.log('fetchTestFormByResvcodePersid ---> res ', res);
                    resolve({
                        'persid': resvcode_persid.split('-')[1],
                        'form': res != null ? res['question_code'].substring(0, 5) : 'กรุณาเลือกฟอร์ม'
                    })
                });

            } catch (err) {
                console.log('Backend :: CLTestMgmt : fetchTestFormByResvcodePersid -> failed : ', err);
                reject({ 'form_err': err });
            }
        });
        return result;
    },

    fetchTestFormByResvcode: async (resvcode) => {
        //console.log('fetchTestFormByResvcode ---> resvcode ', resvcode);
        let result = await new Promise(async (resolve, reject) => {
            try {
                await IndvFormModel.findAll({
                    attributes: [
                        'testresultcode',
                        'question_code'
                    ],
                    where: {
                        'testresultcode': {
                            [Op.like]: `%${resvcode}%`
                        }
                    },
                    raw: true
                }).then(res => {
                    let res_reduce = res.reduce((a, b) => {
                        if (!a.find((item) => item === b['testresultcode'])) {
                            //a = [...a, b['testresultcode']];
                            a = [...a,
                            {
                                'persid': b['testresultcode'].split('-')[1],
                                'form': b != null ? b['question_code'].substring(0, 5) : 'กรุณาเลือกฟอร์ม'
                            }
                            ];
                        }
                        return a;
                    }, []);

                    /*----------------- under construction -----------------*/
                    let sameelm = false;
                    if (res_reduce.length !== 0) {
                        sameelm = res_reduce.every(e => e.form === res_reduce[0].form);
                    }

                    let res_obj = {};
                    if (sameelm /*&& (res_reduce?.length === 100)*/) {
                        res_obj = {
                            'resvcode': resvcode,
                            'form': res_reduce[0]['form']
                        };
                    } else {
                        //if (res_reduce?.length === 100) {
                        res_obj = {
                            'resvcode': resvcode,
                            'form': res_reduce?.length === 0 ? 'กรุณาเลือกฟอร์ม' : 'คละฟอร์ม'
                        };
                        /*} else if (res_reduce?.length === 0) {
                            res_obj = {
                                'resvcode': resvcode,
                                'form': 'กรุณาเลือกฟอร์ม'
                            };
                        }*/
                    }

                    //console.log('res_reduce ===> ', sameelm, ' : ', res_reduce?.length, ' : ', res_obj);
                    resolve(res_obj);
                });

            } catch (err) {
                console.log('Backend :: CLTestMgmt : fetchTestFormByResvcode -> failed : ', err);
                reject({ 'form_err': err });
            }
        });

        return result;
    },

    delTestFormByResvcodePersid: async (resvcode_persid) => {
        let del_result = new Promise(async (resolve, reject) => {
            try {
                await IndvFormModel.destroy({
                    where: {
                        'indvtfrmcode': {
                            [Op.like]: `%${resvcode_persid}%`
                        }
                    },
                    raw: true
                }).then(res => {
                    //console.log('delTestFormByResvcodePersid ---> res ', res);
                    resolve({ 'del_success': true });
                });

            } catch (err) {
                console.log('Backend :: CLTestMgmt : delTestFormByResvcodePersid -> failed : ', err);
                reject({ 'del_success': false });
            }
        });
        return del_result;
    },

    delAllTestFormByResvcode: async (allfrmresvcode) => {
        //console.log('allfrmresvcode ---> ', allfrmresvcode);
        let del_result = new Promise(async (resolve, reject) => {
            try {
                await IndvFormModel.destroy({
                    where: {
                        'indvtfrmcode': {
                            [Op.like]: `%${allfrmresvcode}%`
                        }
                    },
                    raw: true
                }).then(res => {
                    //console.log('delAllTestFormByResvcode ---> res ', res);
                    resolve({ 'del_success': true });
                });

            } catch (err) {
                console.log('Backend :: CLTestMgmt : delAllTestFormByResvcode -> failed : ', err);
                reject({ 'del_success': false });
            }
        });
        return del_result;
    },

    genHardCopyTestFormByResvcode: async (resvcode) => {
        let hardcopyfrm = new Promise(async (resolve, reject) => {
            try {
                await IndvFormModel.findAll({
                    include: [
                        {
                            model: QuestionModel,
                            required: true,
                        }, {
                            model: ChoiceModel,
                            required: true,
                            as: "fk_choiceA",
                            on: sequelize.where(
                                sequelize.col('tbindvform.A'),
                                Op.eq,
                                sequelize.col('fk_choiceA.choicecode')
                            )
                        }, {
                            model: ChoiceModel,
                            required: true,
                            as: "fk_choiceB",
                            on: sequelize.where(
                                sequelize.col('tbindvform.B'),
                                Op.eq,
                                sequelize.col('fk_choiceB.choicecode')
                            )
                        }, {
                            model: ChoiceModel,
                            required: true,
                            as: "fk_choiceC",
                            on: sequelize.where(
                                sequelize.col('tbindvform.C'),
                                Op.eq,
                                sequelize.col('fk_choiceC.choicecode')
                            )
                        }, {
                            model: ChoiceModel,
                            required: true,
                            as: "fk_choiceD",
                            on: sequelize.where(
                                sequelize.col('tbindvform.D'),
                                Op.eq,
                                sequelize.col('fk_choiceD.choicecode')
                            )
                        }
                    ],
                    where: {
                        'indvtfrmcode': {
                            [Op.like]: `%${resvcode}%`
                        }
                    },
                    order: [
                        ['testresultcode', 'ASC'],
                        ['questionorder', 'ASC'],
                    ],
                    raw: true
                }).then(res => {
                    resolve(res);
                });

            } catch (err) {
                console.log('Backend :: CLTestMgmt : genHardCopyTestFormByResvcode -> failed : ', err);
                reject({ 'hardcopyfrm_success': false });
            }
        });
        return hardcopyfrm;
    },

    insertIntroFile: async (file) => {
        let allintrovideo = await CLTestMgmt.getIntroVideoFiles();
        const findMaxValueArr = () => {
            let maxElmInArr = allintrovideo.map(el => {
                return (parseInt(el['introvdoid'].split('-')[1]))
            });

            let maxElm = maxElmInArr.length === 0 ? 0 : Math.max(...maxElmInArr);
            if (maxElm < 10) {
                return '00'.concat(maxElm + 1);
            } else if (maxElm < 100) {
                return '0'.concat(maxElm + 1);
            } else {
                return (maxElm + 1);
            }
        }

        let success = new Promise(async (resolve, reject) => {
            try {
                await IntroFileModel.create({
                    'introvdoid': `INTRO-${findMaxValueArr()}`,
                    'introvdotitle': file.filename,
                    'introvdofilepath': file.destination.substring(file.destination.lastIndexOf('\\') + 1),
                    'introvdouploaddate': moment().format('YYYY-MM-DD')
                }).then(res => {
                    resolve(res);
                });
            } catch (err) {
                console.log('Backend :: CLTestMgmt : insertIntroFile -> failed : ', err);
                reject({ 'insertintro_success': false });
            }
        });
        return success;
    },

    getIntroVideoFiles: async () => {
        let success = new Promise(async (resolve, reject) => {
            try {
                await IntroFileModel.findAll({
                    attributes: [
                        'introvdoid',
                        'introvdotitle',
                    ],
                    raw: true
                }).then(res => {
                    resolve(res);
                });
            } catch (err) {
                console.log('Backend :: CLTestMgmt : getIntroVideoFiles -> failed : ', err);
                reject({ 'insertintro_success': false });
            }
        });
        return success;
    },

    streamVideoFile: async (f_video, request, response) => {
        let success = new Promise(async (resolve, reject) => {
            try {
                await IntroFileModel.findOne({
                    attributes: [
                        'introvdoid',
                        'introvdotitle',
                        'introvdofilepath'
                    ],
                    where: {
                        'introvdotitle': f_video
                    },
                    raw: true,
                }).then(res => {
                    if (res !== null) {
                        // const idx = __dirname.match(new RegExp('\\b' + 'backend' + '\\b')).index + ('backend'.length + 1);
                        //const idx = __dirname.match(new RegExp('/server/'))?.index;
                        const idx = __dirname.indexOf('/backend/');
                        // const videoPath = __dirname.substring(0, idx).concat(res.introvdofilepath, '\\', res.introvdotitle);
                        const videoPath = path.join(__dirname.substring(0, idx),res.introvdofilepath, res.introvdotitle);
                        //const videoPath = __dirname.substring(0, idx).concat('/',res.introvdofilepath, '/', res.introvdotitle);
                        const videoSize = fs.statSync(videoPath).size;
                        let range = 'undefined' !== typeof request.headers.range ? request.headers.range : 'bytes=0-';

                        console.log("path: ", videoPath);
                        if (range) {
                            const parts = range.replace(/bytes=/, '').split('-');
                            const start = parseInt(parts[0], 10);
                            const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;
                            const chunkSize = end - start + 1;
                            const videoStream = fs.createReadStream(videoPath, { start, end });

                            const headers = {
                                'Content-Range': `bytes ${start}-${end}/${videoSize}`,
                                'Accept-Ranges': 'bytes',
                                'Content-Length': chunkSize,
                                'Content-Type': 'video/mp4',
                            };

                            response.writeHead(206, headers);
                            videoStream.pipe(response);
                            onFinished(response, function () {
                                destroy(videoStream);
                            });
                        } else {
                            const headers = {
                                'Content-Length': videoSize,
                                'Content-Type': 'video/mp4',
                            };

                            response.writeHead(200, headers);
                            fs.createReadStream(videoPath).pipe(response);
                            onFinished(response, function () {
                                destroy(fs.createReadStream(videoPath));
                            });
                        }
                    }

                    resolve(response);
                });
            } catch (err) {
                console.log('Backend :: CLTestMgmt : streamVideoFile -> failed : ', err);
                reject({ 'stream_success': false });
            }
        });
        return success;
    },

    delVideoFile: async (singlevideo) => {
        let success = new Promise(async (resolve, reject) => {
            try {
                await IntroFileModel.findOne({
                    where: {
                        'introvdoid': singlevideo
                    },
                    raw: true,
                }).then(async res => {
                    if (res !== null) {
                        await IntroFileModel.destroy({
                            where: {
                                'introvdoid': singlevideo
                            },
                            raw: true,
                        });
                        resolve({ 'stream_success': true });
                    }
                });
            } catch (err) {
                console.log('Backend :: CLTestMgmt : delVideoFile -> failed : ', err);
                reject({ 'stream_success': false });
            }
        });
        return success;
    }

}

module.exports = CLTestMgmt;