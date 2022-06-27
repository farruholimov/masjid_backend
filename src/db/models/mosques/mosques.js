const sequelize = require("../../db")
const models = sequelize.models

console.log("MODELS", models);

module.exports = async (sequelize, DataTypes) => {
    const mosques = sequelize.define("mosques", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(),
            allowNull: false,
            unique: true
        },
        location: {
            type: DataTypes.STRING(),
        },
        phone: {
            type: DataTypes.STRING(),
        },
        password: {
          type: DataTypes.STRING(64)
        },
        username: {
          type: DataTypes.STRING(64),
          unique: true
        }

    }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        hooks: {
            afterCreate: async (mosque, options) => {
                await models.mosque_admins.create({
                    mosque_id: mosque.id,
                })
            }
        }
      })

    return mosques
}