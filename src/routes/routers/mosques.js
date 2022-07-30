const { GetAll, GetOne, Create, Update, Delete, GetAllTg} = require("../../controllers/mosques")
const protect = require("../../middlewares/auth/protect")

const MosquesRouter = require("express").Router()

MosquesRouter.get("/", protect, GetAll)
MosquesRouter.get("/tg", protect, GetAllTg)
MosquesRouter.get("/:finder", protect, GetOne)
MosquesRouter.post("/", protect, Create)
MosquesRouter.put("/:id", protect, Update)
MosquesRouter.delete("/:id", protect, Delete)

module.exports = MosquesRouter