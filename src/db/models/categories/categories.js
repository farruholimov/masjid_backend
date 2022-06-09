module.exports = async (sequelize, DataTypes) => {
    const categories = sequelize.define("categories", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(164),
            allowNull: false
        },
        text: {
            type: DataTypes.STRING(214),
        }
    }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      })

      return categories
}