const sequelize = require("../db/db")
const { mosques, mosque_admins, users, categories, ads } = sequelize.models

class MosquesController{
    static async Create(req, res, next) {
        try {
            const { body } = req

            const newMosque = await mosques.create({
                ...body
            })

            res.status(200).json({
                ok: true,
                data: {
                    mosque: newMosque
                }
            })
        } catch (error) {
            next(error)
        }
    }
    static async Update(req, res, next) {
        try {
            const { body, params } = req

            const updated = await mosques.update({
                ...body
            }, {
                where:{
                    id: params.id
                }
            })

            if (!updated[0]) {
                res.status(400).json({
                    ok: true,
                    message: "Failed to update"
                })
                return
            }

            res.status(200).json({
                ok: true,
                message: "Mosque updated"
            })
        } catch (error) {
            next(error)
        }
    }
    static async Delete(req, res, next) {
        try {
            const { params } = req

            await mosques.destroy({
                where:{
                    id: params.id
                }
            })

            res.status(200).json({
                ok: true,
                message: "Mosque deleted"
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

            const allMosques = await mosques.findAndCountAll({
                limit: limit,
                offset: offset
            })

            res.status(200).json({
                ok: true,
                data: {
                    mosques: allMosques.rows,
                    count: allMosques.count
                }
            })
        } catch (error) {
            next(error)
        }
    }
    static async GetOne(req, res, next) {
        try {
            const { params } = req

            const mosque = await mosques.findOne({
                where: {
                    id: params.id
                },
                include: [
                    {
                        model: mosque_admins,
                        attributes: ["user_id", "id"],
                        include: [{
                            model: users
                        }]
                    },{
                        model: ads
                    },{
                        model: categories
                    }
                ]
            })

            if (!mosque) {
                throw new res.error(400, "Mosque not found!")
            }

            res.status(200).json({
                ok: true,
                data: {
                    mosque
                }
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = MosquesController