const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;
    console.log(req.category);
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body); // getting data from the "C"ategeory and reference to catergory
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "unable to save the category in DB",
      });
    }
    res.json({ category });
  });
};

exports.getCatergory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCatergory = (req, res) => {
  Category.find().exec((err, items) => {
    if (err) {
      return res.status(400).json({
        error: "NO categories found in DB",
      });
    }
    res.json(items);
  });
};
exports.updateCategory = (req, res) => {
  const category = req.category; // we are getting from middleware getCategoryBYid
  console.log(req.category);
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Fail to updatesin DB",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category; // from the middle things are exacting from parameter
  console.log(category);

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete",
      });
    }
    res.json({
      message: "Sucessfully delete",
    });
  });
};
