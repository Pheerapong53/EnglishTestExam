const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbtestscoringcriteria', {
    scoringcriteriacode: {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสเกณฑ์การใช้คะแนนภาษาอังกฤษ"
    },
    mission: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ภารกิจของข้าราชการที่เข้าสอบ"
    },
    minscore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "คะแนนผ่านขั้นต่ำ"
    }
  }, {
    sequelize,
    tableName: 'tbtestscoringcriteria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "scoringcriteriacode" },
        ]
      },
    ]
  });
};
