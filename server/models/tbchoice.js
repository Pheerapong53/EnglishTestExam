const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const tbchoice = sequelize.define('tbchoice', {
  //return sequelize.define('tbchoice', {
    choicecode: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสตัวเลือก เช่น ชุดที่ 1 ข้อที่ 57 ระดับความยาก 1LB2 ตัวเลือกที่ 1 เช่น F0001L2B2057CH01"
    },
    choicetext: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "ข้อความในตัวเลือก"
    },
    answer: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "เฉลย คำตอบที่ถูก 1 และ คำตอบที่ผิด 0"
    },
    questioncode: {
      type: DataTypes.STRING(12),
      allowNull: false,
      references: {
        model: 'tbquestion',
        key: 'questioncode'
      }
    }
  }, {
    sequelize,
    tableName: 'tbchoice',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "choicecode" },
        ]
      },
      {
        name: "questioncode",
        using: "BTREE",
        fields: [
          { name: "questioncode" },
        ]
      },
    ]
  });
  tbchoice.associate = (models) => {
    tbchoice.belongsTo(models.tbquestion, { foreignKey: "questioncode" });
    models.tbquestion.hasMany(tbchoice, { foreignKey: "questioncode" });
  }
  return tbchoice;
};
