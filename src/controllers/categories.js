const { Sequelize } = require("sequelize")
const sequelize = require("../db/db")
const { mosques, mosque_admins, users, categories, ads, user_categories } = sequelize.models

class CategoriesController{
    static async Create(req, res, next) {
        try {
            const { body } = req

            const newCategory = await categories.create({
                ...body
            })

            res.status(200).json({
                ok: true,
                data: {
                    category: newCategory
                }
            })
        } catch (error) {
            next(error)
        }
    }
    static async Update(req, res, next) {
        try {
            const { body, params } = req

            const updated = await categories.update({
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
                message: "Category updated"
            })
        } catch (error) {
            next(error)
        }
    }
    static async Delete(req, res, next) {
        try {
            const { params } = req

            await categories.destroy({
                where:{
                    id: params.id
                }
            })

            res.status(200).json({
                ok: true,
                message: "Category deleted"
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

            const allCategories = await categories.findAndCountAll({
                limit: limit,
                offset: offset,
                attributes: {
                    include: [
                        [Sequelize.fn('COUNT', Sequelize.col('ads.id')), 'ads']
                        [Sequelize.fn('COUNT', Sequelize.col('users.id')), 'users']
                    ]
                }, 
                include: [
                    {
                        model: ads,
                        required: false,
                        attributes: []
                    },
                    {
                        model: user_categories,
                        required: false,
                        attributes: []
                    }
                ],
                group: ["categories.id"]
            })

            res.status(200).json({
                ok: true,
                data: {
                    categories: allCategories.rows,
                    count: allCategories.count
                }
            })
        } catch (error) {
            next(error)
        }
    }
    static async GetOne(req, res, next) {
        try {
            const { params } = req

            const category = await categories.findOne({
                where: {
                    id: params.id
                },
                attributes: {
                    include: [
                        [Sequelize.fn('COUNT', Sequelize.col('ads.id')), 'ads']
                        [Sequelize.fn('COUNT', Sequelize.col('users.id')), 'users']
                    ]
                }, 
                include: [
                    {
                        model: ads,
                        required: false,
                        attributes: []
                    },
                    {
                        model: user_categories,
                        required: false,
                        attributes: []
                    }
                ],
                group: ["categories.id"]
            })

            if (!category) {
                throw new res.error(400, "Category not found!")
            }

            res.status(200).json({
                ok: true,
                data: {
                    category
                }
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = CategoriesController