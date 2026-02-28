import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:10000/api/auth/signup', formData);
      
      login(data.data.user, data.token);
      
      toast.success(`Welcome, ${data.data.user.name.split(' ')[0]}! Account created.`);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || "SignUp failed");
    }
  };

  return (
    <div className="min-h-[90vh] bg-[#020617] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0F172A] border border-[#94A3B8]/20 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-[#F59E0B] w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#F59E0B]/20">
            <UserPlus className="text-[#020617]" size={24} />
          </div>
          <h2 className="text-2xl font-extrabold text-[#F8FAFC]">Create Account</h2>
          <p className="text-[#94A3B8] text-sm mt-2">Join TaskFlow to manage your projects.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
            <input 
              type="text" 
              placeholder="Full Name"
              className="w-full bg-[#020617] border border-[#94A3B8]/20 rounded-xl py-3 pl-10 pr-4 text-[#F8FAFC] focus:outline-none focus:border-[#F59E0B] transition-all"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full bg-[#020617] border border-[#94A3B8]/20 rounded-xl py-3 pl-10 pr-4 text-[#F8FAFC] focus:outline-none focus:border-[#F59E0B] transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
            <input 
              type="password" 
              placeholder="Password (Min. 6 chars)"
              className="w-full bg-[#020617] border border-[#94A3B8]/20 rounded-xl py-3 pl-10 pr-4 text-[#F8FAFC] focus:outline-none focus:border-[#F59E0B] transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>

          <button type="submit" className="w-full bg-[#F59E0B] text-[#020617] font-extrabold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#F59E0B]/10 active:scale-[0.98] transition-all">
            Get Started <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center text-[#94A3B8] text-sm mt-6">
          Already have an account? <Link to="/login" className="text-[#F59E0B] font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;