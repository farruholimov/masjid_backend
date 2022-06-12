module.exports = (sequelize, DataTypes) => {
    const mosque_admins = sequelize.define('mosque_admins', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: "users",
              key: "id"
            }
        },
        mosque_id: {
            type: DataTypes.INTEGER,
            references: {
              model: "mosques",
              key: "id"
            }
        },
        password: {
          type: DataTypes.STRING(64),
          allowNull: false
        },
        username: {
          type: DataTypes.STRING(64),
          allowNull: false,
          unique: true
        }
      }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      });

    return mosque_admins;
}