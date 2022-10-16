const OrderModel = require("../models/Order.model");

const placeOrder = async (req, res) => {
    try {
        const newOrder = new OrderModel({
            userId: req.userId,
            order_status: req.body.order_status,
            products: req.body.cart,
            amount: req.body.amount
        })
        newOrder.save().then(result => {
            res.status(201).json(result)
        })

    } catch (err) {
        console.log(err)
        res.status(500).json("something went wrong")
    }
}

const viewOrder = async (req, res) => {
    console.log(req.userId)
    try {
        const orders = await OrderModel.find({ userId: req.userId }).sort({ createdAt: -1 })
        console.log(orders)
        res.status(200).json(orders)

    } catch (err) {
        console.log(err)
        res.status(500).json("something went wrong")
    }
}

module.exports = { placeOrder, viewOrder }
