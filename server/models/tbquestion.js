const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  //return sequelize.define('tbquestion', {
  const tbquestion = sequelize.define('tbquestion', {
    questioncode: {
      type: DataTypes.STRING(12),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสโจทย์ 12 หลัก (เลขฟอร์ม+cerfcode+เลขข้อ) เข่น  F0001R1A1061"
    },
    problem: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "โจทย์ (ไฟล์พาธ)"
    },
    question: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "คำถาม เป็นไฟล์เสียง (ไฟล์พาธ) หรือ ข้อความคำถาม"
    },
    cerfcode: {
      type: DataTypes.STRING(4),
      allowNull: false,
      comment: "รหัสระดับความยากง่ายตาม cerf",
      references: {
        model: 'tbcefrdifficultylevel',
        key: 'cerfcode'
      }
    },
    formcode: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: "รหัสฟอร์มข้อสอบ Fxxxx"
    }
  }, {
    sequelize,
    tableName: 'tbquestion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "questioncode" },
        ]
      },
      {
        name: "cerfcode",
        using: "BTREE",
        fields: [
          { name: "cerfcode" },
        ]
      },
    ]
  });

  tbquestion.associate = (models) => {
    tbquestion.belongsTo(models.tbcefrdifficultylevel, { foreignKey: "cerfcode" });
    models.tbcefrdifficultylevel.hasMany(tbquestion, { foreignKey: "cerfcode" });
  }

  return tbquestion;
};
