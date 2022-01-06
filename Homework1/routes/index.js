const express = require("express");
const url = require("url");
const User = require("../models/user");
const router = express.Router();

//render login page in / route
router.get("/", (req, res) => {
  res.render("login");
});

//allow user to login and redirect to porfile page
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
      res.redirect("/profile?username=" + query);
    } else {
      res.send("error");
    }
  });
});

//render signup page in /signup router
router.get("/signup", (req, res) => {
  res.render("signup");
});

//add user to the database
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
        if (err) return res.status(500).send("Somthing went wrong \n!" + err);
        return res.redirect("/");
      });
    } else {
      res.send('error')
    }
  });
});

router.get("/profile", (req, res) => {
  User.findOne({ userName: req.query.username }).then((document) => {
    res.render("profile", document);
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
    res.render("profile", doc);
  });
});

module.exports = router;
