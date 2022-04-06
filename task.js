const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  importance: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Task", TaskSchema);