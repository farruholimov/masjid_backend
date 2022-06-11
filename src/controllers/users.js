const { sign } = require("jsonwebtoken")
const { Op } = require("sequelize")
const configs = require("../config")
const sequelize = require("../db/db")
const { compareCrypt } = require("../modules/bcrypt")
const { users, admin_users, mosque_admins, mosques } = sequelize.models

class UsersController{

    static async Login(req, res, next) {
        try {
            const { body } = req

            const user = await admin_users.findOne({
                where: {
                    username: body.username
                },
                include: [
                    {
                        model: users
                    }
                ],
                raw: true
            })

            if (!user) {
                res.status(400).json({
                    ok: false,
                    message: "Incorrect username or password!"
                })
                return
            }
            if (user["users.role"] != 1) {
                res.status(400).json({
                    ok: false,
                    message: "Access denied!"
                })
                return
            }
            if (!compareCrypt(body.password, user.password)) {
                res.status(400).json({
                    ok: false,
                    message: "Incorrect username or password!"
                })
                return
            }

            req.user = {
                tgid: Number(user.telegram_id),
                id: Number(user.id),
                role: Number(user.role),
            }

            next()
        } catch (error) {
            next(error)
        }
    }

    static async GenerateToken(req, res, next) {
        const {
            user,
        } = req;

        const token = sign({
            tgid: Number(user.telegram_id),
            id: Number(user.id),
            role: Number(user.role), 
        }, configs.JWT_KEY)

        res.status(200).json({
            ok: true,
            message: "Logged in succesfully!",
            data: {
                token: token, 
            },
        });

    };

    static async Create(req, res, next){
        try {
            const {body} = req

            const newUser = await users.create({
                ...body
            })

            res.status(200).json({
                ok: true,
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async Update(req, res, next) {
        try {
            const {body, params} = req

            const updated = await users.update({
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
                message: "User updated"
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async GetAllMosqueAdmins(req, res, next) {
        try {
            const { query } = req

            const limit = query.limit || 20
            const page = query.page - 1 || 0
            const offset = page * limit

            const allUsers = await users.findAndCountAll({
                limit: limit,
                offset: offset,
                where: {
                    role: 2
                },
                include: [
                    {
                        model: mosque_admins,
                        attributes: ["username"],
                        include: [{
                            model: mosques
                        }]
                    }
                ]
            })

            res.status(200).json({
                ok: true,
                data: {
                    users: allUsers.rows,
                    count: allUsers.count
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async GetAllSuperAdmins(req, res, next) {
        try {
            const { query } = req

            const limit = query.limit || 20
            const page = query.page - 1 || 0
            const offset = page * limit

            const allUsers = await users.findAndCountAll({
                limit: limit,
                offset: offset,
                where: {
                    role: 1
                }
            })

            res.status(200).json({
                ok: true,
                data: {
                    users: allUsers.rows,
                    count: allUsers.count
                }
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

            const allUsers = await users.findAndCountAll({
                limit: limit,
                offset: offset,
                where: {
                    role: {[Op.ne]: 2}
                }
            })

            res.status(200).json({
                ok: true,
                data: {
                    users: allUsers.rows,
                    count: allUsers.count
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async GetOne(req, res, next) {
        try {
            const { params } = req
            console.log(params);

            const user = await users.findOne({
                where: {
                    id: params.id
                }
            })

            if (!user) {
                if (!user) {
                    res.status(400).json({
                        ok: fasle,
                        message: "Not found"
                    })
                    return
                }
            }

            res.status(200).json({
                ok: true,
                data: {
                    user
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async GetOneTg(req, res, next) {
        try {
            const { params } = req

            const user = await users.findOne({
                where: {
                    telegram_id: params.id
                }
            })

            if (!user) {
                res.status(400).json({
                    ok: fasle,
                    message: "Not found"
                })
                return
            }

            res.status(200).json({
                ok: true,
                data: {
                    user
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async Profile(req, res, next) {
        try {

            const user = await users.findOne({
                where: {
                    id: req.user.id
                }
            })

            if (!user) {
                res.status(200).json({
                    ok: false,
                    message: "User not found!"
                })
                throw new res.error(400, "User not found!")
            }

            res.status(200).json({
                ok: true,
                data: {
                    user
                }
            })
        } catch (error) {
            next(error)
        }
    }
} 

module.exports = UsersController