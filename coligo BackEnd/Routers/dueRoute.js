const express = require("express");
const route = express.Router();
const due = require("../models/due");
const {
  addDue,
  getAllDues,
  getDueById,
  updateDue,
  deleteDue,
} = require("../controller/due");

// add due
route.post("/addDue", addDue);

// get All Dues
route.get("/getDues", getAllDues);

// Delete due
route.delete("/deleteDue/:id", deleteDue);

// get due by id
route.get("/getDueById/:id", getDueById);

// update due
route.put("/updateDue/:id", updateDue);

module.exports = route;
