import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../components/Nav/SidebarNav.js';
import SocialSidebar from '../components/Nav/SocialSidebar.js';
import Footer from '../components/Nav/Footer.js';
import EventCard from '../components/Cards/EventCard.js';
import '../App.css';

const ALL_EVENTS = [
  { id: 1, type: 'technical', day: 2, time: "10:00 AM", title: "Data Viz Master", desc: "DataViz Master challenges participants to transform complex datasets into clear insights using Power BI, Excel, or Tableau.", img: "/Event Posters/Data-Viz Master/1770198539426~2.png", delay: "delay-1", registerPath: "seedBanker", date: "Saturday, 28 February 2026", location: "LAB: X-122" },
  { id: 2, type: 'technical', day: 1, time: "12:00 PM", title: "Web-O-War", desc: "Eco Web challenges individuals to quiz, debug, and design themed websites, testing creativity, coding accuracy, and problem-solving.", img: "/Posters/ab.png", delay: "delay-2", registerPath: "ecoWeb" , date: "Friday, 27 February 2026", location: "LAB: X-103"},
  { id: 3, type: 'technical', day: 1, time: "10:00 AM", title: "E -Yantra Robotics", desc: "BOT YANTRA is a simulation-based robotics competition focusing on coding, logic building, and solving real-world robotic challenges.", img: "/Event Posters/E-Yantra Robotics/ea.png", delay: "delay-3", registerPath: "botYantra", date: "Friday, 27 February 2026", location: "LAB:Y-101" },
  { id: 4, type: 'technical', day: 2, time: "10:00 AM", title: "Code Break Arena", desc: "Enter the coding arena—solve fast, decode clues, outsmart rivals, and win with sharp logic.", img: "/Event Posters/Code Break Arena/Code Break Arena.png", delay: "delay-1", registerPath: "codeHunt", date: "Saturday, 28 February 2026", location: "LAB: X-119 & X-120" },
  { id: 5, type: 'technical', day: 1, time: "12:00 PM", title: "Code Crossword", desc: "CodeCrack Crossword challenges individuals to solve programming crosswords, predict outputs, identify code types, testing logic and speed.", img: "/Event Posters/Code Crossword/code.png", delay: "delay-2", registerPath: "codeCrack", date: "Friday, 27 February 2026", location: "LAB: X-114" },
  { id: 6, type: 'technical', day: 1, time: "10:00 AM", title: "Bug Busters", desc: "Hacker “THE DEVIL” attacks VSIT! Participants race to debug code and save the website, database, and certificates with an AI ally.", img: "/Event Posters/Debug Error/image_90839f54.png", delay: "delay-3", registerPath: "debugDevil", date: "Friday, 27 February 2026", location: "LAB:X-120 & X-121" },
  { id: 7, type: 'non-technical', day: 1, time: "09:30 AM", title: "Reelistic", desc: "Create a 60–90 second Instagram reel capturing the highlights of Tech-Vista 2026, judged on creativity and presentation.", img: "/Event Posters/Reelistic/reelistic.png", delay: "delay-1", registerPath: "reelistic", date: "Friday, 27 February 2026", location: "VSIT Campus" },
  { id: 8, type: 'non-technical', day: 2, time: "10:00 AM", title: "Ad-O-Mania", desc: "Ad-O-Forge challenges participants to market a fictional product through poster design, AI ad creation, and a compelling pitch.", img: "/Event Posters/Ad-O-Mania/ad.png", delay: "delay-2", registerPath: "adForge", date: "Saturday, 28 February 2026", location: "LAB: Y-101" },
  { id: 9, type: 'non-technical', day: 1, time: "09:30 AM", title: "Survival Strike: BGMI", desc: "Battle it out in the virtual world for the ultimate trophy.", img: "/poster.png", delay: "delay-3", registerPath: "gaming", date: "Friday, 27 February 2026", location: "Reading Room" },
  { id: 10, type: 'non-technical', day: 1, time: "10:30 AM", title: "Ultimate Kickoff: FIFA", desc: "Compete among the participants for the ultimate football glory.", img: "/Event Posters/Ultimate Kick-Off - FIFA/fifa.png", delay: "delay-1", registerPath: "treasureHunt", date: "Friday, 27 February 2026", location: "S Den" },
  { id: 11, type: 'non-technical', day: 2, time: "10:00 AM", title: "Fusion-X : Story telling", desc: "Fusion X is a competition where participants create silent AI videos and present concepts and storytelling live.", img: "/Event Posters/The Fusion X - Story Telling/x.png", delay: "delay-2", registerPath: "storytelling", date: "Saturday, 28 February 2026", location: "LAB: X-103" },
];

