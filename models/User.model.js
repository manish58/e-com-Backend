const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            required: true,
            max: 30,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        isSeller: {
            type: Boolean,
            default: false
        },
        cart: {
            type: Array,
            default: []
        },
    },
    { timestamps: true });

module.exports = mongoose.model("users", UserSchema);