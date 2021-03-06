const sequelize = require("../db/db")
const { CreateNotification } = require("./notifications")
const { mosques, mosque_admins, users, categories, ads, user_categories, requests } = sequelize.models

class ReqsController{
    static async Create(req, res, next) {
        try {
            const { body } = req

            const ad = await ads.findOne({
                where: {
                    id: body.ad_id
                },
                attributes: ["id", "mosque_id"],
                include: [{
                    model: mosques,
                    attributes: ["id"],
                    include: [{
                        model: mosque_admins,
                        attributes: ["user_id"],
                    }]
                }],
                raw: true
            })

            console.log("AD", ad);

            const newReq = await requests.create({
                ...body
            })

            await CreateNotification(1, newReq.id, 1, newReq.user_id, Array.isArray(ad["mosque.mosque_admins"]) ? ad["mosque.mosque_admins"][0].user_id : ad["mosque.mosque_admins.user_id"])

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

            const user = query.user_id
            const ad = query.ad_id
            const exact = query.exact

            let filter = {}

            if(query && Object.keys(query).length){  
				for (let key in query){
					if(key != 'limit' && key != 'page'){
						filter[`${key}`] = query[key]
					}
				}
			};

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
                    requests: allReqs.rows,
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
                    ok: false,
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