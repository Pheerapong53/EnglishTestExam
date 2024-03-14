const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { verifyToken } = require("../../middleware/VerifyToken");
const moment = require("moment");
const lodash = require("lodash");
const path = require("path");

const CLBookDate = require('./CLBookDate');

const th_month = [
    'ม.ค.', 'ก.พ', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];
const convertToEngDate = (thdate) => {
    let d = thdate.split(' ');
    d[1] = (th_month.indexOf(d[1]) + 1) < 10 ? '0'.concat((th_month.indexOf(d[1]) + 1).toString()) : (th_month.indexOf(d[1]) + 1).toString();
    d[2] = (Number(d[2]) - 543).toString();
    return (d.reverse().join('-'));
}

routes
    /*--------------------- GET :: /pagebookdate/alltestresult -------------------------*/
    .get('/pagebookdate/alltestresult', async (req, res) => {
        res.send(await CLBookDate.getAllTestResultInfo());
    })

    /*--------------------- GET :: /pagebookdate/allreservbyoneperiod -------------------------*/
    .get('/pagebookdate/allreservbyoneperiod/:period', async (req, res) => {
        const { s_date, e_date } = JSON.parse(req.params.period);
        res.send(await CLBookDate.getAllTestReservationByOnePeriod(s_date, e_date));
    })

    /*--------------------- GET :: /pagebookdate/testresvbyresvcode/:resvcode -------------------------*/
    .get('/pagebookdate/testresvbyresvcode/:resvcode', async (req, res) => {
        res.send(await CLBookDate.getTestReservationByResvCode(req.params.resvcode));
    })

    /*--------------------- GET :: /pagebookdate/testresultbyresvcode/:resvcode -------------------------*/
    .get('/pagebookdate/testresultbyresvcode/:resvcode', async (req, res) => {
        let tmp = await CLBookDate.getTestResultByResvCode(req.params.resvcode);
        res.send(tmp);
    })

    /*--------------------- GET :: /pagebookdate/allindvtestresult/:persid -------------------------*/
    .get('/pagebookdate/lastestindvtestresult/:persid', async (req, res) => {
        let tmp = await CLBookDate.getLastestIndvTestResult(req.params.persid);
        res.send(tmp);
    })

    /*--------------------- GET :: /pagebookdate/seatstate/date/:reqdate/time/:reqtime -------------------------*/
    .get('/pagebookdate/seatstate/date/:reqdate/time/:reqtime', async (req, res) => {
        const seatcount = { 'lab0': 0, 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0 };
        const remainseat = { 'lab0': 0, 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0 };

        const [numpart, totalseat] = await Promise.all([
            CLBookDate.getNumParticipantsInLabRoom(
                convertToEngDate(req.params.reqdate),
                req.params.reqtime
            ),
            CLBookDate.getTotalSeatInEachLabRoom(),
        ]);

        numpart.map(e => {
            switch (e['tbtestresults.testlabroom']) {
                case 'lab0':
                    seatcount['lab0'] += 1;
                    remainseat['lab0'] = totalseat['lab0'] - seatcount['lab0'];
                    break;
                case 'lab1':
                    seatcount['lab1'] += 1;
                    remainseat['lab1'] = totalseat['lab1'] - seatcount['lab1'];
                    break;
                case 'lab2':
                    seatcount['lab2'] += 1;
                    remainseat['lab2'] = totalseat['lab2'] - seatcount['lab2'];
                    break;
                case 'lab3':
                    seatcount['lab3'] += 1;
                    remainseat['lab3'] = totalseat['lab3'] - seatcount['lab3'];
                    break;
                case 'lab6':
                    seatcount['lab6'] += 1;
                    remainseat['lab6'] = totalseat['lab6'] - seatcount['lab6'];
                    break;
            }
        });

        //console.log('seatcount => ', seatcount);
        //console.log('remainseat => ', remainseat);
        res.send({ seatcount, remainseat, totalseat });
    })

    /*--------------------- GET :: /pagebookdate/rsvn/:month/:year -------------------------*/
    .get('/pagebookdate/rsvn/:month/:year', async (req, res) => {
        const [numpart, totalseat] = await Promise.all([
            CLBookDate.getNumPartInLabRoomByMonthYear(req.params.month, req.params.year),
            CLBookDate.getTotalSeatInEachLabRoom(),
        ]);

        let actlist = [];
        numpart?.map(e => {
            let _start = moment(`${e.testreqdate}` + ' ' + `${e.testreqtime}`, 'YYYY-MM-DD HH:mm')
                .format('YYYY-MM-DDTHH:mm');
            let _end = moment(_start).locale('th').add(moment.duration(1, 'hours'))
                .format('YYYY-MM-DDTHH:mm');
            let actEachDay = {
                'resvcode': e.testresvcode,
                'direct': e.testrequnit,
                'projcode': e['tbtestscoringcriterium.scoringcriteriacode'],
                'projname': e['tbtestscoringcriterium.mission'],
                'start': _start,
                'end': _end,
                'lab': e['tbtestresults.testlabroom']
            };

            actlist.push(actEachDay);
        });

        //console.log('actlist -> ', actlist);
        /*------------------------------ formation of day activity ----------------*/
        let calendarlist = [];
        /*----------------- FUNC :: update activity in calendar  -------------*/
        const updateLabInfoFunc = (lab, data) => {
            if (lab.length == 0) {
                Object.assign(data, { 'seatcount': 1 });
                lab.push(data);
            } else {
                lab.every(lb => {
                    if (lb.resvcode === data.resvcode &&
                        lb.projcode === data.projcode) {
                        lb.seatcount += 1;
                    } else {
                        Object.assign(data, { 'seatcount': 1 });
                        lab.push(data);
                    }
                    return false;
                });
            }
        };

        /*----------------- FUNC :: prepare date time and activity format -------------*/
        const createDayCalFunc = (e_day, fd) => {
            let calday = {};
            let d_info = {
                "resvcode": e_day.resvcode,
                "direct": e_day.direct,
                "projcode": e_day.projcode,
                "projname": e_day.projname,
                "lab": e_day.lab,
                'seatcount': 1
            }

            if (fd == -1) {// diff datetime
                calday = {
                    'dt_start': e_day.start,
                    'dt_end': e_day.end,
                    'lab': { 'lab0': [], 'lab1': [], 'lab2': [], 'lab3': [], 'lab6': [] }
                };
                switch (e_day.lab) {
                    case 'lab0':
                        Object.assign(d_info, { 'seatcount': 1 });
                        calday['lab'].lab0.push(d_info);
                        break;
                    case 'lab1':
                        Object.assign(d_info, { 'seatcount': 1 });
                        calday['lab'].lab1.push(d_info);
                        break;
                    case 'lab2':
                        Object.assign(d_info, { 'seatcount': 1 });
                        calday['lab'].lab2.push(d_info);
                        break;
                    case 'lab3':
                        Object.assign(d_info, { 'seatcount': 1 });
                        calday['lab'].lab3.push(d_info);
                        break;
                    case 'lab6':
                        Object.assign(d_info, { 'seatcount': 1 });
                        calday['lab'].lab6.push(d_info);
                        break;
                }
                calendarlist.push(calday);
            } else {//same datetime
                calday = calendarlist[fd];
                switch (d_info.lab) {
                    case 'lab0':
                        updateLabInfoFunc(calday.lab['lab0'], d_info);
                        break;
                    case 'lab1':
                        updateLabInfoFunc(calday.lab['lab1'], d_info);
                        break;
                    case 'lab2':
                        updateLabInfoFunc(calday.lab['lab2'], d_info);
                        break;
                    case 'lab3':
                        updateLabInfoFunc(calday.lab['lab3'], d_info);
                        break;
                    case 'lab6':
                        updateLabInfoFunc(calday.lab['lab6'], d_info);
                        break;
                }
            }
        };

        /*---------------- FUNC : calculate the remaining of seats in each lab -----------*/
        const calRemainSeatInLabFunc = () => {
            let totalseated = {};
            let remainseat = {};
            calendarlist.map(cal => {
                totalseated = { 'lab0': 0, 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0 };
                remainseat = { 'lab0': 0, 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0 }
                Object.keys(cal.lab).map(key => {
                    switch (key) {
                        case 'lab0': case 'lab1': case 'lab2': case 'lab3':
                        case 'lab6':
                            cal.lab[key].forEach(el => {
                                totalseated[key] += el.seatcount;
                            });
                            remainseat[key] = totalseat[key] - totalseated[key];
                            break;
                    }
                });
                Object.assign(cal, { 'seatremain': remainseat, 'totalseated': totalseated });
                //console.log('totalseated -> ', totalseated, ' : remain : ', remainseat);
            });
        }

        /*------------------- check date-time existence -----------------*/
        for (let i in actlist) {
            let dt = calendarlist.findIndex(el => {
                return (el.dt_start === actlist[i].start);
            });
            createDayCalFunc(actlist[i], dt);
        }

        calRemainSeatInLabFunc();
        //console.log(JSON.stringify(calendarlist, null, 2));
        res.send(calendarlist);
    })

    /*--------------------- GET :: /pagebookdate/rsvn/totalseat ------------------------*/
    .get('/pagebookdate/rsvn/totalseat', async (req, res) => {
        let totalseat = {};
        try {
            totalseat = await CLBookDate.getTotalSeatInEachLabRoom();
        } catch (err) {
            console.log('Pagebookdate -> get totalseat failed -> err : ', err);
        }

        res.send(totalseat);
    })

    /*--------------------- GET :: /pagebookdate/rsvn/s_date/:startdate/e_date/:enddate -------------------------*/
    .get('/pagebookdate/rsvn/s_date/:startdate/e_date/:enddate', async (req, res) => {
        const [numpart, totalseat] = await Promise.all([
            CLBookDate.getNumPartInLabRoomBtwStartEndDate(req.params.startdate, req.params.enddate),
            CLBookDate.getTotalSeatInEachLabRoom(),
        ]);

        let actlist = [];
        numpart?.map(e => {
            let _start = moment(`${e.testreqdate}` + ' ' + `${e.testreqtime}`, 'YYYY-MM-DD HH:mm')
                .format('YYYY-MM-DDTHH:mm');
            let _end = moment(_start).locale('th').add(moment.duration(1, 'hours'))
                .format('YYYY-MM-DDTHH:mm');
            let actEachDay = {
                'resvcode': e.testresvcode,
                'direct': e.testrequnit,
                'projcode': e['tbtestscoringcriterium.scoringcriteriacode'],
                'projname': e['tbtestscoringcriterium.mission'],
                'start': _start,
                'end': _end,
                'lab': e['tbtestresults.testlabroom']
            };

            actlist.push(actEachDay);
        });

        //console.log('actlist -> ', actlist);
        /*------------------------------ formation of day activity ----------------*/
        let calendarlist = [];
        /*----------------- FUNC :: update activity in calendar  -------------*/
        const updateLabInfoFunc = (lab, data) => {
            if (lab.length == 0) {
                Object.assign(data, { 'seatcount': 1 });
                lab.push(data);
            } else {
                lab.every(lb => {
                    if (lb.resvcode === data.resvcode &&
                        lb.projcode === data.projcode) {
                        lb.seatcount += 1;
                    } else {
                        Object.assign(data, { 'seatcount': 1 });
                        lab.push(data);
                    }
                    return false;
                });
            }
        };

        /*----------------- FUNC :: prepare date time and activity format -------------*/
        const createDayCalFunc = (e_day, fd) => {
            let calday = {};
            let d_info = {
                "resvcode": e_day.resvcode,
                "direct": e_day.direct,
                "projcode": e_day.projcode,
                "projname": e_day.projname,
                "lab": e_day.lab,
                'seatcount': 1
            }

            if (fd == -1) {// diff datetime
                calday = {
                    'dt_start': e_day.start,
                    'dt_end': e_day.end,
                    'lab': { 'lab0': [], 'lab1': [], 'lab2': [], 'lab3': [], 'lab6': [] }
                };
                switch (e_day.lab) {
                    case 'lab0':
                        Object.assign(d_info, { 'seatcount': 1 });
                        calday['lab'].lab0.push(d_info);
                        break;
                    case 'lab1':
                        Object.assign(d_info, { 'seatcount': 1 });
                        calday['lab'].lab1.push(d_info);
                        break;
                    case 'lab2':
                        Object.assign(d_info, { 'seatcount': 1 });
                        calday['lab'].lab2.push(d_info);
                        break;
                    case 'lab3':
                        Object.assign(d_info, { 'seatcount': 1 });
                        calday['lab'].lab3.push(d_info);
                        break;
                    case 'lab6':
                        Object.assign(d_info, { 'seatcount': 1 });
                        calday['lab'].lab6.push(d_info);
                        break;
                }
                calendarlist.push(calday);
            } else {//same datetime
                calday = calendarlist[fd];
                switch (d_info.lab) {
                    case 'lab0':
                        updateLabInfoFunc(calday.lab['lab0'], d_info);
                        break;
                    case 'lab1':
                        updateLabInfoFunc(calday.lab['lab1'], d_info);
                        break;
                    case 'lab2':
                        updateLabInfoFunc(calday.lab['lab2'], d_info);
                        break;
                    case 'lab3':
                        updateLabInfoFunc(calday.lab['lab3'], d_info);
                        break;
                    case 'lab6':
                        updateLabInfoFunc(calday.lab['lab6'], d_info);
                        break;
                }
            }
        };

        /*---------------- FUNC : calculate the remaining of seats in each lab -----------*/
        const calRemainSeatInLabFunc = () => {
            let totalseated = {};
            let remainseat = {};
            calendarlist.map(cal => {
                totalseated = { 'lab0': 0, 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0 };
                remainseat = { 'lab0': 0, 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0 }
                Object.keys(cal.lab).map(key => {
                    switch (key) {
                        case 'lab0': case 'lab1': case 'lab2': case 'lab3':
                        case 'lab6':
                            cal.lab[key].forEach(el => {
                                totalseated[key] += el.seatcount;
                            });
                            remainseat[key] = totalseat[key] - totalseated[key];
                            break;
                    }
                });
                Object.assign(cal, {
                    'seatremain': remainseat,
                    'totalseated': totalseated,
                    'totalseat': totalseat
                });
                //console.log(totalseat, ' totalseated -> ', totalseated, ' : remain : ', remainseat);
            });
        }

        /*------------------- check date-time existence -----------------*/
        for (let i in actlist) {
            let dt = calendarlist.findIndex(el => {
                return (el.dt_start === actlist[i].start);
            });
            createDayCalFunc(actlist[i], dt);
        }

        calRemainSeatInLabFunc();

        /*------------ in case that calendarlist is null ----------*/
        if (calendarlist.length === 0) {
            calendarlist.push({
                'dt_start': '',
                'dt_end': '',
                'lab': {},
                'seatremain': totalseat,
                'totalseated': { 'lab0': 0, 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0 },
                'totalseat': totalseat
            });

        }
        //console.log('backend -> ', JSON.stringify(calendarlist, null, 2));
        res.send(calendarlist);
    })

    /*--------------------- GET :: /pagebookdate/queryscoringcriteria -------------------------*/
    .get('/pagebookdate/queryscoringcriteria', async (req, res) => {
        res.send(await CLBookDate.getEntireScoringCriteria());
    })

    /*--------------------- GET :: /pagebookdate/memberinfo (by position) -----------------------*/
    .get('/pagebookdate/queryMemberInfoByUsrType/usertype/:usertype', async (req, res) => {
        const { usertype } = req.params;
        let meminfolist = [];
        try {
            meminfolist = await CLBookDate.getMemberInfoByUserType(usertype);
        } catch (err) {
            console.log('Pagebookdate -> queryMemberInfoByUsrType failed -> err : ', err);
        }
        res.send(meminfolist);
    })

    /*--------------------- GET :: /pagebookdate/memberinfo (by persid) -----------------------*/
    .get('/pagebookdate/querymemberinfo/persid/:persid', async (req, res) => {
        const { persid } = req.params;

        try {
            let meminfo = await CLBookDate.getMemberInfoByPersId(persid);
            if (meminfo && meminfo.length > 0) {
                meminfo.sort((a, b) => {
                    let x = a['tbmemberinfos.meminfo_year']?.substr(a['tbmemberinfos.meminfo_year'].length - 4);
                    let y = b['tbmemberinfos.meminfo_year']?.substr(b['tbmemberinfos.meminfo_year'].length - 4);
                    return ((x > y) ? -1 : (x < y) ? 1 : 0);
                });

                let meminfoinformat = {
                    'pers_id': meminfo[0]['pers_id'],
                    'name': meminfo[0]['tbmemberinfos.mem_fname'] + ' ' + meminfo[0]['tbmemberinfos.mem_lname'],
                    'position': meminfo[0]['tbmemberinfos.mem_pos'],
                    'rank': meminfo[0]['tbmemberinfos.mem_rank'],
                    'branch': meminfo[0]['tbmemberinfos.rtafbranch'],
                    'branchgrp': meminfo[0]['tbmemberinfos.rtafbranchgrp'],
                    'affiliation': meminfo[0]['tbmemberinfos.mem_affiliation'],
                    'image': meminfo[0]['tbmemberinfos.memimgpath'],
                    'cellphone': meminfo[0]['tbmemberinfos.mem_cellphone'],
                    'offtel': meminfo[0]['tbmemberinfos.mem_offtel'],
                    'email': meminfo[0]['tbmemberinfos.mem_email']
                };
                res.send(meminfoinformat);
            } else {
                res.send(meminfo);
            }
        } catch (err) {
            console.log('Pagebookdate -> querymemberinfo failed -> err : ', err);
        }
    })

    /*--------------------- GET :: /pagebookdate/memberinfo (by name) -----------------------*/
    .get('/pagebookdate/querymemberinfo/persname/:persname', async (req, res) => {
        const { persname } = req.params;

        try {
            let meminfo = await CLBookDate.getMemberInfoByName(persname);
            if (meminfo && meminfo.length > 0) {
                meminfo.sort((a, b) => {
                    let x = a['meminfo_year'].substr(a['meminfo_year'].length - 4);
                    let y = b['meminfo_year'].substr(b['meminfo_year'].length - 4);
                    return ((x > y) ? -1 : (x < y) ? 1 : 0);
                });

                let meminfoinformat = {
                    'pers_id': meminfo[0]['tbmember.pers_id'],
                    'name': meminfo[0]['mem_fname'] + ' ' + meminfo[0]['mem_lname'],
                    'position': meminfo[0]['mem_pos'],
                    'rank': meminfo[0]['mem_rank'],
                    'branch': meminfo[0]['rtafbranch'],
                    'branchgrp': meminfo[0]['rtafbranchgrp'],
                    'affiliation': meminfo[0]['mem_affiliation'],
                    'image': meminfo[0]['memimgpath'],
                    'cellphone': meminfo[0]['mem_cellphone'],
                    'offtel': meminfo[0]['mem_offtel'],
                    'email': meminfo[0]['mem_email']
                };
                res.send(meminfoinformat);
            } else {
                res.send(meminfo);
            }
        } catch (err) {
            console.log('Pagebookdate -> querymemberinfo failed -> err : ', err);
        }
    })

    /*--------------------- GET :: /pagebookdate/previewfilepath -----------------------*/
    .get('/pagebookdate/previewfilepath', async (req, res) => {
        let absolutepath = path.resolve(path.join('./', req.query.filepath));
        //console.log('absolutepath -> ', absolutepath);
        res.sendFile(absolutepath);
    })

    /*--------------------- GET :: /pagebookdate/testresvbyunitcode/:unitcode -----------------------*/
    .get('/pagebookdate/testresvbyunitcode/:unitcode', async (req, res) => {
        const { unitcode } = req.params;
        let resvcodelist = [];
        try {
            let testresvinfo = await CLBookDate.getTestResvInfoByRtafUnit(unitcode);

            let latestresvcode = `${unitcode}001`;
            if (testresvinfo.length !== 0) {
                testresvinfo.map(resv => {
                    resvcodelist.push(resv.testresvcode);
                });
                resvcodelist.sort((a, b) => (a > b ? -1 : 0));
                let num = Number(resvcodelist[0].match(/\d+/g)[0]) + 1; //only number
                let numstr = num < 10 ? '00' + num.toString() : num >= 10 && num < 100 ? '0' + num.toString() : num.toString();
                latestresvcode = resvcodelist[0].match(/[a-zA-Z]+/g)[0] + numstr; //only string
            }

            res.send(latestresvcode);
        } catch (err) {
            console.log('Pagebookdate -> testreservation failed -> err : ', err);
        }
    })

    /*--------------------- GET :: /pagebookdate/testresvbydate/:resvdate -----------------------*/
    .get('/pagebookdate/testresvbydate/:resvdate', async (req, res) => {
        const { resvdate } = req.params;
        try {
            let tmp = {};
            let countarr = [0, 0, 0];
            let testresvinfo = await CLBookDate.getTestResvInfoByResvDate(resvdate);
            //console.log('testresvinfo --------------> ', testresvinfo);
            testresvinfo.map(el => {
                switch (el['testreqtime']) {
                    case '09:00:00':
                        ++countarr[0];
                        break;
                    case '10:30:00':
                        ++countarr[1];
                        break;
                    case '13:30:00':
                        ++countarr[2];
                        break;
                }
            });
            tmp['date'] = resvdate;
            tmp['count'] = countarr;
            res.send(tmp);
        } catch (err) {
            console.log('Pagebookdate -> testreservation failed -> err : ', err);
        }
    })

    .put('/pagebookdate/add_update_testresv', async (req, res) => {
        //console.log('req.body ---> ', req.body);
        try {
            let _res = await CLBookDate.addOrUpdateTestResvInfo(req.body);
            if (_res?.completed) {
                res.status(201).json({
                    status: `${_res?.operation}`,
                });
            } else {
                res.status(500).json({
                    status: `${_res?.operation}`,
                });
            }
        } catch (err) {
            console.log('Pagebookdate -> addOrUpdateTestResvInfo failed -> err : ', err);
        }
    })

    .put('/pagebookdate/addupdatetestresult', async (req, res) => {
        try {
            let _res = await CLBookDate.addOrUpdateIndvTestResult(req.body);
            if (_res?.completed) {
                res.status(201).json({
                    status: `${_res?.operation}`,
                });
            } else {
                res.status(500).json({
                    status: `${_res?.operation}`,
                });
            }
        } catch (err) {
            console.log('Pagebookdate -> addOrUpdateTestResult failed -> err : ', err);
        }
    })

    .put('/pagebookdate/updatetestresrvaprvstate', async (req, res) => {
        //console.log('updatetestresrvaprvstate  ----> ', req.body);
        try {
            let _res = await CLBookDate.updateTestResrvAprvState(req.body);
            if (_res?.completed) {
                res.status(201).json({
                    status: `${_res?.operation}`,
                });
            } else {
                res.status(500).json({
                    status: `${_res?.operation}`,
                });
            }
        } catch (err) {
            console.log('Pagebookdate -> updateTestResrvAprvState failed -> err : ', err);
        }
    })

module.exports = routes;
