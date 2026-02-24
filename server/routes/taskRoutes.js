import expres from 'express'
import { createTask, getTasks } from '../controllers/taskController.js'


const router = expres.Router()

router.post('/add', createTask)
router.get('/all', getTasks)

export default router