const { StatusCodes } = require("http-status-codes");
const errorHandler = require("http-errors");
const db = require("../../models/index");
const { Op, HasMany, where } = require("sequelize");
const { sequelize } = require("../../models/index");
// const axios = require("axios");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const { tbmember, tbaccessrights, tbmemberinfo } = db;

const member = {
  addMemberAndRight: async (req, res, next) => {
    try {
      const d = new Date();
      const month =
        d.getMonth() + 1 <= 9
          ? ("0" + (d.getMonth() + 1)).slice(-2)
          : d.getMonth() + 1;
      const yearTh = d.getFullYear() + 543;
      //const day = d.getDate();
      const id = req.body.pers_id + "-" + month + yearTh;
      const meminfo_year = month + yearTh;
      const usrtypeid = req.body.mem_usrtypeid;
      const accessrightsid = req.body.pers_id + "-" + req.body.mem_usrtypeid;
      //const permissiondate = yearTh + "-" + month + "-" + day;

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
        const id_user = existingUser.dataValues.pers_id;
        let condition_1 = {
          where: {
            persid: id_user,
            usrtypeid: usrtypeid,
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

        const chkAllowS = arrRole.find(
          (item) =>
            item.status === "1000" || item.status === "2"
        );
        const AllowS = arrRole.find((item) => item.status === "1");
        if (chkAllowS !== undefined && AllowS === undefined) {
          await tbaccessrights
            .update(
              {
                status: "0",
                permissiondate: new Date(),
              },
              {
                where: {
                  persid: id_user,
                  usrtypeid: usrtypeid,
                },
              }
            )
            .catch((err) => {
              console.log("tbaccessrights update status >>> err :", err);
              next(
                errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
                res
                  .status(500)
                  .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
              );
            });

          await tbmemberinfo
            .update(
              {
                mem_rank: req.body.mem_rank,
                mem_fname: req.body.mem_fname,
                mem_lname: req.body.mem_lname,
                mem_pos: req.body.mem_pos,
                mem_affiliation: req.body.mem_affiliation,
                rtafbranch: req.body.rtafbranch,
                rtafbranchgrp: req.body.rtafbranchgrp,
                mem_cellphone: req.body.mem_cellphone,
                mem_offtel: req.body.mem_offtel,
              },
              {
                where: {
                  pers_id: id_user,
                },
              }
            )
            .catch((err) => {
              console.log("tbmemberinfo update status >>> err :", err);
              next(
                errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
                res
                  .status(500)
                  .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
              );
            });
          return next(
            res
              .status(StatusCodes.CREATED)
              .json({ msg: "ผู้ใช้งานได้รับการเปลี่ยนแปลงสิทธิแล้ว รอการอนุมัติสิทธิ" })
          );
        } else if (chkAllowS === undefined && AllowS === undefined) {
          await tbaccessrights
            .create(
              {
                accessrightsid: accessrightsid,
                persid: req.body.pers_id,
                usrtypeid: req.body.mem_usrtypeid,
                permissiondate: new Date(),
                status: "0",
              },
              {
                ignoreDuplicates: true,
              }
            )
            .catch((err) => {
              console.log(
                "tbaccessrights create newAccessrightsId >>> err :",
                err
              );
              next(
                errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
                res
                  .status(500)
                  .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
              );
            });

          await tbmemberinfo
            .update(
              {
                mem_rank: req.body.mem_rank,
                mem_fname: req.body.mem_fname,
                mem_lname: req.body.mem_lname,
                mem_pos: req.body.mem_pos,
                mem_affiliation: req.body.mem_affiliation,
                rtafbranch: req.body.rtafbranch,
                rtafbranchgrp: req.body.rtafbranchgrp,
                mem_cellphone: req.body.mem_cellphone,
                mem_offtel: req.body.mem_offtel,
              },
              {
                where: {
                  pers_id: id_user,
                },
              }
            )
            .catch((err) => {
              console.log("tbmemberinfo update status >>> err :", err);
              next(
                errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
                res
                  .status(500)
                  .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
              );
            });
          return next(
            res
              .status(StatusCodes.CREATED)
              .json({ msg: "รอการอนุมัติสิทธิ์" })
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
          console.log("tbmember create error : ", err);
          next(
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
          console.log("tbmemberinfo create error : ", err);
          next(
            errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
            res
              .status(500)
              .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
          );
        });

      const accessrights = await tbaccessrights
        .create(
          {
            accessrightsid: accessrightsid,
            persid: req.body.pers_id,
            usrtypeid: req.body.mem_usrtypeid,
            permissiondate: new Date(),
            status: "0",
          },
          {
            ignoreDuplicates: true,
          }
        )
        .catch(function (err) {
          console.log("tbaccessrights create error : ", err);
          next(
            errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
            res
              .status(500)
              .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err))
          );
        });

      res
        .status(StatusCodes.CREATED)
        .json({ msg: "ผู้ใช้ถูกเพิ่มข้อมูลและรอการอนุมัติสิทธิ" });
    } catch (error) {
      return next(
        errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
        res
          .status(500)
          .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
      );
    }
  },

  getmemberinfo: async () => {
    const condition = {
      // include: [tbaccessrights, tbmemberinfo],
      include: [
        {
          model: tbaccessrights,
          where: {
            status: "1",
          },
        },
        tbmemberinfo,
      ],
      raw: true,
    };

    try {
      return await tbmember.findAll(condition);
    } catch (err) {
      console.log("Backend :: member : getmemberinfo -> failed : ", err);
    }
  },

  editmember: async (req, res, next) => {
    try {
      if (!req.body.mem_email) {
        return next(
          errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded"),
          res
            .status(400)
            .json(
              errorHandler(StatusCodes.BAD_REQUEST, "Email must be definded")
            )
        );
      }

      const userId = await tbmember
        .update(
          {
            official_id: req.body.official_id,
          },
          {
            where: {
              pers_id: req.body.pers_id,
            },
          }
        )
        .catch(function (err) {
          console.log("userId update error : ", err);
        });

      const userDetail = await tbmemberinfo
        .update(
          {
            pers_id: req.body.pers_id,
            mem_rank: req.body.mem_rank,
            mem_fname: req.body.mem_fname,
            mem_lname: req.body.mem_lname,
            mem_pos: req.body.mem_pos,
            mem_affiliation: req.body.mem_affiliation,
            rtafbranch: req.body.rtafbranch,
            rtafbranchgrp: req.body.rtafbranchgrp,
            mem_cellphone: req.body.mem_cellphone,
            mem_offtel: req.body.mem_offtel,
          },
          {
            where: {
              mem_email: req.body.mem_email,
            },
          }
        )
        .catch(function (err) {
          console.log("userDetail update error :", err);
        });

      res.status(StatusCodes.CREATED).json({ msg: "User has been update" });
    } catch (error) {
      res
        .status(StatusCodes.CREATED)
        .json({ msg: "err from editmember" + error });
    }
  },

  delmember: async (req, res) => {
    try {
      const accessrightsid = req.params.id;

      await tbaccessrights.update(
        {
          permissiondate: new Date(),
          status: "1000",
        },
        {
          where: {
            accessrightsid: accessrightsid,
          },
        }
      );
      res.status(StatusCodes.CREATED).json({ msg: "User has been delete" });
    } catch (error) {
      res
        .status(StatusCodes.CREATED)
        .json({ msg: "err from delmember" + error });
    }
  },
};

module.exports = member;
