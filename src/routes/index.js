const protect = require("../middlewares/auth/protect")
const AdsRouter = require("./ads")
const CategoriesRouter = require("./categories")
const MosquesRouter = require("./mosques")
const ReqsRouter = require("./requests")
const UsersRouter = require("./users")

const Router = require("express").Router()

Router.use("/users", UsersRouter)
Router.use("/mosques", MosquesRouter)
Router.use("/categories", CategoriesRouter)
Router.use("/ads", AdsRouter)
Router.use("/reqs", ReqsRouter)


module.exports = Router