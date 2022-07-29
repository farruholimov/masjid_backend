const express = require("express");
const path = require("path");
const cors = require("cors");
const { errorMiddleware } = require("./middlewares/error/errorMiddleware");
const errorHandler = require("./modules/error/errorHandler");
const router = require("./routes");
const fileupload = require("express-fileupload");
require("dotenv").config()

const app = express();

app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/files", express.static(path.join(__dirname, 'public')))

app.use(errorMiddleware)

app.use(cors({ origin: "*" }))
app.use("/api", router)
app.use(errorHandler)

module.exports = app
