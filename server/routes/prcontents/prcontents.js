/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes')
const errorHandler = require('http-errors')
const db = require('../../models/index')
const { Op, HasMany, HasOne } = require('sequelize')
const { sequelize } = require('../../models/index')
const fs = require('fs');
const path = require('path');
// const jwt = require('jsonwebtoken')
// const axios = require('axios')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
const { tbpublicrelations, tbpublicerelationscontents, tbprimage } = db

const createpubrel_id = require('../prcontents/createpubrel_id')

exports.getContents = async (req, res, next) => {
  try {
    const publicrelations = await tbpublicrelations.findAll({order: [['pubrel_createddate', 'DESC']]})
    .catch(err => {
      console.log('tbpublicrelations get >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    })

    const response = publicrelations.map((publicre) => {
      const { ...data } = publicre.toJSON()
      return data
    })
    res.json(response)
  } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(400).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }
}

exports.getByid = async (req, res, next) => {
  try {
    // console.log("id: ", req.params.id)
    let condition = {
      include : [
          {
            model: tbpublicerelationscontents,
            association: new HasOne(tbpublicerelationscontents, tbpublicrelations, {
              foreignKey: {
                name: 'pubrel_id',
                allowNull: false,
              },
            }),
            required: false,
            on: {
              pubrel_id: { [Op.eq]: sequelize.col('tbpublicrelations.pubrel_id') },
            },
          },
      ],
      where: { pubrel_id: req.params.id }
    }
    let condition1 = {
      attributes: [
          'primgcode',
          'primgcreateddate',
          'primgcreator',
          'primgfilepath',
          'pubrelid',
      ],
      include : [
          {
             model: tbprimage,
             association: new HasMany(tbpublicrelations, tbprimage,{
             foreignKey: {
                name: 'pubrelid',
                allowNull: false,
                },
             }),
             required: true,
             on: {
                pubrelid: { [Op.eq]: sequelize.col('tbprimage.pubrelid') },
             },
          }
      ],
      where: { pubrelid: req.params.id }
    }
    const public1 = await tbpublicrelations.findAll(condition)
    const publicImg = await tbprimage.findAll(condition1)

    // const { pathimg.primgcode, ...data } = publicImg;
    const imgData = await JSON.parse(JSON.stringify(publicImg))
    
    let obj = JSON.parse(JSON.stringify(public1));
    // console.log("data obj: ",obj)

    let dataToDisplay = Object.keys(obj).map((key) => {
      let res = {};
        res['pubrel_id'] = Object.values(obj[key]).at(0);
        res['pubrel_title'] = Object.values(obj[key]).at(1);
        res['pubrel_createddate'] = Object.values(obj[key]).at(2);
        res['pubrel_creator'] = Object.values(obj[key]).at(3);
        if (Object.values(obj[key]).at(4) !== null) {
          res['pubrelcont_id'] = Object.values(obj[key]).at(4).pubrelcont_id;
          res['pubrelcontents'] = Object.values(obj[key]).at(4).pubrelcontents; 
        }
         
    return (res);
  }); 
  const media = imgData == [] || imgData[0] === undefined ? [] : imgData[0].tbprimages
  // if (imgData === [] || imgData[0] === undefined) {
  //   const media = []
  //   console.log("imgData !== []")
    // console.log("data: ",dataToDisplay)
  //   // console.log("imgData[0]: ",imgData[0].tbprimages)
  //   return res.json({ news: dataToDisplay, pathimg : media })
  // } else {
  //   const media = imgData[0].tbprimages
  //   console.log("data: ",media)
  //   // console.log("imgData[0].tbprimages: ",imgData[0].tbprimages)
  //   return res.json({ news: dataToDisplay, pathimg : media })
  // }
    return res.json({ news: dataToDisplay, pathimg : media })
    // res.status(StatusCodes.OK).send(`get user by id ${req.params.id}`)
  } catch (error) {
    next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }
}

exports.addContents = async (req, res, next) => {
  try {
    const { pubrel_title, pubrelcontents, pubrelcon_creator, lenvideo } = await req.body
    // console.log("req.body: ", req.body)
    // console.log("lenVideo1: ", req.files['vdo']?.length)
    // console.log("files vdo: ", req.files['vdo'])
    // console.log("files img: ", req.files['img'][1])
    // console.log("pubrelcontents: ", pubrelcontents)
    // console.log("type pubrelcontents: ", typeof pubrelcontents)
    // console.log("lenvideo: ", lenvideo)

    let date = new Date()
    const pubrel_createddate =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)

    const detail_id = [] //รหัสเนื้อหาข่าว
    const image_id = [] //รหัสภาพ
    const video_id = [] //รหัสวีดีโอ

    //check type file img && video
    if (req.fileValidationError) {
      return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, req.fileValidationError),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
        req.fileValidationError,))
    )}

    let condition = {
      attributes: [
          'pubrel_id'
      ],
      raw: true,
    };

    let publicrelationList = await tbpublicrelations.findAll(condition);
    // let num_arr = [];
    // publicrelationList.forEach((e) => {
    //     num_arr.push(parseInt(e.pubrel_id.substring((e.pubrel_id.search('R') + 4), e.pubrel_id.length)));
    // });

    // const createPubrelId = (nums) => {
    //   return ('PR000' + nums);
    // }

    // let new_pubrel_id = createPubrelId(num_arr.length === 0 ? 1 : (Math.max(...num_arr) + 1)) //เลขที่ข่าว

    let new_pubrel_id = await createpubrel_id(publicrelationList)
    console.log(`new_pubrel_id:  `, new_pubrel_id)
    
    //insert tbpublicrelations
    await tbpublicrelations.create(
      {
          'pubrel_id' : new_pubrel_id,
          'pubrel_title' : pubrel_title,
          'pubrel_createddate' : pubrel_createddate,
          'pubrel_creator' : pubrelcon_creator,
      })
    .catch(err => {
      console.log('addtbpublicrelations insert >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    });
    

    // insert tbpublicrelationsconstents
    const chkArray = typeof pubrelcontents === "string" ? 1 : pubrelcontents.length
    for(let i = 0 ; i < chkArray; i++) {
        // console.log("pubrelcontents.length", pubrelcontents.length);
        for(let j = 0 ; j < 1; j++) {
        const pubrelcont_id = `${new_pubrel_id}CON0${i+1}`;
        detail_id.push(pubrelcont_id)
        // console.log(`pubrelcontents : ${i}: `, pubrelcontents[i])
        const data = {
          'pubrelcont_id' : detail_id[i],
          'pubrel_id' : new_pubrel_id,
          'pubrelcontents' : typeof pubrelcontents === "string" ? pubrelcontents : pubrelcontents[i],
          'pubrelcont_createddate' : pubrel_createddate,
          'pubrelcont_creator' : pubrelcon_creator,
        }
        // console.log(data)
      await tbpublicerelationscontents.create(data,
        {
          ignoreDuplicates: true,
        })
        .catch(err => {
          console.log('addtbpublicrelationsconstents insert >>> err : ', err);
          next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
          res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
          err,))
        )
        });
        }
      }

      // insert tbprimage img
      const lenImg = req.files['img'] !== undefined ? 0 : 1;
      if (!lenImg) {
      for(let i = 0; i < req.files['img'].length; i++) {
        for(let j = 0 ; j < 1; j++) {
        const primgcode = `${new_pubrel_id}-IMG00${i+1}`;
        image_id.push(primgcode)
        const data = {
          'primgcode' : image_id[i],
          'primgfilepath' : req.files['img'][i].path.substring(16),
          'primgcreateddate' : pubrel_createddate,
          'primgcreator' : pubrelcon_creator,
          'pubrelid' : new_pubrel_id,
        }
        await tbprimage.create(data,
          {
            ignoreDuplicates: true,
          })
        .catch(err => {
          console.log('addtbprimage insert >>> err : ', err);
          next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
          res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
          err,))
          )
        });
      }
      }}

      // insert tbprimage video
      const lenVideo = req.files['vdo'] !== undefined ? 0 : 1;
      // console.log("lenVideo: ", lenVideo)
      // console.log("lenVideo: ", lenvideo)
      // console.log("lenVideo1: ", req.files['vdo'].length)
      if (!lenVideo) {
        for(let i = 0; i < lenvideo; i++) {
          // console.log('vdo: ' + req.files['vdo'][i]);
          for(let j = 0 ; j < 1; j++) {
          const prvdocode = await `${new_pubrel_id}-VIDEO00${i+1}`;
          video_id.push(prvdocode)
          const data = await {
            'primgcode' : video_id[i],
            'primgfilepath' : req.files['vdo'][i].path.substring(16),
            'primgcreateddate' : pubrel_createddate,
            'primgcreator' : pubrelcon_creator,
            'pubrelid' : new_pubrel_id,
          }
          await tbprimage.create(data,
            {
              ignoreDuplicates: true,
            })
          .catch(err => {
            console.log('addtbprimage insert >>> err : ', err);
            next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
            res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
            err,))
            )
          });
        }
        }
      }
      res.status(StatusCodes.CREATED).json({ msg: 'Public Relation has been created' });
  } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }
}

