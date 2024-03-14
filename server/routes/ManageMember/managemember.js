const { StatusCodes } = require('http-status-codes')
const errorHandler = require('http-errors')
const db = require('../../models/index')
const { Op, HasMany } = require('sequelize')
const { sequelize } = require('../../models/index')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
const { tbaccessrights, tbmemberinfo ,tbmember,tbtestresult ,tbtestreservation} = db





exports.getUser = async (req, res, next) => {
  try {
  
      const users = await tbmemberinfo.findAll()
      .catch(err => {
          console.log("error: " + err)
      })
      const response = users.map((user) => {
        const { ...data } = user.toJSON()
        return data
      })
      // console.log(response)
      return res.json(response)
    } catch (error) {
      return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res.status(400).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
        error,))
      )
    }


}



exports.getAccess = async (req, res, next) => {
    try {
  
      const accesss = await tbaccessrights.findAll({
        attributes: ['persid', 
        [(`MAX(CASE tbaccessrights.usrtypeid  WHEN "USR01"  THEN tbaccessrights.status END) `),  'USR01'],
        [(`MAX(CASE tbaccessrights.usrtypeid  WHEN "USR02"  THEN tbaccessrights.status END)  `), 'USR02'],
        [(`MAX(CASE tbaccessrights.usrtypeid  WHEN "USR03"  THEN tbaccessrights.status END)  `), 'USR03'],
        [(`MAX(CASE tbaccessrights.usrtypeid  WHEN "USR04"  THEN tbaccessrights.status END)  `), 'USR04'],
        [(`MAX(CASE tbaccessrights.usrtypeid  WHEN "USR05"  THEN tbaccessrights.status END)  `), 'USR05']
      ],
      group: ['persid'],
      plain: false,
      })
      .catch(err => {
          console.log("error: " + err)
      })
      const response = accesss.map((access) => {
        const { ...data } = access.toJSON()
        return data
      })
      // console.log("console.log(response): ",response)
      return res.json(response)
    } catch (error) {
      return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res.status(400).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
        error,))
      )
    }


}

exports.getPerIdAccess1 = async (req, res, next) => {
  try{
    const upDateAccess = await tbaccessrights.update({ status: req.params.valueAccess ,permissiondate : new Date()}, {
      where: {
        accessrightsid: req.params.pers_id + "-USR04"
      }
    })
    .catch(err => {
        console.log("error: " + err)
    })
    // const response = upDateAccess.map((user) => {
    //   const { ...data } = user.toJSON()
    //   return data
    // })
    // console.log(upDateAccess)
    return res.json(upDateAccess)

  } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(400).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }


}

exports.getPerIdAccess2 = async (req, res, next) => {
  try{
    const upDateAccess = await tbaccessrights.update({ status: req.params.valueAccess ,permissiondate : new Date()}, {
      where: {
        accessrightsid: req.params.pers_id + "-USR03"
      }
    })
    .catch(err => {
        console.log("error: " + err)
    })
    // const response = upDateAccess.map((user) => {
    //   const { ...data } = user.toJSON()
    //   return data
    // })
    // console.log(upDateAccess)
    return res.json(upDateAccess)

  } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(400).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }


}

exports.getPerIdAccess3 = async (req, res, next) => {
  try{
    const upDateAccess = await tbaccessrights.update({ status: req.params.valueAccess ,permissiondate : new Date()}, {
      where: {
        accessrightsid: req.params.pers_id + "-USR05"
      }
    })
    .catch(err => {
        console.log("error: " + err)
    })
    // const response = upDateAccess.map((user) => {
    //   const { ...data } = user.toJSON()
    //   return data
    // })
    // console.log(upDateAccess)
    return res.json(upDateAccess)

  } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(400).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }


}

exports.getPerIdAccess4 = async (req, res, next) => {
  try{
    const upDateAccess = await tbaccessrights.update({ status: req.params.valueAccess ,permissiondate : new Date()}, {
      where: {
        accessrightsid: req.params.pers_id + "-USR01"
      }
    })
    .catch(err => {
        console.log("error: " + err)
    })
    // const response = upDateAccess.map((user) => {
    //   const { ...data } = user.toJSON()
    //   return data
    // })
    // console.log(upDateAccess)
    return res.json(upDateAccess)

  } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(400).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }


}

