module.exports = (sequelize, DataTypes) => {
    const user_categories = sequelize.define('user_categories', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: "users",
              key: "id"
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
              model: "categories",
              key: "id"
            }
        }
      }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      });

    return user_categories;
}