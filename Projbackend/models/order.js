const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productsInCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "product",
  },
  name: String,
  count: Number,
  price: Number,
});
const productCart = mongoose.model("productInCart", productsInCartSchema);

const orderScheme = new mongoose.Schema(
  {
    products: [productsInCartSchema],
    transction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("order", orderScheme);

module.exports = { Order, productCart };
