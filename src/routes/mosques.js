const { GetAll, GetOne, Create, Update, Delete} = require("../controllers/mosques")
const protect = require("../middlewares/auth/protect")

const MosquesRouter = require("express").Router()

MosquesRouter.get("/", GetAll)
MosquesRouter.get("/:id", GetOne)
MosquesRouter.post("/", protect, Create)
MosquesRouter.put("/:id", protect, Update)
MosquesRouter.delete("/:id", protect, Delete)

module.exports = MosquesRouter