import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarNav from '../../components/Nav/SidebarNav';
import SocialSidebar from '../../components/Nav/SocialSidebar';
import Footer from '../../components/Nav/Footer';
import RegistrationForm from '../../components/Forms/RegistrationForm';
import '../../App.css';

const EVENTS = {
  seedBanker: {
    name: "Data Viz Master",
    venue: "LAB: X-122",
    date: "28TH FEB (DAY 2)",
    type: "DATA VISUALIZATION",
    bgImage: "/Event Posters/Data-Viz Master/1770198539426~2.png",
    fee: "100",
    description: "Become a DataViz Master. Transform complex datasets into clear, actionable insights.",
    details: ["• Tools: Power BI /Excel", "• Format: Solo/Duo Challenge", "• Entry Fee: ₹100", "• Prize Pool: ₹5000"],
    isTeamEvent: true, // Updated to allow Duo
    teamConfig: { min: 1, max: 2 },
    fields: [
      { id: 'teamName', label: 'Team Name', placeholder: 'Enter your team name (Optional for Solo)', required: false },
      { id: 'email', label: 'Email ID', placeholder: 'Enter your email', type: 'email', required: true },
      { id: 'phone', label: 'WhatsApp Number', placeholder: 'Enter your WhatsApp number', type: 'tel', required: true },
      { id: 'college', label: 'College Name', placeholder: 'Enter your institute name', required: true },
      { id: 'toolPreference', label: 'Primary Tool', type: 'select', options: ['Power BI','Excel'], required: true },
      { id: 'paymentScreenshot', label: 'Payment Screenshot', type: 'file', required: true },
      { id: 'transactionId', label: 'Transaction ID', placeholder: 'Enter Transaction ID', required: true }
    ]
  },
  ecoWeb: {
    name: "Web-O-War",
    venue: "LAB: X-103",
    date: "27TH FEB (DAY 1)",
    type: "SOLO CHALLENGE",
    bgImage: "/Event Posters/Web-O-War/Web-O-War Event Poster.jpg",
    fee: "100",
    description: "Evaluates technical accuracy, creativity, and problem-solving through web development.",
    details: ["• All work must be original", "• Strictly No communication", "• Entry Fees: ₹100", "• Prize Pool: ₹5000"],
    fields: [
      { id: 'fullName', label: 'Participant Name', placeholder: 'Enter your full name', required: true },
      { id: 'email', label: 'Email ID', placeholder: 'Enter your email', type: 'email', required: true },
      { id: 'phone', label: 'WhatsApp Number', placeholder: 'Enter your WhatsApp number', type: 'tel', required: true },
      { id: 'college', label: 'College Name', placeholder: 'Enter your institute name', required: true },
      { id: 'paymentScreenshot', label: 'Payment Screenshot', type: 'file', required: true },
      { id: 'transactionId', label: 'Transaction ID', placeholder: 'Enter Transaction ID', required: true }
    ]
  },
  debugDevil: {
    name: "Bug Busters",
    venue: "LAB: X-120 & X-121",
    date: "27TH FEB (DAY 1)",
    type: "CRITICAL DEBUGGING",
    bgImage: "/Event Posters/Debug Error/image_90839f54.png",
    fee: "100",
    description: "In Bug Busters, participants race to debug broken HTML and JavaScript coding scripts. Fix all errors quickly to ensure your code matches the target output perfectly.",
    details: [ "• Type:Solo Challenge", "• Entry Fees: ₹100", "• Prize Pool: ₹3000"],
    fields: [
      { id: 'fullName', label: 'Defender Name', placeholder: 'Enter your full name', required: true },
      { id: 'email', label: 'Email', placeholder: 'Enter your email', type: 'email', required: true },
      { id: 'phone', label: 'WhatsApp Number', type: 'tel', placeholder: 'Enter your WhatsApp number', required: true },
      { id: 'college', label: 'Institute Name', placeholder: 'Enter your institute name', required: true },
      { id: 'expertise', label: 'Primary Language', type: 'select', options: ['HTML + JavaScript' ], required: true },
      { id: 'paymentScreenshot', label: 'Security Clearance (Payment)', type: 'file', required: true },
      { id: 'transactionId', label: 'Transaction ID', placeholder: 'Enter Transaction ID', required: true }
    ]
  },
  botYantra: {
    name: "E-Yantra Robotics",
    venue: "Y-101",
    date: "27TH FEB (DAY 1)",
    type: "MULTIPLAYER SIMULATION",
    bgImage: "/Event Posters/E-Yantra Robotics/file_0000000084347209a64d75b9d8567323 (1).png",
    fee: "100",
    description: "A simulation-based robotics event focusing on coding and logic building.",
    details: ["• Format: Multiplayer Virtual Simulation", "• Language: Python / C++ / ROS", "• Team Size: 2-4 Members", "• Entry Fees: ₹100", "• Prize Pool: ₹5000"],
    isTeamEvent: true,
    teamConfig: { min: 2, max: 4 },
    fields: [
      { id: 'teamName', label: 'Team Name', placeholder: 'Enter your team name', required: true },
      { id: 'college', label: 'College Name', placeholder: 'Enter your institute name', required: true },
      { id: 'email', label: 'Contact Email', placeholder: 'Enter primary email', type: 'email', required: true },
      { id: 'phone', label: 'WhatsApp Number', type: 'tel', placeholder: 'Enter primary contact', required: true },
      { id: 'codingLang', label: 'Preferred Language', type: 'select', options: ['Python', 'C++', 'ROS'], required: true },
      { id: 'paymentScreenshot', label: 'Payment Screenshot', type: 'file', required: true },
      { id: 'transactionId', label: 'Transaction ID', placeholder: 'Enter Transaction ID', required: true }
    ]
  },
  codeCrack: {
    name: "Code Crossword",
    venue: "LAB: X-114",
    date: "27TH FEB (DAY 1)",
    type: "LOGIC CHALLENGE",
    bgImage: "/Event Posters/Code Crossword/Event poster/IMG-20260127-WA0008.jpg",
    fee: "50",
    description: "Challenge your syntax knowledge and logic speed.",
    details: ["• Format: Solo Participation", "• Speed & Accuracy Scoring", "• Entry Fees: ₹100", "• Prize Pool: ₹3500"],
    fields: [
      { id: 'fullName', label: 'Participant Name', placeholder: 'Enter your full name', required: true },
      { id: 'email', label: 'Email ID', placeholder: 'Enter your email', type: 'email', required: true },
      { id: 'phone', label: 'WhatsApp Number', type: 'tel', placeholder: 'Enter your WhatsApp number', required: true },
      { id: 'college', label: 'College Name', placeholder: 'Enter your institute name', required: true },
      { id: 'expertise', label: 'Primary Language', type: 'select', options: ['C++', 'Java'], required: true },
      { id: 'paymentScreenshot', label: 'Payment Screenshot', type: 'file', required: true },
      { id: 'transactionId', label: 'Transaction ID', placeholder: 'Enter Transaction ID', required: true }
    ]
  },
  adForge: {
    name: "Ad-O-Mania",
    venue: "LAB: Y-101",
    date: "28TH FEB (DAY 2)",
    type: "TEAM CHALLENGE",
    bgImage: "/Event Posters/Ad-O-Mania/Ad-O-Mania Event Poster 2.png",
    fee: "200",
    description: "Bring products to life using marketing strategies.",
    details: ["• Team Size: 1-3 Members", "• Pitches before judges", "• Entry Fees: ₹100", "• Prize Pool: ₹5000"],
    isTeamEvent: true,
    teamConfig: { min: 1, max: 3 },
    fields: [
      { id: 'teamName', label: 'Team Name', placeholder: 'Enter your team name', required: true },
      { id: 'college', label: 'College Name', placeholder: 'Enter your institute name', required: true },
      { id: 'phone', label: 'Whatsapp Number', type: 'tel', placeholder: 'Enter your WhatsApp number', required: true },
      { id: 'paymentScreenshot', label: 'Payment Screenshot', type: 'file', required: true },
      { id: 'transactionId', label: 'Transaction ID', placeholder: 'Enter Transaction ID', required: true }
    ]
  },
  codeHunt: {
    name: "Code Crack Arena",
    venue: "LAB: X-119 & X-120",
    date: "28TH FEB (DAY 2)",
    type: "COMPETITIVE CODING",
    bgImage: "/Event Posters/Code Break Arena/Code Break Arena.png",
    fee: "100",
    description: "Enter the coding arena—solve fast, decode clues.",
    details: ["• Team Size: 1", "• Languages: C++, Java, Python", "• Entry Fees: ₹100", "• Prize Pool: ₹3500"],
    fields: [
      { id: 'fullName', label: 'Full Name', placeholder: 'Enter your name', required: true },
      { id: 'email', label: 'College Email', placeholder: 'Enter your email', type: 'email', required: true },
      { id: 'phone', label: 'WhatsApp Number', placeholder: 'Enter your WhatsApp number', type: 'tel', required: true },
      { id: 'college', label: 'College Name', placeholder: 'Enter your institute name', required: true },
      { id: 'paymentScreenshot', label: 'Payment Screenshot', type: 'file', required: true },
      { id: 'transactionId', label: 'Transaction ID', placeholder: 'Enter Transaction ID', required: true }
    ]
  },
  reelistic: {
    name: "Reelistic",
    venue: "VSIT CAMPUS",
    date: "27TH FEB (DAY 1)",
    type: "CREATIVE CHALLENGE",
    bgImage: "/Event Posters/Reelistic/reelistic.png",
    fee: "100",
    description: "The reel should be a 60–90 second highlight of Tech-Vista 2026, showcasing its events, vibrant atmosphere, and key moments in an engaging and energetic way.",
    details: ["• Duration: 60–90 Seconds", "• Creativity is key", "• Entry Fees: ₹100", "• Prize Pool: ₹3000"],
    fields: [
      { id: 'fullName', label: 'Participant Name', placeholder: 'Enter your full name', required: true },
      { id: 'email', label: 'Email ID', type: 'email', placeholder: 'Enter your email', required: true },
      { id: 'phone', label: 'Whatsapp Number', type: 'tel', placeholder: 'Enter your WhatsApp number', required: true },
      { id: 'instagramHandle', label: 'Instagram Handle', placeholder: 'Enter your Instagram handle', required: true },
      { id: 'college', label: 'College Name', placeholder: 'Enter your institute name', required: true },
      { id: 'paymentScreenshot', label: 'Payment Screenshot', type: 'file', required: true },
      { id: 'transactionId', label: 'Transaction ID', placeholder: 'Enter Transaction ID', required: true }
    ]
  },
  gaming: {
    name: "Survival Strike: BGMI",
    venue: "READING ROOM",
    date: "27TH FEB (DAY 1)",
    type: "TOURNAMENT",
    bgImage: "/poster.png",
    fee: "250",
    description: "Battle it out in the virtual world.",
    details: ["• Team Size: 4 to 5 Members", "• Entry Fees: ₹200", "• Prize Pool: ₹10000"],
    isTeamEvent: true,
    teamConfig: { min: 4, max: 5 },
    fields: [
      { id: 'teamName', label: 'Team Name', placeholder: 'Enter team name', required: true, fullWidth: true },
      { id: 'leaderName', label: 'Leader Name', placeholder: 'Enter full name', required: true },
      { id: 'leaderGameId', label: 'Leader In Game ID', placeholder: 'Enter in-game id', required: true },
      { id: 'leaderCollege', label: 'Leader College', placeholder: 'Enter institute name', required: true },
      { id: 'phone', label: 'Leaders Whatsapp Number', type: 'tel', placeholder: 'Enter your WhatsApp number', required: true },
      { id: 'paymentScreenshot', label: 'Payment Screenshot', type: 'file', required: true },
      { id: 'transactionId', label: 'Transaction ID', placeholder: 'Enter Transaction ID', required: true }
    ]
  },
  treasureHunt: {
    name: "Ultimate Kickoff: FIFA",
    venue: "S DEN",
    date: "27TH FEB (DAY 1)",
    type: "SOLO CHALLENGE",
    bgImage: "/Event Posters/Ultimate Kick-Off - FIFA/IMG-20260114-WA0041.jpg",
    fee: "100",
    description: "Compete among the participants",
    details: ["• Team size: 1", "• Entry Fees: ₹100", "• Prize Pool: ₹3000"],
    fields: [
      { id: 'fullName', label: 'Full Name', placeholder: 'Enter your name', required: true },
      { id: 'email', label: 'College Email', placeholder: 'Enter your email', type: 'email', required: true },
      { id: 'phone', label: 'WhatsApp Number', placeholder: 'Enter your WhatsApp number', type: 'tel', required: true },
      { id: 'college', label: 'College Name', placeholder: 'Enter your institute name', required: true },
      { id: 'paymentScreenshot', label: 'Payment Screenshot', type: 'file', required: true },
      { id: 'transactionId', label: 'Transaction ID', placeholder: 'Enter Transaction ID', required: true }
    ]
  },
  storytelling: {
    name: "Fusion-X: Story Telling",
    venue: "LAB: X-103",
    date: "28TH FEB (DAY 2)",
    type: "SOLO CHALLENGE",
    bgImage: "/Event Posters/The Fusion X - Story Telling/x.png",
    fee: "100",
    description: "AI video storytelling event; video length 60-90s.",
    details: ["• Team Size: 1-3 Members", "• Live Presentation", "• Entry Fees: ₹200", "• Prize Pool: ₹5000"],
    isTeamEvent: true,
    teamConfig: { min: 1, max: 3 },
    fields: [
      { id: 'teamName', label: 'Team Name', placeholder: 'Enter team/project name', required: true },
      { id: 'email', label: 'Contact Email', placeholder: 'Enter primary email', type: 'email', required: true },
      { id: 'phone', label: 'WhatsApp Number', placeholder: 'Enter primary contact', type: 'tel', required: true },
      { id: 'college', label: 'College Name', placeholder: 'Enter your institute name', required: true },
      { id: 'paymentScreenshot', label: 'Payment Screenshot', type: 'file', required: true },
      { id: 'transactionId', label: 'Transaction ID', placeholder: 'Enter Transaction ID', required: true }
    ]
  }
};

