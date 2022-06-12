module.exports = async (sequelize, DataTypes) => {
    const ads = sequelize.define("ads", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        mosque_id: {
            type: DataTypes.INTEGER,
            references: {
              model: "mosques",
              key: "id"
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
              model: "categories",
              key: "id"
            }
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT(),
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount_type: {
            type: DataTypes.STRING(36),
            allowNull: false
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

    return ads
}