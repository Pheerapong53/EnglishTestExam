const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbprimage', {
    primgcode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสภาพหรือวีดิโอ (รหัส PR + IMG + ลำดับ)  เช่น PR00001IMG01"
    },
    primgfilepath: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "พาธเก็บไฟล์ประชาสัมพันธ์เป็นภาพหรือวีดิโอ"
    },
    primgcreateddate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "วันที่บันทึกไฟล์ภาพหรือไฟล์วีดิโอ"
    },
    primgcreator: {
      type: DataTypes.STRING(13),
      allowNull: false,
      comment: "ผูับันทึกไฟล์ภาพหรือไฟล์วีดิโอ"
    },
    pubrelid: {
      type: DataTypes.STRING(7),
      allowNull: false,
      comment: "เลขที่ข่าวประชาสัมพันธ์ เช่น PR00001"
    }
  }, {
    sequelize,
    tableName: 'tbprimage',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "primgcode" },
        ]
      },
    ]
  });
};
