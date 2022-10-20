const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(require("morgan")("dev"));

const user = require("./Endpoints/user");

app.use("/", user);

module.exports = app;
