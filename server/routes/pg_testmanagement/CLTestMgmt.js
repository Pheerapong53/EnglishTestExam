// const { lb } = require('date-fns/locale');
// const { sequelize, Sequelize } = require('../../models');
const { Op, where } = require('sequelize');
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
const moment = require('moment');


const { RndSortFunc, questiongrp } = require('../../function/RandomFunc');
// const { ContactSupportOutlined } = require('@mui/icons-material');

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
                        //if (qn === 'L1A1' || qn === 'L1B1' || qn === 'L1B2' || qn === 'R1B2') {
                        wholeform = [...wholeform, ...RndSortFunc(grp, questiongrp[qn])];
                        //}
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

                    console.log('res_reduce ===> ', sameelm, ' : ', res_reduce?.length, ' : ', res_obj);
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
                    console.log('delTestFormByResvcodePersid ---> res ', res);
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
        console.log('allfrmresvcode ---> ', allfrmresvcode);
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
                    console.log('delAllTestFormByResvcode ---> res ', res);
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
                    where: {
                        'indvtfrmcode': {
                            [Op.like]: `%${resvcode}%`
                        }
                    },
                    raw: true
                }).then(res => {
                    console.log('genHardCopyTestFormByResvcode ---> res ', res, ' : ', res.length);
                    resolve({ 'hardcopyfrm_success': true });
                });

            } catch (err) {
                console.log('Backend :: CLTestMgmt : genHardCopyTestFormByResvcode -> failed : ', err);
                reject({ 'hardcopyfrm_success': false });
            }
        });
        return hardcopyfrm;
    }

}

module.exports = CLTestMgmt;