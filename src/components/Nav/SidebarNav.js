import React from 'react';
import { Link } from 'react-router-dom';

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6-4h.01M12 12h.01M15 15h.01M12 15h.01M9 15h.01M12 9h.01" /></svg>;
const EventsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ContactIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const AboutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const SponsorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l-2 8 6-4 6 4-2-8"/></svg>;

const NavItem = ({ to, isActive, icon, label, onClick }) => (
  <Link to={to} onClick={onClick} className={`nav-item-line flex flex-col items-center gap-1 py-2 text-white text-xs uppercase tracking-wider font-medium transition-all duration-300 relative cursor-pointer hover:text-[#39ff14] hover:translate-x-1 ${isActive ? 'text-[#39ff14] active' : ''}`}>
    <div className={`w-7 h-7 stroke-[1.5] transition-all duration-300 drop-shadow-[0_0_5px_rgba(57,255,20,0.3)] ${isActive ? 'drop-shadow-[0_0_12px_rgba(57,255,20,0.9)] scale-110' : ''}`}>{icon}</div>
    <span>{label}</span>
  </Link>
);

const SidebarNav = ({ activeNav, setActiveNav, onHomeClick }) => (
  <aside className="flex fixed top-1/2 -translate-y-1/2 left-0 w-16 md:w-24 z-[110] flex-col items-center justify-center gap-2 left-sidebar bg-transparent">
    <nav className="flex flex-col gap-2 items-center">
      <NavItem to="/" label="Home" icon={<HomeIcon />} isActive={activeNav === 'home'} onClick={() => { setActiveNav('home'); if(onHomeClick) onHomeClick(0); }} />
      <NavItem to="/events" label="Events" icon={<EventsIcon />} isActive={activeNav === 'events'} onClick={() => setActiveNav('events')} />
      <NavItem to="/contact" label="Contact" icon={<ContactIcon />} isActive={activeNav === 'contact'} onClick={() => setActiveNav('contact')} />
      <NavItem to="/about" label="About" icon={<AboutIcon />} isActive={activeNav === 'about'} onClick={() => setActiveNav('about')} />
      <NavItem to="/sponsor" label="Sponsor" icon={<SponsorIcon />} isActive={activeNav === 'sponsor'} onClick={() => setActiveNav('sponsor')} />
    </nav>
  </aside>
);

export default SidebarNav;
