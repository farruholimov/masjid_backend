const sequelize = require('../db/db');
const {users, feedbacks} = sequelize.models;

class Feedbacks {
    static async Create(req, res, next) {
        try {
            const feedback = await feedbacks.create({
                user_id: req.body.user_id,
                text: req.body.text
            })
            res.status(200).json({
                ok: true,
                message: "Feedback created",
            })
        } catch (error) {
             next(error)
        }
    }
    static async Update(req, res, next) {
        try {
            const {body, params} = req
            const feedback = await feedbacks.update({
                ...body
            }, {
                where: {
                    id: params.id
                }
            })
            if(!feedback[0]){
                res.status(400).json({
                    ok: false,
                    message: "Failed to update"
                })
            }
            res.status(200).json({
                ok: true,
                message: "Feedback updated",
            })
        } catch (error) {
             next(error)
        }
    }
    static async Delete(req, res, next) {
        try {
            const feedback = await feedbacks.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({
                ok: true,
                message: "Feedback deleted",
            })
        } catch (error) {
             next(error)
        }
    }
    static async GetOne(req, res, next) {
        try {
            const feedback = await feedbacks.findOne({
                where: {
                    id: req.params.id
                },
                attributes: ["id", "user_id", "text", "created_at"],
                include: [{
                    model: users,
                    attributes: ["id", "telegram_id", "full_name", "phone_number", "role"]
                }],
                raw: true
            })
            res.status(200).json({
                ok: true,
                feedback
            })
        } catch (error) {
             next(error)
        }
    }
    static async GetAll(req, res, next) {
        try {
            const {
                query
            } = req

            const limit = query.limit || 20
            const page = query.page - 1 || 0
            const offset = page * Number(limit)
            const category = query.category_id

            let filter = {}

            if (query && Object.keys(query).length) {
                for (let key in query) {
                    if (key != 'limit' && key != 'page') {
                        filter[`${key}`] = query[key]
                    }
                }
            }
            
            const allFeedbacks = await feedbacks.findAndCountAll({
                limit,
                offset,
                where: filter,
                attributes: ["id", "user_id", "text", "created_at"],
                include: [{
                    model: users,
                    attributes: ["id", "telegram_id", "full_name", "phone_number", "role"]
                }]
            })

            const pagesCount = Math.ceil(allFeedbacks.count / limit)
            const nextPage = pagesCount < page + 1 ? null : page + 1

            res.status(200).json({
                ok: true,
                feedbacks: allFeedbacks.rows,
                count: allFeedbacks.count,
                pagination: {
                    pages: pagesCount, current: page, next: nextPage, limit: limit
                }
            })
        } catch (error) {
             next(error)
        }
    }
}

module.exports = Feedbacks;