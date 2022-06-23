const { Sequelize } = require("sequelize")
const sequelize = require("../db/db")
const { mosques, mosque_admins, users, categories, ads, user_categories, requests } = sequelize.models

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
            const user = query.user

            let filter = {}, group = ["ads.id", "requests.id", "category.id", "mosque.id"]

            
			 if(query && Object.keys(query).length){  
				for (let key in query){
					if(key != "user" && key != 'limit'&& key != 'page'){
						filter[`${key}`] = query[key]
					}
				}
			};

            let _include = [
                {
                    model: categories,
                    attributes: ["name", "id"]
                },
                {
                    model: mosques,
                    attributes: ["name", "id"]
                },
                {
                    model: requests,
                    attributes: ["status", "amount"],
                    required: false,
                    where: {
                        status: 2
                    }
                }
            ]
            
            if (user) {
                _include[0].required = true,
                _include[0].include = [{
                    model: user_categories,
                    attributes: ["user_id"],
                    required: true,
                    where: {user_id: user},
                }],
                group.push("category->user_categories.id")
            }

            const allAds = await ads.findAndCountAll({
                limit: limit,
                offset: offset,
                where: filter,
                attributes: {
                    include: [
                        [Sequelize.fn("SUM", Sequelize.col('requests.amount')), "totalHelp"]
                    ]
                },
                include: _include,
                group,
                subQuery: false
            })

            const pagesCount = Math.ceil(allAds.count.length / limit)
            const nextPage = pagesCount < page + 1 ? null : page + 1

            res.status(200).json({
                ok: true,
                data: {
                    ads: allAds.rows,
                    count: allAds.count.length,
                    pagination: {
                        pages: pagesCount,
                        current: page, 
                        next: nextPage,
                        limit: limit
                    }
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
                attributes: {
                    include: [
                        [Sequelize.fn("SUM", Sequelize.col('requests.amount')), "totalHelp"]
                    ]
                },
                include: [
                    {
                        model: mosques
                    },
                    {
                        model: categories
                    },
                    {
                        model: requests,
                        attributes: ["status", "amount"],
                        required: false,
                        where: {
                            status: 2
                        }
                    }
                ],
                group: ["ads.id", "mosque.id", "category.id", "requests.id"]
            })

            if (!ad) {
                res.status(400).json({
                    ok: false,
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