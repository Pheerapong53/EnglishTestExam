const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    //return sequelize.define('tbcefrlevel', {
    const tbcefrlevel = sequelize.define('tbcefrlevel', {
        cefrlevel: {
            type: DataTypes.STRING(2),
            allowNull: false,
            primaryKey: true,
            comment: "ระดับ CEFR"
        },
        minscore: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "ค่าคะแนนต่ำสุด"
        },
        maxscore: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "ค่าคะแนนสูงสุด"
        }
    }, {
        sequelize,
        tableName: 'tbcefrlevel',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "cefrlevel" },
                ]
            },
        ]
    });

    return tbcefrlevel;
};
