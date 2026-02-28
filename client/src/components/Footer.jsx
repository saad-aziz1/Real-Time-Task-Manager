import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, MessageCircle, Mail, LayoutDashboard, PlusCircle, LayoutGrid, Zap, ShieldCheck, Target } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0F172A] to-[#020617] border-t border-[#94A3B8]/10 pt-8 pb-8 w-full mt-auto">
      
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-6">
          
          {/* Section 1 */}
          <div className="md:col-span-5 space-y-4 text-left">
            <Link to="/" className="flex items-center gap-1.5 text-[#F8FAFC] font-bold shrink-0">
              <div className="bg-[#F8FAFC] p-1.5 rounded-lg shadow-sm">
                <LayoutGrid size={18} className="text-[#F59E0B]" />
              </div>
              <span className="text-xl tracking-tight">TaskFlow</span>
            </Link>
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">
              Engineered for professionals. TaskFlow provides a high-performance 
              environment to manage operations with <span className="text-[#F59E0B]">zero friction</span>.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2.5 bg-[#1E293B]/50 rounded-xl border border-[#94A3B8]/10 text-[#94A3B8] hover:text-[#0A66C2] transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2.5 bg-[#1E293B]/50 rounded-xl border border-[#94A3B8]/10 text-[#94A3B8] hover:text-[#10B981] transition-all duration-300">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="p-2.5 bg-[#1E293B]/50 rounded-xl border border-[#94A3B8]/10 text-[#94A3B8] hover:text-[#EF4444] transition-all duration-300">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Section 2 */}
          <div className="md:col-span-3 space-y-5">
            <h3 className="text-[#F8FAFC] font-black text-[11px] uppercase tracking-[0.2em] opacity-40 text-left">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center gap-2 text-[#94A3B8] hover:text-[#F59E0B] text-sm font-medium transition-colors">
                  <LayoutDashboard size={16} /> My Tasks
                </Link>
              </li>
              <li>
                <Link to="/add" className="flex items-center gap-2 text-[#94A3B8] hover:text-[#F59E0B] text-sm font-medium transition-colors">
                  <PlusCircle size={16} /> Add Task
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="md:col-span-4 space-y-5">
            <h3 className="text-[#F8FAFC] font-black text-[11px] uppercase tracking-[0.2em] opacity-40 text-left">System Insights</h3>
            <div className="bg-[#1E293B]/30 p-4 rounded-2xl border border-[#94A3B8]/5 space-y-3">
              <div className="flex items-center gap-3">
                <Zap size={14} className="text-[#F59E0B]" />
                <p className="text-[11px] text-[#F8FAFC] font-medium tracking-wide">Ultra-fast Syncing Enabled</p>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={14} className="text-[#10B981]" />
                <p className="text-[11px] text-[#F8FAFC] font-medium tracking-wide">AES-256 Cloud Encryption</p>
              </div>
              <div className="flex items-center gap-3">
                <Target size={14} className="text-[#EF4444]" />
                <p className="text-[11px] text-[#F8FAFC] font-medium tracking-wide">99.9% Sync Accuracy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#94A3B8]/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-bold">
            © 2026 <span className="text-[#F59E0B]">TASKFLOW</span> — OPTIMIZED EXPERIENCE
          </p>
          <div className="flex gap-6 text-[10px] text-[#94A3B8] font-black uppercase tracking-widest">
            <span className="hover:text-[#F8FAFC] transition-colors cursor-pointer">PRIVACY</span>
            <span className="hover:text-[#F8FAFC] transition-colors cursor-pointer">TERMS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;