const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Unable to save the user in the database",
      });
    } else {
      res.json({
        name: user.name,
        email: user.email,
        id: user._id,
        password: user.password,
      });
    }
  });
};

exports.signin = (req, res) => {
  //destructuring the data from body parse if body is big object
  const errors = validationResult(req);

  const { email, password } = req.body; //extracting the email and password from body
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      error1: errors.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    //find method of monhoose find first match from database
    if (err || !user) {
      return res.status(400).json({
        error: "user email doesnot exiit",
      });
    }
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password doesnot match",
      });
    }
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET); // key:value pair
    //put this token in the cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user is signout sucessfully",
  });
};

//Protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && !req.profile._id == req.auth._id;
  if (checker) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};
exports.isAdmin = (req, res, next) => {
  const check = req.profile.role;

  if (check === 0) {
    console.log("enter into function....." + check);
    return res.status(403).json({
      error: "You are not Admin, Access denied",
    });
  }
  next();
};
