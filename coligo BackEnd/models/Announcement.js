const mongoose = require("mongoose");
const announcementSchema = mongoose.Schema(
  {
    announcement: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    strict: false,
  }
);

const announcement = mongoose.model("announcement", announcementSchema);
module.exports = announcement;
