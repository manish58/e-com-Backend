const router = require("express").Router();
const auth = require("../middlewares/auth");
const { placeOrder, viewOrder } = require("../controllers/OrderController")

router.post("/", auth, placeOrder);

router.get("/viewOrder", auth, viewOrder);


module.exports = router;