const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  //return sequelize.define('tbtestresult', {
  const tbtestresult = sequelize.define('tbtestresult', {
    testresultcode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสผลการทดสอบของแต่ละการจอง (รหัสการจอง-เลขประจำตัวประชาชน) เช่น สอ.ทอ.จองครั้งที่ 1 ผลการสอบรายบุคคลเป็น DCE001-1234567890123"
    },
    testresvcode: {
      type: DataTypes.STRING(6),
      allowNull: false,
      comment: "รหัสการจองวันทดสอบ (ชื่อย่อหน่วย+ครั้ง (สามหลัก)) เช่น สอ.ทอ.จองครั้งที่ 1 รหัสเป็น DCE001",
      references: {
        model: 'tbtestreservation',
        key: 'testresvcode'
      }
    },
    meminfo_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "หมายเลขข้อมูลสมาชิก (pers_id + month + be_year เช่น 1234567890123-072565)",
      references: {
        model: 'tbmemberinfo',
        key: 'meminfo_id'
      }
    },
    testconductdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "วันที่ทำการทดสอบ"
    },
    realscore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "คะแนนที่สอบได้จริง"
    },
    realscoredate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "วันที่บันทึกคะแนนที่สอบได้จริง"
    },
    realscorerecorder: {
      type: DataTypes.STRING(13),
      allowNull: true,
      comment: "ผู้บันทึกคะแนนที่สอบได้จริง",
      references: {
        model: 'tbmember',
        key: 'pers_id'
      }
    },
    editscore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "คะแนนที่แก้ไข"
    },
    editscoredate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "วันที่บันทึกคะแนนที่แก้ไข"
    },
    editscorerecorder: {
      type: DataTypes.STRING(13),
      allowNull: true,
      comment: "ผู้บันทึกคะแนนที่แก้ไข",
      references: {
        model: 'tbmember',
        key: 'pers_id'
      }
    },
    qrcode_indv: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "QRCODE รายบุคคล"
    },
    qrcode_directorate: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "QRCODE รายหน่วย"
    },
    qrcode_project: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "QRCODE ตามโครงการ\/หลักสูตร"
    },
    testresultapprv: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "ยืนยันผลการทดสอบ (boolean) "
    },
    testresultapprover: {
      type: DataTypes.STRING(13),
      allowNull: true,
      comment: "ผู้อนุมัติผลการทดสอบ",
      references: {
        model: 'tbmember',
        key: 'pers_id'
      }
    },
    testlabroom: {
      type: DataTypes.STRING(4),
      allowNull: true,
      comment: "ห้องสอบ เช่น  LAB1",
      references: {
        model: 'tblabroom',
        key: 'labroomcode'
      }
    },
    submittime: {
      type: DataTypes.TIME,
      allowNull: true,
      comment: "เวลาส่งข้อสอบ"
    },
    showscoringcriteria: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "แสดงหรือไม่แสดงเกณฑ์คะแนน"
    },
    testresultapprvdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "วันที่ยืนยันผลการทดสอบ"
    },
    testindvappvcode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "รหัสการอนุมัติวันทดสอบรายบุคคล รูปแบบ ถ้าอนุมัติ APRV + รหัสการจอง + '-' + pers_id เช่น APRVSWC001-1234567890123 แต่ถ้าไม่อนุมัติ DISAP + รหัสการจอง + '-' + pers_id เช่น DISAPSWC001-1234567890123"
    },
    testindvappvresult: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "ผลการอนุมัติวันทดสอบรายบุคคล ถ้า อนุมัติ ใส่ APRV ถ้าไม่อนุมัติใส่เหตุผล"
    },
    testindvappvdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "วันที่อนุมัติวันทดสอบรายบุคคล"
    },
    testindvappvtime: {
      type: DataTypes.TIME,
      allowNull: true,
      comment: "เวลาที่อนุมัติวันทดสอบรายบุคคล"
    },
    testindvapprover: {
      type: DataTypes.STRING(13),
      allowNull: true,
      comment: "ผู้อนุมัติวันทดสอบรายบุคคล",
      references: {
        model: 'tbmember',
        key: 'pers_id'
      }
    },
    invigilator: {
      type: DataTypes.STRING(13),
      allowNull: true,
      comment: "ผู้คุมสอบ",
      references: {
        model: 'tbmember',
        key: 'pers_id'
      }
    },
    testtype: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "0 - เลือกรูปแบบ 1 - Random และ 2 - Adaptive",
    }
  }, {
    sequelize,
    tableName: 'tbtestresult',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "testresultcode" },
        ]
      },
      {
        name: "testresvcode",
        using: "BTREE",
        fields: [
          { name: "testresvcode" },
        ]
      },
      {
        name: "meminfo_id",
        using: "BTREE",
        fields: [
          { name: "meminfo_id" },
        ]
      },
      {
        name: "realscorerecorder",
        using: "BTREE",
        fields: [
          { name: "realscorerecorder" },
        ]
      },
      {
        name: "editscorerecorder",
        using: "BTREE",
        fields: [
          { name: "editscorerecorder" },
        ]
      },
      {
        name: "testresultapprover",
        using: "BTREE",
        fields: [
          { name: "testresultapprover" },
        ]
      },
      {
        name: "testlabroom",
        using: "BTREE",
        fields: [
          { name: "testlabroom" },
        ]
      },
      {
        name: "testindvapprover",
        using: "BTREE",
        fields: [
          { name: "testindvapprover" },
        ]
      },
    ]
  });

  tbtestresult.associate = (models) => {
    tbtestresult.belongsTo(models.tbtestreservation, { foreignKey: "testresvcode" });
    models.tbtestreservation.hasMany(tbtestresult, { foreignKey: "testresvcode" });
    tbtestresult.belongsTo(models.tbmemberinfo, { foreignKey: "meminfo_id" });
    models.tbmemberinfo.hasMany(tbtestresult, { foreignKey: "meminfo_id" });
    tbtestresult.belongsTo(models.tbmember, { foreignKey: "realscorerecorder" });
    models.tbmember.hasMany(tbtestresult, { foreignKey: "realscorerecorder" });
    tbtestresult.belongsTo(models.tbmember, { foreignKey: "editscorerecorder" });
    models.tbmember.hasMany(tbtestresult, { foreignKey: "editscorerecorder" });
    tbtestresult.belongsTo(models.tbmember, { foreignKey: "testresultapprover" });
    models.tbmember.hasMany(tbtestresult, { foreignKey: "testresultapprover" });
    tbtestresult.belongsTo(models.tblabroom, { foreignKey: "testlabroom" });
    models.tblabroom.hasMany(tbtestresult, { foreignKey: "testlabroom" });
    tbtestresult.belongsTo(models.tbmember, { foreignKey: "testindvapprover" });
    models.tbmember.hasMany(tbtestresult, { foreignKey: "testindvapprover" });
    tbtestresult.belongsTo(models.tbmember, { foreignKey: "invigilator" });
    models.tbmember.hasMany(tbtestresult, { foreignKey: "invigilator" });
  }

  return tbtestresult;
};
