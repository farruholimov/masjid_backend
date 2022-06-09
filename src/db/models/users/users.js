module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        full_name: {
          type: DataTypes.STRING(64),
        },
        phone_number: {
          type: DataTypes.STRING(13),
        },
        role: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1
        },
        telegram_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        step: {
          type: DataTypes.STRING(32),
          allowNull: false,
          defaultValue: "idle"
        },
      }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      });

    return users;
}