const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;
