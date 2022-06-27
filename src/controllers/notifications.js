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
            const { params } = req
            const { user_id } = params
            const n = await notifications.findAll({
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
            res.status(200).json({
                ok: true,
                data: {
                    notifications: n
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