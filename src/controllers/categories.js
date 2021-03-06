const { Sequelize, where } = require("sequelize")
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
                    ok: false,
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

            let filter = {
                parent_id: null,
            }

            if (query.parent_id) {
                filter.parent_id = query.parent_id
            }

            const allCategories = await categories.findAndCountAll({
                limit,
                offset,
                where: filter,
                attributes: {
                    include: [
                        [Sequelize.fn('COUNT', Sequelize.col('ads.id')), 'ads_count']
                    ]
                }, 
                include: [
                    {
                        model: ads,
                        required: false,
                        attributes: []
                    },
                    {
                        model: categories,
                        as: "children",
                        attributes: ["id", "name"],
                    }
                ],
                group: ["categories.id", "children.id"],
                nest: true,
                subQuery: false
            })

            const pagesCount = Math.ceil(allCategories.count / limit)
            const nextPage = pagesCount < page + 1 ? null : page + 1

            res.status(200).json({
                ok: true,
                data: {
                    categories: allCategories.rows,
                    pagination: {
                        pages: pagesCount, current: page, next: nextPage, limit: limit
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

            const category = await categories.findOne({
                where: {
                    id: params.id
                },
                attributes: {
                    include: [
                        [Sequelize.fn('COUNT', Sequelize.col('ads.id')), 'ads_count'],
                        [Sequelize.fn('COUNT', Sequelize.col('user_categories.id')), 'users_count']
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
                    },
                    {
                        model: categories,
                        as: "children",
                        required: false
                    }
                ],
                group: ["categories.id", "children.id"]
            })

            if (!category) {
                res.status(400).json({
                    ok: false,
                    message: "Not found"
                })
                return
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

    static async GetUserCategories(req, res, next) {
        try {
            const { params } = req

            const allCategories = await user_categories.findAll({
                where: {
                    user_id: params.id
                },
                raw: true
            })

            const result = []

            for (const c of allCategories) {
                let ct = await categories.findByPk(c.category_id)
                result.push(ct)
            }

            res.status(200).json({
                ok: true,
                data: {
                    user_categories: result
                }
            })
        } catch (error) {
            next(error)
        }
    }
    static async GetAllTg(req, res, next) {
        try {
            const { query } = req

            const limit = query.limit || 10
            const page = query.page - 1 || 0
            const offset = page * limit

            let filter = {
                parent_id: null,
            }

            if (query.parent_id) {
                filter.parent_id = query.parent_id
            }

            const allCategories = await categories.findAndCountAll(
                {
                    limit,
                    offset,
                    where: filter
                }
            )

            const pagesCount = Math.ceil(allCategories.count / limit)
            const nextPage = pagesCount < page + 1 ? null : page + 1

            res.status(200).json({
                ok: true,
                data: {
                    categories: allCategories.rows,
                    pagination: {
                        pages: pagesCount, current: page, next: nextPage, limit: limit
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
    static async GetOneTg(req, res, next) {
        try {
            const { params } = req

            const category = await categories.findOne({
                where: {
                    id: params.id
                }
            })

            if (!category) {
                res.status(400).json({
                    ok: false,
                    message: "Not found"
                })
                return
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
    static async CreateUserCategory(req, res, next) {
        try {
            const { params, body } = req

            const category = await user_categories.findOrCreate({
                where: {
                    category_id: body.category_id,
                    user_id: params.id
                },
                defaults: {
                    category_id: body.category_id,
                    user_id: params.id
                }
            })

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
    static async DeleteUserCategory(req, res, next) {
        try {
            const { params } = req

            await user_categories.destroy({
                where: {
                    category_id: params.c_id,
                    user_id: params.id
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
}


module.exports = CategoriesController