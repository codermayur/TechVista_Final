import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/Nav/SidebarNav.js';
import SocialSidebar from '../components/Nav/SocialSidebar.js';
import Footer from '../components/Nav/Footer.js';
import ContactCard from '../components/Cards/ContactCard.js';
import '../App.css';

// Assuming CONTACT_DATA is imported or defined.
// Replace this with your actual data source if different.
const CONTACT_DATA = [
  { id: 1, section: 'coordinators', name: "Chinmay Chipkar", role: "Co-ordinator", email: "chinmay.chipkar1@vsit.edu.in", phone: "+91 93215 49088", img: "/SOCIAL/1.png" },
  { id: 2, section: 'coordinators', name: "Ananya Raut", role: "Co-ordinator", email: "ananya.raut1@vsit.edu.in", phone: "+91 88280 56870", img: "/SOCIAL/2.png" },
  { id: 3, section: 'event-heads', name: "Sushant Eppakayala", role: "Event Head", email: "sushant.eppakayala@vsit.edu.in", phone: "+91 96195 43525", img: "/event heads/sushant.png" },
  { id: 4, section: 'event-heads', name: "Antara Parab", role: "Event Head", email: "antara.parab@vsit.edu.in", phone: "+91 93245 72119", img: "/event heads/antara.png" },
  { id: 5, section: 'event-heads', name: "Harshita Velonde", role: "Event Head", email: "harshita.velonde@vsit.edu.in", phone: "+91 98673 36563", img: "/event heads/harshita.png" },
  { id: 6, section: 'event-heads', name: "Agnel", role: "Event Head", email: "agnel@vsit.edu.in", phone: "+91 97021 01592", img: "" },
  { id: 7, section: 'event-heads', name: "Vedant Desai", role: "Event Head", email: "vedant.desai@vsit.edu.in", phone: "+91 89766 82289", img: "/event heads/vedant.png" },
  { id: 8, section: 'event-heads', name: "Yaseen Shaikh", role: "Event Head", email: "yaseen.shaikh@vsit.edu.in", phone: "+91 85918 41899", img: "/event heads/yaseen.png" },
  { id: 9, section: 'event-heads', name: "Shivani Lokhande", role: "Event Head", email: "shivani.lokhande@vsit.edu.in", phone: "+91 99750 27077", img: "/event heads/shivani.png" },
  { id: 10, section: 'event-heads', name: "Kishan Bhul", role: "Event Head", email: "kishan.bhul@vsit.edu.in", phone: "+91 82913 24770", img: "/event heads/kishan.png" },
  { id: 11, section: 'event-heads', name: "Subham Sahu", role: "Event Head", email: "subham.sahu@vsit.edu.in", phone: "+91 88888 77777", img: "/event heads/subham.png" },
  { id: 12, section: 'event-heads', name: "Ayesha Khan", role: "Event Head", email: "ayeshakhatoon.khan@vsit.edu.in", phone: "+91 89285 85903", img: "/event heads/ayesha.png" },
  { id: 13, section: 'event-heads', name: "Pruthviraj Patil", role: "Event Head", email: "pruthviraj.patil@vsit.edu.in", phone: "+91 84528 21285", img: "/event heads/pruthvi.png" },
  { id: 16, section: 'committee-heads', name: "Chaitanya Kudalkar", role: "Digi Head", email: "chaitanya.kudalkar@vsit.edu.in", phone: "+91 93729 93446", img: "/SOCIAL/5.png" },
  { id: 17, section: 'committee-heads', name: "Aryan Sawant", role: "Digi Head", email: "aryan.sawant@vsit.edu.in", phone: "+91 836 968 1887", img: "/SOCIAL/4.png" },
  { id: 18, section: 'committee-heads', name: "Jyoti Yadav", role: "Creative Head", email: "jyoti.yadav@vsit.edu.in", phone: "+91 877 927 3885", img: "/SOCIAL/12.png" },
  { id: 19, section: 'committee-heads', name: "Aryaman Chilka", role: "Creative Head", email: "aryaman.chilka@vsit.edu.in", phone: "+91 91361 06309", img: "/SOCIAL/13.png" },
  { id: 20, section: 'committee-heads', name: "Mansi Kanojia", role: "Logistic Head", email: "mansi.kanojia@vsit.edu.in", phone: "+91 98202 62314", img: "/SOCIAL/15.png" },
  { id: 21, section: 'committee-heads', name: "Tanvi Karjekar", role: "Documentation Head", email: "tanvi.karjekar@vsit.edu.in", phone: "+91 98190 62662", img: "/SOCIAL/6.png" },
  { id: 22, section: 'committee-heads', name: "Divyashree Guda", role: "Social Media Head", email: "divyashree.gudla@vsit.edu.in", phone: "+91 93729 93446", img: "/SOCIAL/3.png" },
  { id: 23, section: 'committee-heads', name: "Anushka Salunkhe", role: "Graphics Head", email: "anushka.salunke@vsit.edu.in", phone: "+91 84250 53278", img: "/SOCIAL/14.png" },
  { id: 24, section: 'committee-heads', name: "Shubh Nair", role: "Technical Head", email: "shubh.nair@vsit.edu.in", phone: "+91 90826 02095", img: "/SOCIAL/7.png" },
  { id: 25, section: 'committee-heads', name: "Mayuresh Tandel", role: "Technical Head", email: "mayuresh.tandel@vsit.edu.in", phone: "+91 87925 81488", img: "/SOCIAL/8.png" },
  { id: 26, section: 'committee-heads', name: "Pooja Salunkhe", role: "Marketing Head", email: "pooja.salunkhe@vsit.edu.in", phone: "+91 91379 79221", img: "/SOCIAL/11.png" },
  { id: 27, section: 'committee-heads', name: "Nupur Budge", role: "Sponsorship Head", email: "nupur.bugde1@vsit.edu.in", phone: "+91 9978523456", img: "/SOCIAL/5.png" },

];

