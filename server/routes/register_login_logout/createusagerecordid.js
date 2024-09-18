// สร้างรหัสบันทึกการใช้งาน
const db = require("../../models/index");
const { Op, HasMany } = require("sequelize");
const { sequelize } = require("../../models/index");
const { tbusagerecord, tbipaddr } = db;

const usagerecord = async (ip) => {
  const totalDigits = 4;
  let condition = {
    attributes: [
      'usagerecordid',
      'ipaddr',
      'usremail',
    ],
    raw: true,
    where: {
      usagerecordid: { [Op.like]: `%${ip}%`},
      // [Op.and]: [
      //   {usagerecordid: sequelize.where(sequelize.fn('LOWER', sequelize.col('usagerecordid')), 'LIKE', `%${ip}%`)},
      // ]
      // [Op.and]: [
      //   {pubrelid: pubrel_id},
      //   {primgcode: sequelize.where(sequelize.fn('LOWER', sequelize.col('primgcode')), 'LIKE', '%VIDEO%')}
      // ]
    },
  };

  const useraccess = await tbusagerecord.findAll(condition);
  const accrecord = useraccess[useraccess.length - 1];
  // console.log("useraccess: ", useraccess);
  // console.log("accrecord: ", accrecord);
  // console.log("accrecord_1: ", accrecord?.usagerecordid);
  let newValue;
  
  if (useraccess !== undefined) {
    // const count = accrecord?.usagerecordid.slice(-4);
    const n = useraccess.length;
    const count = n.toString().padStart(totalDigits, '0');

    // console.log("msg: เคย login เครื่องนี้");
    console.log("count in database: ", count);
    if (count === "0001" || count === "0009" || count === "0099" || count === "0999") {
        if (count === "0001") {
          let num = parseInt(count, 10) + 1; 
          newValue = num.toString().padStart(totalDigits, '0'); 
      } else {
          let num = parseInt(count, 10) + 1;
          newValue = num.toString().padStart(totalDigits, '0');
      }
    } else if (isNaN(count)) {
      if(isNaN(accrecord?.ipaddr)) {
        // let num = parseInt(count, 10) + 1;
        let date = new Date();
        let time = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        newValue = "del" + String(time);
      } else {
        newValue = "0001";
      }
    } else {
      let num = parseInt(count, 10) + 1;
      newValue = num.toString().padStart(totalDigits, '0');
    }
  } else {
      newValue = "0001";
  }
  console.log("newValue: ", newValue);
  return newValue;
}

module.exports = usagerecord;