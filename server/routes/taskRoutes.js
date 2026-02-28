import express from 'express'
import { createTask, getTasks, updateTask, deleteTask, searchTasks } from '../controllers/taskController.js'

import { protect } from '../middleware/authMiddleware.js' 

const router = express.Router()


router.get('/search', protect, searchTasks)

router.post('/add', protect, createTask)
router.get('/all', protect, getTasks)
router.put("/update/:id", protect, updateTask)
router.delete("/delete/:id", protect, deleteTask)

export default router