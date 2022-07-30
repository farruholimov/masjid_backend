const { GetAll, GetOne, Create, Update, Delete, GetUserCategories, GetAllTg, GetOneTg, CreateUserCategory, DeleteUserCategory} = require("../../controllers/categories")
const protect = require("../../middlewares/auth/protect")

const CategoriesRouter = require("express").Router()

CategoriesRouter.get("/tg", protect, GetAllTg)
CategoriesRouter.get("/tg/:id", protect, GetOneTg)

CategoriesRouter.get("/", protect, GetAll)
CategoriesRouter.get("/:id", protect, GetOne)
CategoriesRouter.post("/", protect, Create)
CategoriesRouter.put("/:id", protect, Update)
CategoriesRouter.delete("/:id", protect, Delete)

// CategoriesRouter.get("/user/:id", GetUserCategories)
// CategoriesRouter.post("/user/:id", CreateUserCategory)
// CategoriesRouter.delete("/user/:id/category/:c_id", DeleteUserCategory)

module.exports = CategoriesRouter