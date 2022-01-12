const express = require("express")
const dotenv = require("dotenv")

const app = express()
dotenv.config()


const port = 5000

app.get('/', (req, res) => {
    console.log("hi")
    res.send("hhh")
})



app.listen(port, () => {
    console.log(`listening http://localhost:${port}`)
})