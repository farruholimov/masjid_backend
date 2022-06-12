module.exports = (sequelize) => {
    const { users, admin_users, categories, ads, user_categories, mosques, mosque_admins } = sequelize.models

    categories.hasMany(user_categories, { foreignKey: "category_id" });
    user_categories.belongsTo(categories, { foreignKey: "category_id", allowNull: false });

    users.hasMany(user_categories, { foreignKey: "user_id" });
    user_categories.belongsTo(users, { foreignKey: "user_id", allowNull: false });
    
    categories.hasMany(ads, { foreignKey: "category_id" });
    ads.belongsTo(categories, { foreignKey: "category_id", allowNull: false });

    users.hasMany(admin_users, { foreignKey: "user_id" });
    admin_users.belongsTo(users, { foreignKey: "user_id", allowNull: false });

    users.hasMany(mosque_admins, { foreignKey: "user_id" });
    mosque_admins.belongsTo(users, { foreignKey: "user_id" });

    mosques.hasMany(mosque_admins, { foreignKey: "user_id" });
    mosque_admins.belongsTo(mosques, { foreignKey: "user_id" });
}