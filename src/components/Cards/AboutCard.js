import React from 'react';

const AboutCard = ({ name, role, img, delay }) => {
  return (
    <div className={`bg-black/50 backdrop-blur-xl border border-gray-700/50 rounded-lg p-6 flex flex-col items-center text-center w-full h-full transition-all duration-300 hover:border-[#39ff14] hover:shadow-[0_0_40px_rgba(57,255,20,0.3)] fade-in-up ${delay}`}>

      {/* Optimized Image Container */}
      <div className="w-48 h-48 sm:w-64 sm:h-64 aspect-square rounded-xl mb-6 overflow-hidden border border-white/10 shrink-0 shadow-lg group-hover:border-[#39ff14]/50 transition-colors duration-300">
        <img
          src={img}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 grayscale-[20%] hover:grayscale-0"
        />
      </div>

      {/* Name: Fixed height ensures grid alignment regardless of text length */}
      <h3 className="font-orbitron text-lg md:text-xl font-bold text-white uppercase tracking-[0.2em] mb-2 min-h-[3.5rem] flex items-center justify-center">
        {name}
      </h3>

      {/* Role & Info Section */}
      <div className="flex-grow flex flex-col items-center justify-start w-full">
        <p className="text-[#39ff14] text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-4 drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]">
          {role}
        </p>

        {/* Decorative Divider similar to Event Cards */}
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#39ff14]/50 to-transparent mb-4"></div>
      </div>

      {/* Action/Contact Button (Optional visual weight) */}
     {/* <div className="w-full mt-auto">
        <div className="py-2 px-4 border border-white/10 rounded font-orbitron text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white group-hover:border-[#39ff14]/30 transition-all duration-300">
          Core Committee
        </div>
      </div>*/}
    </div>
  );
};

export default AboutCard;
