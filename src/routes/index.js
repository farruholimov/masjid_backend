const protect = require("../middlewares/auth/protect")
const AdsRouter = require("./routers/ads")
const CategoriesRouter = require("./routers/categories")
const MosquesRouter = require("./routers/mosques")
const NotificationsRouter = require("./routers/notifications")
const ReqsRouter = require("./routers/requests")
const UsersRouter = require("./routers/users")
const FeedbacksRouter = require("./routers/feedbacks")

const Router = require("express").Router()

Router.use("/users", UsersRouter)
Router.use("/mosques", MosquesRouter)
Router.use("/categories", CategoriesRouter)
Router.use("/ads", AdsRouter)
Router.use("/reqs", ReqsRouter)
Router.use("/notifications", NotificationsRouter)
Router.use("/feedbacks", FeedbacksRouter)


module.exports = Router