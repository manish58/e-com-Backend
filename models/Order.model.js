const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        products: {
            type: Object,
            required: true
        },
        order_status: {
            type: String,
            default: "pending"
        },
        amount: {
            type: Number,
            required: true
        }
    },
    { timestamps: true });

module.exports = mongoose.model("orders", OrderSchema);