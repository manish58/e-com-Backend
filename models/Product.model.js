const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        title: {
            type: String,
            max: 50
        },
        description: {
            type: String,
            max: 500
        },
        img: {
            type: String
        },

    },
    { timestamps: true });

module.exports = mongoose.model("products", ProductSchema);