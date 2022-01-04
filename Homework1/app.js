const express = require("express");
const path=require("path");
const mongoose=require("mongoose");
const Index = require("./routes/index");
const app = express();

mongoose.connect("mongodb://localhost:27017/Website")
.then(() => console.log("connected to database"))
.catch((err) => console.log("could not connect to database"));

const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", Index);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
