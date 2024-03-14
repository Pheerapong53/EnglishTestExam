const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  //return sequelize.define('tbtestreservation', {
  const tbtestreservation = sequelize.define('tbtestreservation', {
    testresvcode: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสการจองวันทดสอบ (ชื่อย่อหน่วย+ครั้ง (สามหลัก)) เช่น สอ.ทอ.จองครั้งที่ 1 รหัสเป็น DCE001"
    },
    testresvdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "วันที่จองวันทดสอบ"
    },
    testresvtime: {
      type: DataTypes.TIME,
      allowNull: false,
      comment: "เวลาจองวันทดสอบ"
    },
    testscoringcriteria: {
      type: DataTypes.STRING(4),
      allowNull: false,
      comment: "เกณฑ์การใช้คะแนนภาษาอังกฤษ",
      references: {
        model: 'tbtestscoringcriteria',
        key: 'scoringcriteriacode'
      }
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ประเทศปลายทาง"
    },
    testreqdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "วันที่ต้องการเข้ารับการทดสอบ"
    },
    testreqtime: {
      type: DataTypes.TIME,
      allowNull: false,
      comment: "เวลาที่ต้องการเข้ารับการทดสอบ"
    },
    coordinator: {
      type: DataTypes.STRING(13),
      allowNull: false,
      comment: "ผู้ติดต่อประสานของหน่วย",
      references: {
        model: 'tbmember',
        key: 'pers_id'
      }
    },
    testrequnit: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "หน่วยหรือคณะที่ต้องการเข้ารับการทดสอบ"
    },
    testappvcode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "รหัสการอนุมัติวันทดสอบ"
    },
    testappvresult: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "ผลการอนุมัติวันทดสอบ"
    },
    testappvdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "วันที่อนุมัติวันทดสอบ"
    },
    testappvtime: {
      type: DataTypes.TIME,
      allowNull: true,
      comment: "เวลาที่อนุมัติวันทดสอบ"
    },
    testapprover: {
      type: DataTypes.STRING(13),
      allowNull: true,
      comment: "ผู้อนุมัติวันทดสอบ",
      references: {
        model: 'tbmember',
        key: 'pers_id'
      }
    }
  }, {
    sequelize,
    tableName: 'tbtestreservation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "testresvcode" },
        ]
      },
      {
        name: "testscoringcriteria",
        using: "BTREE",
        fields: [
          { name: "testscoringcriteria" },
        ]
      },
      {
        name: "coordinator",
        using: "BTREE",
        fields: [
          { name: "coordinator" },
        ]
      },
      {
        name: "testapprover",
        using: "BTREE",
        fields: [
          { name: "testapprover" },
        ]
      },
    ]
  });

  tbtestreservation.associate = (models) => {
    tbtestreservation.belongsTo(models.tbtestscoringcriteria, { foreignKey: "testscoringcriteria" });
    models.tbtestscoringcriteria.hasMany(tbtestreservation, { foreignKey: "testscoringcriteria" });
    tbtestreservation.belongsTo(models.tbmember, { foreignKey: "coordinator" });
    models.tbmember.hasMany(tbtestreservation, { foreignKey: "coordinator" });
    tbtestreservation.belongsTo(models.tbmember, { foreignKey: "testapprover" });
    models.tbmember.hasMany(tbtestreservation, { foreignKey: "testapprover" });
  }

  return tbtestreservation;
};