exports.getPerIdAccess5 = async (req, res, next) => {
  try{
    const upDateAccess = await tbaccessrights.update({ status: req.params.valueAccess ,permissiondate : new Date()}, {
      where: {
        accessrightsid: req.params.pers_id + "-USR02"
      }
    })
    .catch(err => {
        console.log("error: " + err)
    })
    // const response = upDateAccess.map((user) => {
    //   const { ...data } = user.toJSON()
    //   return data
    // })
    // console.log(upDateAccess)
    return res.json(upDateAccess)

  } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(400).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }


}

// exports.deleteUser = async (req, res, next) => {
//   try {
//     if (!req.params.pers_id) {
//       return next(
//         errorHandler(StatusCodes.BAD_REQUEST, "Id must be definded"),
//         res
//           .status(400)
//           .json(errorHandler(StatusCodes.BAD_REQUEST, "Id must be definded"))
//       );
//     }

//     let condition = {
//       include: [
//         {
//           model: tbmember,
//           attributes: ["official_id"],
//           association: new HasMany(tbmember, tbmemberinfo, {
//             foreignKey: {
//               name: "pers_id",
//               allowNull: false,
//             },
//           }),
//           required: true,
//           on: {
//             pers_id: { [Op.eq]: sequelize.col("tbmemberinfo.pers_id") },
//           },
//         },
//       ],
//       where: { pers_id: req.params.pers_id },
//     };
//     const user = await tbmemberinfo.findOne(condition);

//     if (!user) {
//       return next(
//         errorHandler(StatusCodes.BAD_REQUEST, "Id must be definded"),
//         res
//           .status(400)
//           .json(errorHandler(StatusCodes.BAD_REQUEST, "Id must be definded"))
//       );
//     }

//     await tbaccessrights.destroy({
//       where: {
//         persid: req.params.pers_id,
//       },
//     }).catch((err) =>{
//       console.log("err tbaccessrights: ", err);
//     });

//     await tbmember.destroy({
//       where: {
//         pers_id: req.params.pers_id,
//       },
//     }).catch((err) =>{
//       console.log("err tbmember: ", err);
//     });


//     await tbtestresult.destroy({
//       where: {
//         meminfo_id: req.params.meminfo_id,
//       },
//     }).catch((err) =>{
//       console.log("err tbaccessrights: ", err);
//     });


//     await tbmemberinfo.destroy({
//       where: {
//         pers_id: req.params.pers_id,
//       },
//     }).catch((err) =>{
//       console.log("err tbmemberinfo: ", err);
//     });


//     res.json({ result: true });
//   } catch (error) {
//     return next(
//       errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
//       res
//         .status(500)
//         .json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error))
//     );
//   }
// };

// exports.deleteUser = async (req, res, next) => {
//   try{
//     await tbmemberinfo.destroy({
//       where: {
//         pers_id: req.params.pers_id,
//         truncate: true 
//       },
//     });
//     await tbaccessrights.destroy({
//       where: {
//         persid: req.params.pers_id,
//         truncate: true 
//       },
//     });
//     await tbmember.destroy({
//       where: {
//         pers_id: req.params.pers_id,
//         truncate: true 
//       },
//     });

//     res.json({ result: true });
//   } catch (error) {
//     return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
//     res.status(400).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
//       error,))
//     )
//   }


// }



exports.deleteUser = async (req, res, next) => {
  try{
    const upDateAccess = await tbaccessrights.update({ status: "1000" }, {
      where: {
        persid: req.params.pers_id
      }
    })
    .catch(err => {
        console.log("error: " + err)
    })
    // const response = upDateAccess.map((user) => {
    //   const { ...data } = user.toJSON()
    //   return data
    // })
    // console.log(upDateAccess)
    return res.json(upDateAccess)

  } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(400).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }


}