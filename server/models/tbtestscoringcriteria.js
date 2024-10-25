const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  //return sequelize.define('tbtestscoringcriteria', {
  const tbtestscoringcriteria = sequelize.define('tbtestscoringcriteria', {
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
    //---> updated on 24-10-2024
    mincefrlevel: {
      type: DataTypes.STRING(2),
      //type: DataTypes.INTEGER, //---> updated on 24-10-2024
      allowNull: false,
      comment: "คะแนนผ่านขั้นต่ำ",
      references: {
        model: 'tbcefrlevel',
        key: 'cefrlevel'
      }
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
      {
        name: "mincefrlevel",
        using: "BTREE",
        fields: [
          { name: "cefrlevel" },
        ]
      },
    ]
  });

  tbtestscoringcriteria.associate = (models) => {
    tbtestscoringcriteria.belongsTo(models.tbcefrlevel, { foreignKey: "mincefrlevel" });
    models.tbcefrlevel.hasMany(tbtestscoringcriteria, { foreignKey: "mincefrlevel" });
  }

  return tbtestscoringcriteria;
};
