const mongoose = require("mongoose")

const RecordSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        category: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Category"
        }
    }, {
    timestamps: true
}
)

module.exports = mongoose.model("Record", RecordSchema)