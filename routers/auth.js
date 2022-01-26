const router = require("express").Router()
const User = require("../models/User.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(404).json("username not found")
        const password = await bcrypt.compare(req.body.password, user.password)
        !password && res.status(400).json("wrong password")

        const token = await jwt.sign({
            ...user.toJSON()
        }, "secretKey")
        const response = {
            ...user.toJSON(), token
        }
        res.status(200).json(response)


    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router