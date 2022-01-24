const router = require("express").Router()
const Record = require("../models/Record.js");
const Category = require("../models/Category.js");
const User = require("../models/User.js");

//READ
router.get("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId)
        const userRecords = await Record.find({ userId: currentUser._id }).populate({ path: "category", select: "name type color" })
        res.json(userRecords)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE
router.post("/", async (req, res) => {
    const newRecord = new Record(req.body)
    try {
        const savedRecord = await newRecord.save().populate({ path: "category", select: "name type color" })
        res.status(200).json(savedRecord)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const record = await Record.findById(req.params.id)
        if (record.userId === req.body.userId) {
            await record.updateOne({ $set: req.body })
            res.status(200).json("updated")
        } else {
            res.status(403).json("you cannot")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        const record = await Record.findById(req.params.id)
        if (record.userId === req.body.userId) {
            await record.deleteOne()
            res.status(200).json("deleted")
        } else {
            res.status(403).json("you cannot")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router