import { useState } from 'react';
import axios from 'axios';
import { PlusCircle, Send, Lock, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOutletContext, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from './Loader';

const TaskForm = () => {

  const { onTaskAdded } = useOutletContext();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to add tasks");
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post(
        'http://localhost:10000/api/tasks/add',
        formData,
        config
      );

      if (response.status === 201) {
        setFormData({ title: '', description: '', priority: 'Medium' });

        if (onTaskAdded) {
          onTaskAdded();
        }

        toast.success("Task created successfully!");
      }

    } catch (error) {
      console.error("Axios Error:", error);
      toast.error(error.response?.data?.message || "Error adding task");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="bg-[#0F172A] p-8 rounded-[2.5rem] border border-[#94A3B8]/10 shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-[#F59E0B]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-[#F59E0B]/20">
            <Lock size={40} className="text-[#F59E0B]" />
          </div>
          <h2 className="text-2xl font-black text-[#F8FAFC] mb-3 tracking-tight">Login Required</h2>
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
            You need to be authenticated to create new tasks. Join TaskFlow to start organizing your day.
          </p>
          <div className="flex flex-col gap-3">
            <Link 
              to="/login" 
              className="flex items-center justify-center gap-2 py-4 bg-[#F59E0B] text-[#020617] font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#F59E0B]/20"
            >
              <LogIn size={20} /> LOGIN TO PROCEED
            </Link>
            <Link 
              to="/signup" 
              className="flex items-center justify-center gap-2 py-4 bg-[#1E293B] text-[#F8FAFC] font-black rounded-2xl border border-[#94A3B8]/10 transition-all hover:bg-[#0F172A]"
            >
              <UserPlus size={20} /> CREATE ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#020617] pt-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto p-6 bg-[#0F172A] border border-[#94A3B8]/20 rounded-2xl shadow-2xl">
        
        <div className="flex items-center gap-2 mb-6 text-[#F59E0B]">
          <PlusCircle size={20} />
          <h2 className="text-xl font-bold text-[#F8FAFC]">Add New Task</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <input
              type="text"
              placeholder="Task Title"
              className="bg-[#020617] border border-[#94A3B8]/20 text-[#F8FAFC] p-3 rounded-xl focus:outline-none focus:border-[#F59E0B]/50"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              disabled={loading}
            />

            <select
              className="bg-[#020617] border border-[#94A3B8]/20 text-[#F8FAFC] p-3 rounded-xl focus:outline-none focus:border-[#F59E0B]/50"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              disabled={loading}
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

          </div>

          <textarea
            placeholder="Detailed Description..."
            rows="3"
            className="w-full bg-[#020617] border border-[#94A3B8]/20 text-[#F8FAFC] p-3 rounded-xl focus:outline-none focus:border-[#F59E0B]/50 resize-none"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            disabled={loading}
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#020617] font-bold rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader size="sm" />
            ) : (
              <>
                <Send size={18} />
                Create Task
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default TaskForm;