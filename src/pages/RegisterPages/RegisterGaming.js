import React, { useState } from 'react';
import SidebarNav from '../../components/Nav/SidebarNav';
import SocialSidebar from '../../components/Nav/SocialSidebar';
import Footer from '../../components/Nav/Footer'; // Integrated
import '../../App.css';

const RegisterGaming = () => {
  const [activeNav, setActiveNav] = useState('events');

  return (
    <div className="text-white h-screen w-full relative bg-[#030f0a] overflow-hidden flex flex-col">
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-[60] font-orbitron text-2xl md:text-3xl font-bold text-white">TV</div>
      <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} />
      <SocialSidebar />
      <Footer activeNav={activeNav} setActiveNav={setActiveNav} /> {/* Added Footer */}

      <div className="flex-1 w-full h-full overflow-y-auto flex flex-col relative pl-16 md:pl-24 pr-16 md:pr-24 no-scrollbar">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80" alt="BG" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
        </div>
        
        <header className="py-10 flex justify-center items-center z-40 w-full relative">
           <h1 className="font-orbitron tracking-[0.3em] text-lg font-black uppercase text-[#39ff14]">Registration: E-Sports Arena</h1>
        </header>

        <main className="z-10 w-full max-w-2xl mx-auto bg-black/40 backdrop-blur-xl p-8 rounded-xl border border-white/10 shadow-2xl mb-20 fade-in-up">
            <div className="space-y-6">
                <p className="text-gray-300 text-center font-orbitron text-sm">Battle it out in the virtual world for the ultimate trophy.</p>
                <div className="border border-white/5 p-10 text-center rounded-lg italic text-gray-400">E-Sports Form...</div>
                <button className="w-full font-orbitron text-sm font-bold uppercase text-[#030f0a] py-3 rounded-md sign-in-btn">Enter Arena</button>
            </div>
        </main>
      </div>
    </div>
  );
};

export default RegisterGaming;