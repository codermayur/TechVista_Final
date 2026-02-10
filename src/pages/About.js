import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/Nav/SidebarNav.js';
import SocialSidebar from '../components/Nav/SocialSidebar.js';
import Footer from '../components/Nav/Footer.js';
import StatCard from '../components/Cards/StatCard.js';
import AboutCard from '../components/Cards/AboutCard.js';
import '../App.css';

const CONTACT_DATA = [
  { id: 1, section: 'principle', name: "Dr. Rohini Kelkar", role: "Principle", img: "/videos/rohini.png" },
  { id: 2, section: 'principle', name: "Dr. Asif Rampurawala", role: "Vice Principle", img: "/videos/asif.png" },
  { id: 3, section: 'faculty', name: "Dr. Umesh Koyande", role: "Chief Academic Officer", img: "/videos/faculty.png" },
  { id: 4, section: 'faculty', name: "Mrs. Ketaki Ghawali", role: "Assistant Professor", img: "/videos/ketaki.png" },
];

/**
 * VideoContainer Component
 * Features: Toggleable audio, HUD overlays, and Cyberpunk styling.
 */
const VideoContainer = ({ videoSrc, year, delay }) => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className={`relative group w-full max-w-2xl transition-all duration-500 fade-in-up ${delay}`}>
      {/* Top HUD Tag with Mute Toggle */}
      <div className="absolute -top-3 left-4 z-20 bg-black border border-[#39ff14] px-3 py-1 shadow-[0_0_10px_rgba(57,255,20,0.3)] flex items-center gap-3">
        <p className="font-orbitron text-[10px] md:text-xs text-[#39ff14] uppercase tracking-[0.3em]">
          Archive // {year}
        </p>
        <button
          onClick={toggleMute}
          className="text-[#39ff14] hover:text-[#00ffd5] transition-colors duration-300"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          )}
        </button>
      </div>

      {/* Video Framework Container */}
      <div
        onClick={toggleMute}
        className="relative aspect-video w-full overflow-hidden border border-white/10 group-hover:border-[#39ff14]/50 transition-all duration-500 bg-black cursor-pointer"
      >
        {/* Decorative Target Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ffd5] z-20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ffd5] z-20 opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Video Content */}
        <video
          src={videoSrc}
          className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          muted={isMuted}
          loop
          autoPlay
          playsInline
        />

        {/* Interface Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity" />

        {/* Center Interaction HUD */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
           <div className="px-6 py-3 border border-[#39ff14] bg-black/60 backdrop-blur-md text-[#39ff14] font-orbitron text-[10px] tracking-[0.2em] shadow-[0_0_20px_rgba(57,255,20,0.4)]">
             {isMuted ? "SYSTEM AUDIO: MUTED // CLICK TO ENABLE" : "SYSTEM AUDIO: ACTIVE"}
           </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const [activeNav, setActiveNav] = useState('about');

  const sections = useMemo(() => {
    return {
      principle: CONTACT_DATA.filter(p => p.section === 'principle'),
      faculty: CONTACT_DATA.filter(p => p.section === 'faculty'),
    };
  }, []);

  return (
    <div className="text-white h-screen w-full relative bg-[#030f0a] overflow-hidden flex flex-col font-roboto selection:bg-[#39ff14] selection:text-black">
      {/* Brand Logo */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-[200] font-orbitron text-xl md:text-3xl font-bold text-white">
          <img src="/logo.png" alt="TechVista" className="h-12 md:h-16 w-auto" />
      </div>

      <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} />
      <SocialSidebar />
      <Footer activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="flex-1 w-full h-full overflow-y-auto scroll-smooth flex flex-col relative no-scrollbar">
        {/* Sub-navigation Header */}
        <div className="sticky top-0 z-[150] w-full pt-4 px-2">
            <header className="py-4 md:py-6 flex justify-center items-center w-full">
                <Link to="/events" className="group">
                    <h1 className="font-orbitron tracking-[0.2em] md:tracking-[0.3em] text-[12px] md:text-lg font-black uppercase pb-2 text-white/40 group-hover:text-[#39ff14] transition-all duration-300">
                        Competitions
                    </h1>
                </Link>
            </header>
        </div>

        {/* Global Cinematic Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <video className="w-full h-full object-cover" src="../files/hehe.mp4" autoPlay loop muted playsInline />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
        </div>

        <main className="flex-grow flex flex-col items-center pt-8 pb-32 md:pb-20 relative z-10 px-4 md:px-24">

          {/* Leadership Section */}
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center mb-20">
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] text-[#39ff14] mb-12 text-center drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">Principle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 items-stretch justify-items-center w-full">
              {sections.principle.map((person, index) => (
                <div key={person.id} className="w-full max-w-[380px] transition-transform duration-500 hover:scale-[1.02]">
                  <AboutCard {...person} delay={`delay-${(index % 3) + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-5xl mx-auto flex flex-col items-center mb-20">
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] text-[#39ff14] mb-12 text-center drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">Faculty Incharge</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 items-stretch justify-items-center w-full">
              {sections.faculty.map((person, index) => (
                <div key={person.id} className="w-full max-w-[380px] transition-transform duration-500 hover:scale-[1.02]">
                  <AboutCard {...person} delay={`delay-${(index % 3) + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* About Text Section */}
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] text-[#39ff14] mb-12 text-center drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">About TechVista</h2>
            <div className="w-full bg-black/10 backdrop-blur-2xl border border-white/5 p-8 md:p-12 rounded-2xl text-center mb-16 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
                <p className="text-sm md:text-xl text-gray-200 leading-relaxed font-light mb-8">
 <strong><b>TechVista</b> </strong>is a transformative experience, offering
                            students a unique platform to enhance their technical
                            expertise, ignite creativity, and develop leadership skills.
                            It serves as a dynamic space for innovation, where
                            participants can showcase their technical prowess,
                            collaborate, and exchange ideas. With a diverse range of
                            events,<strong> <b>TechVista</b></strong> challenges students to push
                            boundaries, think critically, and solve real-world problems
                            with cutting-edge technology.<br/><br/>

                            Beyond celebrating technological advancements,
                            <strong><b>TechVista </b></strong>fosters personal growth by nurturing creativity,
                            leadership, and teamwork. The festival provides valuable
                            opportunities for hands-on learning, interactive
                            competitions, and engaging discussions, empowering
                            students to broaden their horizons and refine both
                            technical and interpersonal skills.<br/><br/>

                            By participating in <strong><b>TechVista </b></strong>, students gain exposure to
                            the latest trends and cultivate essential skills for success
                            in the tech industry. It serves as a pathway for students to
                            shine, excel, and contribute meaningfully to the world of
                            technology, creativity, and leadership.          </p>
            </div>

            {/* Event Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-24 px-4">
                <StatCard icon={<CalendarIcon />} value="2 Days" label="Of Tech Fun" delay="delay-1" />
                <StatCard icon={<LocationIcon />} value="8 Venues" label="Across Vidyalankar" delay="delay-2" />
                <StatCard icon={<AttendeesIcon />} value="2000+" label="Expected Attendees" delay="delay-3" />
                <StatCard icon={<FlashIcon />} value="11" label="Total Events" delay="delay-4" />
            </div>

            {/* Video Highlights Section */}
            <h2 className="font-orbitron text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] text-[#00ffd5] mb-16 text-center drop-shadow-[0_0_12px_rgba(0,255,213,0.5)]">Glimpses</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-7xl mb-16 px-4">
                <VideoContainer videoSrc="/files/aftermovie.mov" year="2025" delay="delay-1" />
                <VideoContainer videoSrc="/files/after.mp4" year="2024" delay="delay-2" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// UI Icon Components
const CalendarIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>;
const LocationIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
const AttendeesIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>;
const FlashIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;

export default About;
