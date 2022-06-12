const { GetAll, Login, GenerateToken, GetOne, Profile, Create, GetOneTg, Update, CreateMosqueAdmin, GetMosqueAdmin } = require("../controllers/users")
const protect = require("../middlewares/auth/protect")

const UsersRouter = require("express").Router()

UsersRouter.post("/login", Login, GenerateToken)
UsersRouter.get("/", protect, GetAll)
UsersRouter.post("/", Create)
UsersRouter.post("/mosque-admin", protect, CreateMosqueAdmin)
UsersRouter.put("/:id", Update)
UsersRouter.get("/profile", protect, Profile)
UsersRouter.get("/:id", protect, GetOne)
UsersRouter.get("/tg/:id", GetOneTg)
UsersRouter.get("/mosque-admin/:username", protect, GetMosqueAdmin)

module.exports = UsersRouter