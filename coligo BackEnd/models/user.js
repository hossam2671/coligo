const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    departement: String,
  },
  {
    versionKey: false,
    strict: false,
  }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
