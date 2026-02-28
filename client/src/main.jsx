import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import SignUp from './components/SignUp'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import Login from './components/Login'



ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<TaskList />} />
            <Route path="add" element={<TaskForm />} />
            <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
)