const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const tbusagerecord = sequelize.define('tbusagerecord', {
        usagerecordid: {
            type: DataTypes.STRING(23),
            allowNull: false,
            primaryKey: true,
            comment: "รหัสบันทึกการใช้งาน รูปแบบ ip-year-xxxx เช่น 10.107.82.1-67-0001"
        },
        usagedate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "วันที่เข้าใช้งาน"
        },
        usremail: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "อีเมลของผู้ใช้งาน"
        },
        usrlogintime: {
            type: DataTypes.TIME,
            allowNull: true,
            comment: "เวลาที่เข้าใช้งาน"
        },
        usrlogouttime: {
            type: DataTypes.TIME,
            allowNull: true,
            comment: "เวลาที่ออกจากระบบ"
        },
        lastusagemenu: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "เมนูสุดท้ายที่ใช้งานก่อนออกจากระบบ"
        },
        ipaddr: {
            type: DataTypes.STRING(15),
            allowNull: true,
            comment: "หมายเลขไอพี",
            references: {
                model: 'tbipaddr',
                key: 'ipaddr'
            }
        }
    }, {
        sequelize,
        tableName: 'tbusagerecord',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "usagerecordid" },
                ]
            },
            {
                name: "ipaddr",
                using: "BTREE",
                fields: [
                    { name: "ipaddr" },
                ]
            },
        ]
    });

    tbusagerecord.associate = (models) => {
        tbusagerecord.belongsTo(models.tbipaddr, { foreignKey: "ipaddr" });
        models.tbipaddr.hasMany(tbusagerecord, { foreignKey: "ipaddr" });
    }

    return tbusagerecord;
};
