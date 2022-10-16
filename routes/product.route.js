const router = require("express").Router();
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProduct, getcartproducts } = require("../controllers/ProductController");
const auth = require("../middlewares/auth");

router.post("/cartproducts", auth, getcartproducts);

router.get("/", getAllProduct);

router.get("/:id", getProduct);


router.post("/", auth, createProduct);

router.put("/:id", auth, updateProduct);

router.delete("/:id", auth, deleteProduct);


module.exports = router;