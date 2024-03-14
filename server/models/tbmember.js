const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbmember', {
    pers_id: {
      type: DataTypes.STRING(13),
      allowNull: false,
      primaryKey: true,
      comment: "เลขประจำตัวประชาชน"
    },
    official_id: {
      type: DataTypes.STRING(12),
      allowNull: false,
      comment: "เลขประจำตัวข้าราชการ"
    }
  }, {
    sequelize,
    tableName: 'tbmember',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pers_id" },
        ]
      },
    ]
  });
};
