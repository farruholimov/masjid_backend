const { GetAll, GetOne, Create, Update, Delete, GetAmountRange, Search} = require("../../controllers/ads")
const protect = require("../../middlewares/auth/protect")
const validate = require("../../middlewares/validations/validate")
const create_ad = require("../../middlewares/validations/schemas/ads/create_ad")
const param_schema = require("../../middlewares/validations/schemas/params")

const AdsRouter = require("express").Router()

AdsRouter.get("/range", GetAmountRange)
AdsRouter.get("/results", protect, Search)
AdsRouter.get("/", protect, GetAll)
AdsRouter.get("/:id", protect, GetOne)
AdsRouter.post("/", protect, validate(create_ad, "body"), Create)
AdsRouter.put("/:id", protect, Update)
AdsRouter.delete("/:id", protect, Delete)

module.exports = AdsRouter