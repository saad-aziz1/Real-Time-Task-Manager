import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); 
  const [refresh, setRefresh] = useState(false); 
  const [isServerReady, setIsServerReady] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      try {
        await axios.get('https://real-time-task-manager-1-79vj.onrender.com/api/tasks/all-tasks');
        setIsServerReady(true);
      } catch (error) {
        setTimeout(checkServer, 3000);
      }
    };
    checkServer();
  }, []);

  const handleTaskAdded = () => {
    setRefresh(prev => !prev); 
    navigate('/'); 
  };

  if (!isServerReady) {
    return (
      <div className="bg-[#0F172A] min-h-screen flex flex-col justify-center items-center text-center p-5">
        <style>
          {`
            .app-spinner {
              width: 45px;
              height: 45px;
              border: 4px solid rgba(245, 158, 11, 0.1);
              border-top: 4px solid #F59E0B;
              border-radius: 50%;
              animation: app-spin 0.8s linear infinite;
              margin-bottom: 20px;
            }
            @keyframes app-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <div className="app-spinner"></div>
        <div className="text-[#F8FAFC] text-lg font-semibold tracking-wide">Render server is waking up...</div>
        <div className="text-[#94A3B8] text-sm mt-2 max-w-[250px] leading-relaxed">
          It can take some time, please wait for a moment.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#020617] min-h-screen flex flex-col">
      <Navbar onSearch={(query) => setSearchQuery(query)} /> 
      <main className="flex-grow flex flex-col justify-center py-10 md:py-20 px-4">
        <Outlet context={{ onTaskAdded: handleTaskAdded, searchQuery, refresh }} />
      </main>
      <Footer />
    </div>
  );
}

export default App;