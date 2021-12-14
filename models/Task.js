const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },

  name: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
const Task = mongoose.model("task", TaskSchema);

module.exports = Task;
