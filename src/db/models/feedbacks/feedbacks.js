module.exports = (sequelize, DataTypes) => {
    const feedbacks = sequelize.define("feedbacks", {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        user_id: {
        type: DataTypes.UUID,
        allowNull: false,
         refernces: {
            model: 'users',
            key: 'id'
         }
        },
        text: {
        type: DataTypes.STRING,
        allowNull: false
        }
    }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      });
    return feedbacks;
}