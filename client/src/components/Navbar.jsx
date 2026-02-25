import { Link } from 'react-router-dom';
import { LayoutGrid, PlusCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-[#FEFFF2] border-b border-[#94A3B8]/20 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-2 md:px-4 h-16 flex items-center justify-between gap-1">
        
        {/* ProjectName*/}
        <Link to="/" className="flex items-center gap-1.5 text-[#0F172A] font-bold text-base md:text-xl shrink-0">
          <div className="bg-[#0F172A] p-1 md:p-1.5 rounded-lg">
            <LayoutGrid size={16} className="text-[#F59E0B] md:w-5 md:h-5" />
          </div>
          <span className="text-sm md:text-xl tracking-tight">TaskFlow</span>
        </Link>

        {/* Tabs */}
        <div className="flex items-center gap-1 md:gap-4 overflow-hidden">
          <Link 
            to="/" 
            className="whitespace-nowrap px-2 md:px-4 py-2 text-[#0F172A] font-bold text-[11px] md:text-sm hover:bg-[#0F172A]/5 rounded-xl transition-all"
          >
            My Tasks
          </Link>
          
          <Link 
            to="/add" 
            className="flex items-center gap-1 whitespace-nowrap px-2 md:px-4 py-2 bg-[#F59E0B] text-[#020617] font-extrabold text-[11px] md:text-sm rounded-xl hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all shrink-0"
          >
            <PlusCircle size={14} className="md:w-[18px] md:h-[18px]" />
            Add Task
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;