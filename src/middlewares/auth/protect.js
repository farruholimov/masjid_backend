const {
  verify
} = require("jsonwebtoken")

const config = require("../../config")
const ErrorResponse = require("../../modules/error/errorResponse");

const {
  Op
} = require("sequelize");

const {
  models: {
    users,
    admin_users
  }
} = require("../../db/db");

const protect = async (req, res, next) => {
  try {
    let authToken = ""

    const authorization = req.headers.authorization

    if (authorization && authorization.startsWith("Bearer ")) {
      authToken = authorization.split(" ")[1];

      if (!authToken) throw new res.error(401, "Please login in to get access")

      const decodedToken = verify(authToken, config.JWT_KEY);

      if (!decodedToken) {
        res.status(400).json({
          ok: false,
          message: "Unathorized!"
        })
        throw new res.error(400, "Unauthorized!")
      }

      const user = await admin_users.findOne({
        where: {
          id: decodedToken.id
        },
        include: [{
          model: users,
          attributes: ["id", "telegram_id", "full_name", "phone_number", "role"]
        }],
        attributes: ["username"],
        raw: true
      })

      if (!user || !user["user.id"]) {
        res.status(400).json({
          ok: false,
          message: "User does not exist!"
        })
        throw new res.error(401, "User does not exist")
      }

      if (user["user.role"] != 1) {
        res.status(400).json({
          ok: false,
          message: "Access denied"
        })
        throw new res.error(401, "Not a super admin")
      }

      req.user = {
        tgid: user["user.telegram_id"],
        id: user.id,
        user_id: user["user.id"],
        role: Number(user["user.role"]),
      }
      req.decodedToken = decodedToken;
    }
    else if(authorization && authorization.startsWith("Telegram ")){
          authToken = authorization.split(" ")[1];
          
          if (!authToken) {
            res.status(400).json({
              ok: false,
              message: "No ID provided!"
            })
            return
          }
          
          const user = await users.findOne({
            where: {
              telegram_id: authToken
            }
          })
          
          if (!user) {
            res.status(400).json({
              ok: false,
              message: "User does not exist!"
            })
            return
          }
    }

    next()

  } catch (error) {
    console.log("PROTECT", error);
    res.status(400).json({
      ok: false,
      message: "Unathorized!"
    })
    return
  }
}

module.exports = protect