const TimelineItem = ({ time, title, type, delay }) => (
  <div className={`flex items-center w-full mb-6 md:mb-8 fade-in-up ${delay}`}>
    <div className="w-20 md:w-32 text-right pr-4 md:pr-8 shrink-0">
      <span className="font-orbitron text-[#39ff14] text-[10px] md:text-sm font-bold whitespace-nowrap">{time}</span>
    </div>
    <div className="relative flex flex-col items-center justify-center px-4 shrink-0">
      <div className="h-full w-0.5 bg-gradient-to-b from-[#39ff14] to-[#00ffd5] absolute"></div>
      <div className="w-3 h-3 rounded-full bg-[#39ff14] z-10 shadow-[0_0_10px_#39ff14]"></div>
    </div>
    <div className="flex-1 pl-4 md:pl-8 overflow-hidden">
      <div className="bg-black/30 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-lg hover:border-[#39ff14]/50 transition-all">
        <h4 className="font-orbitron text-white text-[11px] md:text-base uppercase tracking-widest leading-tight truncate md:whitespace-normal">{title}</h4>
        <span className={`text-[8px] md:text-[10px] uppercase font-bold tracking-tighter ${type === 'technical' ? 'text-[#39ff14]' : 'text-[#00ffd5]'}`}>{type}</span>
      </div>
    </div>
  </div>
);

const BrochureBtn = () => (
  <a
    href="/Brochure.pdf"
    download="Tech-Vista-2026-Brochure.pdf"
    className="group relative flex items-center gap-3 px-6 py-3 rounded-full font-orbitron text-[10px] uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden bg-black/60 backdrop-blur-xl border border-[#39ff14]/40 text-[#39ff14] hover:text-black shadow-[0_0_15px_rgba(57,255,20,0.2)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] active:scale-95 z-[150]"
  >
    <div className="absolute inset-0 rounded-full border border-[#00ffd5]/20 group-hover:border-[#39ff14]/50 transition-colors duration-500"></div>
    <span className="relative z-10 flex items-center gap-2 font-bold drop-shadow-md">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Brochure
    </span>
  </a>
);

