const express = require("express");
const url = require("url");
const User = require("../models/user");
const router = express.Router();

//render login page in / route
router.get("/", (req, res) => {
  res.render("login", { title: 'login' });
});

//allow user to login and redirect to porfile page
router.post("/login", (req, res) => {
  const user = {
    userName: req.body.username,
    password: req.body.password,
  };

  User.findOne({ userName: user.userName }).then((document) => {
    if (document === null) {
      res.json({ result: 'fail', message: 'Username does not exists' });
    } else if (document.password === user.password) {
      let query = encodeURIComponent(document.userName);
      res.redirect("/profile?username=" + query);
    } else {
      res.json({ result: 'fail', message: 'Password is not coorect' });
    }
  });
});

//render signup page in /signup router
router.get("/signup", (req, res) => {
  res.render("signup", { title: "signup" });
});

//add user to the database form signup page
router.post("/signup/add", (req, res) => {
  let username = req.body.username;
  User.findOne({ userName: username }).then((doc) => {
    if (doc === null) {
      const user = new User({
        firstName: req.body.fname,
        lastName: req.body.lname,
        gender: req.body.gender,
        userName: req.body.username,
        password: req.body.password,
      });
      user.save(function (err, user) {
        res.json({ result: 'pass' });
      });
    } else {
      res.json({ result: 'fail', message: 'something went wrong' });
    }
  });
});

//render profile page in /profile route
router.get("/profile", (req, res) => {
  User.findOne({ userName: req.query.username }).then((document) => {
    res.render("profile", document);
  });
});

//delete user from database
router.post("/delete", (req, res) => {
  User.findOneAndRemove({ userName: req.body.username }).then(() => {
    res.json({ message: "deleted" });
  });
});

//update user information in database
router.post("/update", (req, res) => {
  User.findOne({ userName: req.body.oldUsername }).then((doc) => {
    doc.firstName = req.body.userfname;
    doc.lastName = req.body.userlname;
    doc.userName = req.body.userusername;
    doc.password = req.body.userpassword;
    doc.save();
    res.render("profile", doc);
  });
});

module.exports = router;
