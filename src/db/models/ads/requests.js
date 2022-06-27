module.exports = async (sequelize, DataTypes) => {
    const requests = sequelize.define("requests", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ad_id: {
            type: DataTypes.INTEGER,
            references: {
              model: "ads",
              key: "id"
            }
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
              model: "users",
              key: "id"
            }
        },
        text: {
            type: DataTypes.TEXT(),
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        exact: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },

    }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      })

    return requests
}