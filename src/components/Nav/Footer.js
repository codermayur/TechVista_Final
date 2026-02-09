import React from 'react';
import { Link } from 'react-router-dom';

// Icon Definitions
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6-4h.01M12 12h.01M15 15h.01M12 15h.01M9 15h.01M12 9h.01" /></svg>;
const EventsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ContactIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const AboutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const SponsorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M8 12l-2 8 6-4 6 4-2-8"/></svg>;
const InstaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;
const LinkedInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
const YoutubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 11.75a29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>;

const Footer = ({ activeNav, setActiveNav, onHomeClick }) => (
    <footer className="mobile-footer-wrapper">
        <div className="mobile-footer-content">
            {/* Home Link with scroll-to-top/state reset logic */}
            <Link
                to="/"
                className={`nav-item ${activeNav === 'home' ? 'active' : ''}`}
                onClick={() => {
                    setActiveNav('home');
                    if(onHomeClick) onHomeClick(0);
                }}
            >
                <div className="w-6 h-6"><HomeIcon /></div><span>Home</span>
            </Link>

            {/* Events Link */}
            <Link
                to="/events"
                className={`nav-item ${activeNav === 'events' ? 'active' : ''}`}
                onClick={() => setActiveNav('events')}
            >
                <div className="w-6 h-6"><EventsIcon /></div><span>Events</span>
            </Link>

            {/* Contact Link */}
            <Link
                to="/contact"
                className={`nav-item ${activeNav === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveNav('contact')}
            >
                <div className="w-6 h-6"><ContactIcon /></div><span>Contact</span>
            </Link>

            {/* About Link */}
            <Link
                to="/about"
                className={`nav-item ${activeNav === 'about' ? 'active' : ''}`}
                onClick={() => setActiveNav('about')}
            >
                <div className="w-6 h-6"><AboutIcon /></div><span>About</span>
            </Link>

            {/* Sponsor Link */}
            <Link
                to="/sponsor"
                className={`nav-item ${activeNav === 'sponsor' ? 'active' : ''}`}
                onClick={() => setActiveNav('sponsor')}
            >
                <div className="w-6 h-6"><SponsorIcon /></div><span>Sponsor</span>
            </Link>

            {/* Social Links (No active state needed for external/dead links) */}
            <a href="#" className="social-item"><div className="w-6 h-6"><InstaIcon /></div><span>Insta</span></a>
            <a href="#" className="social-item"><div className="w-6 h-6"><LinkedInIcon /></div><span>LinkedIn</span></a>
            <a href="#" className="social-item"><div className="w-6 h-6"><YoutubeIcon /></div><span>YouTube</span></a>
        </div>
    </footer>
);

export default Footer;
