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
        catgeory_id: {
            type: String,
            required: true,
        }
    }, {
    timestamps: true
}
)

module.exports = mongoose.model("Record", RecordSchema)