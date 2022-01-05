const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  gender: String,
  userName: {
    type: String,
    required: true,
    minlength: 2,
    unique: true,
  },
  password: {
    type:String,
    required: true,
    match:[/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/,'Password is not valid']
  }
});

const user = mongoose.model("users", userSchema);

module.exports = user;
