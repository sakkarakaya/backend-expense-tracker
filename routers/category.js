const router = require("express").Router()
const Category = require("../models/Category.js");
const User = require("../models/User.js");

Category.collection.dropIndexes(function (err, results) {
    // Handle errors
});

//READ
router.get("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId)
        const userCategories = await Category.find({ userId: currentUser._id })
        res.json(userCategories)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE
router.post("/", async (req, res) => {
    const newCategory = new Category(req.body)
    try {
        const savedCategory = await newCategory.save()
        res.status(200).json(savedCategory)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (category.userId === req.body.userId) {
            await category.updateOne({ $set: req.body })
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
        const category = await Category.findById(req.params.id)
        if (category.userId === req.body.userId) {
            await category.deleteOne()
            res.status(200).json("deleted")
        } else {
            res.status(403).json("you cannot")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router