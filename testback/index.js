const express = require("express"); // declare variable

const app = express(); //again declare and assign variable

const port = 3000; // define the port and port number could be any

app.get("/", (req, res) => {
  return res.send("Home page");
});
const admin = (req, res) => {
  return res.send("this is admin dashboard");
};
const isAdmin = (req, res, next) => {
  console.log("isAdmin is runnning");
  next();
};
const isloggedIn = (req, res, next) => {
  console.log("isAdmin is runnnig good");
  next();
};
app.get("/admin", isloggedIn, isAdmin, admin);

app.get("/login", (req, res) => {
  return res.send("you are visiting logn route");
});
app.get("/signup", (req, res) => {
  return res.send("sign up user....");
});
/*
Request types: (get: any data),(post:send some data or receive from front end),(put updating the data) and delete
*/
app.listen(port, () => {
  console.log("severis up and running.....");
});
