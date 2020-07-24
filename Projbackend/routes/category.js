const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCatergory,
  getAllCatergory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//actual routes goes here

//Write or create catergory
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);
//read
router.get("/category/:categoryId", getCatergory);
router.get("/categories", getAllCatergory);

//update
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//delete
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router; // this line make sure that this file can br used anu where in project.
