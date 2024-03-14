const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const tbaccessrights = sequelize.define('tbaccessrights', {
  //return sequelize.define('tbaccessrights', {
    accessrightsid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสสิทธิ์การใช้งานระบบ \n\"รหัสประจำตัวประชาชน-ประเภทผู้ใช้งานระบบ\" เช่น 1234567890123-USR01 "
    },
    persid: {
      type: DataTypes.STRING(13),
      allowNull: false,
      comment: "เลขประจำตัวประชาชน",
      references: {
        model: 'tbmember',
        key: 'pers_id'
      }
    },
    usrtypeid: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: "รหัสประเภทผู้ใช้งานระบบ",
      references: {
        model: 'tbusertype',
        key: 'usertypeid'
      }
    },
    permissiondate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "วันที่อนุญาตใช้สิทธิ์การเข้าถึงข้อมูล"
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "1=อนุมัติ, 0=ไม่อนุมัติ, 2=รออนุมัติ, 1000=ระงับ"
    }
  }, {
    sequelize,
    tableName: 'tbaccessrights',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "accessrightsid" },
        ]
      },
      {
        name: "persid",
        using: "BTREE",
        fields: [
          { name: "persid" },
        ]
      },
      {
        name: "usrtypeid",
        using: "BTREE",
        fields: [
          { name: "usrtypeid" },
        ]
      },
    ]
  });
  tbaccessrights.associate = (models) => {
    tbaccessrights.belongsTo(models.tbmember, { foreignKey: "persid" });
    models.tbmember.hasMany(tbaccessrights, { foreignKey: "persid" });
    tbaccessrights.belongsTo(models.tbusertype, { foreignKey: "usrtypeid" });
    models.tbusertype.hasMany(tbaccessrights, { foreignKey: "usrtypeid" });
  } 
  return tbaccessrights;
};
