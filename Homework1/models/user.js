const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchmea = new Schema({
  firstName: String,
  lastName: String,
  gender: String,
  userName: String,
  password: String,
});

const user = mongoose.model("users", userSchmea);

module.exports = user;
