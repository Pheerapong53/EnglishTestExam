const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const tbipaddr = sequelize.define('tbipaddr', {
    ipaddr: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      comment: "หมายเลขไอพี"
    },
    office: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "หน่วยงาน"
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "สถานะการใช้งาน -1 - หยุดการใช้งาน, 0 - ระงับการใช้งานชั่วคราว, 1 - กำลังใช้งาน"
    }
  }, {
    sequelize,
    tableName: 'tbipaddr',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ipaddr" },
        ]
      }
    ]
  });

  return tbipaddr;
};
