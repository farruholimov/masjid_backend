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
            allowNull: false
        },
        location: {
            type: DataTypes.STRING(),
        },
        longitude: {
            type: DataTypes.STRING(),
        },
        latitude: {
            type: DataTypes.STRING(),
        },
        image_src: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        password: {
          type: DataTypes.STRING(64),
          allowNull: false
        },
        username: {
          type: DataTypes.STRING(64),
          unique: true
        }

    }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      })

    return mosques
}