exports.editContents = async (req, res, next) => {
  try {
    const { pubtitle, pubrelcontents, pubrelcon_creator, pubrel_id, pubrelcont_id, lenvideo } = req.body
    // console.log("req.body: ", req.body)
    console.log("files vdo: ", req.files['vdo'])
    // console.log("files img: ", req.files['img'])

    let date = new Date()
    const pubrel_createddate =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    
    // const image_id = [] //รหัสภาพ
    // const video_id = [] //รหัสวีดีโอ

    if (!pubrel_id) {
      return next(errorHandler(StatusCodes.BAD_REQUEST, 'Id must be definded'),
      res.status(400).json(errorHandler(StatusCodes.BAD_REQUEST,
        'Id must be definded',))
      )
    }

    let condition = {
      include : [
          {
            model: tbpublicerelationscontents,
            association: new HasOne(tbpublicerelationscontents, tbpublicrelations, {
              foreignKey: {
                name: 'pubrel_id',
                allowNull: false,
              },
            }),
            required: true,
            on: {
              pubrel_id: { [Op.eq]: sequelize.col('tbpublicrelations.pubrel_id') },
            },
          },
      ],
      where: { pubrel_id: pubrel_id }
    }

    ////////////////////////////// ค้นหาเลขที่ข่าว ///////////////////////////////////////
    const public1 = await tbpublicrelations.findAll(condition)
    if (!public1) {
      return next(errorHandler(StatusCodes.NOT_FOUND, 'No pubrel_id found'),
      res.status(400).json(errorHandler(StatusCodes.NOT_FOUND,
        'No pubrel_id found',))
      )
    }

    ///////////////////// update tbpublicrelations ///////////////////////////////////
    await tbpublicrelations.update(
      {
          'pubrel_title' : pubtitle,
          // 'pubrel_createddate' : pubrel_createddate,
          // 'pubrel_creator' : pubrelcon_creator,
      },
        { where: { 'pubrel_id': pubrel_id}}
      )
    .catch(err => {
      console.log('updatetbpublicrelations update >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    });

    //////////////////////// update tbpublicrelationsconstents ///////////////////////
    const chkArray = typeof pubrelcontents === "string" ? 1 : pubrelcontents.length
    for(let i = 0 ; i < chkArray; i++) {
        const data = {
          'pubrelcontents' : typeof pubrelcontents  === "string" ? pubrelcontents : pubrelcontents[i],
          'pubrelcont_createddate' : pubrel_createddate,
          'pubrelcont_creator' : pubrelcon_creator,
        }
      await tbpublicerelationscontents.update(data,
        { where: { 'pubrelcont_id': typeof pubrelcont_id  === "string" ? pubrelcont_id : pubrelcont_id[i]}}
        )
      .catch(err => {
        console.log('updatetbpublicrelationsconstents update >>> err : ', err);
        next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
        res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
        err,))
      )
      });
    }

    let condition1 = {
      include : [
        {
          model: tbpublicerelationscontents,
          association: new HasOne(tbpublicerelationscontents, tbpublicrelations, {
            foreignKey: {
              name: 'pubrel_id',
              allowNull: false,
            },
          }),
          required: true,
          on: {
            pubrel_id: { [Op.eq]: sequelize.col('tbpublicrelations.pubrel_id') },
          },
        },
    ],
      where: { pubrel_id: pubrel_id }
    }

    //////////////////////////// ค้นหาเนื้อหาข่าวตามหัวข้อข่าว ////////////////////////////////
    const publicdetail = await tbpublicrelations.findAll(condition1)
    if (publicdetail.length === pubrelcontents.length || pubrelcontents.length === 11 || pubrelcontents.length !== 0) {
      if (publicdetail.length < pubrelcontents.length) {
        let condition = {
          attributes: [
              'pubrelcont_id'
          ],
          // raw: true,
          where: { pubrel_id: pubrel_id }
        };
    
        let publicrelationList = await tbpublicerelationscontents.findAll(condition);
        let num_arr = [];
        publicrelationList.forEach((e) => {
            num_arr.push(parseInt(e.pubrelcont_id.substring((e.pubrelcont_id.search('N') + 2), e.pubrelcont_id.length)));
        });
    
        const create_pubrelcontId = (nums) => {
          return (pubrel_id + 'CON0' + nums);
        }
    
        let pluspubId = num_arr.length === 0 ? 1 : (Math.max(...num_arr) + 1)
        if (pluspubId > 7) {
          return next(errorHandler(StatusCodes.BAD_REQUEST, 'You have added more details than required. Please delete the last details or edit only.'),
          res.status(400).json(errorHandler(StatusCodes.BAD_REQUEST,
            'You have added more details than required. Please delete the last details or edit only.',))
          )
        }
        let add_pubrelcont_id = create_pubrelcontId(pluspubId) //รหัสเนื้อหาข่าว
        console.log("-----------------------> มีรายละเอียดข่าวใหม่ เพิ่มเข้ามา... <------------------")
        const chkArray = typeof pubrelcontents === "string" ? 1 : pubrelcontents.length
        const selArrsave = (num_arr.length - 1) + 1
        const chklen_arr = num_arr.length === selArrsave ? selArrsave : pluspubId
        if(pubrelcontents.length > num_arr.length) {
          for(let i = selArrsave ; i < chkArray; i++) {
            // console.log(`i = ${i}`)
            const pubrelcont_id = `${pubrel_id}CON0${pluspubId}`;
            const data = {
              'pubrelcont_id' : pubrelcont_id,
              'pubrel_id' : pubrel_id,
              'pubrelcontents' : typeof pubrelcontents === "string" ? pubrelcontents : pubrelcontents[i],
              'pubrelcont_createddate' : pubrel_createddate,
              'pubrelcont_creator' : pubrelcon_creator,
            }
            // console.log(data)
            await tbpublicerelationscontents.create(data,
              {
                ignoreDuplicates: true,
              })
              .catch(err => {
                console.log('addtbpublicrelationsconstents insert pageEdit >>> err : ', err);
                next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
                res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
                err,))
              )
              });
              pluspubId++
          }
        } else{
          for(let i = chklen_arr ; i < chkArray; i++) {
            const pubrelcont_id = num_arr.length === 0 ? `${pubrel_id}CON0${i+1}`:add_pubrelcont_id;
              
            const data = {
              'pubrelcont_id' : pubrelcont_id,
              'pubrel_id' : pubrel_id,
              'pubrelcontents' : typeof pubrelcontents === "string" ? pubrelcontents : pubrelcontents[i],
              'pubrelcont_createddate' : pubrel_createddate,
              'pubrelcont_creator' : pubrelcon_creator,
            }
            // console.log(data)
            await tbpublicerelationscontents.create(data,
              {
                ignoreDuplicates: true,
              })
              .catch(err => {
                console.log('addtbpublicrelationsconstents insert pageEdit else >>> err : ', err);
                next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
                res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
                err,))
              )
              });
            }
        }
        } else {
          console.log("-----------------------> ไม่มีรายละเอียดข่าวใหม่เพิ่มเข้ามา... <------------------")
      }
    } else {
      console.log("-----------------------> ไม่มีรายละเอียดข่าวใหม่ <------------------")
    }

    ///////////////////// check type file img && video //////////////////////////////////
    if (req.fileValidationError) {
      return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, req.fileValidationError),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
        req.fileValidationError,))
    )}

    ///////////////////////////// insert tbprimage img /////////////////////////////////
    const lenImg = req.files['img'] !== undefined ? 0 : 1;
    if (!lenImg) {
      let conditionimg = {
        attributes: [
            'primgcode'
        ],
        // raw: true,
        where: { 
          [Op.and]: [
            {pubrelid: pubrel_id},
            {primgcode: sequelize.where(sequelize.fn('LOWER', sequelize.col('primgcode')), 'LIKE', '%IMG%')}
          ]
        }
      };
  
      let primageList = await tbprimage.findAll(conditionimg);
      let num_arr = [];
      primageList.forEach((e) => {
          num_arr.push(parseInt(e.primgcode.substring((e.primgcode.search('G') + 3), e.primgcode.length)));
      });
  
      let primgcodeId = num_arr.length === 0 ? 1 : (Math.max(...num_arr) + 1)
      if (primgcodeId > 8) {
        return next(errorHandler(StatusCodes.BAD_REQUEST, `You've exceeded the photo/video upload limit. Please delete the last one or edit only.`),
        res.status(400).json(errorHandler(StatusCodes.BAD_REQUEST,
          `You've exceeded the photo/video upload limit. Please delete the last one or edit only.`,))
        )
      }

      const chkArrayimg = typeof req.files['img'] === "string" ? 1 : req.files['img'].length
      if(req.files['img'].length > 0) {
        for(let i = 0 ; i < chkArrayimg; i++) {
          // console.log(`i = ${i}`)
          const pubrelcont_id = `${pubrel_id}-IMG00${primgcodeId}`;
          const data = {
            'primgcode' : pubrelcont_id,
            'primgfilepath' : req.files['img'][i].path.substring(16),
            'primgcreateddate' : pubrel_createddate,
            'primgcreator' : pubrelcon_creator,
            'pubrelid' : pubrel_id,
          }
          // console.log(data)
          await tbprimage.create(data,
            {
              ignoreDuplicates: true,
            })
            .catch(err => {
              console.log('addtbprimage img insert pageEdit >>> err : ', err);
              next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
              res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
              err,))
            )
            });
          primgcodeId++
        }
      }

  } 
  const lenVideo = req.files['vdo'] !== undefined ? 0 : 1;
  if (!lenVideo) {
    let conditionvideo = {
      attributes: [
          'primgcode'
      ],
      // raw: true,
      where: { 
        [Op.and]: [
          {pubrelid: pubrel_id},
          {primgcode: sequelize.where(sequelize.fn('LOWER', sequelize.col('primgcode')), 'LIKE', '%VIDEO%')}
        ]
      }
    };

    let privideoList = await tbprimage.findAll(conditionvideo);
    let num_arr = [];
    privideoList.forEach((e) => {
        num_arr.push(parseInt(e.primgcode.substring((e.primgcode.search('O') + 3), e.primgcode.length)));
    });
    let prvdocodeId = num_arr.length === 0 ? 1 : (Math.max(...num_arr) + 1)
    if (prvdocodeId > 8) {
      return next(errorHandler(StatusCodes.BAD_REQUEST, `You've exceeded the photo/video upload limit. Please delete the last one or edit only.`),
      res.status(400).json(errorHandler(StatusCodes.BAD_REQUEST,
        `You've exceeded the photo/video upload limit. Please delete the last one or edit only.`,))
      )
    }
    // const chkArrayvdo = typeof req.files['vdo'] === "string" ? 1 : req.files['vdo'].length
    const chkArrayvdo = typeof req.files['vdo'] === "string" ? 1 : lenvideo
    if(req.files['vdo'].length > 0) {
      for(let i = 0 ; i < chkArrayvdo; i++) {
        // console.log(`i = ${i}`)
        const pubrelcont_id = `${pubrel_id}-VIDEO00${prvdocodeId}`;
        const data = {
          'primgcode' : pubrelcont_id,
          'primgfilepath' : req.files['vdo'][i].path.substring(16),
          'primgcreateddate' : pubrel_createddate,
          'primgcreator' : pubrelcon_creator,
          'pubrelid' : pubrel_id,
        }
        // console.log(data)
        await tbprimage.create(data,
          {
            ignoreDuplicates: true,
          })
          .catch(err => {
            console.log('addtbprimage video insert pageEdit >>> err : ', err);
            next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
            res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
            err,))
          )
          });
        prvdocodeId++
      }
    }
  }
    res.json({ msg: 'Public Relation has been updated' })
  } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }
}

