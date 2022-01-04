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

router.post("/login", (req, res) => {
  const user = {
    userName: req.body.username,
    password: req.body.password,
  };

  User.findOne({ userName: user.userName }).then((document) => {
    if (document === null) {
      res.send("error");
    } else if (document.password === user.password) {
      res.redirect(
        url.format({
          pathname: "/",
          query: req.query,
        })
      );
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

router.get("/dashbord", (req, res) => {
  res.render("dashbord");
});

module.exports = router;
