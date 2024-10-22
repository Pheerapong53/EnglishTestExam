const { StatusCodes } = require("http-status-codes");
const errorHandler = require("http-errors");
const db = require("../../models/index");
const { Op, HasMany, where, Sequelize } = require("sequelize");
const { sequelize } = require("../../models/index");
const path = require("path");
const fs = require("fs");
var onFinished = require("on-finished");
var destroy = require("destroy");

// const axios = require("axios");
// const multer = require("multer");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const {
  tbquestion,
  tbcefrdifficultylevel,
  tbchoice,
  tbindvform,
  tbintrovideo,
} = db;

const exam = {
  introVideo: async (request, response) => {
    let success = new Promise(async (resolve, reject) => {
      try {
        await tbintrovideo
          .findOne({
            attributes: ["introvdoid", "introvdotitle", "introvdofilepath"],
            order: [["introvdouploaddate", "DESC"]],
            raw: true,
          })
          .then((res) => {
            if (res !== null) {
              //const idx = __dirname.match(new RegExp('/server/'))?.index;
              const idx = __dirname.indexOf("/backend/");
              const videoPath = path.join(
                __dirname.substring(0, idx),
                res.introvdofilepath,
                res.introvdotitle
              );
              const videoSize = fs.statSync(videoPath).size;
              let range =
                "undefined" !== typeof request.headers.range
                  ? request.headers.range
                  : "bytes=0-";

              console.log("path: ", videoPath);

              if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;
                const chunkSize = end - start + 1;
                const videoStream = fs.createReadStream(videoPath, {
                  start,
                  end,
                });

                const headers = {
                  "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                  "Accept-Ranges": "bytes",
                  "Content-Length": chunkSize,
                  "Content-Type": "video/mp4",
                };

                response.writeHead(206, headers);
                videoStream.pipe(response);
                onFinished(response, function () {
                  destroy(videoStream);
                });
              } else {
                const headers = {
                  "Content-Length": videoSize,
                  "Content-Type": "video/mp4",
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
        console.log(
          "Backend :: CLTestMgmt : streamVideoFile -> failed : ",
          err
        );
        reject({ stream_success: false });
      }
    });
    return success;
  },
  getcefrlevel: async (req) => {
    const { cefrlevel } = req.params;
    const condition = {
      where: {
        cerfcode: cefrlevel,
      },
    };
    try {
      return await tbcefrdifficultylevel.findOne(condition);
    } catch (err) {
      console.log("Backend :: cefrlevel : getcefrlevel -> failed : ", err);
    }
  },
  getquestioninfo: async () => {
    const condition = {
      include: [
        {
          model: tbquestion,
        },
      ],
      raw: true,
      attributes: {
        include: [
          ["cerfcode", "id"],
          [
            sequelize.fn("COUNT", sequelize.col("tbquestions.cerfcode")),
            "n_cerfcode",
          ],
        ],
      },
      group: [sequelize.col("tbcefrdifficultylevel.cerfcode")],
    };

    try {
      return await tbcefrdifficultylevel.findAll(condition);
    } catch (err) {
      console.error("Backend :: question : getquestioninfo -> failed : ", err);
    }
  },

  getindvform: async (req) => {
    const testresultcode = req.query.testresultcode;
    const condition = {
      include: [
        {
          model: tbquestion,
          required: true,
        },
        {
          model: tbchoice,
          required: true,
          as: "fk_choiceA",
          on: sequelize.where(
            sequelize.col("A"),
            Op.eq,
            sequelize.col("fk_choiceA.choicecode")
          ),
        },
        {
          model: tbchoice,
          required: true,
          as: "fk_choiceB",
          on: sequelize.where(
            sequelize.col("tbindvform.B"),
            Op.eq,
            sequelize.col("fk_choiceB.choicecode")
          ),
        },
        {
          model: tbchoice,
          required: true,
          as: "fk_choiceC",
          on: sequelize.where(
            sequelize.col("tbindvform.C"),
            Op.eq,
            sequelize.col("fk_choiceC.choicecode")
          ),
        },
        {
          model: tbchoice,
          required: true,
          as: "fk_choiceD",
          on: sequelize.where(
            sequelize.col("tbindvform.D"),
            Op.eq,
            sequelize.col("fk_choiceD.choicecode")
          ),
        },
      ],
      raw: true,
      where: {
        testresultcode: testresultcode,
      },
      limit: 100,
    };
    try {
      return await tbindvform.findAll(condition);
    } catch (err) {
      console.log("Backend :: question : getquestion -> failed : ", err);
    }
  },

  getquestion: async () => {
    //random question with formcode
    const formCode = await tbquestion.findAll({
      attributes: ["formcode"],
      raw: true,
      group: [sequelize.col("formcode")],
    });
    const arrayFormCode = formCode.map((obj) => obj.formcode);
    const randomIndex = Math.floor(Math.random() * arrayFormCode.length);
    const randomFormCode = arrayFormCode[randomIndex];

    const condition = {
      raw: true,
      where: { formcode: randomFormCode },
    };

    try {
      return await tbquestion.findAll(condition);
    } catch (err) {
      console.log("Backend :: question : getquestion -> failed : ", err);
    }
  },
  getquestionfilterbycerfcode: async (req) => {
    const { cerfcode } = req.params;
    let condition = {
      where: {
        cerfcode: cerfcode,
      },
    };
    try {
      return await tbquestion.findAll(condition);
    } catch (err) {
      console.log("Backend :: question : getquestion -> failed : ", err);
    }
  },

  getchoice: async () => {
    const condition = {
      raw: true,
    };
    try {
      return await tbchoice.findAll(condition);
    } catch (err) {
      console.log("Backend :: question : getchoice -> failed : ", err);
    }
  },
  getchoiceByQuestioncode: async (req) => {
    const { questioncode } = req.params;
    let condition = {
      where: {
        questioncode: questioncode,
      },
    };
    try {
      return await tbchoice.findAll(condition);
    } catch (err) {
      console.log(
        "Backend :: choice : getchoiceByQuestioncode -> failed : ",
        err
      );
    }
  },
  getquestionlists: async () => {
    const condition = {
      raw: true,
    };

    try {
      return await tbquestion.findAll(condition);
    } catch (err) {
      console.log("Backend :: question : getquestionlists -> failed : ", err);
    }
  },
  getchoicelists: async () => {
    const condition = {
      include: [
        {
          model: tbchoice,
        },
      ],
      raw: true,
    };
    try {
      return await tbquestion.findAll(condition);
    } catch (err) {
      console.log("Backend :: choice : getchoicelists -> failed : ", err);
    }
  },
  addcefrlevel: async (req, res, next) => {
    try {
      const cerfcode = req.body.cerfcode;
      let condition = {
        where: {
          cerfcode: cerfcode,
        },
      };
      const existingLevel = await tbcefrdifficultylevel.findOne(condition);

      if (existingLevel) {
        return next(
          errorHandler(
            StatusCodes.BAD_REQUEST,
            "มีข้อมูล CerfLevel ในระบบแล้ว"
          ),
          res
            .status(400)
            .json(
              errorHandler(
                StatusCodes.BAD_REQUEST,
                "มีข้อมูล CerfLevel ในระบบแล้ว"
              )
            )
        );
      }

      const addcefrlevel = await tbcefrdifficultylevel
        .create({
          cerfcode: cerfcode.toString(),
          cerfdifficultylevel: req.body.cerfdifficultylevel,
          cerfdifficultyleveldesc: req.body.cerfdifficultyleveldesc,
          cerfleveltype: req.body.cerfleveltype,
        })
        .catch(function (err) {
          console.log("addcefrlevel error : ", err);
          next(
            errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
            res
              .status(500)
              .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
          );
        });
      res
        .status(StatusCodes.CREATED)
        .json({ msg: "เพิ่มข้อมูล CerfLevel เรียบร้อยแล้ว" });
    } catch (error) {
      return next(
        errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
        res
          .status(500)
          .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
      );
    }
  },

  editcefrlevel: async (req, res, next) => {
    try {
      const cefrlevel = await tbcefrdifficultylevel
        .update(
          {
            cerfdifficultylevel: req.body.cerfdifficultylevel,
            cerfdifficultyleveldesc: req.body.cerfdifficultyleveldesc,
            cerfleveltype: req.body.cerfleveltype,
          },
          {
            where: {
              cerfcode: req.body.cerfcode,
            },
          }
        )
        .catch(function (err) {
          console.log("cefrlevel update error : ", err);
        });
      res
        .status(StatusCodes.CREATED)
        .json({ msg: "ปรับปรุง Cefrlevel แล้ว" });
    } catch (error) {
      res
        .status(StatusCodes.CREATED)
        .json({ msg: "err from editcefrlevel" + error });
    }
  },

  editquestionandchoice: async (req) => {
    const questioncode = req.body.questioncode;
    const choiceCodes = ["CH01", "CH02", "CH03", "CH04"];
    try {
      let updateStatus = false;
      // Update question before
      const question = await tbquestion
        .update(
          {
            problem: req.body.problem,
            question: req.body.question,
          },
          {
            where: {
              questioncode: questioncode,
            },
          }
        )
        .catch(function (err) {
          console.log("question update error : ", err);
        });

      for (let i = 0; i < choiceCodes.length; i++) {
        const choicetext = req.body[`${questioncode}${choiceCodes[i]}`];
        const existingChoices = await tbchoice.findOne({
          where: {
            choicecode: `${questioncode}${choiceCodes[i]}`,
          },
        });

        if (existingChoices) {
          await tbchoice.update(
            { choicetext: choicetext },
            { where: { choicecode: `${questioncode}${choiceCodes[i]}` } }
          );
          updateStatus = true;
        } else {
          await tbchoice.create(
            {
              choicecode: `${questioncode}${choiceCodes[i]}`,
              choicetext: choicetext,
              answer: choiceCodes[i] === "CH01" ? 1 : 0, // Correct answer for CH01
              questioncode: questioncode,
            },
            { ignoreDuplicates: true }
          );
        }
      }
      return { msg: updateStatus ? "แก้ไขคำตอบแล้ว" : "เพิ่มคำตอบแล้ว" };
    } catch (error) {
      console.error("Error in editing choices:", error.message || error);
      throw error;
    }
  },

  delquestionandchoice: async (req, res) => {
    try {
      const questioncode = req.params.questioncode;
      //Find questions with cerfcode
      const questions = await tbquestion.findAll({
        where: {
          questioncode: questioncode,
        },
        attributes: ["questioncode", "problem", "question", "formcode"],
      });

      //Delete the associated MP3 files for each question
      questions.forEach((question) => {
        const fileQuestion = question.question.includes(".mp3");
        const fileExtension = question.problem.split(".").pop();
        let filePath = "";
        let fileQuestionPath = "";
        if (fileExtension === "mp3") {
          filePath = path.join(
            __dirname,
            "..",
            `/fileproblem/sound/${question.formcode}/${question.problem}`
          );
        }

        if (fileExtension === "txt") {
          filePath = path.join(
            __dirname,
            "..",
            `/fileproblem/sound/${question.formcode}/${question.problem}`
          );
        }

        if (fileQuestion) {
          fileQuestionPath = path.join(
            __dirname,
            "..",
            `/fileproblem/sound/${question.formcode}/${question.question}`
          );
        }

        if (filePath && fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath); // Deleting the file
            console.log(`File deleted: ${filePath}`);
          } catch (err) {
            console.error(`Error deleting file: ${filePath}`, err);
          }
        }
        if (fileQuestionPath && fs.existsSync(fileQuestionPath)) {
          try {
            fs.unlinkSync(fileQuestionPath); // Deleting the file
            console.log(`File Question deleted: ${fileQuestionPath}`);
          } catch (err) {
            console.error(
              `Error deleting file question: ${fileQuestionPath}`,
              err
            );
          }
        }
      });

      const choiceDelByQuestionCode = await tbchoice
        .destroy({
          where: {
            questioncode: questioncode,
          },
        })
        .catch(function (err) {
          console.log("choiceDelByQuestionCode delete error : ", err);
        });

      const questionDelByCode = await tbquestion
        .destroy({
          where: {
            questioncode: questioncode,
          },
        })
        .catch(function (err) {
          console.log("questionDelByCode delete error : ", err);
        });

      res
        .status(StatusCodes.CREATED)
        .json({ msg: "คำถามและคำตอบถูกลบแล้ว" });
    } catch (error) {
      res
        .status(StatusCodes.CREATED)
        .json({ msg: "err from delquestionandchoice" + error });
    }
  },

  delcefrlevel: async (req, res) => {
    try {
      const cerfcode = req.params.id;
      //Find questions with cerfcode
      const questions = await tbquestion.findAll({
        where: {
          cerfcode: cerfcode,
        },
        attributes: ["questioncode", "problem", "question", "formcode"],
      });

      //Delete the associated MP3 files for each question
      questions.forEach((question) => {
        const fileQuestion = question.question.includes(".mp3");
        const fileExtension = question.problem.split(".").pop();
        let filePath = "";
        let fileQuestionPath = "";
        if (fileExtension === "mp3") {
          filePath = path.join(
            __dirname,
            "..",
            `/fileproblem/sound/${question.formcode}/${question.problem}`
          );
        }

        if (fileExtension === "txt") {
          filePath = path.join(
            __dirname,
            "..",
            `/fileproblem/text/${question.formcode}/${question.problem}`
          );
        }

        if (fileQuestion) {
          fileQuestionPath = path.join(
            __dirname,
            "..",
            `/fileproblem/sound/${question.formcode}/${question.question}`
          );
        }

        if (filePath && fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath); // Deleting the file
            console.log(`File deleted: ${filePath}`);
          } catch (err) {
            console.error(`Error deleting file: ${filePath}`, err);
          }
        }
        if (fileQuestionPath && fs.existsSync(fileQuestionPath)) {
          try {
            fs.unlinkSync(fileQuestionPath); // Deleting the file
            console.log(`File Question deleted: ${fileQuestionPath}`);
          } catch (err) {
            console.error(
              `Error deleting file question: ${fileQuestionPath}`,
              err
            );
          }
        }
      });

      const answerDelByLevel = await tbchoice
        .destroy({
          where: {
            questioncode: { [Op.substring]: cerfcode.toString() },
          },
        })
        .catch(function (err) {
          console.log("choiceDelbyLevel delete error : ", err);
        });

      const questionDelByLevel = await tbquestion
        .destroy({
          where: {
            cerfcode: cerfcode,
          },
        })
        .catch(function (err) {
          console.log("questionDelbyLevel delete error : ", err);
        });

      const levelDel = await tbcefrdifficultylevel
        .destroy({
          where: {
            cerfcode: cerfcode,
          },
        })
        .catch(function (err) {
          console.log("levelDel delete error : ", err);
        });

      res
        .status(StatusCodes.CREATED)
        .json({ msg: "CerfLevel, ไฟล์ที่เกี่ยวข้อง, คำถามและคำตอบถูกลบแล้ว" });
    } catch (error) {
      res
        .status(StatusCodes.CREATED)
        .json({ msg: "err from delcefrlevel" + error });
    }
  },
  delform: async (req, res) => {
    try {
      const formcode = req.params.formcode;
      //Find questions with cerfcode
      const questions = await tbquestion.findAll({
        where: {
          formcode: formcode,
        },
        attributes: ["questioncode", "problem", "question", "formcode"],
      });

      //Delete the associated MP3 files for each question
      questions.forEach((question) => {
        const fileQuestion = question.question.includes(".mp3");
        const fileExtension = question.problem.split(".").pop();
        let filePath = "";
        let fileQuestionPath = "";
        if (fileExtension === "mp3") {
          filePath = path.join(
            __dirname,
            "..",
            `/fileproblem/sound/${question.formcode}/${question.problem}`
          );
        }

        if (fileExtension === "txt") {
          filePath = path.join(
            __dirname,
            "..",
            `/fileproblem/text/${question.formcode}/${question.problem}`
          );
        }

        if (fileQuestion) {
          fileQuestionPath = path.join(
            __dirname,
            "..",
            `/fileproblem/sound/${question.formcode}/${question.question}`
          );
        }

        if (filePath && fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath); // Deleting the file
            console.log(`File deleted: ${filePath}`);
          } catch (err) {
            console.error(`Error deleting file: ${filePath}`, err);
          }
        }
        if (fileQuestionPath && fs.existsSync(fileQuestionPath)) {
          try {
            fs.unlinkSync(fileQuestionPath); // Deleting the file
            console.log(`File Question deleted: ${fileQuestionPath}`);
          } catch (err) {
            console.error(
              `Error deleting file question: ${fileQuestionPath}`,
              err
            );
          }
        }
      });

      const answerDelByForm = await tbchoice
        .destroy({
          where: {
            questioncode: { [Op.substring]: formcode.toString() },
          },
        })
        .catch(function (err) {
          console.log("choiceDelbyForm delete error : ", err);
        });

      const questionDelByForm = await tbquestion
        .destroy({
          where: {
            formcode: formcode,
          },
        })
        .catch(function (err) {
          console.log("questionDelbyForm delete error : ", err);
        });

      res
        .status(StatusCodes.CREATED)
        .json({ msg: "ไฟล์ที่เกี่ยวข้อง, คำถามและคำตอบถูกลบแล้ว" });
    } catch (error) {
      res.status(StatusCodes.CREATED).json({ msg: "err from delform" + error });
    }
  },

  addexamone: async (req, res, next) => {
    try {
      const questioncode =
        req.body.formcode + req.body.cerfcode + req.body.questionnumber;
      const ch01 = questioncode + "CH01";
      const ch02 = questioncode + "CH02";
      const ch03 = questioncode + "CH03";
      const ch04 = questioncode + "CH04";

      const existingQuestion = await tbquestion.findOne({
        where: {
          questioncode: questioncode,
        },
      });

      if (existingQuestion) {
        return next(
          errorHandler(StatusCodes.BAD_REQUEST, "คำถามนี้มีในระบบแล้ว!"),
          res
            .status(400)
            .json(
              errorHandler(StatusCodes.BAD_REQUEST, "คำถามนี้มีในระบบแล้ว!")
            )
        );
      }

      const questionCode = await tbquestion
        .create({
          questioncode: questioncode.toString(),
          problem: req.body.problem,
          question: req.body.question,
          cerfcode: req.body.cerfcode,
          formcode: req.body.formcode,
        })
        .catch(function (err) {
          console.log("tbquestion create error : ", err);
          next(
            errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
            res
              .status(500)
              .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
          );
        });

      const questionch01 = await tbchoice
        .create({
          choicecode: ch01.toString(),
          choicetext: req.body.ch01,
          answer: 1,
          questioncode: questioncode.toString(),
        })
        .catch(function (err) {
          console.log("questionch01 error : ", err);
          next(
            errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
            res
              .status(500)
              .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
          );
        });

      const questionch02 = await tbchoice
        .create({
          choicecode: ch02.toString(),
          choicetext: req.body.ch02,
          answer: 0,
          questioncode: questioncode.toString(),
        })
        .catch(function (err) {
          console.log("questionch02 error : ", err);
          next(
            errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
            res
              .status(500)
              .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
          );
        });

      const questionch03 = await tbchoice
        .create({
          choicecode: ch03.toString(),
          choicetext: req.body.ch03,
          answer: 0,
          questioncode: questioncode.toString(),
        })
        .catch(function (err) {
          console.log("questionch03 error : ", err);
          next(
            errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
            res
              .status(500)
              .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
          );
        });

      const questionch04 = await tbchoice
        .create({
          choicecode: ch04.toString(),
          choicetext: req.body.ch04,
          answer: 0,
          questioncode: questioncode.toString(),
        })
        .catch(function (err) {
          console.log("questionch04 error : ", err);
          next(
            errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
            res
              .status(500)
              .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
          );
        });
      res
        .status(StatusCodes.CREATED)
        .json({ msg: "เพิ่มคำถามและคำตอบแล้ว" });
    } catch (error) {
      return next(
        errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
        res
          .status(500)
          .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
      );
    }
  },

  addmanyexam: async (req, res) => {
    try {
      const data = req.body;
      for (let i = 0; i < data.length; i++) {
        const questioncode = data[i].questioncode;
        const cerfcode = data[i].cerfcode;

        const existingQuestion = await tbquestion.findOne({
          where: {
            questioncode: questioncode,
          },
        });

        const existingLevel = await tbcefrdifficultylevel.findOne({
          where: {
            cerfcode: cerfcode,
          },
        });

        if (!existingQuestion && existingLevel) {
          const questionCode = await tbquestion
            .create({
              questioncode: data[i].questioncode,
              problem: data[i].problem,
              question: data[i].question,
              cerfcode: data[i].cerfcode,
              formcode: data[i].formcode,
            })
            .catch(function (err) {
              console.log(`questionCode error : `, err);
            });

          const questionch01 = await tbchoice
            .create({
              choicecode: data[i].choicecodeT,
              choicetext: data[i].choiceTextT,
              answer: 1,
              questioncode: data[i].questioncode,
            })
            .catch(function (err) {
              console.log(`questionch01 error : `, err);
            });

          const questionch02 = await tbchoice
            .create({
              choicecode: data[i].choicecodeF1,
              choicetext: data[i].choiceTextF1,
              answer: 0,
              questioncode: data[i].questioncode,
            })
            .catch(function (err) {
              console.log(`questionch02 error : `, err);
            });

          const questionch03 = await tbchoice
            .create({
              choicecode: data[i].choicecodeF2,
              choicetext: data[i].choiceTextF2,
              answer: 0,
              questioncode: data[i].questioncode,
            })
            .catch(function (err) {
              console.log(`questionch03 error : `, err);
            });

          const questionch04 = await tbchoice
            .create({
              choicecode: data[i].choicecodeF3,
              choicetext: data[i].choiceTextF3,
              answer: 0,
              questioncode: data[i].questioncode,
            })
            .catch(function (err) {
              console.log(`questionch04 error : `, err);
            });
          console.log(`Insert Question with questioncode ${questioncode}`);
        } else if (!existingLevel) {
          console.log(
            `Question with questioncode ${questioncode} do not have cerf Level in tbcefrdifficultylevel`
          );
        } else if (existingQuestion) {
          console.log(
            `Question with questioncode ${questioncode} already Exists`
          );
        }
      }
      res
        .status(StatusCodes.CREATED)
        .json({ msg: "Question and Choices have been insert" });
    } catch (error) {
      res
        .status(StatusCodes.CREATED)
        .json({ msg: "err from addmanyexam" + error });
    }
  },
};

module.exports = exam;
