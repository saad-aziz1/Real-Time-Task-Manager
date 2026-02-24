import Task from '../config/models/task.js'

export const createTask = async (req,res) => {
    try {
    const {title, description, priority} = req.body
    const newTask = new Task({title, description, priority}) 
    const savedTask = await newTask.save()
    res.status(201).json(savedTask)
    
    } catch (error) {
    res.status(400).json({ 
        message: "Error saving task", 
        error: error.message })
    }
}

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ 
        message: "Error fetching tasks", 
        error: error.message });
  }
};