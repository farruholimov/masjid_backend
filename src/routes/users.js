const { GetAll, Login, GenerateToken, GetOne, Profile, GetAllMosqueAdmins, GetAllSuperAdmins, Create, GetOneTg, Update } = require("../controllers/users")
const protect = require("../middlewares/auth/protect")

const UsersRouter = require("express").Router()

UsersRouter.post("/login", Login, GenerateToken)
UsersRouter.get("/", protect, GetAll)
UsersRouter.post("/", Create)
UsersRouter.put("/:id", Update)
UsersRouter.get("/mosque-admins/", protect, GetAllMosqueAdmins)
UsersRouter.get("/admins", protect, GetAllSuperAdmins)
UsersRouter.get("/profile", protect, Profile)
UsersRouter.get("/:id", GetOne)
UsersRouter.get("/tg/:id", GetOneTg)

module.exports = UsersRouter