exports.delByid = async (req, res, next) => {
  try {
    const id = await req.params.id
    console.log("delByid id: ", id)
    if (!req.params.id) {
      return next(errorHandler(StatusCodes.BAD_REQUEST, 'Id must be definded'),
      res.status(400).json(errorHandler(StatusCodes.BAD_REQUEST,
        'Id must be definded',))
      )
    }
    await tbpublicerelationscontents.destroy({
      where: {
        pubrelcont_id: req.params.id,
      },
    })
    .catch(err => {
      console.log('tbpublicerelationscontents del >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    });
    res.json({ result: true })
  } catch (error) {
    console.log('delByid >>> err : ', error);
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }
}

exports.delmediaByid = async (req, res, next) => {
  try {
    const {id, pathmedia} = await req.body
    // console.log("delmediaByid id: ", id)
    // console.log("path: ", pathmedia)
    if (!id) {
      return next(errorHandler(StatusCodes.BAD_REQUEST, 'The media has been deleted.'),
      res.status(400).json(errorHandler(StatusCodes.BAD_REQUEST,
        'The media has been deleted.',))
      )
    }

    const deleteFileInFolder = (fname) => {
      const m_path = __dirname.substring(0, __dirname.search('server'));
        const f_path = path.join(m_path + "/server/public", fname);
        // console.log("fname :", fname);
        // console.log("m_path :", m_path);
        // console.log("f_path :", f_path);
        fs.unlink(f_path, (err) => {
            if (err) {
                console.log(`${fname} cannot be deleted >>> err : ${err}`);
            } else {
                console.log(`${fname} is successfully deleted`);
            }
        });
    }

    await tbprimage.destroy({
      where: {
        primgcode : id,
      },
    }).then((del_res) => {
      console.log('del_res >>> ', del_res);
      deleteFileInFolder(pathmedia);
      console.log(`tbprimage : delete ${id} successful`);
    })
    .catch(err => {
      console.log('tbprimage del >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    });
    res.json({ result: true })
  } catch (error) {
    console.log('delmediaByid >>> err : ', error);
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }
}

exports.delpubrelaByid = async (req, res, next) => {
  try {
    const id = await req.params.id
    console.log("delpubrelaByid id: ", id)
    if (!req.params.id) {
      return next(errorHandler(StatusCodes.BAD_REQUEST, 'Id must be definded'),
      res.status(400).json(errorHandler(StatusCodes.BAD_REQUEST,
        'Id must be definded',))
      )
    }

    let condition = {
      attributes: [
          'primgfilepath'
      ],
      // raw: true,
      where: { pubrelid : id }
    };

    let pathmedia = await tbprimage.findAll(condition);
    let obj = await JSON.parse(JSON.stringify(pathmedia))
    // console.log("data obj: ",obj)
    // console.log("data obj lenght: ",obj.length)

    if(obj.length > 0) {
      for(let i = 0 ; i < obj.length; i++) {
        // console.log(`${i}: `,obj[i].primgfilepath)
        const m_path = __dirname.substring(0, __dirname.search('server'));
        const f_path = path.join(m_path + "/server/public", obj[i].primgfilepath);
        // console.log("fname :", fname);
        // console.log("m_path :", m_path);
        // console.log("f_path :", f_path);
        fs.unlink(f_path, (err) => {
            if (err) {
                console.log(`${obj[i].primgfilepath} cannot be deleted >>> err : ${err}`);
            } else {
                console.log(`${obj[i].primgfilepath} is successfully deleted`);
            }
        });
      }
    }

    /////////////////////////// del tbprimage /////////////////////////
    await tbprimage.destroy({
      where: {
        pubrelid : id,
      },
    })
    .catch(err => {
      console.log('tbprimage del >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    });

    //////////////////// del tbpublicerelationscontents /////////////////////
    await tbpublicerelationscontents.destroy({
      where: {
        pubrel_id : id,
      },
    })
    .catch(err => {
      console.log('tbpublicerelationscontents del >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    });

    /////////////////////////// del tbpublicrelations /////////////////////////
    await tbpublicrelations.destroy({
      where: {
        pubrel_id : id,
      },
    })
    .catch(err => {
      console.log('tbpublicrelations del >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    });

    res.json({ result: true })
  } catch (error) {
    console.log('delByid >>> err : ', error);
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }
}

exports.getListBy = async (req, res, next) => {
  try {
    // console.log("id: ", req.params.count)
    const count = parseInt(req.params.count)
    let condition = {
      include : [{
        model : tbpublicerelationscontents,
        attributes : ['pubrel_id', 'pubrelcont_createddate', 'pubrelcont_creator', 'pubrelcont_id','pubrelcontents']
      }
      ],
      raw: true,
      order: [['pubrel_createddate', 'DESC']],
      limit: count,
      // where: { pubrel_id: req.params.id }
    }
    let condition1 = {
      attributes: [
          'primgcode',
          'primgcreateddate',
          'primgcreator',
          'primgfilepath',
          'pubrelid',
      ],
      include : [
          {
             model: tbprimage,
             association: new HasMany(tbpublicrelations, tbprimage,{
             foreignKey: {
                name: 'pubrelid',
                allowNull: false,
                },
             }),
             required: true,
             on: {
                pubrelid: { [Op.eq]: sequelize.col('tbprimage.pubrelid') },
             },
          }
      ],
    }
    const public1 = await tbpublicrelations.findAll(condition)
    const publicImg = await tbprimage.findAll(condition1)

    let objImg = await JSON.parse(JSON.stringify(publicImg))
    // console.log("data objImg: ",objImg)

    let imgData = Object.keys(objImg).map((key) => {
      let res = {};
      res['primgcode'] = Object.values(objImg[key]).at(0);
      // res['primgfilepath'] = Object.values(objImg[key]).at(1);
      res['primgfilepath'] = Object.values(objImg[key]).at(3);
      res['primgcreator'] = Object.values(objImg[key]).at(2);
      res['pubrelid'] = Object.values(objImg[key]).at(4);
      return (res);
    })
    
    let obj = await JSON.parse(JSON.stringify(public1));
    // console.log("data obj: ",obj)

    let dataToDisplay = Object.keys(obj).map((key) => {
      let res = {};
        res['pubrel_id'] = Object.values(obj[key]).at(0);
        res['pubrel_title'] = Object.values(obj[key]).at(1);
        res['pubrel_createddate'] = Object.values(obj[key]).at(2);
        res['pubrel_creator'] = Object.values(obj[key]).at(3);
        if (Object.values(obj[key]).at(4) !== null) {
          res['pubrelcont_id'] = Object.values(obj[key]).at(7);
          res['pubrelcontents'] = Object.values(obj[key]).at(8); 
          res['pubrelcont_createddate'] = Object.values(obj[key]).at(5);
          res['pubrelcont_creator'] = Object.values(obj[key]).at(6);
        }
         
    return (res);
  }); 
  // const media = imgData === [] || imgData[0] === undefined ? [] : imgData.tbprimages

    const result = {
      data: {}
    };

    // Iterate over the "news" array
    dataToDisplay.forEach(newsItem => {
      if (!result.data[newsItem.pubrel_id]) {
        result.data[newsItem.pubrel_id] = {
          pubrel_id: newsItem.pubrel_id,
          pubrel_title: newsItem.pubrel_title,
          pubrel_createddate: newsItem.pubrel_createddate,
          pubrel_creator: newsItem.pubrel_creator,
          pubrelcont: [],
          pathmedia: []
        };
      }
    });

    dataToDisplay.forEach(newsCont => {
      const objectToUpdate = result.data[newsCont.pubrel_id];
      objectToUpdate.pubrelcont.push(newsCont);
    })

    imgData.forEach(pathImgItem => {
      // Find the object in the result corresponding to the pubrelid
      const objectToUpdate = result.data[pathImgItem.pubrelid];

      // Push the pathimg item into the pathimg array of the corresponding object
      if (objectToUpdate === undefined) {
        return;
      } else {
        objectToUpdate.pathmedia.push(pathImgItem);
      }
    });

    const output = Object.values(result.data);

    // return res.json({ resData: output })
    return res.send(output);
  } catch (error) {
    next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }
}
exports.getList = async (req, res, next) => {
  try {
    // console.log("getList: ", req.body)
    const {from, to} = req.body;
    // const count = parseInt(req.params.count)
    let condition = {
      include : [{
        model : tbpublicerelationscontents,
        attributes : ['pubrel_id', 'pubrelcont_createddate', 'pubrelcont_creator', 'pubrelcont_id','pubrelcontents']
      }
      ],
      raw: true,
      order: [['pubrel_createddate', 'DESC']],
      // limit: count,
    }
    let condition1 = {
      attributes: [
          'primgcode',
          'primgcreateddate',
          'primgcreator',
          'primgfilepath',
          'pubrelid',
      ],
      include : [
          {
             model: tbprimage,
             association: new HasMany(tbpublicrelations, tbprimage,{
             foreignKey: {
                name: 'pubrelid',
                allowNull: false,
                },
             }),
             required: true,
             on: {
                pubrelid: { [Op.eq]: sequelize.col('tbprimage.pubrelid') },
             },
          }
      ],
    }
    const public1 = await tbpublicrelations.findAll(condition)
    const publicImg = await tbprimage.findAll(condition1)

    let objImg = await JSON.parse(JSON.stringify(publicImg))
    // console.log("data objImg: ",objImg)

    let imgData = Object.keys(objImg).map((key) => {
      let res = {};
      res['primgcode'] = Object.values(objImg[key]).at(0);
      // res['primgfilepath'] = Object.values(objImg[key]).at(1);
      res['primgfilepath'] = Object.values(objImg[key]).at(3);
      res['primgcreator'] = Object.values(objImg[key]).at(2);
      res['pubrelid'] = Object.values(objImg[key]).at(4);
      return (res);
    })
    
    let obj = await JSON.parse(JSON.stringify(public1));
    // console.log("data obj: ",obj)

    let dataToDisplay = Object.keys(obj).map((key) => {
      let res = {};
        res['pubrel_id'] = Object.values(obj[key]).at(0);
        res['pubrel_title'] = Object.values(obj[key]).at(1);
        res['pubrel_createddate'] = Object.values(obj[key]).at(2);
        res['pubrel_creator'] = Object.values(obj[key]).at(3);
        if (Object.values(obj[key]).at(4) !== null) {
          res['pubrelcont_id'] = Object.values(obj[key]).at(7);
          res['pubrelcontents'] = Object.values(obj[key]).at(8); 
          res['pubrelcont_createddate'] = Object.values(obj[key]).at(5);
          res['pubrelcont_creator'] = Object.values(obj[key]).at(6);
        }
         
    return (res);
  }); 
  // const media = imgData === [] || imgData[0] === undefined ? [] : imgData.tbprimages

    const result = {
      data: {}
    };

    // Iterate over the "news" array
    dataToDisplay.forEach(newsItem => {
      if (!result.data[newsItem.pubrel_id]) {
        result.data[newsItem.pubrel_id] = {
          pubrel_id: newsItem.pubrel_id,
          pubrel_title: newsItem.pubrel_title,
          pubrel_createddate: newsItem.pubrel_createddate,
          pubrel_creator: newsItem.pubrel_creator,
          pubrelcont: [],
          pathmedia: []
        };
      }
    });

    dataToDisplay.forEach(newsCont => {
      const objectToUpdate = result.data[newsCont.pubrel_id];
      objectToUpdate.pubrelcont.push(newsCont);
    })

    imgData.forEach(pathImgItem => {
      // Find the object in the result corresponding to the pubrelid
      const objectToUpdate = result.data[pathImgItem.pubrelid];

      // Push the pathimg item into the pathimg array of the corresponding object
      if (objectToUpdate === undefined) {
        return;
      } else {
        objectToUpdate.pathmedia.push(pathImgItem);
      }
    });

    const output = Object.values(result.data).slice(from ,to);
    const count = Object.values(result.data).length;

    // return res.json({ resData: output })
    return res.send({data: output, count: count});
  } catch (error) {
    next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }
}
// module.exports = router;
