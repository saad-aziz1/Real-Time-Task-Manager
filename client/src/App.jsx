
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const navigate = useNavigate();

  // TaskAdded
  const handleTaskAdded = () => {
    console.log("Task added! Navigating to home...");
    navigate('/'); 
  };

  return (
    <div className="bg-[#020617] min-h-screen">
      <Navbar />
      <div className="pt-2">
     <Outlet context={{ onTaskAdded: handleTaskAdded }} />
      </div>
    </div>
  );
}

export default App;