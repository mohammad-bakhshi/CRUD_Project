const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchmea = new Schema({
  firstName: {
    type:String,
    required:true,
  },
  lastName: String,
  gender: String,
  userName: String,
  password: String,
});

const user = mongoose.model("users", userSchmea);

module.exports = user;
