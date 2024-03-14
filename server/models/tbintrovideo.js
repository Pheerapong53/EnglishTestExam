const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const tbintrovideo = sequelize.define('tbintrovideo', {
    introvdoid: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสวีดีโอแนะนำ รูปแบบ INTRO-xxx เช่น INTRO-001"
    },
    introvdotitle: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "ชื่อไฟล์วีดีโอแนะนำ"
    },
    introvdofilepath: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "พาธที่เก็บไฟล์วีดีโอแนะนำ"
    },
    introvdouploaddate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "วันที่จัดเก็บไฟล์วีดีโอแนะนำ"
    }
  }, {
    sequelize,
    tableName: 'tbintrovideo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "introvdoid" },
        ]
      }
    ]
  });

  return tbintrovideo;
};
