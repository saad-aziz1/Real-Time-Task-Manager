import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';

function App() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); 
  const [refresh, setRefresh] = useState(false); 
  const { loading: authLoading } = useAuth();

  const handleTaskAdded = () => {
    setRefresh(prev => !prev); 
    navigate('/'); 
  };

  if (authLoading) {
    return (
      <div className="bg-[#020617] min-h-screen flex flex-col justify-center items-center text-center p-5">
        <style>
          {`
            .app-spinner {
              width: 50px;
              height: 50px;
              border: 5px solid rgba(245, 158, 11, 0.1);
              border-top: 5px solid #F59E0B;
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
        <div className="text-[#F8FAFC] text-xl font-bold tracking-wide italic">TaskFlow</div>
        <div className="text-[#F59E0B] text-md font-semibold mt-4">Render server is waking up...</div>
        <div className="text-[#94A3B8] text-sm mt-2 max-w-[280px] leading-relaxed">
          Your workspace is being prepared. It can take some time, please wait for a moment.
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