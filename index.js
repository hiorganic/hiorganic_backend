const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
// const authRouter = require("./routers/authRouter");
const productRouter = require("./routers/productsRouter.js");
const userRouter = require("./routers/userRouter");
const sellerRouter = require("./routers/sellerRouter.js")
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const cloudinary = require("cloudinary").v2;

dotenv.config("./.env");

const app = express();

//middlewares
app.use(express.json({ limit: "10mb" }));
app.use(morgan("common"));
app.use(cookieParser());
// let origin = process.env.CLIENT_URL;
// console.log('here env', process.env.NODE_ENV);


// app.use(
//     cors({
//         credentials: true,
//         origin
//     })
// );

// app.use("/auth", authRouter);
app.use("/products", productRouter);    
app.use("/user", userRouter);
app.use("/seller", sellerRouter);

app.get("/", (req, res) => {
    res.status(200).send("OK from Server");
});

const PORT = process.env.PORT || 4001;

dbConnect();
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});