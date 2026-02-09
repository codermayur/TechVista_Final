import React from 'react';

const StatCard = ({ icon, value, label, delay }) => (
  <div className={`flex-1 min-w-[240px] bg-black/20 backdrop-blur-md border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-500 hover:border-[#39ff14] hover:shadow-[0_0_30px_rgba(57,255,20,0.2)] group fade-in-up ${delay}`}>
    <div className="text-[#39ff14] mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
      {icon}
    </div>
    <h3 className="font-orbitron text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-[#00ffd5] transition-colors duration-300">{value}</h3>
    <p className="text-gray-400 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">{label}</p>
  </div>
);

export default StatCard;
