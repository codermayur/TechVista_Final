import React from 'react';

const EventCard = ({ img, title, desc, delay, date, location, onRegister }) => (
  /* Padding decreased from p-8 to p-4 (1/2 reduction) */
  <div className={`bg-black/50 backdrop-blur-xl border border-gray-700/50 rounded-lg p-4 flex flex-col items-center text-center w-full h-full transition-all duration-300 hover:border-[#39ff14] hover:shadow-[0_0_40px_rgba(57,255,20,0.3)] fade-in-up ${delay}`}>

    {/* Image container:
        Maintains aspect-[4/5] for 540x675px dimensions.
        Margin bottom reduced to mb-4 to match tighter padding.
    */}
    <div className="w-full aspect-[4/5] rounded-md mb-4 overflow-hidden border border-white/5 shrink-0 shadow-inner">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
      />
    </div>

    {/* Title:
        Font size maintained for the wider footprint, margin bottom adjusted.
    */}
    <h3 className="font-orbitron text-xl md:text-2xl font-bold text-white uppercase tracking-widest mb-3 min-h-[3.5rem] flex items-center justify-center">
      {title}
    </h3>

    {/* Description: Margin adjusted for compact spacing */}
    <p className="text-sm md:text-base text-gray-300 mb-6 flex-grow leading-relaxed">
      {desc}
    </p>

    {/* Metadata Section: Gap and padding-top adjusted */}
    <div className="w-full flex flex-col gap-3 mb-6 text-left border-t border-white/10 pt-4 mt-auto">
      <div className="flex items-center gap-3 text-gray-400">
        <svg className="w-5 h-5 text-[#39ff14] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-[12px] font-bold uppercase tracking-wider">{date || "27 February 2026"}</span>
      </div>
      <div className="flex items-center gap-3 text-gray-400">
        <svg className="w-5 h-5 text-[#39ff14] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-[12px] font-bold uppercase tracking-widest">{location || "VSIT CAMPUS"}</span>
      </div>
    </div>

    {/* Registration Button */}
    <button
      onClick={onRegister}
      className="font-orbitron text-sm font-black uppercase text-[#030f0a] py-3.5 px-6 rounded-md bg-[#39ff14] w-full text-center shadow-[0_4px_20px_rgba(57,255,20,0.4)] hover:bg-[#00ffd5] hover:shadow-[0_0_25px_rgba(0,255,213,0.5)] transition-all duration-300 active:scale-95 cursor-pointer"
    >
      Register Now
    </button>
  </div>
);

export default EventCard;
