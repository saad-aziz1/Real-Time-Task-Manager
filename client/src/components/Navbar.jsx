import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, PlusCircle, Search, Menu, X, LogIn, UserPlus, SearchX } from 'lucide-react';

const Navbar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value); 
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (onSearch) onSearch("");
    setIsSearchOpen(false);
  };

  return (
    <nav className="bg-[#FEFFF2] border-b border-[#94A3B8]/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-3 md:px-6 h-16 flex items-center justify-between gap-2">
        
        {/* 1: Logo Section */}
        <Link to="/" className="flex items-center gap-1.5 text-[#0F172A] font-bold shrink-0">
          <div className="bg-[#0F172A] p-1.5 rounded-lg shadow-sm">
            <LayoutGrid size={18} className="text-[#F59E0B]" />
          </div>
          <span className="text-base md:text-xl tracking-tight">TaskFlow</span>
        </Link>

        {/* 2: Navigation & Action */}
        <div className="flex items-center gap-1 sm:gap-4 ml-auto">
          
          {/* Search Icon Toggle */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-2 rounded-full transition-all shrink-0 ${isSearchOpen ? 'bg-[#F59E0B] text-[#020617]' : 'text-[#0F172A] hover:bg-[#0F172A]/5'}`}
          >
            {isSearchOpen ? <SearchX size={19} /> : <Search size={19} />}
          </button>

          {/* MyTasksLink */}
          <Link 
            to="/" 
            className="whitespace-nowrap px-1.5 md:px-3 py-2 text-[#0F172A] font-bold text-[12px] md:text-sm hover:text-[#F59E0B] transition-colors"
          >
            My Tasks
          </Link>
          
          {/* AddTaskButton */}
          <Link 
            to="/add" 
            className="flex items-center gap-1 whitespace-nowrap px-3 md:px-4 py-2 bg-[#F59E0B] text-[#020617] font-extrabold text-[12px] md:text-sm rounded-xl hover:shadow-lg transition-all shrink-0"
          >
            <PlusCircle size={15} />
            <span>Add Task</span>
          </Link>

          {/* DesktopOnly */}
          <div className="hidden lg:flex items-center gap-3 border-l border-[#94A3B8]/30 ml-2 pl-4">
            <Link to="/login" className="text-[#0F172A] font-bold text-sm flex items-center gap-1">
              <LogIn size={16} /> Login
            </Link>
            <Link to="/signup" className="bg-[#0F172A] text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#1E293B]">
              Sign Up
            </Link>
          </div>

          {/* ToggleIcon */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-1.5 text-[#0F172A] hover:bg-[#0F172A]/5 rounded-lg border border-[#94A3B8]/20"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* --- SEARCH-SLIDE-DOWN--- */}
      {isSearchOpen && (
        <div className="bg-[#FEFFF2] border-t border-[#94A3B8]/10 p-3 shadow-inner animate-in slide-in-from-top duration-200">
          <div className="max-w-4xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
            <input 
              type="text"
              autoFocus
              placeholder="Search by title or description..."
              className="w-full bg-[#0F172A]/5 border border-[#94A3B8]/20 rounded-xl py-3 pl-10 pr-4 text-[#0F172A] focus:outline-none focus:border-[#F59E0B] font-medium transition-all"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#EF4444]"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile&Tablet Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#FEFFF2] border-t border-[#94A3B8]/10 absolute w-full left-0 shadow-2xl p-5 animate-in slide-in-from-top duration-300 z-40">
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest px-1">Account Actions</p>
            <Link 
              to="/login" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 border border-[#0F172A]/10 rounded-xl font-bold text-[#0F172A] bg-white/50"
            >
              <span className="flex items-center gap-2"><LogIn size={18} /> Login</span>
              <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>
            </Link>
            <Link 
              to="/signup" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 bg-[#0F172A] text-white rounded-xl font-bold shadow-lg shadow-[#0F172A]/20"
            >
              <UserPlus size={18} /> Create Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;