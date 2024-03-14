const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  //return sequelize.define('tbmemberinfo', {
  const tbmemberinfo = sequelize.define('tbmemberinfo', {
    meminfo_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "หมายเลขข้อมูลสมาชิก (pers_id + month + be_year เช่น 1234567890123-072565)"
    },
    pers_id: {
      type: DataTypes.STRING(13),
      allowNull: false,
      comment: "หมายเลขประจำตัวประชาชน",
      references: {
        model: 'tbmember',
        key: 'pers_id'
      }
    },
    meminfo_year: {
      type: DataTypes.STRING(6),
      allowNull: false,
      comment: "เดือนปีที่อัพเดทข้อมูล เช่น ก.ค.65 เป็น 072565"
    },
    mem_rank: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "ยศปัจจุบัน"
    },
    mem_fname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ชื่อปัจจุบัน"
    },
    mem_lname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "นามสกุลปัจจุบัน"
    },
    mem_pos: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ตำแหน่งปัจจุบัน"
    },
    mem_affiliation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "สังกัดปัจจุบัน"
    },
    rtafbranch: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "เหล่าปัจจุบัน"
    },
    rtafbranchgrp: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "จำพวกทหาร"
    },
    mem_cellphone: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "หมายเลขโทรศัพท์มือถือ"
    },
    mem_offtel: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: "หมายเลขโทรศัพท์ที่ทำงาน"
    },
    memimgpath: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "พาธเก็บภาพถ่ายบุคคล"
    },
    mem_email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mem_token: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbmemberinfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "meminfo_id" },
        ]
      },
      {
        name: "pers_id",
        using: "BTREE",
        fields: [
          { name: "pers_id" },
        ]
      },
    ]
  });

  tbmemberinfo.associate = (models) => {
    tbmemberinfo.belongsTo(models.tbmember, { foreignKey: "pers_id"});
    models.tbmember.hasMany(tbmemberinfo, { foreignKey: "pers_id"});
  }

  return tbmemberinfo;
};
