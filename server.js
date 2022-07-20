//Declare variables
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
require("dotenv").config();

//add model variable
const TodoTask = require("./models/todoTask");

//Set middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// let db;
mongoose.connect(process.env.DB_STRING, { userNewUrlParser: true }, () => {
  console.log("Connected to db!");
  // db = client.db(Todos);
});

app.get("/", async (req, res) => {
  try {
    TodoTask.find({}, (err, tasks) => {
      console.log(tasks);
      res.render("index.ejs", { todoTasks: tasks });
    });
  } catch (err) {
    if (err) return res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on the port ${PORT}`);
});
