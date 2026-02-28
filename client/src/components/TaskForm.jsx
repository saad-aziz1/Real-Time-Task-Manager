import { useState } from 'react';
import axios from 'axios';
import { PlusCircle, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';

const TaskForm = () => {

  const { onTaskAdded } = useOutletContext();
  const { user, token } = useAuth();

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
    }
  };

  if (!user) return null;

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
            />

            <select
              className="bg-[#020617] border border-[#94A3B8]/20 text-[#F8FAFC] p-3 rounded-xl focus:outline-none focus:border-[#F59E0B]/50"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
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
          ></textarea>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#020617] font-bold rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
          >
            <Send size={18} />
            Create Task
          </button>

        </form>
      </div>
    </div>
  );
};

export default TaskForm;