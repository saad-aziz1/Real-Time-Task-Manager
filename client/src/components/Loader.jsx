
const Loader = ({ size = "md" }) => {

  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4"
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div 
        className={`${sizeClasses[size]} border-[#94A3B8]/20 border-t-[#F59E0B] rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loader;