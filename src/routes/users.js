const { GetAll, Login, GenerateToken, GetOne, Profile, GetAllMosqueAdmins, GetAllSuperAdmins } = require("../controllers/users")
const protect = require("../middlewares/auth/protect")

const UsersRouter = require("express").Router()

UsersRouter.post("/login", Login, GenerateToken)
UsersRouter.get("/", protect, GetAll)
UsersRouter.get("/mosque-admins/", protect, GetAllMosqueAdmins)
UsersRouter.get("/admins", protect, GetAllSuperAdmins)
UsersRouter.get("/profile", protect, Profile)
UsersRouter.get("/:id", protect, GetOne)

module.exports = UsersRouter