const sequelize = require("../db/db")
const { mosques, mosque_admins, users, categories, ads } = sequelize.models

class AdsController{
    static async Create(req, res, next) {
        try {
            const { body } = req

            const newAd = await ads.create({
                ...body
            })

            res.status(200).json({
                ok: true,
                data: {
                    ad: newAd
                }
            })
        } catch (error) {
            next(error)
        }
    }
    static async Update(req, res, next) {
        try {
            const { body, params } = req

            const updated = await ads.update({
                ...body
            }, {
                where:{
                    telegram_id: params.id
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
                message: "Ad updated"
            })
        } catch (error) {
            next(error)
        }
    }
    static async Delete(req, res, next) {
        try {
            const { params } = req

            await ads.destroy({
                where:{
                    id: params.id
                }
            })

            res.status(200).json({
                ok: true,
                message: "Ad deleted"
            })
        } catch (error) {
            next(error)
        }
    }

    static async GetAll(req, res, next) {
        try {
            const { query } = req

            const limit = query.limit || 20
            const page = query.page - 1 || 0
            const offset = page * limit
            const category = query.category
            const mosque = query.mosque

            let filter = {}

            if (category) {
                filter.category_id = category
            }
            if (mosque) {
                filter.mosque_id = mosque
            }

            const allAds = await ads.findAndCountAll({
                limit: limit,
                offset: offset,
                where: filter
            })

            res.status(200).json({
                ok: true,
                data: {
                    ads: allAds.rows,
                    count: allAds.count
                }
            })
        } catch (error) {
            next(error)
        }
    }
    static async GetOne(req, res, next) {
        try {
            const { params } = req

            const ad = await ads.findOne({
                where: {
                    id: params.id
                },
                include: [
                    {
                        model: mosques
                    },
                    {
                        model: categories
                    }
                ]
            })

            if (!ad) {
                res.status(400).json({
                    ok: fasle,
                    message: "Not found"
                })
                return
            }

            res.status(200).json({
                ok: true,
                data: {
                    ad
                }
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = AdsController