const express = require("express");
const route = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const router = require("./user");
// all of paramas
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of the actual routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

router.get("/product/:productId/:userid", getProductById);

// until we export this current route our applicatin will crash
module.exports = route;