const Events = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('events');
  const [activeFilter, setActiveFilter] = useState('all');
  const [timelineDay, setTimelineDay] = useState(1);

  const processedData = useMemo(() => {
    if (activeFilter === 'timeline') {
      return {
        timeline: ALL_EVENTS
          .filter(e => e.day === timelineDay)
          .sort((a, b) => a.time.localeCompare(b.time)),
        isTimeline: true
      };
    }
    return {
      techGrid: ALL_EVENTS.filter(e => e.type === 'technical' && (activeFilter === 'all' || activeFilter === 'technical')),
      nonTechGrid: ALL_EVENTS.filter(e => e.type === 'non-technical' && (activeFilter === 'all' || activeFilter === 'non-technical')),
      isTimeline: false
    };
  }, [activeFilter, timelineDay]);

  const handleRegister = (id) => {
    navigate(`/register/${id}`);
  };

  return (
    <div className="text-white h-screen w-full relative bg-[#030f0a] overflow-hidden flex flex-col">
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

      {/* Floating Brochure Button for Mobile */}
      <div className="fixed bottom-24 right-4 lg:hidden z-[140]">
        <BrochureBtn />
      </div>

      <div className="flex-1 w-full h-full overflow-y-auto scroll-smooth flex flex-col relative no-scrollbar">
        <div className="sticky top-0 z-[150] w-full pt-4 px-2 bg-gradient-to-b from-[#030f0a] via-[#030f0a]/80 to-transparent">
            <header className="py-4 md:py-6 flex justify-center items-center w-full">
                <h1 className="font-orbitron tracking-[0.2em] md:tracking-[0.3em] text-[12px] md:text-lg font-black uppercase pb-2 text-[#39ff14] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-gradient-to-r after:from-[#39ff14] after:to-[#00ffd5] drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">
                    Competitions
                </h1>
            </header>

            <div className="relative flex flex-col items-center gap-4 md:gap-6 mb-4 w-full px-2">
                <div className="bg-black/60 backdrop-blur-2xl border border-white/20 p-1 md:p-1.5 rounded-full flex items-center shadow-2xl relative z-10 max-w-full overflow-x-auto no-scrollbar scroll-smooth">
                    {['all', 'technical', 'non-technical', 'timeline'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 md:px-8 py-2 md:py-2.5 rounded-full font-orbitron text-[9px] md:text-xs font-bold uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                                activeFilter === filter
                                ? 'bg-gradient-to-r from-[#39ff14] to-[#00ffd5] text-[#030f0a]'
                                : 'text-gray-400'
                            }`}
                        >
                            {filter.replace('-', ' ')}
                        </button>
                    ))}
                </div>

                {/* Desktop Brochure Button position */}
                <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 hidden lg:block">
                  <BrochureBtn />
                </div>
            </div>

            {activeFilter === 'timeline' && (
                  <div className="flex justify-center w-full mb-6 fade-in-up">
                    <div className="bg-black/60 backdrop-blur-2xl border border-white/20 p-1 md:p-1.5 rounded-full flex items-center shadow-2xl relative z-10">
                      {[1, 2].map((day) => (
                        <button
                          key={day}
                          onClick={() => setTimelineDay(day)}
                          className={`px-6 md:px-10 py-2 md:py-2.5 rounded-full font-orbitron text-[9px] md:text-xs font-bold uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                            timelineDay === day
                              ? 'bg-gradient-to-r from-[#39ff14] to-[#00ffd5] text-[#030f0a] shadow-[0_0_20px_rgba(57,255,20,0.4)]'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          Day {day}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
        </div>

        <div className="fixed inset-0 z-0 pointer-events-none">
          <video
            className="w-full h-full object-cover opacity-60"
            src="../files/hehe.mp4"
            autoPlay loop muted playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
        </div>

        <main className="flex-grow flex flex-col items-center pt-8 pb-32 relative z-10 px-4">
          <div className="w-full max-w-5xl mx-auto">
            {!processedData.isTimeline ? (
                <div className="w-full space-y-16 md:space-y-24">
                  {processedData.techGrid.length > 0 && (
                      <section className="w-full">
                          <h2 className="font-orbitron text-sm md:text-2xl font-bold uppercase tracking-[0.4em] text-[#39ff14] mb-8 md:mb-12 text-center">Technical Events</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 items-stretch justify-items-center">
                              {processedData.techGrid.map(event => (
                                <div key={event.id} className="w-full max-w-[320px] md:max-w-[380px] h-full transition-transform duration-500 hover:scale-[1.02]">
                                    <EventCard {...event} onRegister={() => handleRegister(event.registerPath)} />
                                </div>
                              ))}
                          </div>
                      </section>
                  )}
                  {processedData.nonTechGrid.length > 0 && (
                      <section className="w-full">
                          <h2 className="font-orbitron text-sm md:text-2xl font-bold uppercase tracking-[0.4em] text-[#00ffd5] mb-8 md:mb-12 text-center">Non Technical Events</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 items-stretch justify-items-center">
                              {processedData.nonTechGrid.map(event => (
                                <div
                                    key={event.id}
                                    className={`w-full max-w-[320px] md:max-w-[380px] h-full transition-transform duration-500 hover:scale-[1.02] ${
                                        event.title.includes("Fusion-X") ? "md:col-span-2 justify-self-center" : ""
                                    }`}
                                >
                                    <EventCard {...event} onRegister={() => handleRegister(event.registerPath)} />
                                </div>
                              ))}
                          </div>
                      </section>
                  )}
                </div>
            ) : (
                <section className="w-full max-w-3xl mx-auto px-4">
                    <h2 className="font-orbitron text-sm md:text-2xl font-bold uppercase tracking-[0.3em] text-[#39ff14] mb-12 text-center">Operational Log: Day {timelineDay}</h2>
                    <div className="w-full relative px-2">
                        {processedData.timeline.map((event, index) => (
                            <TimelineItem key={event.id} {...event} delay={`delay-${(index % 3) + 1}`} />
                        ))}
                    </div>
                </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Events;
