import React from 'react';

const InstaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;
const LinkedInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;

const SocialItem = ({ href, icon, label }) => (
  <a href={href} className="social-item-line flex flex-col items-center gap-1 py-2 text-white text-xs uppercase tracking-wider font-medium transition-all duration-300 relative cursor-pointer hover:text-[#00ffd5] hover:translate-x-1">
    <div className="w-7 h-7 stroke-[1.5] transition-all duration-300 drop-shadow-[0_0_5px_rgba(0,255,213,0.3)] hover:drop-shadow-[0_0_12px_rgba(0,255,213,0.9)] hover:scale-110">{icon}</div>
    <span>{label}</span>
  </a>
);

const SocialSidebar = () => (
  <aside className="flex fixed top-1/2 -translate-y-1/2 right-0 w-16 md:w-24 z-[110] flex-col items-stretch justify-center gap-2 right-sidebar bg-transparent">
    <SocialItem href="https://www.instagram.com/techvista_vsit/" label="Insta" icon={<InstaIcon />} />
    <SocialItem href="https://www.linkedin.com/school/vsit-mumbai/posts/?feedView=all" label="LinkedIn" icon={<LinkedInIcon />} />
  </aside>
);

export default SocialSidebar;
