const db = require('../../models/index')
const { Op, HasMany, where } = require('sequelize')
const { sequelize } = require('../../models/index')
// const { tbtestreservation,tbmemberinfo, tbmember,tbtestresult,tbtestscoringcriteria,tbindvform} = db
const { tbmember, tbmemberinfo, tbindvform, tbtestresult, tbtestreservation, tbtestscoringcriteria,tbquestion} = db
const { StatusCodes } = require('http-status-codes')
const errorHandler = require('http-errors') 
// const jwt = require('jsonwebtoken')
// const axios = require('axios')
const IP = require('ip');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
//PageTestScores
exports.getalldataTestscores = async (req, res, next) => {
  
    try{
      
       const month = Number(req.params.currentMonthCount) + 1
       const year = Number(req.params.currentYear) - 543
       const condition = {
        include: [
            {
                model: tbtestreservation,
                
            },
            
            
                
        ],
        where: {
                  [Op.and]: 
                  [
                      sequelize.where(sequelize.fn('YEAR', sequelize.col('testresvdate')), year),
                      sequelize.where(sequelize.fn('MONTH', sequelize.col('testresvdate')), month),
                  ],
                  
              },
              group: ['testresvcode'],
              raw: true
    };
       
  
      const datalist = await tbtestresult.findAll(condition)
      
  
      .catch(err => {
        console.log('getAlltestscores table tbtestresult get >>> err : ', err);
        next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
        res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
        err,))
      )
      })
      res.json(datalist)
      // console.log("data: ", datalist)
      } catch (error) {
      return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
        error,))
      )
      }
  
}

