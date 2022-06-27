module.exports = (sequelize, DataTypes) => {
    const notifications = sequelize.define("notifications", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },  
        notification_object_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "notification_objects",
              key: "id"
            }
        },
        notifier_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "users",
              key: "id"
            }
        },
        is_viewed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    });

    return notifications;
}