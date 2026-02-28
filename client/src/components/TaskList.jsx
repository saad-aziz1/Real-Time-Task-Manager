import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle2, Clock, Trash2, LayoutGrid, Edit3, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom'; 

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [expandedTasks, setExpandedTasks] = useState({});
  
  
  const { searchQuery } = useOutletContext(); 

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  // FetchTasks
  const fetchTasks = async () => {
    try {
      let url = 'http://localhost:10000/api/tasks/all';
      
      
      if (searchQuery) {
        url = `http://localhost:10000/api/tasks/search?query=${searchQuery}`;
      }

      const response = await axios.get(url);
      setTasks(response.data);
      setCurrentPage(1); 
    } catch (error) {
      
      if(!searchQuery) toast.error("Failed to load tasks");
    }
  };

  const toggleDescription = (id) => {
    setExpandedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:10000/api/tasks/delete/${id}`);
      fetchTasks();
      toast.success("Task deleted successfully!", {
        style: { background: '#0F172A', color: '#F8FAFC', border: '1px solid #EF4444' },
      });
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    try {
      await axios.put(`http://localhost:10000/api/tasks/update/${id}`, { status: newStatus });
      fetchTasks();
      toast.success(`Task marked as ${newStatus}`, {
        style: { background: '#0F172A', color: '#F8FAFC', border: '1px solid #10B981' }
      });
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:10000/api/tasks/update/${currentTask._id}`, {
        title: currentTask.title,
        description: currentTask.description,
        priority: currentTask.priority
      });
      setIsEditModalOpen(false);
      fetchTasks();
      toast.success("Task updated successfully!", {
        style: { background: '#0F172A', color: '#F8FAFC', border: '1px solid #F59E0B' }
      });
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // searchQuery
  useEffect(() => {
    fetchTasks();
  }, [searchQuery]); 

  // Pagination Logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-4 md:p-8 bg-[#020617] min-h-screen text-[#F8FAFC]">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-10 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center border-b border-[#94A3B8]/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutGrid className="text-[#F59E0B]" size={24} />
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {searchQuery ? `Results for: ${searchQuery}` : "Project Tasks"}
            </h2>
          </div>
          <p className="text-[#94A3B8] text-sm md:text-base">
            {searchQuery ? `Found ${tasks.length} tasks matching your search.` : "Streamline your workflow with precision."}
          </p>
        </div>
        <div className="bg-[#0F172A] px-4 py-2 rounded-xl border border-[#F59E0B]/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <span className="text-[#94A3B8] text-xs uppercase font-bold mr-2">Tasks:</span>
          <span className="text-[#F59E0B] font-mono font-bold text-lg">{tasks.length}</span>
        </div>
      </div>

      {/* TasksGrid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
        {tasks.length > 0 ? (
          currentTasks.map((task) => {
            const isExpanded = expandedTasks[task._id];
            const isLongDescription = task.description?.length > 70;

            return (
              <div key={task._id} className="group bg-[#0F172A] border border-[#94A3B8]/20 rounded-2xl p-6 transition-all hover:border-[#F59E0B]/50 hover:shadow-2xl flex flex-col h-full">
               
                <div className="flex justify-between items-start mb-5">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    task.priority === 'High' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 
                    task.priority === 'Medium' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 'bg-[#10B981]/20 text-[#10B981]'
                  }`}>
                    {task.priority}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(task)} className="text-[#94A3B8] hover:text-[#10B981] p-1 transition-colors">
                      <Edit3 size={18} />
                    </button>
                    <button onClick={() => handleDelete(task._id)} className="text-[#94A3B8] hover:text-[#EF4444] p-1 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-[#F59E0B] transition-colors">{task.title}</h3>
                
                <div className="flex-grow">
                  <p className={`text-[#94A3B8] text-sm mb-2 leading-relaxed whitespace-pre-wrap ${!isExpanded ? 'line-clamp-2' : ''}`}>
                    {task.description}
                  </p>
                  {isLongDescription && (
                    <button onClick={() => toggleDescription(task._id)} className="text-[#F59E0B] text-xs font-bold flex items-center gap-1 hover:underline mb-4">
                      {isExpanded ? <><ChevronUp size={14} /> Less</> : <><ChevronDown size={14} /> More</>}
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-[#94A3B8]/10 mt-auto">
                  <button onClick={() => handleToggleStatus(task._id, task.status)} className="flex items-center gap-2 hover:opacity-80 transition-all">
                    {task.status === 'Completed' ? <CheckCircle2 size={18} className="text-[#10B981]" /> : <Clock size={18} className="text-[#F59E0B]" />}
                    <span className={`text-sm font-bold ${task.status === 'Completed' ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>{task.status}</span>
                  </button>
                  <div className="text-[#94A3B8] text-[10px] font-mono bg-[#020617] px-2 py-1 rounded">#{task._id.slice(-4)}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-[#94A3B8]">
            <div className="bg-[#0F172A] p-6 rounded-full mb-4 border border-[#94A3B8]/10">
               <X size={48} className="text-[#EF4444]/40" />
            </div>
            <h3 className="text-xl font-bold text-[#F8FAFC]">No tasks found</h3>
            <p>Try searching for something else.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="max-w-4xl mx-auto mt-12 flex justify-center items-center gap-4">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg bg-[#0F172A] border border-[#94A3B8]/20 disabled:opacity-30 hover:border-[#F59E0B]/50 transition-all">
            <ChevronLeft size={20} className="text-[#F59E0B]" />
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)} className={`w-10 h-10 rounded-lg font-bold border ${currentPage === index + 1 ? 'bg-[#F59E0B] text-[#020617] border-[#F59E0B]' : 'bg-[#0F172A] text-[#94A3B8] border-[#94A3B8]/20'}`}>
                {index + 1}
              </button>
            ))}
          </div>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg bg-[#0F172A] border border-[#94A3B8]/20 disabled:opacity-30 hover:border-[#F59E0B]/50 transition-all">
            <ChevronRight size={20} className="text-[#F59E0B]" />
          </button>
        </div>
      )}

      {/* EditModal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#0F172A] border border-[#94A3B8]/20 w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#F8FAFC]">Edit Task Details</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[#94A3B8] hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-[#94A3B8] mb-1 block">Task Title</label>
                <input type="text" className="w-full bg-[#020617] border border-[#94A3B8]/20 text-[#F8FAFC] p-3 rounded-xl focus:outline-none focus:border-[#F59E0B]/50" value={currentTask?.title} onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})} required />
              </div>
              <div>
                <label className="text-xs text-[#94A3B8] mb-1 block">Description</label>
                <textarea className="w-full bg-[#020617] border border-[#94A3B8]/20 text-[#F8FAFC] p-3 rounded-xl h-32 focus:outline-none focus:border-[#F59E0B]/50" value={currentTask?.description} onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})} ></textarea>
              </div>
              <div>
                <label className="text-xs text-[#94A3B8] mb-1 block">Priority Level</label>
                <select className="w-full bg-[#020617] border border-[#94A3B8]/20 text-[#F8FAFC] p-3 rounded-xl focus:outline-none focus:border-[#F59E0B]/50" value={currentTask?.priority} onChange={(e) => setCurrentTask({...currentTask, priority: e.target.value})} >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 bg-[#F59E0B] text-[#020617] font-bold rounded-xl transition-all hover:scale-[1.01] active:scale-[0.98]">Update Task</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;