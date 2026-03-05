import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDB from './config/connectDB.js'
import taskRoutes from './routes/taskRoutes.js'
import authRouter from './routes/authRoutes.js'

const app = express()
const PORT= process.env.PORT || 10000

app.use(cors({
  origin: "https://real-time-task-manager-blond.vercel.app", 
  credentials: true
}));

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use('/api/tasks', taskRoutes)
app.use('/api/auth', authRouter)

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log("Database connection failed", error);
    }
})