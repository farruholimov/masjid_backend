const { sign } = require("jsonwebtoken")
const { Op, where } = require("sequelize")
const configs = require("../config")
const sequelize = require("../db/db")
const { compareCrypt, createCrypt } = require("../modules/bcrypt")
const { users, admin_users, mosque_admins, mosques } = sequelize.models

const { default: fetch } = require("node-fetch")

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
            if (user["user.role"] != 1) {
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

            console.log(user);

            req.user = {
                tgid: user["user.telegram_id"],
                id: user.id,
                user_id: user["user.id"],
                role: Number(user["user.role"]),
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
                tgid: user["user.telegram_id"],
                id: user.id,
                user_id: user["user.id"],
                role: Number(user["user.role"]),
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

    static async CreateMosqueAdmin(req, res, next){
        try {
            const {body} = req

            const newUser = await mosque_admins.create({
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

    static async UpdateMosqueAdmin(req, res, next) {
        try {
            const {body, params} = req

            const user = await users.findOne({
                where: {
                    id: params.id
                },
                attributes: ["telegram_id"],
                raw: true
            })

            if (!user) {
                res.status(400).json({
                    ok: false,
                    message: "Not found"
                })
                return
            }

            if (body.username != undefined) {
                const mad = await mosque_admins.findOne({
                    where: {
                        username: body.username
                    }
                })

                if (mad) {
                    res.status(400).json({
                        ok: false,
                        message: "This username is busy!"
                    })
                    return
                }
            }

            const updated = await mosque_admins.update({
                ...body
            }, {
                where:{
                    user_id: params.id
                }
            })

            if (body.verified != undefined) {
                await users.update({
                    adstep: "menu"
                }, {
                    where:{
                        id: params.id
                    }
                })
                let validtext = "Siz administratorlar tasdiqidan o'tdingiz. Iltimos /start buyrug'ini qayta jo'nating."
                let invalidtext = "Siz tasdiqlanmadingiz! Savollar bilan @admin ga murojaat qilishingiz mumkin."
                let keyboard = JSON.stringify(
                    {inline_keyboard: [
                        [ { text: 'Masjidlar', web_app: { url: 'https://mosque-bot.vercel.app/' } } ],
                        [
                          { text: "E'lonlar", callback_data: 'all_ads' },
                          { text: 'Sozlamalar', callback_data: 'settings' }
                        ]
                    ]}
                )
                await fetch(`https://api.telegram.org/bot${configs.BOT_CLIENT_TOKEN}/sendMessage?chat_id=${user.telegram_id}&text=${body.verified ? validtext : invalidtext}&parse_mode=html`)
            }

            if (!updated[0]) {
                res.status(400).json({
                    ok: false,
                    message: "Failed to update"
                })
                return
            }

            res.status(200).json({
                ok: true,
                message: "Admin updated"
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async GetAll(req, res, next) {
        try {
            const { query } = req

            const limit = query.limit || 20
            const page = query.page - 1 || 0
            const offset = page * limit
            const role = query.role

            const filter = {}
            let _include = []
            
            if (role) {
                filter.role = Number(role)
                
                if (role == 2) {
                    _include.push({
                        model: mosque_admins,
                        attributes: ["username"],
                        include: [{
                            model: mosques
                        }]
                    })
                }
            }
            
            const allUsers = await users.findAndCountAll({
                limit: limit,
                offset: offset,
                where: filter,
                include: _include
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

    static async GetMosqueAdmin(req, res, next) {
        try {
            const { query, params } = req

            let filter = {
                id: params.id
            }

            if (query.bymosque == true) {
                filter = {
                    mosque_id: params.id
                }
            }

            if (query.byusername == true) {
                filter = {
                    username: params.id
                }
            }

            const user = await mosque_admins.findOne({
                where: filter
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

    static async GetOneTg(req, res, next) {
        try {
            const { params } = req

            const user = await users.findOne({
                where: {
                    telegram_id: params.id
                },
                include: [{
                    model: mosque_admins
                }]
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