//ContentPageTestScores
exports.gettoscoreresvcode = async (req, res, next) => {

try {
  
  const testresvcode = req.params.testresvcode
  // console.log('testresvcode:',testresvcode)
  const condition = {
    include: [
        {
            model: tbmember,
            attributes: [
                'official_id',
                'pers_id'
            ],
            include: [
                {
                  model: tbmemberinfo,
                  attributes: [
                    'mem_rank',
                    'mem_fname',
                    'mem_lname',
                    'mem_affiliation'
                  ]
                },
            ],
        },
        {
            model: tbtestreservation,
            include: [
              {
                model: tbtestscoringcriteria,
                attributes: [
                  'mission',
                  'minscore'
                ],
              }
            ],
        },
        {
          model: tbindvform,
          
        },
        {
          model: tbmemberinfo,
          
        },
            
    ],
    where: {
        testresvcode: testresvcode
    },
    group: ['testresultcode'],
    raw: true
};
const datalist = await tbtestresult.findAll(condition)
.catch(err => {
  console.log('gettoscoreresvcode table tbtestresult get >>> err : ', err);
  next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
  res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
  err,))
)
})
res.json(datalist)
// console.log("data: ", datalist)
} catch (error) {
return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
  error,))
)
}
}  
//ContentPageTestScores
exports.Inserteditscore = async (req, res, next) => {
  try{


    const testresultcode = req.params.testresultcode
    const edit = req.params.edit
    const currentDate = new Date().toISOString().substring(0,10)
    const userLogin = req.params.pers_id
    // console.log('testresultcode',testresultcode)
    // console.log('edit',edit)
    // console.log('currentDate',currentDate)
    // console.log('userLogin',userLogin)
    // console.log('-----------------------')
 


  const Result = await tbtestresult.update(
    { 
      editscore: edit ,
      editscoredate : currentDate,
      editscorerecorder  : userLogin

    }, // condition object
    { where: { testresultcode: testresultcode } } // where clause
  )

  .catch(err => {
    console.log('gettoscoreresvcode table tbtestresult get >>> err : ', err);
    next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
    err,))
  )
  })
  res.json(Result)
  // console.log("data: ", Result)
  } catch (error) {
  return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
  res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
    error,))
  )
  }

}
//ContentPageTestScores
exports.appovescore = async (req, res, next) => {
  try{

    const testresvcode  = req.params.testresvcode 
    // console.log(testresvcode)
    const appove = 1
    const currentDate = new Date().toISOString().substring(0,10)
    const userLogin = req.params.pers_id
    const Result = await tbtestresult.update(
      { 
        testresultapprv: appove ,
        testresultapprvdate : currentDate,
        testresultapprover   : userLogin

      }, // condition object
       
      
      { where: { testresvcode  : testresvcode } } // where clause

      // {
      //   where: {
      //     'testresultcode': {
      //         [Op.like]: '%' + testresvcode[0] +'%'
      //     }
      // }
        
      // }
    )

  .catch(err => {
    console.log('gettoscoreresvcode table tbtestresult get >>> err : ', err);
    next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
    err,))
  )
  })
  res.json(Result)
  // console.log("data: ", Result)
  } catch (error) {
  return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
  res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
    error,))
  )
  }
}
//ContentIndividualScores
exports.gettbtestresult = async (req, res, next) => {
  try {

  //   const condition = {
  //     include: [
  //         {
  //             model: tbmember,
  //             attributes: [
  //                 'official_id',
  //                 'pers_id'
  //             ],
  //             include: [
  //                 {
  //                   model: tbmemberinfo,
  //                   attributes: [
  //                     'meminfo_id',
  //                     'pers_id',
  //                     'meminfo_year',
  //                     'mem_rank',
  //                     'mem_fname',
  //                     'mem_lname',
  //                     'mem_pos',
  //                     'mem_affiliation',
  //                     'rtafbranch',
  //                     'rtafbranchgrp',
  //                     'mem_cellphone',
  //                     'mem_offtel',
  //                     'memimgpath',
  //                     'mem_email',
                     
  //                   ]
                    
  //                 },
                 
  //             ],
  //         },
  //         {
  //             model: tbtestreservation,
  //             include: [
  //               {
  //                 model: tbtestscoringcriteria,
  //                 attributes: [
  //                   'mission',
  //                   'minscore'
  //                 ],
  //               }
  //             ],
  //         },
         

  
              
  //     ],
  //   //   where: {
  //   //     meminfo_id: person_id + '-' + '022566'
  //   // },
      
  //     // where: { [Op.like]: `%'meminfo_id'%` :  person_id  },
      
     
  //     raw: true
  // };
    // const Result = await tbmemberinfo.findAll(condition)

    const testresult = await tbtestresult.findAll()

    // const Result = await tbtestresult.findAll(condition)

    .catch(err => {
      console.log('gettoscoreresvcode table tbtestresult get >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    })
    res.json(testresult)
    // console.log("data: ", tbtestreservation)
    } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
    }
}


exports.gettbmemberinfo = async (req, res, next) => {
  try {


    const testresult = await tbmemberinfo.findAll()

    // const Result = await tbtestresult.findAll(condition)

    .catch(err => {
      console.log('gettoscoreresvcode table tbtestresult get >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    })
    res.json(testresult)
    // console.log("data: ", tbtestreservation)
    } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
    }
}


exports.gettbtestreservation = async (req, res, next) => {
  try {


    const testresult = await tbtestreservation.findAll()

    // const Result = await tbtestresult.findAll(condition)

    .catch(err => {
      console.log('gettoscoreresvcode table tbtestresult get >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    })
    res.json(testresult)
    // console.log("data: ", tbtestreservation)
    } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
    }
}


exports.gettbtestscoringcriteria = async (req, res, next) => {
  try {


    const testresult = await tbtestscoringcriteria.findAll()

    // const Result = await tbtestresult.findAll(condition)

    .catch(err => {
      console.log('gettoscoreresvcode table tbtestresult get >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    })
    res.json(testresult)
    // console.log("data: ", tbtestreservation)
    } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
    }
}


exports.getperscore = async (req, res, next) => {

  try {
    // console.log('pers_id:',req.params.pers_id)
    // console.log('----------------')
    const person_id = req.params.pers_id

    // console.log('testresvcode:',testresvcode)
    const condition = {
      include: [
          {
              model: tbmember,
              attributes: [
                  'official_id',
                  'pers_id'
              ],
              include: [
                  {
                    model: tbmemberinfo,
                    attributes: [
                      'meminfo_id',
                      'pers_id',
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
                      'mem_email',
                     
                    ]
                    
                  },
                 
              ],
          },
          {
              model: tbtestreservation,
              include: [
                {
                  model: tbtestscoringcriteria,
                  attributes: [
                    'mission',
                    'minscore'
                  ],
                }
              ],
          },
         

  
              
      ],
    //   where: {
    //     meminfo_id: person_id + '-' + '022566'
    // },
      
      // where: { [Op.like]: `%'meminfo_id'%` :  person_id  },
      
     
      raw: true
  };
  const datalist = await tbtestresult.findAll(condition)
  .catch(err => {
    console.log('gettoscoreresvcode table tbtestresult get >>> err : ', err);
    next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
    err,))
  )
  })
  res.json(datalist)
  // console.log("data: ", datalist)
  } catch (error) {
  return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
  res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
    error,))
  )
  }
  } 



//ContentListScores
exports.getListmisson = async (req, res, next) => {
  
    const Result = await tbmemberinfo.findAll({})

    .catch(err => {
      console.log('gettoscoreresvcode table tbtestresult get >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    })
    res.json(Result)
    // console.log("data: ", Result)
  
    
}
exports.test = async (req, res, next) => {
  try {

  res.json("/test")

    
    
  } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(400).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
  }
}


exports.getTbtestscoringcriteria = async (req, res, next) => {
  try {
 
    const 	minscore = await tbtestscoringcriteria.findAll()
    .catch(err => {
        console.log("error: " + err)
    })
    const response = 	minscore.map((user) => {
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

// const datalist = await tbtestresult.findAll()
exports.getalldataTestscoresall = async (req, res, next) => {
  // console.log('selectMissions:',req.params.selectMissions)
  const selectMissions = req.params.selectMissions
  try{
      
    // const month = Number(req.params.currentMonthCount) + 1
    // const year = Number(req.params.currentYear) - 543
    const condition = {
include: [
  {
      model: tbtestreservation,
      where: {
        testscoringcriteria: selectMissions
      }
  },

],
    
           raw: true
 };
    

   const datalist = await tbtestresult.findAll(condition)
   

   .catch(err => {
     console.log('getAlltestscores table tbtestresult get >>> err : ', err);
     next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
     res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
     err,))
   )
   })
   res.json(datalist)
   // console.log("data: ", datalist)
   } catch (error) {
   return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
   res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
     error,))
   )
   }

}



exports.gettoscoreresvcodeContentPageListTestScores = async (req, res, next) => {
  // console.log('selectMissions:',req.params.testscoringcriteria)
  // console.log('testreqdate:',req.params.testreqdate)
  // console.log('testreqtime:',req.params.testreqtime)
  try {
    
    // const testresvcode = req.params.testresvcode
    const selectMissions = req.params.testscoringcriteria
    const testreqdate = req.params.testreqdate
    const testreqtime = req.params.testreqtime
    // console.log('testresvcode:',testresvcode)
    const condition = {
      include: [
          {
              model: tbmember,
              attributes: [
                  'official_id',
                  'pers_id'
              ],
              include: [
                  {
                    model: tbmemberinfo,
                    attributes: [
                      'mem_rank',
                      'mem_fname',
                      'mem_lname',
                      'mem_affiliation'
                    ]
                  },
              ],
          },
          {
              model: tbtestreservation,
              where: {
                testreqdate:testreqdate,
                testreqtime:testreqtime,
                testscoringcriteria: selectMissions
              },
              include: [
                {
                  model: tbtestscoringcriteria,
                  attributes: [
                    'mission',
                    'minscore'
                  ],
                }
              ],
          },
  
          {
            model: tbindvform,
            
          },
          {
            model: tbmemberinfo,
          }
              
      ],
     
      group: ['testresultcode'],
      raw: true
  };
  const datalist = await tbtestresult.findAll(condition)
  .catch(err => {
    console.log('gettoscoreresvcode table tbtestresult get >>> err : ', err);
    next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
    err,))
  )
  })
  res.json(datalist)
  // console.log("data: ", datalist)
  } catch (error) {
  return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
  res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
    error,))
  )
  }
  }  





  

  exports.getalldataDivisionScores = async (req, res, next) => {
    // console.log('selectMissions:',req.params.selectMissions)
    const company = req.params.company
    // console.log('company:',company)
    try{
        
      // const month = Number(req.params.currentMonthCount) + 1
      // const year = Number(req.params.currentYear) - 543
      const condition = {
  include: [
    {
        model: tbtestreservation,
        where: {
          testrequnit: company
        }
    },
  
  ],
      
             raw: true
   };
      
  
     const datalist = await tbtestresult.findAll(condition)
     
  
     .catch(err => {
       console.log('getalldataDivisionScores table tbtestreservation get >>> err : ', err);
       next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
       res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
       err,))
     )
     })
     res.json(datalist)
    //  console.log("data: ", datalist)
     } catch (error) {
     return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
     res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
       error,))
     )
     }
  
  }

 





  exports.getalldataContentPageListTestScoresDivision = async (req, res, next) => {
    // console.log('selectMissions:',req.params.selectMissions)
    const company = req.params.company
    const book = req.params.datebook
    // console.log('company:',company)
    // console.log('book:',book)
    try {
    
      // const testresvcode = req.params.testresvcode
 
      // console.log('testresvcode:',testresvcode)
      const condition = {
        include: [
            {
                model: tbmember,
                attributes: [
                    'official_id',
                    'pers_id'
                ],
                include: [
                    {
                      model: tbmemberinfo,
                      attributes: [
                        'mem_rank',
                        'mem_fname',
                        'mem_lname',
                        'mem_affiliation'
                      ]
                    },
                ],
            },
            {
                model: tbtestreservation,
                where: {
                  testreqdate:book,
                  testrequnit:company,
                },
                include: [
                  {
                    model: tbtestscoringcriteria,
                    attributes: [
                      'mission',
                      'minscore'
                    ],
                  }
                ],
            },
    
            {
              model: tbindvform,
              
            },
            {
              model: tbmemberinfo,
            }, 
                
        ],
       
        group: ['testresultcode'],
        raw: true
    };
    const datalist = await tbtestresult.findAll(condition)
    .catch(err => {
      console.log('gettoscoreresvcode table tbtestresult get >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    })
    res.json(datalist)
    // console.log("data: ", datalist)
    } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
    }
  
  }




  exports.getPagePrintTestScore = async (req, res, next) => {
    // console.log('selectMissions:',req.params.selectMissions)
    const perid = req.params.perid
    const testappvcode = req.params.testappvcode
    // console.log('perid:',perid)
    // console.log('testappvcode:',testappvcode)
    try {
    
      // const testresvcode = req.params.testresvcode
 
      // console.log('testresvcode:',testresvcode)
      const condition = {
        include: [
            {
                model: tbmember,
                attributes: [
                    'official_id',
                    'pers_id'
                ],
                include: [
                    {
                      model: tbmemberinfo,
                      attributes: [
                        'mem_rank',
                        'mem_fname',
                        'mem_lname',
                        'mem_affiliation'
                      ]
                    },
                ],
            },
            {
                model: tbtestreservation,
                where: {
                  testappvcode:"QW1S",
                  
                },
                include: [
                  {
                    model: tbtestscoringcriteria,
                    attributes: [
                      'mission',
                      'minscore'
                    ],
                  }
                ],
            },
    
            {
              model: tbindvform,
            },
            {
              model: tbmemberinfo,
              where: {
                pers_id:perid,
                
              },
            }, 
        ],
       
        group: ['testresultcode'],
        raw: true
    };
    const datalist = await tbtestresult.findAll(condition)
    .catch(err => {
      console.log('gettoscoreresvcode table tbtestresult get >>> err : ', err);
      next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, err),
      res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      err,))
    )
    })
    res.json(datalist)
    // console.log("data: ", datalist)
    } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
    }
  
  }


  exports.getIpv4Address = async (req, res, next) => {
   
    try {
      const ipAddress = IP.address();
      res.send(ipAddress)
      
    } catch (error) {
    return next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error),
    res.status(500).json(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR,
      error,))
    )
    }
  
  }