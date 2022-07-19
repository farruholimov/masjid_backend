const { GetAll, GetOne, Create, Update, Delete} = require("../../controllers/requests")
const protect = require("../../middlewares/auth/protect")

const ReqsRouter = require("express").Router()

ReqsRouter.get("/", GetAll)
ReqsRouter.get("/:id", GetOne)
ReqsRouter.post("/", Create)
ReqsRouter.put("/:id", Update)
ReqsRouter.delete("/:id", Delete)

module.exports = ReqsRouter