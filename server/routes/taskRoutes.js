import expres from 'express'
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js'


const router = expres.Router()

router.post('/add', createTask)
router.get('/all', getTasks)
router.put("/update/:id", updateTask)
router.delete("/delete/:id", deleteTask)

export default router