import React, { useState } from 'react';
import SidebarNav from '../../components/Nav/SidebarNav';
import SocialSidebar from '../../components/Nav/SocialSidebar';
import Footer from '../../components/Nav/Footer'; // Integrated
import RegistrationForm from '../../components/Forms/RegistrationForm';
import '../../App.css';

const CodeHunt = () => {
  const [activeNav, setActiveNav] = useState('events');

  // Hardcoded Bank Details
  const BANK_INFO = {
    accountNumber: "912345678901", 
    ifscCode: "PYTM0123456",
    holderName: "Tech-Vista 2026 Admin"
  };

  const codeHuntFields = [
    { id: 'fullName', label: 'Full Name', placeholder: 'your name', required: true },
    { id: 'email', label: 'College Email', type: 'email', placeholder: 'NAME@COLLEGE.EDU', required: true },
    { id: 'phone', label: 'WhatsApp Number', type: 'tel', placeholder: '+91 XXXXX XXXXX', required: true },
    { id: 'college', label: 'College Name', placeholder: 'Enter your institute name', required: true},
    { id: 'paymentScreenshot', label: 'Payment Screenshot', type: 'file', required: true},
    { id: 'transactionId', label: 'Transation ID', type: 'text', placeholder : 'Enter transaction Id', required : 'true'}
  ];

  const handleRegistration = (formData) => {
    console.log("Code Hunt Registration Protocol Initialized:", formData);
  };

  return (
    <div className="text-white h-screen w-full relative bg-[#030f0a] overflow-hidden flex flex-col">
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-[60] font-orbitron text-2xl md:text-3xl font-bold text-white cursor-pointer hover:text-[#39ff14] transition-colors duration-300">
        TV
      </div>
      
      <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} />
      <SocialSidebar />
      <Footer activeNav={activeNav} setActiveNav={setActiveNav} /> {/* Added Footer */}

      <div className="flex-1 w-full h-full overflow-y-auto flex flex-col relative pl-16 md:pl-24 pr-16 md:pr-24 no-scrollbar">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80" 
            alt="BG" 
            className="w-full h-full object-cover opacity-40" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#030f0a_95%)]"></div>
        </div>
        
        <main className="z-10 py-20 flex flex-col items-center">
            <div className="max-w-3xl w-full mb-10 text-center fade-in-up">
              <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-[#39ff14] uppercase tracking-widest drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">
                Code Hunt
              </h1>
              <div className="flex justify-center flex-wrap gap-4 mt-4 font-orbitron text-[10px] tracking-[0.3em] text-[#00ffd5] opacity-80">
                <span>VENUE: LAB COMPLEX</span>
                <span>DATE: 27TH FEB (DAY 1)</span>
                <span>TYPE: COMPETITIVE CODING</span>
              </div>
              
              <div className="mt-8 bg-black/30 backdrop-blur-md border border-white/5 p-6 rounded-lg text-left">
                <p className="text-gray-300 font-light leading-relaxed mb-6">
                  Enter the coding arena—solve fast, decode clues, outsmart rivals, and win with sharp logic. Code Hunt tests your speed, algorithmic thinking, and ability to handle pressure under the clock.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6">
                  <div className="space-y-2 text-[9px] uppercase tracking-widest text-[#39ff14]/70">
                    <p>• Format: Individual Participation</p>
                    <p>• Time Limit: 120 Minutes</p>
                    <p>• Languages: C++, Java, Python</p>
                    <p>• Scoring: Speed + Accuracy</p>
                    <p>• Entry Fee: ₹100/-</p>
                  </div>
                  <div className="bg-[#39ff14]/5 p-3 rounded border border-[#39ff14]/20">
                    <p className="text-[#39ff14] text-[10px] font-orbitron mb-2 tracking-widest">BANK TRANSFER DETAILS</p>
                    <p className="text-white text-[11px] font-mono">A/C: {BANK_INFO.accountNumber}</p>
                    <p className="text-white text-[11px] font-mono">IFSC: {BANK_INFO.ifscCode}</p>
                    <p className="text-gray-400 text-[8px] mt-1 uppercase italic">Holder: {BANK_INFO.holderName}</p>
                  </div>
                </div>
              </div>
            </div>

            <RegistrationForm 
              title="Hunter Protocol Initiation" 
              fields={codeHuntFields} 
              onSubmit={handleRegistration} 
            />
        </main>
      </div>
    </div>
  );
};

export default CodeHunt;