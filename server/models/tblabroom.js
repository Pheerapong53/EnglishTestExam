const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tblabroom', {
    labroomcode: {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสห้องสอบ"
    },
    labroomcap: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "จำนวนคน"
    }
  }, {
    sequelize,
    tableName: 'tblabroom',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "labroomcode" },
        ]
      },
    ]
  });
};
