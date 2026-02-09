import React from 'react';

const ContactCard = ({ name, role, email, phone, img, delay }) => (
  /* Removed max-w-[340px] and updated to match EventCard's structural classes */
  <div className={`bg-black/50 backdrop-blur-xl border border-gray-700/50 rounded-lg p-6 flex flex-col items-center text-center w-full h-full transition-all duration-300 hover:border-[#39ff14] hover:shadow-[0_0_40px_rgba(57,255,20,0.3)] fade-in-up ${delay}`}>

    {/* Image container:
        Set to a fixed w-48 (192px) to prevent it from getting too large.
        Changed to aspect-square for a cleaner contact profile look.
    */}
    {/* Optimized Image Container */}
<div className="w-48 h-48 sm:w-64 sm:h-64 aspect-square rounded-xl mb-6 overflow-hidden border border-white/10 shrink-0 shadow-lg group-hover:border-[#39ff14]/50 transition-colors duration-300">
  <img
    src={img}
    alt={name}
    loading="lazy" // Good for performance in grids
    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 grayscale-[20%] hover:grayscale-0"
  />
</div>

    {/* Name: Font size slightly adjusted for the new image proportions */}
    <h3 className="font-orbitron text-xl md:text-2xl font-bold text-white uppercase tracking-[0.2em] mb-2 min-h-[3rem] flex items-center justify-center">
      {name}
    </h3>

    {/* Role: Positioned in the flex-grow area */}
    <div className="flex-grow flex flex-col items-center justify-start">
        <p className="text-[#39ff14] text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-6">
            {role}
        </p>
    </div>

    {/* Contact Details: Styled as the metadata section in EventCard */}
   <div className="w-full flex flex-col items-center gap-3 mb-6 text-center border-t border-white/10 pt-4 mt-auto">
  {/* Email Section */}
  <div className="flex items-center justify-center gap-3 text-gray-400 w-full">
    <svg className="w-5 h-5 text-[#39ff14] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    <span className="text-[12px] font-bold uppercase tracking-wider truncate">{email}</span>
  </div>

  {/* Phone Section */}
  <div className="flex items-center justify-center gap-3 text-gray-400 w-full">
    <svg className="w-5 h-5 text-[#39ff14] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
    <span className="text-[12px] font-bold uppercase tracking-widest">{phone}</span>
  </div>
</div>

    {/* Bottom Button: Matches "Register Now" visual weight */}

  </div>
);

export default ContactCard;
