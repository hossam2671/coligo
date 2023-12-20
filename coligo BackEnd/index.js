require("./config/connection");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.send("Welcome");
});

app.use(express.static("images"));

const dueRoute = require("./Routers/dueRoute");
app.use("/due", dueRoute);
const authRoute = require("./Routers/AuthRoute");
app.use("/auth", authRoute);
const announcment = require("./Routers/announcement");
app.use("/announcment", announcment);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(5000, function () {
  console.log("listen");
});
