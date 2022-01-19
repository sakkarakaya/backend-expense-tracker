const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true,
        }
    }, {
    timestamps: true
}
)

module.exports = mongoose.model("Category", CategorySchema)
