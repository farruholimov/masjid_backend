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
        }

    }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      })

    return mosques
}