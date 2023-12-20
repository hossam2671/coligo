const due = require("../models/due");

const addDue = async (req, res) => {
  const { topic, course, date, type, title } = req.body;
  let newDate = new Date(date);
  if (!type) {
    res.status(400).json({ message: "you must add type" });
  } else if (!title) {
    res.status(400).json({ message: "You must add title" });
  } else if (!course) {
    res.status(400).json({ message: "You must add course" });
  } else if (!topic) {
    res.status(400).json({ message: "you must add topic" });
  } else {
    let dueData = await due.create({
      topic: topic,
      course: course,
      type: type,
      date: newDate,
      title: title,
    });
    console.log(dueData);
    res.status(200).json({ dueData });
  }
  console.log(req.body);
};

const getAllDues = async (req, res) => {
  let dueData = await due.find({});
  res.status(200).json(dueData);
};

const deleteDue = async (req, res) => {
  console.log(req.params.id);
  let dueData = await due.findByIdAndDelete(req.params.id);
  res.status(200).json(dueData);
};

const getDueById = async (req, res) => {
  let dueData = await due.findById(req.params.id);
  res.status(200).json(dueData);
};

const updateDue = async (req, res) => {
  const { topic, course, date, type, title } = req.body;
  console.log(req.body);
  let newDate = new Date(date);
  if (!type) {
    res.status(400).json({ message: "you must add type" });
  } else if (!title) {
    res.status(400).json({ message: "You must add title" });
  } else if (!course) {
    res.status(400).json({ message: "You must add course" });
  } else if (!topic) {
    res.status(400).json({ message: "you must add topic" });
  } else {
    let dueData = await due.findByIdAndUpdate(req.params.id, {
      topic: topic,
      course: course,
      type: type,
      date: newDate,
      title: title,
    });
    res.status(200).json(dueData);
  }
};

module.exports = { addDue, getAllDues, getDueById, updateDue, deleteDue };
