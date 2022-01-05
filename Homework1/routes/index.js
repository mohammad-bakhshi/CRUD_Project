const express = require("express");
const url = require("url");
const User = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register/username", (req, res) => {
  User.findOne({ userName: req.body.usernameValue }).then((user) => {
    if (user === null) {
      res.json({ message: "pass" });
    } else {
      res.json({ message: "fail" });
    }
  });
});

router.post("/login", (req, res) => {
  const user = {
    userName: req.body.username,
    password: req.body.password,
  };

  User.findOne({ userName: user.userName }).then((document) => {
    if (document === null) {
      res.send("error");
    } else if (document.password === user.password) {
      let query = encodeURIComponent(document.userName);
      res.redirect("/dashboard?username=" + query);
    } else {
      res.send("error");
    }
  });
});

router.post("/register/save", (req, res) => {
  const user = new User({
    firstName: req.body.fname,
    lastName: req.body.lname,
    gender: req.body.gender,
    userName: req.body.username,
    password: req.body.password,
  });


  user.save(function (err, user) {
    if (err)
      return res.status(500).send("Somthing went wrong in add user \n!" + err);
    return res.redirect("/");
  });
});

router.get("/dashboard", (req, res) => {
  User.findOne({ userName: req.query.username }).then((document) => {
    res.render("dashboard", document);
  });
});

router.post("/delete", (req, res) => {
  User.findOneAndRemove({ userName: req.body.username }).then(() => {
    res.redirect("/");
  });
});

router.post("/update", (req, res) => {
 
  User.findOne({ userName: req.body.oldUsername }).then((doc) => {
    doc.firstName = req.body.userfname;
    doc.lastName = req.body.userlname;
    doc.userName = req.body.userusername;
    doc.password = req.body.userpassword;
    doc.save();
    res.render('dashboard',doc);
  });
});

module.exports = router;
