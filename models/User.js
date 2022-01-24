const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            min: 4,
            max: 20
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            unique: true,
            min: 6
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,

    }
)

UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.__v;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.password;
    return user;
}

module.exports = mongoose.model("User", UserSchema)