import expres from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

const app = expres()
const PORT= process.env.PORT || 5000

app.use(cors())
app.use(expres.json())

app.listen(PORT, () => {
    console.log(`server running at local ${PORT}`);
    
})