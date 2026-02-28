import expres from 'express'
import { createTask, getTasks, updateTask, deleteTask, searchTasks } from '../controllers/taskController.js'


const router = expres.Router()

router.get('/search', searchTasks)

router.post('/add', createTask)
router.get('/all', getTasks)
router.put("/update/:id", updateTask)
router.delete("/delete/:id", deleteTask)

export default router