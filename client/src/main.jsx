import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<TaskList />} />
          <Route path="add" element={<TaskForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  
)