const Contact = () => {
  const [activeNav, setActiveNav] = useState('contact');
  const [filter, setFilter] = useState('all');

  const sections = useMemo(() => {
    return {
      coordinators: CONTACT_DATA.filter(p => p.section === 'coordinators' && (filter === 'all' || filter === 'coordinators')),
      eventHeads: CONTACT_DATA.filter(p => p.section === 'event-heads' && (filter === 'all' || filter === 'event-heads')),
      committeeHeads: CONTACT_DATA.filter(p => p.section === 'committee-heads' && (filter === 'all' || filter === 'committee-heads')),
    };
  }, [filter]);

  // Helper function to determine if a card should be centered/full-width
  const getCardStyles = (name) => {
    const baseClasses = "w-full max-w-[380px] h-full transition-transform duration-500 hover:scale-[1.02]";
    if (name.includes("Pruthviraj Patil")) {
      return `${baseClasses} md:col-span-2 justify-self-center`;
    }
    return baseClasses;
  };

  return (
    <div className="text-white h-screen w-full relative bg-black overflow-hidden flex flex-col">
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-[200] font-orbitron text-xl md:text-3xl font-bold text-white transition-colors duration-300">TV</div>

      <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} />
      <SocialSidebar />
      <Footer activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="flex-1 w-full h-full overflow-y-auto scroll-smooth flex flex-col relative no-scrollbar">
        <div className="sticky top-0 z-[150] w-full pt-4 px-2">
            <header className="py-4 md:py-6 flex justify-center items-center w-full">
                <Link to="/events">
                    <h1 className="font-orbitron tracking-[0.2em] md:tracking-[0.3em] text-[12px] md:text-lg font-black uppercase pb-2 text-gray-300 hover:text-[#39ff14] relative transition-all duration-300 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-[#39ff14] after:to-[#00ffd5] after:transition-all after:duration-500 hover:drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">
                        Competitions
                    </h1>
                </Link>
            </header>

            <div className="relative flex flex-col items-center gap-4 md:gap-6 mb-4 w-full px-2">
                <div className="bg-black/60 backdrop-blur-2xl border border-white/20 p-1 md:p-1.5 rounded-full flex items-center shadow-2xl relative z-10 max-w-full overflow-x-auto no-scrollbar scroll-smooth">
                    {['all', 'coordinators', 'event-heads', 'committee-heads'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-3 md:px-8 py-2 md:py-2.5 rounded-full font-orbitron text-[9px] md:text-xs font-bold uppercase tracking-tighter md:tracking-widest transition-all duration-500 whitespace-nowrap ${
                                filter === type
                                ? 'bg-gradient-to-r from-[#39ff14] to-[#00ffd5] text-[#030f0a] shadow-[0_0_20px_rgba(57,255,20,0.5)]'
                                : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {type.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="fixed inset-0 z-0 pointer-events-none">
          <video
            className="w-full h-full object-cover"
            src="../files/hehe.mp4"
            autoPlay loop muted playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_95%)]"></div>
        </div>

        <main className="flex-grow flex flex-col items-center pt-8 pb-32 relative z-10 px-4">
          <div className="w-full max-w-6xl mx-auto space-y-24">

            {sections.coordinators.length > 0 && (
              <section className="w-full">
                <h2 className="font-orbitron text-base md:text-2xl font-bold uppercase tracking-[0.4em] text-[#39ff14] mb-12 text-center drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">Co-ordinators</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 items-stretch justify-items-center">
                  {sections.coordinators.map((person, index) => (
                    <div key={person.id} className={getCardStyles(person.name)}>
                        <ContactCard {...person} delay={`delay-${(index % 3) + 1}`} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {sections.eventHeads.length > 0 && (
              <section className="w-full">
                <h2 className="font-orbitron text-base md:text-2xl font-bold uppercase tracking-[0.4em] text-[#00ffd5] mb-12 text-center drop-shadow-[0_0_10px_rgba(0,255,213,0.5)]">Event Heads</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 items-stretch justify-items-center">
                  {sections.eventHeads.map((person, index) => (
                    <div key={person.id} className={getCardStyles(person.name)}>
                        <ContactCard {...person} delay={`delay-${(index % 3) + 1}`} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {sections.committeeHeads.length > 0 && (
              <section className="w-full">
                <h2 className="font-orbitron text-base md:text-2xl font-bold uppercase tracking-[0.4em] text-[#39ff14] mb-12 text-center drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">Committee Heads</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 items-stretch justify-items-center">
                  {sections.committeeHeads.map((person, index) => (
                    <div key={person.id} className={getCardStyles(person.name)}>
                        <ContactCard {...person} delay={`delay-${(index % 3) + 1}`} />
                    </div>
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

export default Contact;
