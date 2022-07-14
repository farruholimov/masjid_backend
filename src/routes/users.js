const { GetAll, Login, GenerateToken, GetOne, Profile, Create, GetOneTg, Update, CreateMosqueAdmin, GetMosqueAdmin, UpdateMosqueAdmin, LoginMA, Delete } = require("../controllers/users")
const protect = require("../middlewares/auth/protect")

const UsersRouter = require("express").Router()

UsersRouter.post("/login", Login, GenerateToken)
UsersRouter.post("/tg/login", LoginMA)
UsersRouter.get("/", protect, GetAll)
UsersRouter.post("/", Create)
UsersRouter.put("/:id", Update)
UsersRouter.delete("/:id", Delete)
UsersRouter.get("/profile", protect, Profile)
UsersRouter.get("/:id", protect, GetOne)
UsersRouter.get("/tg/:id", GetOneTg)
UsersRouter.post("/mosque-admin", CreateMosqueAdmin)
UsersRouter.put("/mosque-admin/:mosque_id", protect, UpdateMosqueAdmin)
UsersRouter.get("/mosque-admin/:id", GetMosqueAdmin)

module.exports = UsersRouter