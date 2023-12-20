const announcement = require("../models/Announcement");

const addAnnouncment = async (req, res) => {
  const { announcment, user } = req.body;
  if (!announcment) {
    res.status(400).json({ message: "enter announcment" });
  } else {
    let announData = announcement.create({
      user: user,
      announcement: announcment,
    });
    res.status(200).json(announData);
  }
};

const getAllAnnouncment = async (req, res) => {
  const announData = await announcement.find({}).populate("user");
  res.status(200).json(announData);
};

const deleteAnnouncement = async (req, res) => {
  const announData = await announcement.findByIdAndDelete(req.params.id);
  res.status(200).json(announData);
};

const updateAnnouncement = async (req, res) => {
  if (!req.body.announcment) {
    res.status(400).json({ message: "enter announcment" });
  } else {
    const announData = await announcement.findByIdAndUpdate(req.params.id, {
      announcement: req.body.announcment,
    });
    res.status(200).json(announData);
  }
};

module.exports = {addAnnouncment,getAllAnnouncment,deleteAnnouncement,updateAnnouncement}
