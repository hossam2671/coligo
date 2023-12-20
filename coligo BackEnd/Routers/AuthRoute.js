const express = require("express");
const route = express.Router();
const user = require("../models/user");
const { login, getUserById } = require("../controller/Auth");

// login
route.post("/login", login);

// get user by id
route.get("/getUserById/:id", getUserById);

module.exports = route;
