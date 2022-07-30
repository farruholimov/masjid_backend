const { GetAll, GetOne, Create, Update, Delete} = require("../../controllers/requests")
const protect = require("../../middlewares/auth/protect")

const ReqsRouter = require("express").Router()

ReqsRouter.get("/", protect, GetAll)
ReqsRouter.get("/:id", protect, GetOne)
ReqsRouter.post("/", protect, Create)
ReqsRouter.put("/:id", protect, Update)
ReqsRouter.delete("/:id", protect, Delete)

module.exports = ReqsRouter