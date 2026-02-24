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


export const updateTask = async (req, res) => {
  try {
    const { id } = req.params; 
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true })
    
    if (!updatedTask) return res.status(404).json({ 
      message: "Task not found" })
    
    res.status(200).json(updatedTask);
  
  } catch (error) {
    res.status(400).json({ 
      message: "Error updating task", 
      error: error.message })
  }
}


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id)
    
    if (!deletedTask) return res.status(404).json({ 
      message: "Task not found" })
    
    res.status(200).json({ 
      message: "Task deleted successfully" })
  
    } catch (error) {
    res.status(500).json({ message: 
      "Error deleting task", error: error.message })
  }
}