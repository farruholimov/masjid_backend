module.exports = (sequelize) => {
    const { users, admin_users, categories, ads, user_categories, mosques, mosque_admins, requests, notifications, notification_objects } = sequelize.models

    categories.hasMany(categories, {foreignKey: "parent_id", as: "children", allowNull: true})

    categories.hasMany(user_categories, { foreignKey: "category_id" });
    user_categories.belongsTo(categories, { foreignKey: "category_id", allowNull: false });

    users.hasMany(user_categories, { foreignKey: "user_id" });
    user_categories.belongsTo(users, { foreignKey: "user_id", allowNull: false });
    
    categories.hasMany(ads, { foreignKey: "category_id" });
    ads.belongsTo(categories, { foreignKey: "category_id", allowNull: false });
    
    mosques.hasMany(ads, { foreignKey: "mosque_id" });
    ads.belongsTo(mosques, { foreignKey: "mosque_id", allowNull: false });

    users.hasMany(admin_users, { foreignKey: "user_id" });
    admin_users.belongsTo(users, { foreignKey: "user_id", allowNull: false });

    users.hasOne(mosque_admins, { foreignKey: "user_id" });
    mosque_admins.belongsTo(users, { foreignKey: "user_id", allowNull: false });

    mosques.hasOne(mosque_admins, { foreignKey: "user_id" });
    mosque_admins.belongsTo(mosques, { foreignKey: "user_id", allowNull: false });

    users.hasMany(requests, { foreignKey: "user_id" });
    requests.belongsTo(users, { foreignKey: "user_id", allowNull: false });

    ads.hasMany(requests, { foreignKey: "ad_id" });
    requests.belongsTo(ads, { foreignKey: "ad_id", allowNull: false });

    // NOTIFICATIONS

    notification_objects.hasMany(notifications, {
        foreignKey: "notification_object_id",
        allowNull: false,
    })
    notifications.belongsTo(notification_objects, {
        foreignKey: "notification_object_id",
        allowNull: false,
    })

    users.hasMany(notifications, {
        foreignKey: "notifier_id",
        allowNull: false,
    })
    notifications.belongsTo(users, {
        foreignKey: "notifier_id",
        allowNull: false,
    })

    users.hasMany(notification_objects, {
        foreignKey: "actor_id",
        allowNull: false,
    })
    notification_objects.belongsTo(users, {
        foreignKey: "actor_id",
        allowNull: false,
    })

    ads.hasMany(notification_objects, {
        foreignKey: "entity_id",
        allowNull: false,
    })
    notification_objects.belongsTo(ads, {
        foreignKey: "entity_id",
        allowNull: false,
    })
}