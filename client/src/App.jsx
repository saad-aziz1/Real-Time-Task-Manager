import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // Search state yahan rakhi

  const handleTaskAdded = () => {
    console.log("Task added! Navigating to home...");
    navigate('/'); 
  };

  return (
    <div className="bg-[#020617] min-h-screen">
    <Navbar onSearch={(query) => setSearchQuery(query)} /> 
      <div className="pt-2">
    <Outlet context={{ onTaskAdded: handleTaskAdded, searchQuery }} />
      </div>
    </div>
  );
}

export default App;