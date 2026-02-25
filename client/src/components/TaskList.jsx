import { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle2, Clock, Trash2, Tag, LayoutGrid } from 'lucide-react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:10000/api/tasks/all');
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-[#020617] min-h-screen text-[#F8FAFC]">
      {/* Header*/}
      <div className="max-w-4xl mx-auto mb-10 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center border-b border-[#94A3B8]/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutGrid className="text-[#F59E0B]" size={24} />
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Project Tasks</h2>
          </div>
          <p className="text-[#94A3B8] text-sm md:text-base">Streamline your workflow with precision.</p>
        </div>
        
        {/* Alignment */}
        <div className="self-start sm:self-center bg-[#0F172A] px-4 py-2 rounded-xl border border-[#F59E0B]/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <span className="text-[#94A3B8] text-xs uppercase font-bold mr-2">Live Tasks:</span>
          <span className="text-[#F59E0B] font-mono font-bold text-lg">{tasks.length}</span>
        </div>
      </div>

      {/* TasksGrid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <div 
            key={task._id} 
            className="group relative bg-[#0F172A] border border-[#94A3B8]/20 rounded-2xl p-6 transition-all duration-300 hover:border-[#F59E0B]/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:-translate-y-1"
          >
            {/* Priority-Delete */}
            <div className="flex justify-between items-start mb-5">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                task.priority === 'High' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 
                task.priority === 'Medium' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 'bg-[#10B981]/20 text-[#10B981]'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                   task.priority === 'High' ? 'bg-[#EF4444]' : 
                   task.priority === 'Medium' ? 'bg-[#F59E0B]' : 'bg-[#10B981]'
                }`}></span>
                {task.priority}
              </div>
              <button className="text-[#94A3B8] hover:text-[#EF4444] p-1 hover:bg-[#EF4444]/10 rounded-lg transition-all">
                <Trash2 size={18} />
              </button>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-[#F8FAFC] mb-2 group-hover:text-[#F59E0B] transition-colors leading-tight">
              {task.title}
            </h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
              {task.description || "No specific details provided for this entry."}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-5 border-t border-[#94A3B8]/10">
              <div className="flex items-center gap-2">
                {task.status === 'Completed' ? (
                  <CheckCircle2 size={18} className="text-[#10B981]" />
                ) : (
                  <Clock size={18} className="text-[#F59E0B]" />
                )}
                <span className={`text-sm font-bold tracking-wide ${task.status === 'Completed' ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>
                  {task.status}
                </span>
              </div>
              <div className="flex items-center text-[#94A3B8] text-[10px] font-mono bg-[#020617] px-2 py-1 rounded">
                <Tag size={12} className="mr-1" />
                #{task._id.slice(-4)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList; 