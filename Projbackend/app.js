// these thing are provding mongoose structure files

require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-Parser");
const cookieParser = require("cookie-Parser");
const cors = require("cors");
// my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

//conection of database with the help of mongoose and myfun.run().then().catch()
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(" db connected");
  });

//write some middleware types of middleware bodyparser, cookie parser, cors
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes
app.use("/api/waseem", authRoutes);
app.use("/api/waseem", userRoutes);
app.use("/api/waseem", categoryRoutes);
app.use("/api/waseem", productRoutes);

//  port  with the help of enviornmnet variable
const port = process.env.PORT || 8000;

//starting a server
app.listen(port, () => {
  console.log(`app is running at ${8000}`);
});
