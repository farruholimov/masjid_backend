const express = require("express");
const path = require("path");
const cors = require("cors");
const { errorMiddleware } = require("./middlewares/error/errorMiddleware");
const errorHandler = require("./modules/error/errorHandler");
const router = require("./routes");
require("dotenv").config()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use(errorMiddleware)

app.use(cors({ origin: "*" }))
app.use("/api", router)
app.use(errorHandler)

module.exports = app
