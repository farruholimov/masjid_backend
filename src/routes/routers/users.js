const { GetAll, Login, GenerateToken, GetOne, Profile, Create, GetOneTg, Update, CreateMosqueAdmin, GetMosqueAdmin, UpdateMosqueAdmin, LoginMA, Delete } = require("../../controllers/users")
const protect = require("../../middlewares/auth/protect")

const UsersRouter = require("express").Router()

UsersRouter.get("/", protect, GetAll)
UsersRouter.get("/:id", protect, GetOne)
UsersRouter.get("/profile", protect, Profile)
UsersRouter.get("/tg/:id", GetOneTg)
UsersRouter.get("/mosque-admin/:id", GetMosqueAdmin)
UsersRouter.post("/login", Login, GenerateToken)
UsersRouter.post("/tg/login", LoginMA)
UsersRouter.post("/", Create)
UsersRouter.post("/mosque-admin", CreateMosqueAdmin)
UsersRouter.put("/:id", Update)
UsersRouter.put("/mosque-admin/:mosque_id", protect, UpdateMosqueAdmin)
UsersRouter.delete("/:id", Delete)

module.exports = UsersRouter