const mongoose = require("mongoose");
const dueSchema = mongoose.Schema(
  {
    type: {
      type: String,
      require: true,
      enum: ["quiz", "assignment"],
    },
    course: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    topic: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
  },
  {
    versionKey: false,
    strict: false,
  }
);

const due = mongoose.model("due", dueSchema);
module.exports = due;
