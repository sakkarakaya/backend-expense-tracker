const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const helmet = require("helmet")
const morgan = require("morgan")

const userRoute = require("./routers/users.js")
const authRoute = require("./routers/auth.js")
const categoryRoute = require("./routers/category.js")
const recordRoute = require("./routers/record.js")

const app = express()
dotenv.config()
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to MongoDB")
})

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/categories", categoryRoute)
app.use("/api/records", recordRoute)

app.get('/', (req, res) => {
    console.log("hi")
    res.send("Home")
})

const port = 5000
app.listen(port, () => {
    console.log(`listening http://localhost:${port}`)
})