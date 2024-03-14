const { sequelize } = require('../../models');
const { Op } = require('sequelize');
const ResrvModel = require('../../models')['tbtestreservation'];
const ScoringCriteriaModel = require('../../models')['tbtestscoringcriteria'];
const MemberModel = require('../../models')['tbmember'];
const MemberInfoModel = require('../../models')['tbmemberinfo'];
const TestResultModel = require('../../models')['tbtestresult'];
const LabRoomModel = require('../../models')['tblabroom'];
const AccessRightsModel = require('../../models')['tbaccessrights'];

const moment = require('moment');

const CLBookDate = {

    getAllTestReservation: async () => {
        const condition = {
            include: [
                ScoringCriteriaModel,
                MemberModel
            ],
            raw: true
        };

        try {
            return await ResrvModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getAllTestReservation -> failed : ', err);
        };
    },

    getAllTestReservationByOnePeriod: async (d_start, d_end) => {
        const condition = {
            /*include: [
                ScoringCriteriaModel,
                MemberModel
            ],*/
            where: { 'testreqdate': { [Op.between]: [d_start, d_end] } },
            raw: true
        };

        try {
            let res = await ResrvModel.findAll(condition);
            //console.log('await ResrvModel.findAll(condition) ---> ', res);
            return res;//await ResrvModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getAllTestReservationByOnePeriod -> failed : ', err);
        };
    },

    getTestReservationByResvCode: async (resvcode) => {
        const condition = {
            /*include: [
                ScoringCriteriaModel,
                MemberModel
            ],*/
            where: {
                testresvcode: resvcode
            },
            raw: true
        };

        try {
            return await ResrvModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getTestReservationByResvCode -> failed : ', err);
        };
    },

    getTestResultByResvCode: async (resvcode) => {
        const condition = {
            include: [
                {
                    model: ResrvModel,
                    include: [
                        ScoringCriteriaModel,
                    ]
                },
                {
                    model: MemberInfoModel,
                    include: [
                        MemberModel,
                    ]
                },
                {
                    model: LabRoomModel,
                }
            ],
            where: {
                testresvcode: resvcode
            },
            raw: true
        };

        try {
            return await TestResultModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getTestResultByResvCode -> failed : ', err);
        }
    },

    getAllTestResultInfo: async () => {
        const condition = {
            include: [
                {
                    model: ResrvModel,
                    include: [
                        ScoringCriteriaModel,
                    ]
                },
                {
                    model: MemberInfoModel,
                    include: [
                        MemberModel,
                    ]
                },
                {
                    model: LabRoomModel,
                }
            ],
            raw: true
        };

        try {
            return await TestResultModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getAllTestResultInfo -> failed : ', err);
        }
    },

    getLastestIndvTestResult: async (pers_id) => {
        const condition = {
            include: [
                {
                    model: ResrvModel,
                    include: [
                        ScoringCriteriaModel,
                    ]
                },
                {
                    model: MemberInfoModel,
                    include: [
                        MemberModel,
                    ]
                },
                {
                    model: LabRoomModel,
                }
            ],
            where: {
                testresultcode: {
                    [Op.like]: `%${pers_id}%`
                }
            },
            raw: true
        };

        try { //==========> updated on 17-11-2023 *******************************
            let alltestresult = await TestResultModel.findAll(condition);
            let tmpalltestresult = alltestresult.filter(e => e.realscoredate !== null);
            if (tmpalltestresult.length !== 0) {
                //console.log('tmpalltestresult ---> ', tmpalltestresult);
                let latestDate = new Date(Math.max(...tmpalltestresult.map(e => new Date(e.realscoredate))));
                //console.log('CLBookDate : getLastestIndvTestResult -> latestDate ==> ', latestDate, ' : ', tmpalltestresult.map(e => new Date(e.realscoredate)), ' : ', e.realscoredate);
                let latesttestresult = tmpalltestresult.filter(e => e.realscoredate === latestDate.toISOString().slice(0, 10))[0];
                return ({
                    'persid': pers_id,
                    'latestdate': latestDate.toISOString().slice(0, 10),
                    'mission': latesttestresult['tbtestreservation.tbtestscoringcriterium.scoringcriteriacode'],
                    'score': latesttestresult['editscore'] !== null ? latesttestresult['editscore'] : latesttestresult['realscore'],
                    'minscore': latesttestresult['tbtestreservation.tbtestscoringcriterium.minscore'],
                });
            }else{ //==========> updated on 17-11-2023 *******************************
                return({
                    'persid': pers_id,
                    'latestdate': null,
                    'mission': null,
                    'score': null,
                    'minscore': null,
                });
            }
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getLastestIndvTestResult -> failed : ', err);
        }
    },

    getNumPartInLabRoomByMonthYear: async (month, year) => {
        const condition = {
            attributes: [
                'testresvcode',
                'testreqdate',
                'testreqtime',
                'testrequnit'
            ],
            include: [
                {
                    model: TestResultModel,
                    attributes: [
                        'testlabroom'
                    ],
                    /*include: [
                        LabRoomModel
                    ]*/
                },
                {
                    model: ScoringCriteriaModel,
                    attributes: [
                        'scoringcriteriacode',
                        'mission'
                    ]
                }
            ],
            where: {
                [Op.and]: [
                    sequelize.where(sequelize.fn('YEAR', sequelize.col('testreqdate')), year),
                    sequelize.where(sequelize.fn('MONTH', sequelize.col('testreqdate')), month)
                ]
            },
            raw: true
        };

        try {
            return await ResrvModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getNumPartInLabRoomByMonthYear-> failed : ', err);
        }
    },

    getNumPartInLabRoomBtwStartEndDate: async (d_start, d_end) => {
        const condition = {
            attributes: [
                'testresvcode',
                'testreqdate',
                'testreqtime',
                'testrequnit'
            ],
            include: [
                {
                    model: TestResultModel,
                    attributes: [
                        'testlabroom'
                    ],
                },
                {
                    model: ScoringCriteriaModel,
                    attributes: [
                        'scoringcriteriacode',
                        'mission'
                    ]
                }
            ],
            where: {
                'testreqdate': {
                    [Op.between]: [d_start, d_end]
                }
            },
            raw: true
        };

        try {
            return await ResrvModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getNumPartInLabRoomBtwStartEndDate -> failed : ', err);
        }
    },

    getNumParticipantsInLabRoom: async (resvdate, resvtime) => {
        const condition = {
            include: [
                {
                    model: TestResultModel,
                    attributes: [
                        'testlabroom'
                    ],
                    include: [
                        LabRoomModel
                    ]
                }
            ],
            where: {
                [Op.and]: [
                    { 'testreqdate': resvdate },
                    { 'testreqtime': resvtime }
                ]
            },
            raw: true
        };

        try {
            return await ResrvModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getNumParticipantsInLabRoom -> failed : ', err);
        }
    },

    getRemainSeatInLabRoom: async (labcode, conductdate, conducttime) => {
        let totalseat;
        try {
            totalseat = await LabRoomModel.findAll({
                attributes: [labroomcap],
                where: {
                    labroomcode: labcode
                }
            });
            console.log('getRemainSeatInLabRoom -> labcap = ', totalseat);
        } catch (err) {
            console.log('Backend :: CLBookDate : getRemainSeatInLabRoom -> failed : ', err);
        }

        let remainseat;
        return remainseat;
    },

    getTotalSeatInEachLabRoom: async () => {
        let totalseat = { 'lab0': 0, 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0 };
        try {
            await LabRoomModel.findAll({
                attributes: [
                    'labroomcode',
                    'labroomcap'
                ],
                raw: true
            })
                .then(seat => {
                    seat.map(e => {
                        totalseat[e['labroomcode']] = e['labroomcap'];
                    });
                    //console.log('totalseat -> ', totalseat);
                })
                .catch(err => {
                    console.log('Backend :: CLBookDate : getTotalSeatInEachLabRoom -> inner failed : ', err);
                })
            return totalseat;
        } catch (err) {
            console.log('Backend :: CLBookDate : getTotalSeatInEachLabRoom -> outer failed : ', err);
        }
    },

    getEntireScoringCriteria: async () => {
        const condition = {
            attributes: [
                'scoringcriteriacode',
                'mission'
            ],
            raw: true
        };

        try {
            return (await ScoringCriteriaModel.findAll(condition));
        } catch (err) {
            console.log('Backend :: CLBookDate : getEntireScoringCriteria -> failed : ', err);
        }
    },

    getMemberInfoByUserType: async (usertype) => {
        const condition = {
            include: [
                {
                    model: MemberModel,
                    include: [{
                        model: MemberInfoModel,
                    }]
                }
            ],
            where: {
                'usrtypeid': usertype
            },
            raw: true
        };

        try {
            return await AccessRightsModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getMemberInfoByUserType -> failed : ', err);
        }
    },

    getMemberInfoByPersId: async (persid) => {
        const condition = {
            attributes: [
                'pers_id'
            ],
            include: [
                {
                    model: MemberInfoModel,
                    attributes: [
                        'meminfo_year',
                        'mem_rank',
                        'mem_fname',
                        'mem_lname',
                        'mem_pos',
                        'mem_affiliation',
                        'rtafbranch',
                        'rtafbranchgrp',
                        'mem_cellphone',
                        'mem_offtel',
                        'memimgpath',
                        'mem_email'
                    ],
                }
            ],
            where: {
                pers_id: persid
            },
            raw: true
        };

        try {
            return await MemberModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getMemberInfoByPersId -> failed : ', err);
        }
    },

    getMemberInfoByName: async (p_name) => {
        const hasWhiteSpace = (s) => {
            const whitespaceChars = ['  '];
            return whitespaceChars.some(char => s.includes(char));
        }

        if (hasWhiteSpace(p_name)) {
            p_name = p_name?.split('  ').join(' ');
        }

        const condition = {
            attributes: [
                'meminfo_year',
                'mem_rank',
                'mem_fname',
                'mem_lname',
                'mem_pos',
                'mem_affiliation',
                'rtafbranch',
                'rtafbranchgrp',
                'mem_cellphone',
                'mem_offtel',
                'memimgpath',
                'mem_email'
            ],
            include: [
                {
                    model: MemberModel,
                    attributes: [
                        'pers_id'
                    ],
                }
            ],
            where: {
                [Op.and]: [
                    { 'mem_fname': p_name.split(' ')[0] != null ? p_name.split(' ')[0] : '' },
                    { 'mem_lname': p_name.split(' ')[1] != null ? p_name.split(' ')[1] : '' }
                ]
            },
            raw: true
        };
        try {
            return await MemberInfoModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getMemberInfoByName -> failed : ', err);
        }
    },

    getTestResvInfoByRtafUnit: async (rtafunitcode) => {
        const condition = {
            where: {
                testresvcode: {
                    [Op.like]: `%${rtafunitcode}%`
                }
            },
            raw: true
        };

        try {
            return await ResrvModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getTestResvInfoByRtafUnit -> failed : ', err);
        };
    },

    getTestResvInfoByResvDate: async (resvdate) => {
        const condition = {
            where: {
                testreqdate: {
                    [Op.like]: `%${resvdate}%`
                }
            },
            raw: true
        };

        try {
            return await ResrvModel.findAll(condition);
        }
        catch (err) {
            console.log('Backend :: CLBookDate : getTestResvInfoByResvDate -> failed : ', err);
        };
    },

    /*------------------------- insert data into database --------------------*/
    addOrUpdateTestResvInfo: async (testresvlist) => {
        let result = null;
        await ResrvModel.findAll({
            where: {
                testresvcode: {
                    [Op.like]: `%${testresvlist['resvcode']}%`
                }
            },
            raw: true,
        })
            .then(isExist => {
                if (isExist.length === 0) {
                    //--------------- insert --------------------
                    const getLastestMemInfoId = async (pers_id) => {
                        let tmp = [];
                        try {
                            tmp = await MemberInfoModel.findAll({
                                attributes: ['meminfo_id'],
                                where: {
                                    'meminfo_id': {
                                        [Op.like]: `%${pers_id}%`
                                    }
                                },
                                raw: true,
                            })
                        }
                        catch (err) {
                            console.log('addOrUpdateTestResvInfo : getLastestMemInfoId failed --> err : ', err);
                        }

                        tmp.sort((a, b) => {
                            let x = a['meminfo_id']?.substr(a['meminfo_id'].length - 4);
                            let y = b['meminfo_id']?.substr(b['meminfo_id'].length - 4);
                            return ((x > y) ? -1 : (x < y) ? 1 : 0);
                        });

                        return tmp[0]['meminfo_id'];
                    }

                    //---------------------------- function --------------------------
                    const testres_data = async () => {
                        let promise = await Promise.all(testresvlist['member'].map(async each => ({
                            'testresultcode': testresvlist['resvcode'] + '-' + each['pers_id'],
                            'testresvcode': testresvlist['resvcode'],
                            'meminfo_id': await getLastestMemInfoId(each['pers_id']),
                            'testlabroom': each['testlabroom'],
                        }))).then(data => {
                            //console.log('data ---> ', data);
                            ResrvModel.create({
                                'testresvcode': testresvlist['resvcode'],
                                'testresvdate': testresvlist['testresvdate'],
                                'testresvtime': testresvlist['testresvtime'],
                                'testscoringcriteria': testresvlist['reason'],
                                'testreqdate': testresvlist['date'],
                                'testreqtime': moment(testresvlist['period'].split('-')[0], 'hmm').format('HH:mm'),
                                'country': testresvlist['country'],
                                'testrequnit': testresvlist['testrequnit'],
                                'coordinator': testresvlist['coordinator'],
                                //'testappvcode': null,
                                //'testappvresult': null,
                                //'testappvdate': null,
                                //'testappvtime': null,
                                //'testapprover': null,
                            }).then(async () => {
                                await TestResultModel.bulkCreate(data)
                                    .then(() => {
                                        console.log('CLBookDate.js : TestResultModel insert completed');
                                    })
                                    .catch(err => {
                                        console.log('CLBookDate.js : TestResultModel insert failed err --> ', err);
                                    });
                            }).catch(err => {
                                console.log('CLBookDate.js : testres_data failed err --> ', err);
                            });
                        });

                        return promise;
                    }//end of function : testres_data

                    result = new Promise(async (resolve, reject) => {
                        try {
                            testres_data().then(() => {
                                resolve({ 'completed': true, 'operation': 'insert' });
                            })
                        }
                        catch (err) {
                            console.log('addOrUpdateTestResvInfo : insert failed --> err : ', err);
                            reject({ 'completed': false, 'operation': 'error' });
                        }
                    });

                } else {
                    result = { 'completed': true, 'operation': 'update' };
                    //------------------ update when resevation approved ------------------
                }
            }).catch(err => {
                console.log('addOrUpdateTestResvInfo : isExist check failed --> err : ', err);
                result = { 'completed': false, 'operation': 'error' };
            });

        return result;
    },

    /*------------------------ add or update test result database ---------------*/
    addOrUpdateIndvTestResult: async (indvtestresult) => {
        let updateresult = new Promise(async (resolve, reject) => {
            try {
                await TestResultModel.update(
                    {
                        testlabroom: indvtestresult['testlabroom'],
                        testindvappvcode: indvtestresult['testindvappvcode'],
                        testindvappvresult: indvtestresult['testindvappvresult'],
                        testindvappvdate: indvtestresult['testindvappvdate'],
                        testindvappvtime: indvtestresult['testindvappvtime'],
                        testindvapprover: indvtestresult['testindvapprover'],
                    }, {
                    where: {
                        testresultcode: indvtestresult['testresultcode']
                    }
                })
                    .then(() => {
                        resolve({ 'completed': true, 'operation': 'update' });
                    })
            }
            catch (err) {
                console.log('Backend :: CLBookDate : addOrUpdateIndvTestResult -> failed : ', err);
                reject({ 'completed': false, 'operation': 'error' });
            }
        });
        return updateresult;
    },

    /*------------------------ add or update test reservation approve state ---------------*/
    updateTestResrvAprvState: async (testresrvlist) => {
        //console.log('CLBookDate testresrvlist ---> ', testresrvlist['testappvcode']);
        let updateresult = new Promise(async (resolve, reject) => {
            try {
                await ResrvModel.update({
                    testappvcode: testresrvlist['testappvcode'] ?? null, //====----> updated on 19-11-2023 ******
                    testappvresult: testresrvlist['testappvresult'] ?? null, //====----> updated on 19-11-2023 ******
                    testappvdate: testresrvlist['testappvdate'] ?? null, //====----> updated on 19-11-2023 ******
                    testappvtime: testresrvlist['testappvtime'] ?? null, //====----> updated on 19-11-2023 ******
                    testapprover: testresrvlist['testapprover'] ?? null //====----> updated on 19-11-2023 ******
                }, {
                    where: {
                        testresvcode: testresrvlist['testresvcode']
                    }
                })
                    .then(() => {
                        resolve({ 'completed': true, 'operation': 'ResrvModel update' });
                    })
            }
            catch (err) {
                console.log(
                    'Backend :: CLBookDate : updateTestResrvAprvState : ResrvModel -> failed : ', err
                );
                reject({ 'completed': false, 'operation': 'ResrvModel update error' });
            }
        });
        return updateresult;
    },

}

module.exports = CLBookDate;