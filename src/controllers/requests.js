const sequelize = require("../db/db")
const { mosques, mosque_admins, users, categories, ads, user_categories, requests } = sequelize.models

class ReqsController{
    static async Create(req, res, next) {
        try {
            const { body } = req

            const newReq = await requests.create({
                ...body
            })

            res.status(200).json({
                ok: true,
                data: {
                    ad: newReq
                }
            })
        } catch (error) {
            next(error)
        }
    }
    static async Update(req, res, next) {
        try {
            const { body, params } = req

            const updated = await requests.update({
                ...body
            }, {
                where:{
                    id: params.id
                }
            })

            if (!updated[0]) {
                res.status(400).json({
                    ok: false,
                    message: "Failed to update"
                })
                return
            }

            res.status(200).json({
                ok: true,
                message: "Request updated"
            })
        } catch (error) {
            next(error)
        }
    }
    static async Delete(req, res, next) {
        try {
            const { params } = req

            await requests.destroy({
                where:{
                    id: params.id
                }
            })

            res.status(200).json({
                ok: true,
                message: "Request deleted"
            })
        } catch (error) {
            next(error)
        }
    }

    static async GetAll(req, res, next) {
        try {
            const { query } = req

            const user = query.user
            const ad = query.ad

            let filter = {}
            if (user) {
                filter.user_id = user
            }
            if (ad) {
                filter.ad_id = ad
            }

            const allReqs = await requests.findAndCountAll({
                where: filter,
                include: [{
                    model: ads,
                    include: [{
                        model: mosques,
                        attributes: ["id", "name"]
                    }]
                },
                {
                    model: users,
                    attributes: ["id", "full_name"]
                }
            ]
            })

            res.status(200).json({
                ok: true,
                data: {
                    ads: allReqs.rows,
                    count: allReqs.count
                }
            })
        } catch (error) {
            next(error)
        }
    }
    static async GetOne(req, res, next) {
        try {
            const { params } = req

            const request = await requests.findOne({
                where: {
                    id: params.id
                },
                include: [
                    {
                        model: ads
                    },
                    {
                        model: users,
                        attributes: ["id", "full_name"]
                    }
                ]
            })

            if (!request) {
                res.status(400).json({
                    ok: fasle,
                    message: "Not found"
                })
                return
            }

            res.status(200).json({
                ok: true,
                data: {
                    request
                }
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = ReqsController