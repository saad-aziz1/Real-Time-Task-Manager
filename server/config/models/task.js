import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required"], 
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"], 
    default: "Medium",
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;