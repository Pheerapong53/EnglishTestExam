const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  //return sequelize.define('tbpublicrelations', {
  const tbpublicrelations = sequelize.define('tbpublicrelations', {
    pubrel_id: {
      type: DataTypes.STRING(7),
      allowNull: false,
      primaryKey: true,
      comment: "เลขที่ข่าวประชาสัมพันธ์ เช่น PR00001"
    },
    pubrel_title: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "หัวข้อข่าวประชาสัมพันธ์"
    },
    pubrel_createddate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "วันที่สร้างข่าวประชาสัมพันธ์"
    },
    pubrel_creator: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ชื่อ จนท.ข่าวประชาสัมพันธ์",
      references: {
        model: 'tbmember',
        key: 'pers_id'
      }
    }
  }, {
    sequelize,
    tableName: 'tbpublicrelations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pubrel_id" },
        ]
      },
      {
        name: "pubrel_creator",
        using: "BTREE",
        fields: [
          { name: "pubrel_creator" },
        ]
      },
    ]
  });

  tbpublicrelations.associate = (models) => {
    tbpublicrelations.belongsTo(models.tbmember, { foreignKey: "pubrel_creator" });
    models.tbmember.hasMany(tbpublicrelations, { foreignKey: "pubrel_creator" });
  }
  
  return tbpublicrelations;
};
