const { GetAll, GetOne, Create, Update, Delete} = require("../../controllers/feedbacks")
const protect = require("../../middlewares/auth/protect")

const FeedbacksRouter = require("express").Router()

FeedbacksRouter.get("/", protect, GetAll)
FeedbacksRouter.get("/:id", protect, GetOne)
FeedbacksRouter.post("/", Create)
FeedbacksRouter.put("/:id", protect, Update)
FeedbacksRouter.delete("/:id", protect, Delete)

module.exports = FeedbacksRouter