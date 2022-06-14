const { GetAll, Login, GenerateToken, GetOne, Profile, Create, GetOneTg, Update, CreateMosqueAdmin, GetMosqueAdmin, UpdateMosqueAdmin } = require("../controllers/users")
const protect = require("../middlewares/auth/protect")

const UsersRouter = require("express").Router()

UsersRouter.post("/login", Login, GenerateToken)
UsersRouter.get("/", protect, GetAll)
UsersRouter.post("/", Create)
UsersRouter.put("/:id", Update)
UsersRouter.get("/profile", protect, Profile)
UsersRouter.get("/:id", protect, GetOne)
UsersRouter.get("/tg/:id", GetOneTg)
UsersRouter.post("/mosque-admin", CreateMosqueAdmin)
UsersRouter.put("/mosque-admin/:id", protect, UpdateMosqueAdmin)
UsersRouter.get("/mosque-admin/:id", GetMosqueAdmin)

module.exports = UsersRouter