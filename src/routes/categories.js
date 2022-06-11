const { GetAll, GetOne, Create, Update, Delete, GetUserCategories, GetAllTg, GetOneTg, CreateUserCategory, DeleteUserCategory} = require("../controllers/categories")
const protect = require("../middlewares/auth/protect")

const CategoriesRouter = require("express").Router()

CategoriesRouter.get("/tg", GetAllTg)
CategoriesRouter.get("/tg/:id", GetOneTg)

CategoriesRouter.get("/", GetAll)
CategoriesRouter.get("/:id", GetOne)
CategoriesRouter.post("/", protect, Create)
CategoriesRouter.put("/:id", protect, Update)
CategoriesRouter.delete("/:id", protect, Delete)

CategoriesRouter.get("/user/:id", GetUserCategories)
CategoriesRouter.post("/user/:id", CreateUserCategory)
CategoriesRouter.delete("/user/:id/category/:c_id", DeleteUserCategory)

module.exports = CategoriesRouter