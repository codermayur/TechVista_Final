import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/Nav/SidebarNav.js';
import SocialSidebar from '../components/Nav/SocialSidebar.js';
import Footer from '../components/Nav/Footer.js';
import StatCard from '../components/Cards/StatCard.js';
import AboutCard from '../components/Cards/AboutCard.js';
import '../App.css';

const CONTACT_DATA = [
  { id: 1, section: 'principle', name: "Chinmay Chipkar", role: "Principle", email: "", img: "/SOCIAL/1.png" },
  { id: 2, section: 'principle', name: "Ananya Raut", role: "Vice Principle", email: "", img: "/SOCIAL/2.png" },
  { id: 3, section: 'faculty', name: "Sushant Eppakayala", role: "Professor", email: "",  img: "/event heads/sushant.png" },
  { id: 4, section: 'faculty', name: "Antara Parab", role: "Assistant Professor", email: "", img: "/event heads/antara.png" },
];

const VideoCard = ({ videoSrc, year, delay }) => (
  <div className={`bg-black/20 backdrop-blur-xl border border-white/5 rounded-lg p-6 flex flex-col items-center text-center w-full max-w-md transition-all duration-300 hover:border-[#39ff14] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] fade-in-up ${delay}`}>
    <div className="w-full h-64 md:h-80 rounded-md mb-4 p-1 overflow-hidden bg-gradient-to-br from-[#39ff14] to-[#00ffd5]">
      <div className="relative w-full h-full rounded-md overflow-hidden group bg-black">
        <video src={videoSrc} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" muted loop autoPlay />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
           <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
             <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
           </div>
        </div>
      </div>
    </div>
    <p className="font-orbitron text-xs md:text-sm text-[#39ff14] uppercase tracking-widest mt-2 drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
      Techvista {year}
    </p>
  </div>
);

const About = () => {
  const [activeNav, setActiveNav] = useState('about');
  const [filter, setFilter] = useState('all');

  const sections = useMemo(() => {
    return {
      principle: CONTACT_DATA.filter(p => p.section === 'principle'),
      faculty: CONTACT_DATA.filter(p => p.section === 'faculty'),
    };
  }, []);

  return (
    <div className="text-white h-screen w-full relative bg-[#030f0a] overflow-hidden flex flex-col font-roboto selection:bg-[#39ff14] selection:text-black">
<div className="fixed top-4 left-4 md:top-6 md:left-6 z-[200] font-orbitron text-xl md:text-3xl font-bold text-white">
                        <img
                            src="/logo.png"
                            alt="TechVista"
                            className="h-12 md:h-16 w-auto" // Added sizing to ensure it shows up!
                        />
                    </div>
      <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} />
      <SocialSidebar />
      <Footer activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="flex-1 w-full h-full overflow-y-auto scroll-smooth flex flex-col relative no-scrollbar">
        <div className="sticky top-0 z-[150] w-full pt-4 px-2">
            <header className="py-4 md:py-6 flex justify-center items-center w-full">
                <Link to="/events" className="group">
                    <h1 className="font-orbitron tracking-[0.2em] md:tracking-[0.3em] text-[12px] md:text-lg font-black uppercase pb-2 text-white/40 group-hover:text-[#39ff14] transition-all duration-300">
                        Competitions
                    </h1>
                </Link>
            </header>
        </div>

        <div className="fixed inset-0 z-0 pointer-events-none">
          <video
            className="w-full h-full object-cover"
            src="../files/hehe.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
        </div>

        <main className="flex-grow flex flex-col items-center pt-8 pb-32 md:pb-20 relative z-10 px-4 md:px-24">

          {/* Principle Section */}
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center mb-20">
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] text-[#39ff14] mb-12 text-center drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">Principle</h2>
            <section className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 items-stretch justify-items-center">
                {sections.principle.map((person, index) => (
                  <div key={person.id} className="w-full max-w-[380px] h-full transition-transform duration-500 hover:scale-[1.02]">
                    <AboutCard {...person} delay={`delay-${(index % 3) + 1}`} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Faculty Incharge Section */}
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center mb-20">
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] text-[#39ff14] mb-12 text-center drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">Faculty Incharge</h2>
            <section className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 items-stretch justify-items-center">
                {sections.faculty.map((person, index) => (
                  <div key={person.id} className="w-full max-w-[380px] h-full transition-transform duration-500 hover:scale-[1.02]">
                    <AboutCard {...person} delay={`delay-${(index % 3) + 1}`} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* About Text Section */}
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] text-[#39ff14] mb-12 text-center drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">About TechVista</h2>
            <div className="w-full bg-black/10 backdrop-blur-2xl border border-white/5 p-8 md:p-12 rounded-2xl text-center mb-16 shadow-[0_0_40px_rgba(0,0,0,0.4)] fade-in-up">
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
                            technology, creativity, and leadership.                 </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-24 px-4">
                <StatCard icon={<CalendarIcon />} value="2 Days" label="Of Tech Fun" delay="delay-1" />
                <StatCard icon={<LocationIcon />} value="8 Venues" label="Across Vidyalankar College" delay="delay-2" />
                <StatCard icon={<AttendeesIcon />} value="2000+" label="Expected Attendees" delay="delay-3" />
                <StatCard icon={<FlashIcon />} value="11" label="Events" delay="delay-4" />
            </div>

            {/* Glimpses Section */}
            <h2 className="font-orbitron text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] text-[#00ffd5] mb-12 text-center drop-shadow-[0_0_12px_rgba(0,255,213,0.5)]">Glimpses</h2>
            <div className="w-full flex flex-wrap justify-center gap-12 mb-16">
                <VideoCard videoSrc="video2025.mp4" year="2025" delay="delay-1" />
                <VideoCard videoSrc="video2024.mp4" year="2024" delay="delay-2" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Icon Components
const CalendarIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>;
const LocationIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
const AttendeesIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>;
const FlashIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;

export default About;
