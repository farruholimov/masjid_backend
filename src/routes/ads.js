const { GetAll, GetOne, Create, Update, Delete, GetAmountRange} = require("../controllers/ads")
const protect = require("../middlewares/auth/protect")

const AdsRouter = require("express").Router()

AdsRouter.get("/", GetAll)
AdsRouter.get("/:id", GetOne)
AdsRouter.get("/range", GetAmountRange)
AdsRouter.post("/", Create)
AdsRouter.put("/:id", Update)
AdsRouter.delete("/:id", Delete)

module.exports = AdsRouter