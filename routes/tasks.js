const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
var fetchproject = require("../middleware/fetchproject");

// ROUTE 1: Add a new Notes using : POST "api/task/addtask"

router.post("/addtask", fetchproject, async (req, res) => {
  try {
    const { name, date } = req.body;

    // If there are error then return the bad request and error

    const task = await new Task({
      name,
      date,
      project: req.project.id,
    });

    const savetasks = await task.save();

    res.json(savetasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Get all Tasks using : GET "api/task/fetchallnotes"

router.get("/fetchallnotes", fetchproject, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.project.id });
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 3: Delete an existing task using : DELETE "api/task/deletetask"

router.delete("/deletetask/:id", fetchproject, async (req, res) => {
  try {
    // Find the note to be updated and update it
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user own this note
    if (task.project.toString() !== req.project.id) {
      return res.status(401).send("Not Allowed");
    }

    task = await Task.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", task: task });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
