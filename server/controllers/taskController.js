import Task from '../config/models/task.js'

export const createTask = async (req,res) => {
    try {
      
    const {title, description, priority} = req.body
   
    const newTask = new Task({
        title, 
        description, 
        priority, 
        user: req.user._id 
    }) 
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
    
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ 
        message: "Error fetching tasks", 
        error: error.message });
  }
};

export const searchTasks = async (req, res) => {
  try {
    const { query } = req.query; 
    
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchRegex = new RegExp(query, 'i');

   
    const tasks = await Task.find({
      user: req.user._id,
      $or: [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } }
      ]
    }).sort({ createdAt: -1 })

    res.status(200).json(tasks)

  } catch (error) {
    res.status(500).json({ 
      message: "Error searching tasks", 
      error: error.message 
    })
  }
}


export const updateTask = async (req, res) => {
  try {
    const { id } = req.params; 
    
    const updatedTask = await Task.findOneAndUpdate(
        { _id: id, user: req.user._id }, 
        req.body, 
        { new: true }
    )
    
    if (!updatedTask) return res.status(404).json({ 
      message: "Task not found or unauthorized" })
    
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
    
    const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user._id })
    
    if (!deletedTask) return res.status(404).json({ 
      message: "Task not found or unauthorized" })
    
    res.status(200).json({ 
      message: "Task deleted successfully" })
  
    } catch (error) {
    res.status(500).json({ message: 
      "Error deleting task", error: error.message })
  }
}