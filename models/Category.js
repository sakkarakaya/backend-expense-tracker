const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema(
    {
        id: {
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

modules.export = mongoose.model("Category", CategorySchema)
