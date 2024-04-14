const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  //return sequelize.define('tbindvform', {
  const tbindvform = sequelize.define('tbindvform', {
    indvtfrmcode: {
      type: DataTypes.STRING(35),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสแบบฟอร์มทดสอบรายบุคคล (รหัสการจอง-เลขประจำตัวประชาชน-เลขฟอร์ม) เช่น สอ.ทอ.จองครั้งที่ 1 ฟอร์ม 1 ผลการสอบรายบุคคลเป็น DCE001-1234567890123-F0001R1A1061"
    },
    testresultcode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "รหัสผลการทดสอบของแต่ละการจอง (รหัสการจอง-เลขประจำตัวประชาชน) เช่น สอ.ทอ.จองครั้งที่ 1 ผลการสอบรายบุคคลเป็น DCE001-1234567890123",
      references: {
        model: 'tbtestresult',
        key: 'testresultcode'
      }
    },
    question_code: {
      type: DataTypes.STRING(12),
      allowNull: false,
      comment: "รหัสโจทย์ 12 หลัก (เลขฟอร์ม+cerfcode+เลขข้อ) เข่น  F0001R1A1061",
      references: {
        model: 'tbquestion',
        key: 'questioncode'
      }
    },
    questionorder: {
      type: DataTypes.STRING(3),
      allowNull: false,
      comment: "ลำดับข้อในชุดข้อสอบ  001 - 100"
    },
    A: {
      type: DataTypes.STRING(16),
      allowNull: true,
      comment: "choice A"
    },
    B: {
      type: DataTypes.STRING(16),
      allowNull: true,
      comment: "choice B"
    },
    C: {
      type: DataTypes.STRING(16),
      allowNull: true,
      comment: "choice C"
    },
    D: {
      type: DataTypes.STRING(16),
      allowNull: true,
      comment: "choice D"
    },
    frmcreatedate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "วันที่สร้างฟอร์มทดสอบรายบุคคล"
    }
  }, {
    sequelize,
    tableName: 'tbindvform',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "indvtfrmcode" },
        ]
      },
      {
        name: "testresultcode",
        using: "BTREE",
        fields: [
          { name: "testresultcode" },
        ]
      },
      {
        name: "question_code",
        using: "BTREE",
        fields: [
          { name: "question_code" },
        ]
      },
    ]
  });

  tbindvform.associate = (models) => {
    tbindvform.belongsTo(models.tbquestion, { foreignKey: "question_code" });
    models.tbquestion.hasMany(tbindvform, { foreignKey: "question_code" });
    tbindvform.belongsTo(models.tbtestresult, { foreignKey: "testresultcode" });
    models.tbtestresult.hasMany(tbindvform, { foreignKey: "testresultcode" });
    tbindvform.belongsTo(models.tbchoice, { foreignKey: "A", as: "fk_choiceA" });
    models.tbchoice.hasMany(tbindvform, { foreignKey: "A", as: "fk_choiceA" });
    tbindvform.belongsTo(models.tbchoice, { foreignKey: "B", as: "fk_choiceB" });
    models.tbchoice.hasMany(tbindvform, { foreignKey: "B", as: "fk_choiceB" });
    tbindvform.belongsTo(models.tbchoice, { foreignKey: "C", as: "fk_choiceC" });
    models.tbchoice.hasMany(tbindvform, { foreignKey: "C", as: "fk_choiceC" });
    tbindvform.belongsTo(models.tbchoice, { foreignKey: "D", as: "fk_choiceD" });
    models.tbchoice.hasMany(tbindvform, { foreignKey: "D", as: "fk_choiceD" });
  }

  return tbindvform;
};
