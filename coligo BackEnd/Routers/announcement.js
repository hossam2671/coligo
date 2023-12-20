const express = require("express");
const route = express.Router();
const announcement = require("../models/Announcement");
const {
  addAnnouncment,
  getAllAnnouncment,
  deleteAnnouncement,
  updateAnnouncement,
} = require("../controller/Announcement");

// add Announcement
route.post("/addAnnouncment", addAnnouncment);

// get all announcment
route.get("/getAnnouncment", getAllAnnouncment);

// delete announcment
route.delete("/deleteAnnouncement/:id", deleteAnnouncement);

// update announcment
route.put("/updateAnnouncement/:id", updateAnnouncement);

module.exports = route;
