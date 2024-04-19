const { StatusCodes } = require("http-status-codes");
const errorHandler = require("http-errors");
const db = require("../../models/index");
const { Op, HasMany, where } = require("sequelize");
const { sequelize } = require("../../models/index");
const axios = require("axios");
const multer = require("multer");
const Sequelize = require("sequelize");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const { tbmemberinfo, tbtestresult, tbtestreservation, tbtestscoringcriteria } =
  db;

const test = {
  gettestreservationinfo: async () => {
    const condition = {
      include: [
        {
          model: tbtestscoringcriteria,
        },
      ],
      raw: true,
    };
    try {
      return await tbtestreservation.findAll(condition);
    } catch (err) {
      console.log("Backend :: question : gettestinfo -> failed : ", err);
    }
  },
  addTestResult: async (req, res, next) => {
    try {
      const testresultcode = req.body.testresultcode;
      const testresvcode = req.body.testresvcode;
      const pers_id = req.body.meminfo_id;
      const testconductdate = req.body.testconductdate;
      const realscore = req.body.realscore;
      const realscoredate = req.body.realscoredate;
      const realscorerecorder = req.body.realscorerecorder;
      const submittime = req.body.submittime;

      const meminfo_id = await tbmemberinfo.findOne({
        where: {
          pers_id: pers_id,
        },
      });

      let condition = {
        where: {
          testresultcode: testresultcode,
        },
      };

      const existingScore = await tbtestresult.findOne(condition);

      if (existingScore) {
        const updateRealScore = await tbtestresult.update(
          {
            meminfo_id: meminfo_id.meminfo_id,
            testconductdate: testconductdate,
            realscore: realscore,
            realscoredate: realscoredate,
            realscorerecorder: realscorerecorder,
            submittime: submittime,
          },
          {
            where: {
              testresultcode: testresultcode,
            },
          }
        );

        res
          .status(StatusCodes.CREATED)
          .json({ msg: "ส่งคำตอบสำเร็จ รอการอนุมัติผลสอบ" });
      } else {
        const addRealScore = await tbtestresult.create({
          testresultcode: testresultcode.toString(),
          testresvcode: testresvcode,
          meminfo_id: meminfo_id.meminfo_id,
          testconductdate: testconductdate,
          realscore: realscore,
          realscoredate: realscoredate,
          realscorerecorder: realscorerecorder,
          submittime: submittime,
        });

        res
          .status(StatusCodes.CREATED)
          .json({ msg: "ส่งคำตอบสำเร็จ รอการอนุมัติผลสอบ" });
      }
    } catch (error) {
      return next(
        errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
        res
          .status(500)
          .json(
            errorHandler(
              StatusCodes.INTERNAL_SERVER_ERROR,
              "TestResult can not insert"
            )
          )
      );
    }
  },
  gettestresult: async (req) => {
    const pers_id = req.query.pers_id;
    const condition = {
      include: [
        {
          model: tbtestreservation,
        },
      ],
      raw: true,
      where: {
        testresultcode: { [Sequelize.Op.like]: `%${pers_id}` },
      },
    };
    try {
      return await tbtestresult.findAll(condition);
    } catch (error) {
      console.log("Backend :: question : gettestresult -> failed : ", error);
    }
  },
};

module.exports = test;
