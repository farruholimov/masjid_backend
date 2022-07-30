const {
  verify
} = require("jsonwebtoken")

const config = require("../../config")
const ErrorResponse = require("../../modules/error/errorResponse");

const { Op } = require("sequelize");

const {
  models: {
    users,
    mosque_admins
  }
} = require("../../db/db");

const protect = async (req, res, next) => {
  try {
    
    let tgid = req.headers.authorization
    
    if (!tgid) {
      res.status(400).json({
        ok: false,
        message: "Unauthorized!"
      })
      return
    }
    
    const user = await users.findOne({
      where: {
        telegram_id: tgid
      }
    })
    
    if (!user) {
      res.status(400).json({
        ok: false,
        message: "User does not exist!"
      })
      return
    }
    next()

  } catch (error) {
    console.log("BOT_PROTECT",error);
    res.status(400).json({
      ok: false,
      message: "Unauthorized!"
    })
    return
  }
}

module.exports = protect