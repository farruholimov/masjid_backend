module.exports = (sequelize, DataTypes) => {
    const mosque_admins = sequelize.define('mosque_admins', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4(),
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
            type: DataTypes.UUID,
            references: {
              model: "mosques",
              key: "id"
            }
        },
        password: {
          type: DataTypes.STRING(64),
        }
      }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      });

    return mosque_admins;
}