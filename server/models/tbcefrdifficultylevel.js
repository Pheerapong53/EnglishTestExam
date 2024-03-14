const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbcefrdifficultylevel', {
    cerfcode: {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสระดับความยากง่ายตาม cerf"
    },
    cerfdifficultylevel: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "ระดับความยากง่ายตาม cerf"
    },
    cerfdifficultyleveldesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cerfleveltype: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ประเภทข้อสอบ"
    }
  }, {
    sequelize,
    tableName: 'tbcefrdifficultylevel',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cerfcode" },
        ]
      },
    ]
  });
};
