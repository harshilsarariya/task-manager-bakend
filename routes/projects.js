const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "harshilprajapati9192@gmail.com";
var fetchproject = require("../middleware/fetchproject");

// ROUTE 1: Add a new Notes using : POST "api/projects/addproject"
router.post("/addproject", async (req, res) => {
  try {
    const { name, date } = req.body;

    // If there are error then return the bad request and error

    let project = await Project.create({
      name,
      date,
    });

    const data = {
      project: {
        id: project.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);

    res.json(authToken);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Get all Projects using : GET "api/projects/fetchallprojects"

router.get("/fetchallprojects", fetchproject, async (req, res) => {
  try {
    projectId = req.project.id;
    const projects = await Project.findById(projectId);
    res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 3: Delete an existing project using : DELETE "api/task/deleteproject"

router.delete("/deleteproject/:id", fetchproject, async (req, res) => {
  try {
    // Find the note to be updated and update it
    let projectId = await Project.findById(req.params.id);
    
    if (!projectId) {
      return res.status(404).send("Not Found");
    }

    projectId = await Project.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", projectId: projectId });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
