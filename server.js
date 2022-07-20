//Declare variables
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
require("dotenv").config();

//add model variable
// const todotask = require("./models/todotask");
const TodoTask = require("./models/todoTask");

//Set middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

mongoose.connect(
  process.env.DB_STRING,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) return console.log("Error: ", err);
    console.log(
      "MongoDB Connection -- Ready state is:",
      mongoose.connection.readyState
    );
  }
);

app.get("/", async (req, res) => {
  try {
    TodoTask.find({}, (err, tasks) => {
      res.render("index.ejs", { todoTasks: tasks });
    });
  } catch (err) {
    if (err) return res.status(500).send(err);
  }
});

app.post("/", async (req, res) => {
  const todoTask = new TodoTask({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    await todoTask.save();
    console.log(todoTask);
    res.redirect("/");
  } catch {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on the port ${PORT}`);
});
