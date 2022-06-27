const { Sequelize, DataTypes } = require('sequelize')
const connections = require('./connections')
const configs = require('../config')


const modelDefiners = [
    require('./models/users/users'),
    require('./models/users/admin_users'),
    require('./models/users/user_categories'),
    require('./models/categories/categories'),
    require('./models/mosques/mosques'),
    require('./models/mosques/mosque_admins'),
    require('./models/ads/ads'),
    require('./models/ads/requests'),
    require('./models/notifications/notification_objects'),
    require('./models/notifications/notifications'),
]

const sequelize = new Sequelize(configs.DB_CONNECTION_URL, {
    logging: false,
    define: {
        freezeTableName: true
    }
})

for (const m of modelDefiners) {
    m(sequelize, DataTypes)
}

connections(sequelize)

module.exports = sequelize;
