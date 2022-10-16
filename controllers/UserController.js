const UserModel = require('../models/User.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {

    // const { userName, email } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exist" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const result = await UserModel.create({
            email: req.body.email,
            password: hashedPassword,
            userName: req.body.userName
        });
        const { password, createdAt, updatedAt, ...others } = result._doc;
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY);
        res.status(201).json({ user: others, token: token })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}

const login = async (req, res) => {
    // const { email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const matchPassword = await bcrypt.compare(req.body.password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const { password, createdAt, updatedAt, ...others } = existingUser._doc;
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET_KEY);
        res.status(201).json({ user: others, token: token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" });
    }
}

const addProductToCart = async (req, res) => {
    try {
        const currentUser = await UserModel.findById(req.userId);
        if (!currentUser.cart.includes(req.params.id)) {
            await currentUser.updateOne({ $push: { cart: req.params.id } });
            res.status(204).json({ message: "item added to cart" });
        } else {
            res.status(403).json("You already added this item");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

const removeProductFromCart = async (req, res) => {
    try {
        const currentUser = await UserModel.findById(req.userId);
        if (currentUser.cart.includes(req.params.id)) {
            await currentUser.updateOne({ $pull: { cart: req.params.id } });
            res.status(204).json({ message: "item removed to cart" });
        } else {
            res.status(403).json("item does not exist");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

const emptyCart = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await UserModel.findByIdAndUpdate(userId, { cart: [] });
        res.status(204).json(user)
    }
    catch (err) {
        console.log(err);
        res.status(500).json("something went wrong");
    }
}

const getCartItems = async (req, res) => {
    try {
        const userId = req.userId;
        const userDetails = await UserModel.findById(userId);
        res.status(200).json(userDetails.cart);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
module.exports = { signup, login, addProductToCart, removeProductFromCart, getCartItems, emptyCart }