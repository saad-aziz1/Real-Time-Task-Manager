import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDB from './config/connectDB.js'
import taskRoutes from './routes/taskRoutes.js'
import authRouter from './routes/authRoutes.js'


const app = express()
const PORT= process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/tasks', taskRoutes)
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    connectDB()
    console.log(`server running at local ${PORT}`);
})