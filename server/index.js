import expres from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDB from './config/connectDB.js'
import taskRoutes from './routes/taskRoutes.js'


const app = expres()
const PORT= process.env.PORT || 5000

app.use(cors())
app.use(expres.json())
app.use('/api/tasks', taskRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log(`server running at local ${PORT}`);
})