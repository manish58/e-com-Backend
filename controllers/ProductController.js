const ProductModel = require("../models/Product.model");

const createProduct = async (req, res) => {
    const { title, description } = req.body;
    const newProduct = new ProductModel({
        title: title,
        description: description,
        userId: req.userId
    });
    try {
        const newItem = await newProduct.save();
        res.status(201).json(newItem);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" })
    }

}
const updateProduct = async (req, res) => {


}
const deleteProduct = async (req, res) => {

}
//GET ALL PRODUCTS
const getAllProduct = async (req, res) => {
    const qNew = req.query.new;
    try {
        let products = await ProductModel.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}
// Get single product details
const getProduct = async (req, res) => {
    try {
        const productDetails = await ProductModel.findById({ _id: req.params.id });
        res.status(200).json(productDetails);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" })
    }
}
// Get one or more products details
const getcartproducts = async (req, res) => {
    const productsArray = req.body.product
    let products = []
    try {
        for (const items of productsArray) {
            let item = await ProductModel.findById({ _id: items });
            products.push(item);
        }
        res.status(200).json(products);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" })
    }
}
module.exports = { createProduct, updateProduct, deleteProduct, getAllProduct, getProduct, getcartproducts }