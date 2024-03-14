const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  // return sequelize.define('tbpublicerelationscontents', {
    const tbpublicerelationscontents = sequelize.define('tbpublicerelationscontents', {
    pubrelcont_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสเนื้อหาสาระของข่าวประชาสัมพันธ์ เช่น PR00001CON01"
    },
    pubrel_id: {
      type: DataTypes.STRING(7),
      allowNull: false,
      comment: "เลขที่ข่าวประชาสัมพันธ์ เช่น PR00001",
      references: {
        model: 'tbpublicrelations',
        key: 'pubrel_id'
      }
    },
    pubrelcontents: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "เนื้อหาสาระของข่าวประชาสัมพันธ์"
    },
    pubrelcont_createddate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "วันที่บันทึกเนื้อหาสาระของข่าวประชาสัมพันธ์"
    },
    pubrelcont_creator: {
      type: DataTypes.STRING(13),
      allowNull: false,
      comment: "ผู้บันทึกเนื้อหาสาระของข่าวประชาสัมพันธ์",
      references: {
        model: 'tbmember',
        key: 'pers_id'
      }
    }
  }, {
    sequelize,
    tableName: 'tbpublicerelationscontents',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pubrelcont_id" },
        ]
      },
    ]
  });

  tbpublicerelationscontents.associate = (models) => {
    tbpublicerelationscontents.belongsTo(models.tbpublicrelations, { foreignKey: "pubrel_id"});
    models.tbpublicrelations.hasMany(tbpublicerelationscontents, { foreignKey: "pubrel_id"});
    tbpublicerelationscontents.belongsTo(models.tbmember, { foreignKey: "pubrelcont_creator"});
    models.tbmember.hasMany(tbpublicerelationscontents, { foreignKey: "pubrelcont_creator"});
  }
  return tbpublicerelationscontents;
};
