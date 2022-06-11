const express = require("express");
const path = require("path");
const cors = require("cors");
const { errorMiddleware } = require("./middlewares/error/errorMiddleware");
const errorHandler = require("./modules/error/errorHandler");
const router = require("./routes");
require("dotenv").config()

const app = express();
app.use("/static", express.static(path.join(__dirname, 'views')))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(errorMiddleware)

app.use(cors({ origin: "*" }))
app.use("/api", router)
app.use(errorHandler)

module.exports = app
