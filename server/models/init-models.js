var DataTypes = require("sequelize").DataTypes;
var _tbaccessrights = require("./tbaccessrights");
var _tbcefrdifficultylevel = require("./tbcefrdifficultylevel");
var _tbchoice = require("./tbchoice");
var _tbindvform = require("./tbindvform");
var _tblabroom = require("./tblabroom");
var _tbmember = require("./tbmember");
var _tbmemberinfo = require("./tbmemberinfo");
var _tbprimage = require("./tbprimage");
var _tbpublicerelationscontents = require("./tbpublicerelationscontents");
var _tbpublicrelations = require("./tbpublicrelations");
var _tbquestion = require("./tbquestion");
var _tbtestreservation = require("./tbtestreservation");
var _tbtestresult = require("./tbtestresult");
var _tbtestscoringcriteria = require("./tbtestscoringcriteria");
var _tbusertype = require("./tbusertype");
/*------------------ added : 24-10-2024 -----------------*/
var _tbcerflevel = require("./tbcefrlevel");
/*-------------------------------------------------------*/

function initModels(sequelize) {
  var tbaccessrights = _tbaccessrights(sequelize, DataTypes);
  var tbcefrdifficultylevel = _tbcefrdifficultylevel(sequelize, DataTypes);
  var tbchoice = _tbchoice(sequelize, DataTypes);
  var tbindvform = _tbindvform(sequelize, DataTypes);
  var tblabroom = _tblabroom(sequelize, DataTypes);
  var tbmember = _tbmember(sequelize, DataTypes);
  var tbmemberinfo = _tbmemberinfo(sequelize, DataTypes);
  var tbprimage = _tbprimage(sequelize, DataTypes);
  var tbpublicerelationscontents = _tbpublicerelationscontents(sequelize, DataTypes);
  var tbpublicrelations = _tbpublicrelations(sequelize, DataTypes);
  var tbquestion = _tbquestion(sequelize, DataTypes);
  var tbtestreservation = _tbtestreservation(sequelize, DataTypes);
  var tbtestresult = _tbtestresult(sequelize, DataTypes);
  var tbtestscoringcriteria = _tbtestscoringcriteria(sequelize, DataTypes);
  var tbusertype = _tbusertype(sequelize, DataTypes);
  /*------------------ added :  24-10-2024 -------------------*/
  var tbcerflevel = _tbcerflevel(sequelize, DataTypes);
  /*------------------------------------------------------*/
/*
  tbquestion.belongsTo(tbcefrdifficultylevel, { as: "cerfcode_tbcefrdifficultylevel", foreignKey: "cerfcode"});
  tbcefrdifficultylevel.hasMany(tbquestion, { as: "tbquestions", foreignKey: "cerfcode"});
  tbtestresult.belongsTo(tblabroom, { as: "testlabroom_tblabroom", foreignKey: "testlabroom"});
  tblabroom.hasMany(tbtestresult, { as: "tbtestresults", foreignKey: "testlabroom"});
  tbaccessrights.belongsTo(tbmember, { as: "per", foreignKey: "persid"});
  tbmember.hasMany(tbaccessrights, { as: "tbaccessrights", foreignKey: "persid"});
  tbmemberinfo.belongsTo(tbmember, { as: "per", foreignKey: "pers_id"});
  tbmember.hasMany(tbmemberinfo, { as: "tbmemberinfos", foreignKey: "pers_id"});
  tbpublicrelations.belongsTo(tbmember, { as: "pubrel_creator_tbmember", foreignKey: "pubrel_creator"});
  tbmember.hasMany(tbpublicrelations, { as: "tbpublicrelations", foreignKey: "pubrel_creator"});
  tbtestreservation.belongsTo(tbmember, { as: "coordinator_tbmember", foreignKey: "coordinator"});
  tbmember.hasMany(tbtestreservation, { as: "tbtestreservations", foreignKey: "coordinator"});
  tbtestreservation.belongsTo(tbmember, { as: "testapprover_tbmember", foreignKey: "testapprover"});
  tbmember.hasMany(tbtestreservation, { as: "testapprover_tbtestreservations", foreignKey: "testapprover"});
  tbtestresult.belongsTo(tbmember, { as: "realscorerecorder_tbmember", foreignKey: "realscorerecorder"});
  tbmember.hasMany(tbtestresult, { as: "tbtestresults", foreignKey: "realscorerecorder"});
  tbtestresult.belongsTo(tbmember, { as: "editscorerecorder_tbmember", foreignKey: "editscorerecorder"});
  tbmember.hasMany(tbtestresult, { as: "editscorerecorder_tbtestresults", foreignKey: "editscorerecorder"});
  tbtestresult.belongsTo(tbmember, { as: "testresultapprover_tbmember", foreignKey: "testresultapprover"});
  tbmember.hasMany(tbtestresult, { as: "testresultapprover_tbtestresults", foreignKey: "testresultapprover"});
  tbtestresult.belongsTo(tbmemberinfo, { as: "meminfo", foreignKey: "meminfo_id"});
  tbmemberinfo.hasMany(tbtestresult, { as: "tbtestresults", foreignKey: "meminfo_id"});
  tbchoice.belongsTo(tbquestion, { as: "questioncode_tbquestion", foreignKey: "questioncode"});
  tbquestion.hasMany(tbchoice, { as: "tbchoices", foreignKey: "questioncode"});
  tbindvform.belongsTo(tbquestion, { as: "question_code_tbquestion", foreignKey: "question_code"});
  tbquestion.hasMany(tbindvform, { as: "tbindvforms", foreignKey: "question_code"});
  tbtestresult.belongsTo(tbtestreservation, { as: "testresvcode_tbtestreservation", foreignKey: "testresvcode"});
  tbtestreservation.hasMany(tbtestresult, { as: "tbtestresults", foreignKey: "testresvcode"});
  tbindvform.belongsTo(tbtestresult, { as: "testresultcode_tbtestresult", foreignKey: "testresultcode"});
  tbtestresult.hasMany(tbindvform, { as: "tbindvforms", foreignKey: "testresultcode"});
  tbtestreservation.belongsTo(tbtestscoringcriteria, { as: "testscoringcriteria_tbtestscoringcriterium", foreignKey: "testscoringcriteria"});
  tbtestscoringcriteria.hasMany(tbtestreservation, { as: "tbtestreservations", foreignKey: "testscoringcriteria"});
  tbaccessrights.belongsTo(tbusertype, { as: "usrtype", foreignKey: "usrtypeid"});
  tbusertype.hasMany(tbaccessrights, { as: "tbaccessrights", foreignKey: "usrtypeid"});
*/
  return {
    tbaccessrights,
    tbcefrdifficultylevel,
    tbchoice,
    tbindvform,
    tblabroom,
    tbmember,
    tbmemberinfo,
    tbprimage,
    tbpublicerelationscontents,
    tbpublicrelations,
    tbquestion,
    tbtestreservation,
    tbtestresult,
    tbtestscoringcriteria,
    tbusertype,
    /*-------- added : 24-10-2024 --------*/
    tbcerflevel
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
