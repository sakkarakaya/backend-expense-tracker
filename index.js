const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const helmet = require("helmet")
const morgan = require("morgan")

const app = express()
dotenv.config()
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to MongoDB")
})

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))


const port = 5000

app.get('/', (req, res) => {
    console.log("hi")
    res.send("hhh")
})



app.listen(port, () => {
    console.log(`listening http://localhost:${port}`)
})