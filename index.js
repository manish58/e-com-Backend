const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const userRoute = require("./routes/users.route");
const productRoute = require("./routes/product.route");
const orderRoute = require("./routes/order.route");

dotenv.config();
//Mongo Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

//Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log("Http method" + req.method + ",url" + req.url);
    next();
})
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(helmet());
app.use(morgan("common"));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);

app.listen(process.env.PORT, () => {
    console.log("backend server is running");
})