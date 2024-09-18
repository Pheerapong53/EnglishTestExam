/* eslint-disable no-unused-vars */
const { StatusCodes } = require("http-status-codes");
const errorHandler = require("http-errors");
const db = require("../../models/index");
const { Op, HasMany } = require("sequelize");
const { sequelize } = require("../../models/index");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const axios = require("axios");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const usagerecord = require("../register_login_logout/createusagerecordid");
const { tbmember, tbmemberinfo, tbaccessrights, tbusagerecord, tbipaddr } = db;

exports.getRegister = async (req, res, next) => {
  try {
    let condition = {
      include: [
        {
          model: tbmember,
          attributes: ["official_id"],
          association: new HasMany(tbmember, tbmemberinfo, {
            foreignKey: {
              name: "pers_id",
              allowNull: false,
            },
          }),
          required: true,
          on: {
            pers_id: { [Op.eq]: sequelize.col("tbmemberinfo.pers_id") },
          },
        },
      ],
      // where: { 'pers_id': userId.pers_id }
    };

    const users = await tbmemberinfo.findAll(condition);

    const response = users.map((user) => {
      const { ...data } = user.toJSON();
      return data;
    });
    res.json(response);
  } catch (error) {
    return next(
      errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res
        .status(500)
        .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};

exports.getByid = async (req, res, next) => {
  try {
    let condition = {
      include: [
        {
          model: tbmember,
          attributes: ["official_id"],
          association: new HasMany(tbmember, tbmemberinfo, {
            foreignKey: {
              name: "pers_id",
              allowNull: false,
            },
          }),
          required: true,
          on: {
            pers_id: { [Op.eq]: sequelize.col("tbmemberinfo.pers_id") },
          },
        },
      ],
      where: { pers_id: req.params.id },
    };
    const user = await tbmemberinfo.findOne(condition);
    if (!user) {
      return next(
        errorHandler(StatusCodes.NOT_FOUND, "No user found"),
        res
          .status(400)
          .json(errorHandler(StatusCodes.NOT_FOUND, "No user found"))
      );
    }
    return res.json({ user: user });
    // res.status(StatusCodes.OK).send(`get user by id ${req.params.id}`)
  } catch (error) {
    next(
      errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res
        .status(500)
        .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};

exports.createRegister = async (req, res, next) => {
  try {
    const d = new Date();
    const month =
      d.getMonth() + 1 <= 9
        ? ("0" + (d.getMonth() + 1)).slice(-2)
        : d.getMonth() + 1;
    const yearTh = d.getFullYear() + 543;
    const id = req.body.pers_id + "-" + month + yearTh;
    const meminfo_year = month + yearTh;
    let condition = {
      include: [
        {
          model: tbmember,
          attributes: ["official_id"],
          association: new HasMany(tbmember, tbmemberinfo, {
            foreignKey: {
              name: "pers_id",
              allowNull: false,
            },
          }),
          required: true,
          on: {
            pers_id: { [Op.eq]: sequelize.col("tbmemberinfo.pers_id") },
          },
        },
      ],
      where: { mem_email: req.body.email },
    };
    const existingUser = await tbmemberinfo.findOne(condition);
    if (existingUser) {
      //สมาชิกถูกระงับ...สมัครใหม่
      // console.log("data: ", existingUser.dataValues.pers_id);
      const id_user = existingUser.dataValues.pers_id;
      let condition_1 = {
        where: {
          persid: id_user,
        },
      };
      const userRole = await tbaccessrights.findAll(condition_1);

      const arrRole = [];
      for (let i = 0; i < userRole.length; i++) {
        for (let j = 0; j < userRole.length; j++) {}
        arrRole.push({
          usrtypeid: userRole[i].usrtypeid,
          status: userRole[i].status,
        });
      }

      const chkAllowS = arrRole.find((item) => item.status === "1000"); // check if user suspend approval
      if (chkAllowS !== undefined) {
        for (let j = 0; j < arrRole.length; j++) {
          await tbaccessrights
            .update(
              {
                status: "2",
              },
              { where: { persid: id_user } }
            )
            .catch((err) => {
              console.log("tbaccessrights update status >>> err : ", err);
              return next(
                errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
                res
                  .status(500)
                  .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
              );
            });
        }
        return next(
          res.status(StatusCodes.CREATED).json({ msg: "User has been created" })
        );
      }
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "User already exists!"),
        res
          .status(400)
          .json(errorHandler(StatusCodes.BAD_REQUEST, "User already exists!"))
      );
    }

    const userId = await tbmember
      .create({
        pers_id: req.body.pers_id,
        official_id: req.body.official_id,
      })
      .catch(function (err) {
        console.log("tbmember error : ", err);
        return next(
          errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
          res
            .status(500)
            .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
        );
      });
    const userDetail = await tbmemberinfo
      .create({
        meminfo_id: id.toString(),
        pers_id: req.body.pers_id,
        meminfo_year: meminfo_year.toString(),
        mem_rank: req.body.mem_rank,
        mem_fname: req.body.mem_fname,
        mem_lname: req.body.mem_lname,
        mem_pos: req.body.mem_pos,
        mem_affiliation: req.body.mem_affiliation,
        rtafbranch: req.body.rtafbranch,
        rtafbranchgrp: req.body.rtafbranchgrp,
        mem_cellphone: req.body.mem_cellphone,
        mem_offtel: req.body.mem_offtel,
        memimgpath: req.body.memimgpath,
        mem_email: req.body.email,
      })
      .catch(function (err) {
        console.log("tbmemberinfo error : ", err);
        return next(
          errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
          res
            .status(500)
            .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
        );
      });

    for (let i = 1; i <= 5; i++) {
      const data = {
        accessrightsid: `${req.body.pers_id}-USR0${i}`,
        persid: req.body.pers_id,
        usrtypeid: `USR0${i}`,
        permissiondate: new Date(),
        status: "2",
      };
      const accessrightsid = await tbaccessrights
        .create(data, {
          ignoreDuplicates: true,
        })
        .catch(function (err) {
          console.log("tbaccessrights error : ", err);
          return next(
            errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
            res
              .status(500)
              .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
          );
        });
    }

    if (userId || userDetail) {
      return res
        .status(StatusCodes.CREATED)
        .json({ msg: "User has been created" });
    } else {
      return next(
        errorHandler(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Something went wrong!!!"
        ),
        res
          .status(500)
          .json(
            errorHandler(
              StatusCodes.INTERNAL_SERVER_ERROR,
              "Something went wrong!!!"
            )
          )
      );
    }

    // console.log("userId: ", userId);
    // console.log("userDetail: ", userDetail);
    // res.status(StatusCodes.CREATED).json({userId: userId, userDetail: userDetail});
    // res.status(StatusCodes.CREATED).json({ msg: "User has been created" });
  } catch (error) {
    return next(
      errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res
        .status(500)
        .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};

exports.editRegister = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Id must be definded"),
        res
          .status(400)
          .json(errorHandler(StatusCodes.BAD_REQUEST, "Id must be definded"))
      );
    }

    if (!req.body.mem_email) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded"),
        res
          .status(400)
          .json(errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded"))
      );
    }

    let condition = {
      include: [
        {
          model: tbmember,
          attributes: ["official_id"],
          association: new HasMany(tbmember, tbmemberinfo, {
            foreignKey: {
              name: "pers_id",
              allowNull: false,
            },
          }),
          required: true,
          on: {
            pers_id: { [Op.eq]: sequelize.col("tbmemberinfo.pers_id") },
          },
        },
      ],
      where: { pers_id: req.params.id },
    };
    const user = await tbmemberinfo.findOne(condition);

    if (!user) {
      return next(
        errorHandler(StatusCodes.NOT_FOUND, "No user found"),
        res
          .status(400)
          .json(errorHandler(StatusCodes.NOT_FOUND, "No user found"))
      );
    }

    user.mem_email = req.body.mem_email;
    user.mem_rank = req.body.mem_rank;
    await user.save();
    res.json({ result: true });
  } catch (error) {
    return next(
      errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res
        .status(500)
        .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};

exports.delByid = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Id must be definded"),
        res
          .status(400)
          .json(errorHandler(StatusCodes.BAD_REQUEST, "Id must be definded"))
      );
    }

    let condition = {
      include: [
        {
          model: tbmember,
          attributes: ["official_id"],
          association: new HasMany(tbmember, tbmemberinfo, {
            foreignKey: {
              name: "pers_id",
              allowNull: false,
            },
          }),
          required: true,
          on: {
            pers_id: { [Op.eq]: sequelize.col("tbmemberinfo.pers_id") },
          },
        },
      ],
      where: { pers_id: req.params.id },
    };
    const user = await tbmemberinfo.findOne(condition);

    if (!user) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Id must be definded"),
        res
          .status(400)
          .json(errorHandler(StatusCodes.BAD_REQUEST, "Id must be definded"))
      );
    }

    await tbmemberinfo.destroy({
      where: {
        pers_id: req.params.id,
      },
    });
    await tbaccessrights.destroy({
      where: {
        persid: req.params.id,
      },
    });
    await tbmember.destroy({
      where: {
        pers_id: req.params.id,
      },
    });

    res.json({ result: true });
  } catch (error) {
    return next(
      errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res
        .status(500)
        .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, ipadd, mode } = req.body;
    const ipV4 = req.connection.remoteAddress
    const ipV4Split = ipV4.split(":");
    const ip = ipadd || req.headers['x-forwarded-for'] || ipV4Split[ipV4Split.length - 1];

    if (!email) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded"),
        res
          .status(400)
          .json(errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded"))
      );
    }

    if (!password) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Password must be definded"),
        res
          .status(400)
          .json(
            errorHandler(StatusCodes.BAD_REQUEST, "Password must be definded")
          )
      );
    }

    // set ADMIN
    console.log("ip: ", ip)
    const setAdmin = {
      meminfo_id: "1503202300000-032566",
      pers_id: "1503202300000",
      meminfo_year: "032566",
      mem_rank: "ร.ต.",
      mem_fname: "admin",
      mem_lname: "dev",
      mem_pos: "DEV",
      mem_affiliation: "ศซว.ทอ.",
      rtafbranch: "ส.",
      rtafbranchgrp: "สารสนเทศและสงครามอิเล็กทรอนิกส์",
      mem_cellphone: "0326521255",
      mem_offtel: "11111",
      memimgpath: "",
      mem_email: "adminDev",
      tbmemberinfos: [{ official_id: "150320230000" }],
    };

    if (email === "admin" && password === "p@ssW0rdAdm1nSW66") {
      const token = jwt.sign({ setAdmin }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });

      const arrRole = [
        { usrtypeid: "USR01", status: "1" },
        { usrtypeid: "USR02", status: "1" },
        { usrtypeid: "USR03", status: "1" },
        { usrtypeid: "USR04", status: "1" },
        { usrtypeid: "USR05", status: "1" },
      ];

      return res.json({
        token: token,
        user: setAdmin,
        userRole: arrRole,
        // userRoleChk: arrRoleChk,
      });
    } else {
      //////////////////////////////////// search/check IP addresses in network and check status network ////////////////////////////////////
      let condition_2 = {
        include: [
          {
            model: tbipaddr,
            attributes: ["office", "status", "ipaddr"],
            association: new HasMany(tbipaddr, tbusagerecord, {
              foreignKey: {
                name: "ipaddr",
                allowNull: false,
              },
            }),
            required: true,
            on: {
              ipaddr: { [Op.eq]: sequelize.col("tbusagerecord.ipaddr") },
            },
          },
        ],
        where: {
          ipaddr: ip,
        },
      };
      const seachip = await tbipaddr.findOne({
        where: {
          ipaddr: {
            [Op.eq]: ip,
          },
        },
      });

      if (!seachip) {
        return next(
          errorHandler(
            StatusCodes.NOT_FOUND,
            "Do not allow this computer to log in Please change the computer."
          ),
          res
            .status(400)
            .json(
              errorHandler(
                StatusCodes.NOT_FOUND,
                "Do not allow this computer to log in Please change the computer."
              )
            )
        );
      } else {
        const ipaddr = await tbusagerecord.findOne(condition_2);
        const statusip =
          ipaddr === null
            ? null
            : JSON.parse(JSON.stringify(ipaddr.dataValues.tbusagerecords));
        if (!statusip || statusip.length === 0) {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          let requestBody = {
            user: email,
            pass: password,
          };

          const json = JSON.stringify(requestBody);
          let end_point = process.env.END_POINT_LOGIN;

          axios
            .post(end_point, json, config)
            .then((response) => {
              if (response.data.result === "Process-Complete") {
                // const user = 'sittichai_yao' //ใช้เมื่อ api มีปัญหา
                const user = response.data;
                checkUser(user, statusip, ip, mode, req, res, next);
              } else {
                if (response.data.result === "Process-Error") {
                  return next(
                    errorHandler(
                      StatusCodes.BAD_REQUEST,
                      "Email or Password is not correct"
                    ),
                    res
                      .status(400)
                      .json(
                        errorHandler(
                          StatusCodes.BAD_REQUEST,
                          "Email or Password is not correct"
                        )
                      )
                  );
                }
              }
            })
            .catch((error) => {
              return next(
                errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
                res
                  .status(500)
                  .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
              );
            });
        } else if (statusip[0].status === 0 || statusip[0].status === -1) {
          //////////////////////////////////// check accessright user ////////////////////////////////////
          return next(
            errorHandler(
              StatusCodes.BAD_REQUEST,
              "This computer has been suspended. Please contact the system administrator."
            ),
            res
              .status(400)
              .json(
                errorHandler(
                  StatusCodes.BAD_REQUEST,
                  "This computer has been suspended. Please contact the system administrator."
                )
              )
          );
        } else {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          let requestBody = {
            user: email,
            pass: password,
          };

          const json = JSON.stringify(requestBody);
          let end_point = process.env.END_POINT_LOGIN;

          axios
            .post(end_point, json, config)
            .then((response) => {
              if (response.data.result === "Process-Complete") {
                // const user = 'sittichai_yao' //ใช้เมื่อ api มีปัญหา
                const user = response.data;
                checkUser(user, statusip, ip, mode, req, res, next);
              } else {
                if (response.data.result === "Process-Error") {
                  return next(
                    errorHandler(
                      StatusCodes.BAD_REQUEST,
                      "Email or Password is not correct"
                    ),
                    res
                      .status(400)
                      .json(
                        errorHandler(
                          StatusCodes.BAD_REQUEST,
                          "Email or Password is not correct"
                        )
                      )
                  );
                }
              }
            })
            .catch((error) => {
              return next(
                errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
                res
                  .status(500)
                  .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
              );
            });
        }
      }

      // const ipaddr = await tbusagerecord.findOne(condition_2);
      // const statusip =
      //   ipaddr === null
      //     ? null
      //     : JSON.parse(JSON.stringify(ipaddr.dataValues.tbusagerecords));
      // // console.log("ipaddr:", ipaddr?.dataValues);
      // if (!seachip) {
      //   if (!ipaddr) {
      //     return next(
      //       errorHandler(
      //         StatusCodes.NOT_FOUND,
      //         "Do not allow this computer to log in Please change the computer."
      //       ),
      //       res
      //         .status(400)
      //         .json(
      //           errorHandler(
      //             StatusCodes.NOT_FOUND,
      //             "Do not allow this computer to log in Please change the computer."
      //           )
      //         )
      //     );
      //   } else if (statusip[0].status === 0 || statusip[0].status === -1) {
      //     return next(
      //       errorHandler(
      //         StatusCodes.BAD_REQUEST,
      //         "This computer has been suspended. Please contact the system administrator."
      //       ),
      //       res
      //         .status(400)
      //         .json(
      //           errorHandler(
      //             StatusCodes.BAD_REQUEST,
      //             "This computer has been suspended. Please contact the system administrator."
      //           )
      //         )
      //     );
      //   } else {
      //     const config = {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     };
      //     let requestBody = {
      //       user: email,
      //       pass: password,
      //     };

      //     const json = JSON.stringify(requestBody);
      //     let end_point = process.env.END_POINT_LOGIN;

      //     axios
      //       .post(end_point, json, config)
      //       .then((response) => {
      //         if (response.data.result === "Process-Complete") {
      //           // const user = 'sittichai_yao' //ใช้เมื่อ api มีปัญหา
      //           const user = response.data;
      //           checkUser(user, statusip, ip, req, res, next);
      //         } else {
      //           if (response.data.result === "Process-Error") {
      //             return next(
      //               errorHandler(
      //                 StatusCodes.BAD_REQUEST,
      //                 "Email or Password is not correct"
      //               ),
      //               res
      //                 .status(400)
      //                 .json(
      //                   errorHandler(
      //                     StatusCodes.BAD_REQUEST,
      //                     "Email or Password is not correct"
      //                   )
      //                 )
      //             );
      //           }
      //         }
      //       })
      //       .catch((error) => {
      //         return next(
      //           errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      //           res
      //             .status(500)
      //             .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
      //         );
      //       });
      //   }
      // }
    }
  } catch (error) {
    return next(
      errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res
        .status(500)
        .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { usagerecordid, pers_id, lastmenulogout } = await req.body;
    console.log("data logout: ", usagerecordid, pers_id, lastmenulogout);
    if (pers_id === "1503202300000") {
      res.json({ result: true });
    } else {
      let condition = {
        include: [
          {
            model: tbmember,
            attributes: ["official_id"],
            association: new HasMany(tbmember, tbmemberinfo, {
              foreignKey: {
                name: "pers_id",
                allowNull: false,
              },
            }),
            required: true,
            on: {
              pers_id: { [Op.eq]: sequelize.col("tbmemberinfo.pers_id") },
            },
          },
        ],
        where: { pers_id: pers_id },
      };
      const user = await tbmemberinfo.findOne(condition);

      if (!user) {
        return next(errorHandler(StatusCodes.NOT_FOUND, "No user found"));
      }

      /////////////////// update tbpublicrelations ///////////////////////////////////
      let dateip = new Date();
      const options = {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      let timeslogout = dateip.toLocaleTimeString("th-TH", options);

      await tbusagerecord
        .update(
          {
            usrlogouttime: timeslogout,
            lastusagemenu: lastmenulogout,
          },
          { where: { usagerecordid: usagerecordid } }
        )
        .catch((err) => {
          console.log("tbusagerecord update time logout >>> err : ", err);
          next(
            errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
            res
              .status(500)
              .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
          );
        });

      user.mem_token = null;
      await user.save();
      res.json({ result: true });
      // await user.update({ mem_token: null }, { where: { UserId: UserId }});
    }
  } catch (error) {
    return next(
      errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res
        .status(500)
        .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};

exports.searchUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("searchUser: ",email, password);

    if (!email) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded"),
        res
          .status(400)
          .json(errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded"))
      );
    }

    if (!password) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Password must be definded"),
        res
          .status(400)
          .json(
            errorHandler(StatusCodes.BAD_REQUEST, "Password must be definded")
          )
      );
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let requestBody = {
      user: email,
      pass: password,
    };

    let requestidcard = {
      username: email,
    };

    const json = JSON.stringify(requestBody);
    const jsonidcard = JSON.stringify(requestidcard);
    let end_point_checkemail = process.env.END_POINT_LOGIN;
    let end_point_image = process.env.END_POINT_IMAGE_REGISTER;
    let end_point_image_tu = process.env.END_POINT_IMAGE_REGISTER_TU;
    let end_point_cardid = process.env.END_POINT_IDCARD;

    /////////HRIS////////////
    let HRIS_API = process.env.END_POINT_LOGIN2;
    let TOKEN_HRIS = process.env.TOKEN_HRIS;

    let APIKEY = process.env.APIKEY;
    let SEC_KEY = process.env.SEC_KEY;
    let ORG_PK = process.env.ORG_PK;

    /////////SERVER ART //////
    let END_PONIT_LOGIN_TEST = process.env.END_PONIT_LOGIN_TEST;

    const urlidcard = axios
      .post(end_point_cardid, jsonidcard, config)
      .then((response) => {
        if (response.data.result === "Process-Error") {
          return next(
            errorHandler(StatusCodes.BAD_REQUEST, "No user found"),
            res
              .status(400)
              .json(errorHandler(StatusCodes.BAD_REQUEST, "No user found"))
          );
        } else {
          return response;
        }
      })
      .catch((error) => {
        console.log("error end_point_cardid: ", error);
      });
    const urlcheckemail = axios
      .post(end_point_checkemail, json, config)
      .then((response) => {
        if (response.data.result === "Process-Error") {
          if (response.data.error[0] === "Password-is-Incorrect") {
            return next(
              errorHandler(StatusCodes.BAD_REQUEST, "Password is Incorrect"),
              res
                .status(400)
                .json(
                  errorHandler(StatusCodes.BAD_REQUEST, "Password is Incorrect")
                )
            );
          } else {
            return next(
              errorHandler(StatusCodes.BAD_REQUEST, "No user found"),
              res
                .status(400)
                .json(errorHandler(StatusCodes.BAD_REQUEST, "No user found"))
            );
          }
          // console.log("error: ", values[2].data.error[0]);
        }
        return response;
      })
      .catch((error) => {
        console.log("error end_point_checkemail: ", error);
      });

    const idcard = await urlidcard
      .then((res) => {
        return res.data.idc;
      })
      .catch((error) => {
        console.log("error idcard: ", error);
        return next(
          errorHandler(
            StatusCodes.BAD_REQUEST,
            "Please contact the system administrator."
          ),
          res
            .status(400)
            .json(
              errorHandler(
                StatusCodes.BAD_REQUEST,
                "Please contact the system administrator."
              )
            )
        );
      });

    // console.log("idcard: ",idcard);
    // console.log("user_orgname_code: ",user_orgname_code);
    // post Image HRIS endpoint
    let data_img = JSON.stringify({
      SEC_KEY: SEC_KEY,
      ORG_PK: ORG_PK,
      PER_CARDID: idcard,
    });

    // console.log("end_point_image: ", end_point_image);

    let config_img = {
      method: "post",
      maxBodyLength: Infinity,
      url: end_point_image,
      headers: {
        "Content-Type": "application/json",
        APIKEY: APIKEY,
      },
      data: data_img,
    };

    const urlmig_tu = axios.get(end_point_image_tu + email + "/base64");
    const img_hris = axios.request(config_img);
    Promise.all([urlidcard, urlmig_tu, urlcheckemail, img_hris])
      .then((values) => {
        // console.log("data0: ", values[0].data);// aplogin พี่ตู่
        // console.log("data1: ", values[1].data); // aplogin พี่ตู่
        // console.log("data2: ", values[2].data);// aplogin พี่ตู่
        // console.log("data3: ", values[3].data);// aplogin พี่บอยกำลังพล
        const officer_id = values[0].data.officer_id;
        const img_set = values[3]?.data[0].PIC !== "null" ? values[3]?.data[0].PIC : values[1]?.data.picture_base64;

        // console.log("img: ",values[3]?.data[0].PIC);
        // console.log("img 2: ", values[1]?.data.picture_base64);
        // console.log("img_set: ", img_set);

        //////////////////////////////////////////////////////////////////////////
        //  api HRIS SERVER HRIS
        // const config = {
        //   method: "post",
        //   maxBodyLength: Infinity,
        //   url: `${HRIS_API}${officer_id}/`,
        //   headers: {
        //     NeoAuth: TOKEN_HRIS,
        //     "Content-Type": "application/json",
        //   },
        // };
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //  api HRIS SERVER ART
        let data = JSON.stringify({
          officer_id: officer_id,
          TOKEN_HRIS: TOKEN_HRIS,
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: END_PONIT_LOGIN_TEST,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        //////////////////////////////////////////////////////////////////////////
        if (values[2].data.result === "Process-Error") {
          return next(
            errorHandler(StatusCodes.BAD_REQUEST, "No user found"),
            res
              .status(400)
              .json(errorHandler(StatusCodes.BAD_REQUEST, "No user found"))
          );
          // }
          // console.log("error: ", values[2].data.error[0]);
        } else {
          const resData = axios
            .request(config)
            .then((response) => {
              const data = response.data;
              // console.log("values[0].data: ",values[0].data)
              const res = {
                result: values[2].data.result,
                officer_id: values[0]?.data.officer_id,
                rank: data[0]?.RANK,
                fname: data[0]?.FIRSTNAME,
                lname: data[0]?.LASTNAME,
                user_position: data[0]?.POSITION,
                user_orgname: data[0]?.UNITNAME,
                rtafbranch: data[0]?.ARMCODE,
                rtafbranchgrp: data[0]?.SPC_NAME,
                skill: data[0]?.SKILL,
                user: values[0]?.data.user,
                idcard: data[0]?.IDCARD,
                img_base64: img_set,
              };
              return res;
            })
            .catch((error) => {
              console.log("error api HRIS: ", error);
              return next(
                errorHandler(
                  StatusCodes.BAD_REQUEST,
                  "Please contact the system administrator."
                ),
                res
                  .status(400)
                  .json(
                    errorHandler(
                      StatusCodes.BAD_REQUEST,
                      "Please contact the system administrator."
                    )
                  )
              );
            });
          resData.then((data) => {
            // console.log("result: ",data)
            if (data?.result === "Process-Complete" && data.rank) {
              res.send(data);
            } else {
              return next(
                errorHandler(StatusCodes.BAD_REQUEST, "No user found. Please enter new user information."),
                // res
                //   .status(400)
                //   .json(errorHandler(StatusCodes.BAD_REQUEST, "No user found. Please enter new user information."))
              );
            }
            // res.send(result);
          });
        }
      })
      // .catch(function (err) {
      //   console.log("all DATA: ", err.response?.status);
      //   console.log("all DATA_1: ", err.response?.statusText);
      //     if (err.response?.status === 503) {
      //     // res
      //     // .status(503)
      //     // .json(
      //     //   errorHandler(
      //     //     StatusCodes.SERVICE_UNAVAILABLE,
      //     //     "Service unavailable."
      //     //   )
      //     // );
      //     // return next(
      //     //   errorHandler(
      //     //     StatusCodes.SERVICE_UNAVAILABLE,
      //     //     "Temporarily unable to use the search function. Please fill in information."
      //     //   )
      //     // );
      //     return next(
      //       errorHandler(StatusCodes.SERVICE_UNAVAILABLE, "Service unavailable"),
      //       res
      //         .status(503)
      //         .json(
      //           errorHandler(StatusCodes.SERVICE_UNAVAILABLE, "Service unavailable")
      //         )
      //     );
      //   } else if (err.response?.status === 404) {
      //     return next(
      //       errorHandler(StatusCodes.SERVICE_UNAVAILABLE, err.response?.statusText),
      //       res
      //         .status(404)
      //         .json(
      //           errorHandler(StatusCodes.SERVICE_UNAVAILABLE, err.response?.statusText)
      //         )
      //     );
      //   } else {
      //     return next(
      //       errorHandler(StatusCodes.SERVICE_UNAVAILABLE, "Something went wrong"),
      //       res
      //         .status(404)
      //         .json(
      //           errorHandler(StatusCodes.SERVICE_UNAVAILABLE, "Something went wrong")
      //         )
      //     );
      //   }
      // });
    ///////////////////////

    //  axios.post( end_point, json, config )
    // .then(response => {
    //     if( response.data.result  === "Process-Complete" ){
    //         const user = response.data;
    //         axios.post( end_point_cardid, jsonidcard, config )
    //         .then(response => {
    //           if(response.data.result  === "Process-Complete"){
    //             const idcard = response.data;
    //             console.log("idcard: ",idcard)
    //             axios.get( end_point_image + email + '/base64')
    //             .then(response => {
    //             const image = response.data.picture_base64;
    //             res.send({image: image, user: user, idcard: idcard});
    //         })
    //           }
    //         })
    //     }
    //     else {
    //         return next(
    //           errorHandler(
    //             StatusCodes.BAD_REQUEST,
    //             'No user found',
    //           ),
    //           res.status(400).json(errorHandler(StatusCodes.BAD_REQUEST,
    //             'No user found',))
    //         );
    //     }
    //     });
  } catch (error) {
    return next(
      errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      // res
      //   .status(500)
      //   .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    let condition = {
      include: [
        {
          model: tbmember,
          attributes: ["official_id"],
          association: new HasMany(tbmember, tbmemberinfo, {
            foreignKey: {
              name: "pers_id",
              allowNull: false,
            },
          }),
          required: true,
          on: {
            pers_id: { [Op.eq]: sequelize.col("tbmemberinfo.pers_id") },
          },
        },
      ],
      where: {
        mem_email: req.user.setData.mem_email,
      },
    };
    const user = await tbmemberinfo.findOne(condition);
    if (!user)
      return next(
        errorHandler(
          StatusCodes.NOT_FOUND,
          "No email found... Please register before login"
        ),
        res
          .status(400)
          .json(
            errorHandler(
              StatusCodes.NOT_FOUND,
              "No email found... Please register before login"
            )
          )
      );

    // console.log("setData.persid: ",req.user)
    let condition_1 = {
      where: {
        persid: req.user.setData.pers_id,
      },
    };
    const userRole = await tbaccessrights.findAll(condition_1).catch((err) => {
      console.log("tbaccessrights findOne >>> err : ", err);
      next(
        errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
        res
          .status(500)
          .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
      );
    });

    const arrRole = [];
    for (let i = 0; i < userRole.length; i++) {
      for (let j = 0; j < userRole.length; j++) {
        // console.log(key[0]+ ', ' + pair[1]);
      }
      arrRole.push({
        usrtypeid: userRole[i].usrtypeid,
        status: userRole[i].status,
      });
    }

    const chkAllowA = arrRole.find((item) => item.status === "2"); // check if user pending approval
    const chkAllowS = arrRole.find((item) => item.status === "1000"); // check if user suspend approval
    const chkAllowN = arrRole.filter((item) => item.status === "0"); // check if user suspend approval
    // console.log("chkAllowN: ", chkAllowN.length);
    if (chkAllowA !== undefined || chkAllowN.length === 5) {
      return next(
        errorHandler(
          StatusCodes.BAD_REQUEST,
          "Please contact the system administrator."
        ),
        res
          .status(400)
          .json(
            errorHandler(
              StatusCodes.BAD_REQUEST,
              "Please contact the system administrator."
            )
          )
      );
    } else if (chkAllowS !== undefined) {
      return next(
        errorHandler(
          StatusCodes.NOT_FOUND,
          "Your username has been suspended or the website is closed for maintenance. Please contact admin."
        ),
        res
          .status(400)
          .json(
            errorHandler(
              StatusCodes.NOT_FOUND,
              "Your username has been suspended or the website is closed for maintenance. Please contact admin."
            )
          )
      );
    }

    const {
      mem_token,
      memimgpath,
      mem_cellphone,
      mem_offtel,
      mem_affiliation,
      rtafbranch,
      rtafbranchgrp,
      ...data
    } = user.toJSON();
    data["new_usagerecordid"] = req.user.setData.new_usagerecordid;
    const setData = await JSON.parse(JSON.stringify(data));
    const token = jwt.sign({ setData }, process.env.JWT_SECRET, {
      expiresIn: "1d",
      // expiresIn: 3600,
    });

    await tbmemberinfo.update(
      { mem_token: token },
      { where: { pers_id: setData.pers_id } }
    );

    return res.json({
      token: token,
      user: setData,
      userRole: arrRole,
      // userRoleChk: arrRoleChk,
    });
  } catch (error) {
    return next(
      errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res
        .status(500)
        .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};

////////////////////////////////// login ไม่ check email ทอ.//////////////////////////////////////
exports.loginv2 = async (req, res, next) => {
  try {
    const { email, password, ipadd, mode } = req.body;
    const ipV4 = req.connection.remoteAddress
    const ipV4Split = ipV4.split(":");
    const ip = ipadd || req.headers['x-forwarded-for'] || ipV4Split[ipV4Split.length - 1];

    if (!email) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded"),
        res
          .status(400)
          .json(errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded"))
      );
    }

    if (!password) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Password must be definded"),
        res
          .status(400)
          .json(
            errorHandler(StatusCodes.BAD_REQUEST, "Password must be definded")
          )
      );
    }

    console.log("ip: ", ip)
    const setAdmin = {
      meminfo_id: "1503202300000-032566",
      pers_id: "1503202300000",
      meminfo_year: "032566",
      mem_rank: "ร.ต.",
      mem_fname: "admin",
      mem_lname: "dev",
      mem_pos: "DEV",
      mem_affiliation: "ศซว.ทอ.",
      rtafbranch: "ส.",
      rtafbranchgrp: "สารสนเทศและสงครามอิเล็กทรอนิกส์",
      mem_cellphone: "0326521255",
      mem_offtel: "11111",
      memimgpath: "",
      mem_email: "adminDev",
      tbmemberinfos: [{ official_id: "150320230000" }],
    };

    if (email === "admin" && password === "p@ssW0rdAdm1nSW66") {
      const token = jwt.sign({ setAdmin }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const arrRole = [
        { usrtypeid: "USR01", status: "1" },
        { usrtypeid: "USR02", status: "1" },
        { usrtypeid: "USR03", status: "1" },
        { usrtypeid: "USR04", status: "1" },
        { usrtypeid: "USR05", status: "1" },
      ];

      return res.json({
        token: token,
        user: setAdmin,
        userRole: arrRole,
        // userRoleChk: arrRoleChk,
      });
    } else {
      let condition = {
        include: [
          {
            model: tbmember,
            attributes: ["official_id"],
            association: new HasMany(tbmember, tbmemberinfo, {
              foreignKey: {
                name: "pers_id",
                allowNull: false,
              },
            }),
            required: true,
            on: {
              pers_id: { [Op.eq]: sequelize.col("tbmemberinfo.pers_id") },
            },
          },
        ],
        where: {
          mem_email: email,
        },
      };
      const user = await tbmemberinfo.findOne(condition);
      if (!user)
        return next(
          errorHandler(
            StatusCodes.NOT_FOUND,
            "No email found... Please register before login"
          ),
          res
            .status(400)
            .json(
              errorHandler(
                StatusCodes.NOT_FOUND,
                "No email found... Please register before login"
              )
            )
        );

      //////////////////////////////////// search/check IP addresses in network and check status network ////////////////////////////////////
      let condition_2 = {
        include: [
          {
            model: tbipaddr,
            attributes: ["office", "status", "ipaddr"],
            association: new HasMany(tbipaddr, tbusagerecord, {
              foreignKey: {
                name: "ipaddr",
                allowNull: false,
              },
            }),
            required: true,
            on: {
              ipaddr: { [Op.eq]: sequelize.col("tbusagerecord.ipaddr") },
            },
          },
        ],
        where: {
          ipaddr: ip,
        },
      };
      const seachip = await tbipaddr.findOne({
        where: {
          ipaddr: {
            [Op.eq]: ip,
          },
        },
      });

      // console.log("statusip:", statusip);
      // const testdata = statusip

      if (!seachip) {
        return next(
          errorHandler(
            StatusCodes.NOT_FOUND,
            "Do not allow this computer to log in Please change the computer."
          ),
          res
            .status(400)
            .json(
              errorHandler(
                StatusCodes.NOT_FOUND,
                "Do not allow this computer to log in Please change the computer."
              )
            )
        );
      } else {
        const ipaddr = await tbusagerecord.findOne(condition_2);
        const statusip =
          ipaddr === null
            ? null
            : JSON.parse(JSON.stringify(ipaddr.dataValues.tbusagerecords));
        if (!statusip || statusip.length === 0) {
          saveloglogin(user, statusip, ip, email, mode, req, res, next);
        } else if (statusip[0].status === 0 || statusip[0].status === -1) {
          //////////////////////////////////// check accessright user ////////////////////////////////////
          return next(
            errorHandler(
              StatusCodes.BAD_REQUEST,
              "This computer has been suspended. Please contact the system administrator."
            ),
            res
              .status(400)
              .json(
                errorHandler(
                  StatusCodes.BAD_REQUEST,
                  "This computer has been suspended. Please contact the system administrator."
                )
              )
          );
        } else {
          saveloglogin(user, statusip, ip, email, mode, req, res, next);
        }
      }
    }
  } catch (error) {
    return next(
      errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res
        .status(500)
        .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};

///////////////////////////////////////// login OTP ////////////////////////////////////////////
exports.loginv3 = async (req, res, next) => {
  try {
    const { email, password, ipadd, mode } = req.body;
    const ipV4 = req.connection.remoteAddress
    const ipV4Split = ipV4.split(":");
    const ip = ipadd || req.headers['x-forwarded-for'] || ipV4Split[ipV4Split.length - 1];

    console.log("ip: ", ip)

    if (!email) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded"),
        res
          .status(400)
          .json(errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded"))
      );
    }

    if (!password) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Password must be definded"),
        res
          .status(400)
          .json(
            errorHandler(StatusCodes.BAD_REQUEST, "Password must be definded")
          )
      );
    }

    //////////////////////////////////// search/check IP addresses in network and check status network ////////////////////////////////////
    let condition_2 = {
      include: [
        {
          model: tbipaddr,
          attributes: ["office", "status", "ipaddr"],
          association: new HasMany(tbipaddr, tbusagerecord, {
            foreignKey: {
              name: "ipaddr",
              allowNull: false,
            },
          }),
          required: true,
          on: {
            ipaddr: { [Op.eq]: sequelize.col("tbusagerecord.ipaddr") },
          },
        },
      ],
      where: {
        ipaddr: ip,
      },
    };
    const seachip = await tbipaddr.findOne({
      where: {
        ipaddr: {
          [Op.eq]: ip,
        },
      },
    });
    const ipaddr = await tbusagerecord.findOne(condition_2);
    const statusip =
      ipaddr === null
        ? null
        : JSON.parse(JSON.stringify(ipaddr.dataValues.tbusagerecords));
    // console.log("ipaddr:", ipaddr?.dataValues);
    if (!seachip) {
      if (!ipaddr) {
        return next(
          errorHandler(
            StatusCodes.NOT_FOUND,
            "Do not allow this computer to log in Please change the computer."
          ),
          res
            .status(400)
            .json(
              errorHandler(
                StatusCodes.NOT_FOUND,
                "Do not allow this computer to log in Please change the computer."
              )
            )
        );
      } else if (statusip[0].status === 0 || statusip[0].status === -1) {
        return next(
          errorHandler(
            StatusCodes.BAD_REQUEST,
            "This computer has been suspended. Please contact the system administrator."
          ),
          res
            .status(400)
            .json(
              errorHandler(
                StatusCodes.BAD_REQUEST,
                "This computer has been suspended. Please contact the system administrator."
              )
            )
        );
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let requestBody = {
        user: email,
        pass: password,
      };

      const json = JSON.stringify(requestBody);
      let end_point = process.env.END_POINT_LOGIN;

      // set ADMIN
      const setAdmin = {
        meminfo_id: "1503202300000-032566",
        pers_id: "1503202300000",
        meminfo_year: "032566",
        mem_rank: "ร.ต.",
        mem_fname: "admin",
        mem_lname: "dev",
        mem_pos: "DEV",
        mem_affiliation: "ศซว.ทอ.",
        rtafbranch: "ส.",
        rtafbranchgrp: "สารสนเทศและสงครามอิเล็กทรอนิกส์",
        mem_cellphone: "0326521255",
        mem_offtel: "11111",
        memimgpath: "",
        mem_email: "adminDev",
        tbmemberinfos: [{ official_id: "150320230000" }],
      };

      if (email === "admin" && password === "p@ssW0rdAdm1nSW66") {
        checkUser(setAdmin, statusip, ip, mode, req, res, next);
      } else {
        axios
          .post(end_point, json, config)
          .then((response) => {
            if (response.data.result === "Process-Complete") {
              // const user = 'sittichai_yao' //ใช้เมื่อ api มีปัญหา
              if (response.data.login_mode !== "SWC-AUTH-Login") {
                return next(
                  errorHandler(
                    StatusCodes.BAD_REQUEST,
                    "Please login with OTP code."
                  ),
                  res
                    .status(400)
                    .json(
                      errorHandler(
                        StatusCodes.BAD_REQUEST,
                        "Please login with OTP code."
                      )
                    )
                );
              } else {
                const user = response.data;
                checkUser(user, statusip, ip, mode, req, res, next);
              }
            } else {
              if (response.data.result === "Process-Error") {
                return next(
                  errorHandler(
                    StatusCodes.BAD_REQUEST,
                    "Email or Password is not correct"
                  ),
                  res
                    .status(400)
                    .json(
                      errorHandler(
                        StatusCodes.BAD_REQUEST,
                        "Email or Password is not correct"
                      )
                    )
                );
              }
            }
          })
          .catch((error) => {
            return next(
              errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
              res
                .status(500)
                .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
            );
          });
      }
    }
  } catch (error) {
    return next(
      errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res
        .status(500)
        .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};

// function to handle
const checkUser = async (checkUser, statusip, ip, mode, req, res, next) => {
  try {
    // const email = checkUser //ใช้เมื่อ api มีปัญหา
    const email = checkUser.user; //ข้อมูลจาก api
    if (!email) {
      const token = jwt.sign({ checkUser }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const arrRole = [
        { usrtypeid: "USR01", status: "1" },
        { usrtypeid: "USR02", status: "1" },
        { usrtypeid: "USR03", status: "1" },
        { usrtypeid: "USR04", status: "1" },
        { usrtypeid: "USR05", status: "1" },
      ];

      return res.json({
        token: token,
        user: checkUser,
        userRole: arrRole,
      });
    } else {
      let condition = {
        include: [
          {
            model: tbmember,
            attributes: ["official_id"],
            association: new HasMany(tbmember, tbmemberinfo, {
              foreignKey: {
                name: "pers_id",
                allowNull: false,
              },
            }),
            required: true,
            on: {
              pers_id: { [Op.eq]: sequelize.col("tbmemberinfo.pers_id") },
            },
          },
        ],
        where: {
          mem_email: email,
        },
      };
      const user = await tbmemberinfo.findOne(condition);
      if (!user)
        return next(
          errorHandler(
            StatusCodes.NOT_FOUND,
            "No email found... Please register before login"
          ),
          res
            .status(400)
            .json(
              errorHandler(
                StatusCodes.NOT_FOUND,
                "No email found... Please register before login"
              )
            )
        );
      // const { mem_token, ...data } = user.toJSON();
      // const setData = await JSON.parse(JSON.stringify(data));
      // const token = jwt.sign({ setData }, process.env.JWT_SECRET, {
      //   expiresIn: "1d",
      //   // expiresIn: 3600,
      // });

      //////////////////////////////////// check accessright user ////////////////////////////////////
      saveloglogin(user, statusip, ip, email, mode, req, res, next);
    }
  } catch (error) {
    return next(
      errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res
        .status(500)
        .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};

const saveloglogin = async (user, statusip, ip, email, mode, req, res, next) => {
  try {
    let condition_1 = {
      where: {
        persid: user.pers_id,
      },
    };
    const userRole = await tbaccessrights.findAll(condition_1).catch((err) => {
      console.log("tbaccessrights findOne >>> err : ", err);
      next(
        errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
        res
          .status(500)
          .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
      );
    });

    const arrRole = [];
    for (let i = 0; i < userRole.length; i++) {
      for (let j = 0; j < userRole.length; j++) {
        // console.log(key[0]+ ', ' + pair[1]);
      }
      arrRole.push({
        usrtypeid: userRole[i].usrtypeid,
        status: userRole[i].status,
      });
    }

    const chkAllowA = arrRole.find((item) => item.status === "2"); // check if user pending approval
    const chkAllowS = arrRole.find((item) => item.status === "1000"); // check if user suspend approval
    const chkAllowN = arrRole.filter((item) => item.status === "0"); // check if user suspend approval
    // console.log("chkAllowN: ", chkAllowN.length);
    if (chkAllowA !== undefined || chkAllowN.length === 5) {
      return next(
        errorHandler(
          StatusCodes.BAD_REQUEST,
          "Please contact the system administrator."
        ),
        res
          .status(400)
          .json(
            errorHandler(
              StatusCodes.BAD_REQUEST,
              "Please contact the system administrator."
            )
          )
      );
    } else if (chkAllowS !== undefined) {
      return next(
        errorHandler(
          StatusCodes.NOT_FOUND,
          "Your username has been suspended or the website is closed for maintenance. Please contact admin."
        ),
        res
          .status(400)
          .json(
            errorHandler(
              StatusCodes.NOT_FOUND,
              "Your username has been suspended or the website is closed for maintenance. Please contact admin."
            )
          )
      );
    }
    ///////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////// save log user ////////////////////////////////////
    let dateip = new Date();
    const options = {
      timeZone: "Asia/Bangkok",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    let timeslogin = dateip.toLocaleTimeString("th-TH", options);
    let yeartwodigit = String(dateip.getFullYear() + 543).slice(-2);
    const setip = statusip ? statusip[0].ipaddr : ip;
    const iplogin = setip + "-" + yeartwodigit;
    const usagedate =
      dateip.getFullYear() +
      "-" +
      ("0" + (dateip.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + dateip.getDate()).slice(-2);

    let new_set_usagerecordid = await usagerecord(ip);
    let new_usagerecordid = iplogin + "-" + new_set_usagerecordid;

    if (mode === "pc") {
      await tbusagerecord
      .create({
        usagerecordid: new_usagerecordid,
        usagedate: usagedate,
        usremail: email,
        usrlogouttime: null,
        lastusagemenu: null,
        usrlogintime: timeslogin,
        ipaddr: setip,
      })
      .catch(function (err) {
        console.log("tbmember error else : ", err);
        return next(
          errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
          res
            .status(500)
            .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
        );
      });
    }
    
    // }

    ///////////////////////////////////////////////////////////////////////////////////////

    const {
      mem_token,
      memimgpath,
      mem_cellphone,
      mem_offtel,
      rtafbranch,
      rtafbranchgrp,
      ...data
    } = user.toJSON();
    data["new_usagerecordid"] = new_usagerecordid || new_set_usagerecordid_plus;
    data["ipadrr"] = ip;
    const setData = await JSON.parse(JSON.stringify(data));
    // const fullName = user.mem_rank + " " +user.mem_fname + " " + user.mem_lname;
    // const getRtafID = user.tbmemberinfos[0].dataValues;
    // const official_id = getRtafID.official_id;
    // const setToken = {
    //   fullName,
    //   mem_email : user.mem_email,
    //   official_id,
    // }
    // const token_ = jwt.sign({ setToken }, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });

    // const findData = JSON.stringify(data);

    // const hash = await bcrypt.hash(findData, 10);
    // console.log("hash ",hash);
    // const d_ =
    // const match = await bcrypt.compare(findData,hash);

    const token = jwt.sign({ setData }, process.env.JWT_SECRET, {
      expiresIn: "1d",
      // expiresIn: 36,
    });
    // if (match) {
    //   console.log("result ", setData);
    // } else {
    //   console.log("result ",match);
    // }

    await tbmemberinfo.update(
      { mem_token: token },
      { where: { pers_id: setData.pers_id } }
    );

    return res.json({
      token: token,
      user: setData,
      userRole: arrRole,
      // userRoleChk: arrRoleChk,
    });
  } catch (error) {
    return next(
      errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res
        .status(500)
        .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};

exports.loginmb = async (req, res, next) => {
  try {
    const { email, password, ipadd, mode } = req.body;
    const ip = ipadd || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const statusip = null;

    if (!email) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded"),
        res
          .status(400)
          .json(errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded"))
      );
    }

    if (!password) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Password must be definded"),
        res
          .status(400)
          .json(
            errorHandler(StatusCodes.BAD_REQUEST, "Password must be definded")
          )
      );
    }

    // set ADMIN
    // const setAdmin = {
    //   meminfo_id: "1503202300000-032566",
    //   pers_id: "1503202300000",
    //   meminfo_year: "032566",
    //   mem_rank: "ร.ต.",
    //   mem_fname: "admin",
    //   mem_lname: "dev",
    //   mem_pos: "DEV",
    //   mem_affiliation: "ศซว.ทอ.",
    //   rtafbranch: "ส.",
    //   rtafbranchgrp: "สารสนเทศและสงครามอิเล็กทรอนิกส์",
    //   mem_cellphone: "0326521255",
    //   mem_offtel: "11111",
    //   memimgpath: "",
    //   mem_email: "adminDev",
    //   tbmemberinfos: [{ official_id: "150320230000" }],
    // };

    // if (email === "admin" && password === "p@ssW0rdAdm1nSW66") {
    //   const token = jwt.sign({ setAdmin }, process.env.JWT_SECRET, {
    //     expiresIn: 3600,
    //   });

    //   const arrRole = [
    //     { usrtypeid: "USR01", status: "1" },
    //     { usrtypeid: "USR02", status: "1" },
    //     { usrtypeid: "USR03", status: "1" },
    //     { usrtypeid: "USR04", status: "1" },
    //     { usrtypeid: "USR05", status: "1" },
    //   ];

    //   return res.json({
    //     token: token,
    //     user: setAdmin,
    //     userRole: arrRole,
    //     // userRoleChk: arrRoleChk,
    //   });
    // } else {
      //////////////////////////////////// search/check IP addresses in network and check status network ////////////////////////////////////
      // let condition_2 = {
      //   include: [
      //     {
      //       model: tbipaddr,
      //       attributes: ["office", "status", "ipaddr"],
      //       association: new HasMany(tbipaddr, tbusagerecord, {
      //         foreignKey: {
      //           name: "ipaddr",
      //           allowNull: false,
      //         },
      //       }),
      //       required: true,
      //       on: {
      //         ipaddr: { [Op.eq]: sequelize.col("tbusagerecord.ipaddr") },
      //       },
      //     },
      //   ],
      //   where: {
      //     ipaddr: ip,
      //   },
      // };
      // const seachip = await tbipaddr.findOne({
      //   where: {
      //     ipaddr: {
      //       [Op.eq]: ip,
      //     },
      //   },
      // });

      // if (!seachip) {
      //   return next(
      //     errorHandler(
      //       StatusCodes.NOT_FOUND,
      //       "Do not allow this computer to log in Please change the computer."
      //     ),
      //     res
      //       .status(400)
      //       .json(
      //         errorHandler(
      //           StatusCodes.NOT_FOUND,
      //           "Do not allow this computer to log in Please change the computer."
      //         )
      //       )
      //   );
      // } else {
      //   const ipaddr = await tbusagerecord.findOne(condition_2);
      //   const statusip =
      //     ipaddr === null
      //       ? null
      //       : JSON.parse(JSON.stringify(ipaddr.dataValues.tbusagerecords));
      //   if (!statusip || statusip.length === 0) {
      //     const config = {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     };
      //     let requestBody = {
      //       user: email,
      //       pass: password,
      //     };

      //     const json = JSON.stringify(requestBody);
      //     let end_point = process.env.END_POINT_LOGIN;

      //     axios
      //       .post(end_point, json, config)
      //       .then((response) => {
      //         if (response.data.result === "Process-Complete") {
      //           // const user = 'sittichai_yao' //ใช้เมื่อ api มีปัญหา
      //           const user = response.data;
      //           checkUser(user, statusip, ip, req, res, next);
      //         } else {
      //           if (response.data.result === "Process-Error") {
      //             return next(
      //               errorHandler(
      //                 StatusCodes.BAD_REQUEST,
      //                 "Email or Password is not correct"
      //               ),
      //               res
      //                 .status(400)
      //                 .json(
      //                   errorHandler(
      //                     StatusCodes.BAD_REQUEST,
      //                     "Email or Password is not correct"
      //                   )
      //                 )
      //             );
      //           }
      //         }
      //       })
      //       .catch((error) => {
      //         return next(
      //           errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      //           res
      //             .status(500)
      //             .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
      //         );
      //       });
      //   } else if (statusip[0].status === 0 || statusip[0].status === -1) {
      //     //////////////////////////////////// check accessright user ////////////////////////////////////
      //     return next(
      //       errorHandler(
      //         StatusCodes.BAD_REQUEST,
      //         "This mobile phone has been suspended. Please contact the system administrator."
      //       ),
      //       res
      //         .status(400)
      //         .json(
      //           errorHandler(
      //             StatusCodes.BAD_REQUEST,
      //             "This mobile phone has been suspended. Please contact the system administrator."
      //           )
      //         )
      //     );
      //   } else {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          let requestBody = {
            user: email,
            pass: password,
          };

          const json = JSON.stringify(requestBody);
          let end_point = process.env.END_POINT_LOGIN;

          axios
            .post(end_point, json, config)
            .then((response) => {
              if (response.data.result === "Process-Complete") {
                // const user = 'sittichai_yao' //ใช้เมื่อ api มีปัญหา
                const user = response.data;
                checkUser(user, statusip, ip, mode, req, res, next);
              } else {
                if (response.data.result === "Process-Error") {
                  return next(
                    errorHandler(
                      StatusCodes.BAD_REQUEST,
                      "Email or Password is not correct"
                    ),
                    res
                      .status(400)
                      .json(
                        errorHandler(
                          StatusCodes.BAD_REQUEST,
                          "Email or Password is not correct"
                        )
                      )
                  );
                }
              }
            })
            .catch((error) => {
              return next(
                // errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
                res
                  .status(500)
                  .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
              );
            });
        // }
      // }
    // }
  } catch (error) {
    return next(
      // errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res
        .status(500)
        .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
    );
  }
};
