const { GetAll, GetOne, Create, Update, Delete} = require("../controllers/categories")
const protect = require("../middlewares/auth/protect")

const CategoriesRouter = require("express").Router()

CategoriesRouter.get("/", GetAll)
CategoriesRouter.get("/:id", protect, GetOne)
CategoriesRouter.post("/", protect, Create)
CategoriesRouter.put("/:id", protect, Update)
CategoriesRouter.delete("/:id", protect, Delete)

module.exports = CategoriesRouter