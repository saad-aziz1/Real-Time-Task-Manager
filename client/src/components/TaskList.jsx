import  { useEffect, useState } from 'react'; 
import axios from 'axios';
import { CheckCircle2, Clock, Trash2, Edit3, X, AlertCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Lock, UserPlus, LogIn } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useOutletContext, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [expandedTasks, setExpandedTasks] = useState({});
  
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const { user, token } = useAuth();
  const context = useOutletContext();
  const searchQuery = context?.searchQuery;
  const refresh = context?.refresh;

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchTasks = async () => {
    if (!token) return;
    try {
      const url = searchQuery 
        ? `http://localhost:10000/api/tasks/search?query=${searchQuery}`
        : 'http://localhost:10000/api/tasks/all';

      const response = await axios.get(url, config);
      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else if (Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks);
      }
      
      if (searchQuery) setCurrentPage(1);
      
    } catch (error) {
      console.error("Fetch Error:", error);
      if (error.response?.status !== 401) {
        toast.error("Failed to load tasks");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user, token, searchQuery, refresh]);

  const toggleReadMore = (taskId) => {
    setExpandedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:10000/api/tasks/delete/${id}`, config);
      fetchTasks();
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    try {
      await axios.put(`http://localhost:10000/api/tasks/update/${id}`, { status: newStatus }, config);
      fetchTasks();
      toast.success(`Task marked as ${newStatus}`);
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const openEditModal = (task) => {
    setCurrentTask({ ...task });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:10000/api/tasks/update/${currentTask._id}`, {
        title: currentTask.title,
        description: currentTask.description,
        priority: currentTask.priority
      }, config);
      setIsEditModalOpen(false);
      fetchTasks();
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="bg-[#0F172A] p-8 rounded-[2.5rem] border border-[#94A3B8]/10 shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-[#F59E0B]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-[#F59E0B]/20">
            <Lock size={40} className="text-[#F59E0B]" />
          </div>
          <h2 className="text-2xl font-black text-[#F8FAFC] mb-3 tracking-tight">Access Restricted</h2>
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
            Please log in or create an account to view and manage your workspace. 
            Your tasks are waiting for you!
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
    <div className="p-4 md:p-8 bg-[#020617] min-h-screen text-[#F8FAFC]">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-4xl mx-auto mb-10 flex justify-between items-center">
        <h2 className="text-2xl font-extrabold tracking-tight">
          {searchQuery ? `Search: ${searchQuery}` : "Project Tasks"}
        </h2>
        <div className="bg-[#0F172A] px-4 py-2 rounded-xl border border-[#F59E0B]/30">
          <span className="text-[#F59E0B] font-bold text-sm">
            Total Tasks: {tasks.length}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
        {tasks.length > 0 ? (
          currentTasks.map(task => {
            const isExpanded = expandedTasks[task._id];
            const isLongDescription = task.description?.length > 100;

            return (
              <div key={task._id} className="group bg-[#0F172A] p-6 rounded-2xl border border-[#94A3B8]/10 hover:border-[#F59E0B]/40 transition-all duration-300 shadow-xl flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                    task.priority === 'High' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 
                    task.priority === 'Medium' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 'bg-[#10B981]/20 text-[#10B981]'
                  }`}>
                    {task.priority}
                  </span>
                  <div className="flex gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(task)} className="hover:text-[#10B981] transition-colors text-[#94A3B8]">
                      <Edit3 size={18} />
                    </button>
                    <button onClick={() => handleDelete(task._id)} className="hover:text-[#EF4444] transition-colors text-[#94A3B8]">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-[#F59E0B] transition-colors">{task.title}</h3>
                
                <div className="flex-grow">
                  <p className={`text-sm text-[#94A3B8] mb-2 leading-relaxed transition-all ${!isExpanded && isLongDescription ? 'line-clamp-2' : ''}`}>
                    {task.description}
                  </p>
                  
                  {isLongDescription && (
                    <button onClick={() => toggleReadMore(task._id)} className="text-xs font-bold text-[#F59E0B] flex items-center gap-1 mb-4 uppercase tracking-tighter">
                      {isExpanded ? <>Show Less <ChevronUp size={14}/></> : <>Read More <ChevronDown size={14}/></>}
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#94A3B8]/5 mt-auto">
                  <button
                    onClick={() => handleToggleStatus(task._id, task.status)}
                    className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${
                      task.status === 'Completed' ? 'text-[#10B981]' : 'text-[#F59E0B]'
                    }`}
                  >
                    {task.status === 'Completed' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                    {task.status || "Pending"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center py-20 bg-[#0F172A] rounded-3xl border border-dashed border-[#94A3B8]/20">
            <AlertCircle size={48} className="text-[#94A3B8] mb-4 opacity-20" />
            <p className="text-[#94A3B8] font-medium text-lg">No tasks found.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="max-w-4xl mx-auto mt-12 flex justify-center items-center gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className="p-2 bg-[#0F172A] rounded-lg border border-[#94A3B8]/10 disabled:opacity-30 text-[#F8FAFC]"
          >
            <ChevronLeft size={20} />
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => paginate(idx + 1)}
              className={`w-10 h-10 rounded-lg font-bold transition-all ${
                currentPage === idx + 1 
                ? 'bg-[#F59E0B] text-[#020617] scale-110 shadow-lg shadow-[#F59E0B]/20' 
                : 'bg-[#0F172A] border border-[#94A3B8]/10 text-[#94A3B8] hover:border-[#F59E0B]/40'
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="p-2 bg-[#0F172A] rounded-lg border border-[#94A3B8]/10 disabled:opacity-30 text-[#F8FAFC]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-[#020617]/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F172A] border border-[#94A3B8]/20 w-full max-w-lg rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-[#F8FAFC]">Edit Task</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[#94A3B8] hover:text-[#EF4444] transition-colors"><X size={24}/></button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-5">
              <input className="w-full bg-[#020617] border border-[#94A3B8]/20 p-4 rounded-2xl focus:border-[#F59E0B]/50 outline-none text-[#F8FAFC]" value={currentTask.title} onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})} />
              <textarea className="w-full bg-[#020617] border border-[#94A3B8]/20 p-4 rounded-2xl h-32 focus:border-[#F59E0B]/50 outline-none text-[#F8FAFC] resize-none" value={currentTask.description} onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})} />
              <button type="submit" className="w-full py-4 bg-[#F59E0B] text-[#020617] font-black rounded-2xl transition-all hover:brightness-110">SAVE CHANGES</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;