const EventMasterTerminal = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState(eventId && EVENTS[eventId] ? eventId : 'seedBanker');
  const [activeNav, setActiveNav] = useState('events');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [memberCount, setMemberCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (eventId && EVENTS[eventId]) {
      setSelectedEvent(eventId);
      const config = EVENTS[eventId].teamConfig;
      setMemberCount(config ? config.min : 1);
    }
  }, [eventId]);

  const currentEvent = EVENTS[selectedEvent];
  const hasEntryFee = currentEvent.fee && Number(currentEvent.fee.toString().replace(/[^0-9.-]+/g, "")) > 0;

  const handleSelect = (key) => {
    navigate(`/register/${key}`);
    setIsDropdownOpen(false);
  };

  const getDynamicFields = () => {
    let baseFields = [...currentEvent.fields];

    if (currentEvent.isTeamEvent && currentEvent.teamConfig) {
      const { min, max } = currentEvent.teamConfig;
      const options = Array.from({ length: max - min + 1 }, (_, i) => (min + i).toString());
      const insertionIndex = baseFields.findIndex(f => f.id === 'paymentScreenshot');

      const memberCountSelector = {
        id: 'dynamicMemberCount',
        label: 'Total Team Members',
        type: 'select',
        options: options,
        value: memberCount.toString(),
        onChange: (e) => setMemberCount(parseInt(e.target.value, 10)),
        required: true,
        fullWidth: true
      };

      const memberFields = [];
      const labelPrefix = selectedEvent === 'gaming' ? 'Player' : 'Member';

      // For Events like seedBanker (Data Viz) or adForge, player 1 is the main contact,
      // but we need to collect names for others.
      const startFrom = (selectedEvent === 'gaming' || selectedEvent === 'seedBanker' || selectedEvent === 'botYantra') ? 1 : 1;

      for (let i = 1; i <= memberCount; i++) {
        // Avoid duplicate name fields if leaderName or fullName is already in baseFields
        const isLeader = (i === 1 && (baseFields.some(f => f.id === 'leaderName' || f.id === 'fullName')));
        if (isLeader) continue;

        memberFields.push({
          id: `player${i}Name`,
          label: `${labelPrefix} ${i} Name`,
          placeholder: `Enter full name of ${labelPrefix.toLowerCase()} ${i}`,
          required: true,
          fullWidth: true
        });

        if (selectedEvent === 'gaming') {
          memberFields.push({
            id: `player${i}GameId`,
            label: `${labelPrefix} ${i} In-Game ID`,
            placeholder: `Enter game ID for player ${i}`,
            required: true
          });
        }
      }

      baseFields.splice(insertionIndex, 0, memberCountSelector, ...memberFields);
    }
    return baseFields;
  };

  const handleMasterSubmit = async (formData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    console.log("Terminal Submission Data:", { ...formData, event: selectedEvent, totalMembers: memberCount });
    // API logic here
    setIsSubmitting(false);
  };

  return (
    <div className="text-white h-screen w-full relative bg-[#030f0a] overflow-hidden flex flex-col">
      <button
        onClick={() => navigate('/events')}
        className="fixed top-6 right-6 z-[250] font-orbitron text-[10px] uppercase tracking-widest text-[#39ff14] border border-[#39ff14]/50 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md hover:bg-[#39ff14] hover:text-black transition-all cursor-pointer"
      >
        ✕ Exit Terminal
      </button>

      <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} />
      <SocialSidebar />
      <Footer activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="flex-1 w-full h-full overflow-y-auto flex flex-col relative pl-16 md:pl-24 pr-16 md:pr-24 no-scrollbar">
        <div className="fixed inset-0 z-0 pointer-events-none">
          {currentEvent.bgImage && (
            <img
              key={currentEvent.bgImage}
              src={currentEvent.bgImage}
              alt="BG"
              className="w-full h-full object-cover opacity-40 transition-opacity duration-1000"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
        </div>

        <div className="z-[100] mt-10 flex flex-col items-center relative w-full max-w-[320px] mx-auto">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="group relative w-full bg-black/60 backdrop-blur-2xl border border-[#39ff14]/30 p-4 rounded-md flex items-center justify-between transition-all hover:border-[#39ff14]"
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-[7px] text-[#00ffd5] font-orbitron uppercase tracking-widest opacity-50 mb-1">Status: Active</span>
              <span className="text-[#39ff14] font-orbitron text-[11px] uppercase tracking-wider">{currentEvent.name}</span>
            </div>
            <div className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4 text-[#39ff14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-[#030f0a]/95 backdrop-blur-3xl border border-white/10 rounded-md overflow-hidden z-[110]">
              <div className="max-h-[300px] overflow-y-auto py-1 no-scrollbar">
                {Object.keys(EVENTS).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={`w-full text-left px-5 py-3 font-orbitron text-[10px] uppercase tracking-widest transition-all
                      ${selectedEvent === key ? 'bg-[#39ff14]/10 text-[#39ff14]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    {EVENTS[key].name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <main className="z-10 py-10 flex flex-col items-center">
          <div className="max-w-3xl w-full mb-10 text-center">
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-[#39ff14] uppercase tracking-widest drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">
              {currentEvent.name}
            </h1>
            <div className="flex justify-center flex-wrap gap-4 mt-4 font-orbitron text-[10px] text-[#00ffd5] opacity-80 uppercase tracking-widest">
              <span>VENUE: {currentEvent.venue}</span>
              <span className="opacity-30">|</span>
              <span>DATE: {currentEvent.date}</span>
              <span className="opacity-30">|</span>
              <span>TYPE: {currentEvent.type}</span>
            </div>

            <div className="mt-8 bg-black/30 backdrop-blur-md border border-white/5 p-6 rounded-lg text-left">
              <p className="text-gray-300 font-light leading-relaxed mb-6">{currentEvent.description}</p>
              <div className={`grid grid-cols-1 ${hasEntryFee ? 'md:grid-cols-2' : ''} gap-x-6 gap-y-4 border-t border-white/10 pt-6`}>
                <div className="space-y-3 text-[13px] md:text-[15px] uppercase tracking-wider text-[#39ff14]/90">
                  {currentEvent.details.map((detail, index) => (
                    <p key={index} className="leading-relaxed">{detail}</p>
                  ))}
                </div>

                {hasEntryFee && (
                  <div className="bg-[#39ff14]/5 p-6 rounded border border-[#39ff14]/20 flex flex-col items-center text-center">
                    <p className="text-[#39ff14] text-[13px] font-orbitron mb-4 tracking-widest">BANK TRANSFER DETAILS</p>
                    <img src="/qrcode.png" alt="Payment QR" className="w-64 h-64 object-cover rounded-lg mb-4" />
                    <a href="/qrcode.png" download className="text-[#39ff14] border border-[#39ff14]/50 px-4 py-2 rounded-full text-[10px] font-orbitron uppercase">Download QR</a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full">
            <RegistrationForm
              key={`${selectedEvent}-${memberCount}`}
              title={`${currentEvent.name} Interface`}
              fields={getDynamicFields()}
              onSubmit={handleMasterSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventMasterTerminal;
