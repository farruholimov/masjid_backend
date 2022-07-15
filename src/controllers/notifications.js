const sequelize = require("../db/db");
const { notifications, notification_objects, ads } = sequelize.models;

class Notifications {
    static async CreateNotification(entity_type, entity_id, event, actor_id, notifier_id) {
        try {
            const notification = await notification_objects.create({
                entity_id: entity_id,
                entity_type: entity_type,
                event: event,
                actor_id: actor_id,
            });
            await notifications.create({
                notification_object_id: notification.id,
                notifier_id: notifier_id,
            })
        } catch (error) {
            console.log("notification error: ", error);
        }
    }

    static async GetAll(req, res, next){
        try {
            const { params, query } = req
            const { count } = query
            const { user_id } = params
            const n = await notifications.findAndCountAll({
                where: {
                    notifier_id: user_id
                },
                include: [{
                    model: notification_objects,
                    include: [{
                        model: ads,
                    }]
                }]
            })
            if (count == true) {
                res.status(200).json({
                    ok: true,
                    data: {
                        count: n.count
                    }
                })
                return
            }
            res.status(200).json({
                ok: true,
                data: {
                    notifications: n.rows,
                    count: n.count
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async Watch(req, res, next){
        try {
            const {params} = req
            const n = await notifications.update(
                {
                    is_viewed: true
                },{
                where: {
                    id: params.id
                }
            })

            if(!n[0]){
                res.status(400).json({
                    ok: false,
                    message: "Failed to update"
                })
                return
            }

            res.status(200).json({
                success: true,
                message: "Notification updated"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Notifications