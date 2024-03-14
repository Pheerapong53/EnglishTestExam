const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbusertype', {
    usertypeid: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสประเภทผู้ใช้งานระบบ"
    },
    usetypedesc: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "คำอธิบายประเภทผู้ใช้งานระบบ"
    }
  }, {
    sequelize,
    tableName: 'tbusertype',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usertypeid" },
        ]
      },
    ]
  });
};
