import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); 
  const [refresh, setRefresh] = useState(false); 

  const handleTaskAdded = () => {
    setRefresh(prev => !prev); 
    navigate('/'); 
  };

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