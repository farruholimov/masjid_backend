const { GetAll, Watch } = require("../../controllers/notifications")
const protect = require("../../middlewares/auth/protect")

const NotificationsRouter = require("express").Router()

NotificationsRouter.get("/:user_id", GetAll)
NotificationsRouter.put("/:id", Watch)

module.exports = NotificationsRouter