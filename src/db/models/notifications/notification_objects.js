module.exports = (sequelize, DataTypes) => {
    const notification_objects = sequelize.define("notification_objects", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        entity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "ads",
                key: "id"
              }
        },
        actor_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: "users",
              key: "id"
            }
        },
        entity_type: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        event: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    });

    return notification_objects;
}