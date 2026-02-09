import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';

// Component Imports
import SidebarNav from '../components/Nav/SidebarNav';
import SocialSidebar from '../components/Nav/SocialSidebar';
import Carousel from '../components/Carousel/Carousel';
import Footer from '../components/Nav/Footer.js';

const Sponsor = () => {
    const [activeNav, setActiveNav] = useState('sponsor');
    const containerRef = useRef(null);

    // Mouse Tracking for Flashlight and Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 150 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 150 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Flashlight Overlay logic to match Home.js
    const flashlightOverlay = useTransform([smoothX, smoothY], ([x, y]) =>
        `radial-gradient(circle 500px at ${x}px ${y}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 100%)`
    );

    // Parallax offsets for background video
    const bgX = useTransform(mouseX, [0, window.innerWidth], [15, -15]);
    const bgY = useTransform(mouseY, [0, window.innerHeight], [15, -15]);

    // Sponsor Assets
    const currentImages = useMemo(() => ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"], []);
    const pastImages = useMemo(() => ["past1.jpg", "past2.jpg", "past3.jpg", "past4.jpg", "past5.jpg"], []);

    const { scrollYProgress } = useScroll({
        container: containerRef,
        offset: ["start start", "end end"]
    });
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="text-white h-screen w-full relative bg-black flex flex-col font-sans overflow-hidden selection:bg-[#39ff14]/30">

            {/* TV Logo */}
            <div className="fixed top-4 left-4 md:top-6 md:left-6 z-[200] font-orbitron text-xl md:text-3xl font-bold text-white">TV</div>

            {/* Neon Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#39ff14] to-[#00ffd5] z-[200] origin-left shadow-[0_0_20px_#39ff14]"
                style={{ scaleX }}
            />

            <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} />
            <SocialSidebar />
            <Footer activeNav={activeNav} setActiveNav={setActiveNav} />

            {/* BACKGROUND LAYER (Matching Home.js) */}
            <div className="fixed inset-0 z-[1] h-screen w-screen overflow-hidden pointer-events-none">
                <motion.div
                    style={{ x: bgX, y: bgY, scale: 1.05 }}
                    className="w-full h-full"
                >
                    <video
                        className="w-full h-full object-cover"
                        src="../files/hehe.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </motion.div>
            </div>

            {/* FLASHLIGHT OVERLAY (Matching Home.js) */}
            <motion.div
                className="fixed inset-0 z-[3] pointer-events-none"
                style={{ background: flashlightOverlay }}
            />

            {/* Main Content Area */}
            <div ref={containerRef} className="flex-1 w-full h-full overflow-y-auto relative z-10 no-scrollbar snap-y snap-proximity">

                {/* Sticky Header Link */}
                <div className="sticky top-0 z-[150] w-full pt-4 px-2">
                    <header className="py-4 md:py-6 flex justify-center items-center w-full">
                        <Link to="/events" className="group">
                            <h1 className="font-orbitron tracking-[0.2em] md:tracking-[0.3em] text-[12px] md:text-lg font-black uppercase pb-2 text-gray-400 group-hover:text-[#39ff14] relative transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 group-hover:after:w-full after:bg-[#39ff14] after:transition-all after:duration-500">
                                Competitions
                            </h1>
                        </Link>
                    </header>
                </div>

                <div className="w-full max-w-7xl mx-auto px-6 py-32 flex flex-col items-center">

                    {/* Hero Header */}
                    <motion.header
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-40 mt-12 snap-start"
                    >
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: "auto", opacity: 1 }}
                            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#39ff14]/20 bg-black/40 backdrop-blur-md mb-10 overflow-hidden"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse shadow-[0_0_8px_#39ff14]" />
                            <span className="text-[#39ff14] font-mono text-[10px] tracking-[0.4em] uppercase whitespace-nowrap">Status: Core Online</span>
                        </motion.div>

                        <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter mb-6 leading-[0.85] text-white uppercase italic">
                            TechVista<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39ff14] to-[#00ffd5] not-italic font-light">Partners</span>
                        </h1>
                        <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base uppercase tracking-[0.5em] font-light leading-relaxed">
                            Syncing with global industry leaders to synthesize future innovations.
                        </p>
                    </motion.header>

                    {/* Featured Carousel Feed */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="w-full mb-64 relative group"
                    >
                        <div className="absolute -top-12 left-0 font-mono text-[10px] text-[#39ff14] flex items-center gap-4">
                            <span className="w-12 h-[1px] bg-[#39ff14]/30" />
                            PRIMARY_PARTNER_STREAM_v2.6
                        </div>
                        <Carousel images={currentImages} />
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-64"
                    >
                        {[
                            { title: "Network Value", value: "₹5L+", label: "Total Prize Pool", sub: "Rewards Active" },
                            { title: "Traffic Density", value: "5000+", label: "Daily Footfall", sub: "Verified Users" },
                            { title: "Data Ingest", value: "200+", label: "Project Entries", sub: "Global Uploads" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover={{
                                    y: -10,
                                    borderColor: "rgba(57, 255, 20, 0.4)",
                                    boxShadow: "0 20px 40px -20px rgba(57, 255, 20, 0.2)"
                                }}
                                className="relative p-12 rounded-[2.5rem] bg-black/60 border border-white/10 backdrop-blur-xl overflow-hidden group transition-colors duration-500"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-[#39ff14]/5 rounded-bl-[2.5rem] flex items-center justify-center border-b border-l border-[#39ff14]/10">
                                    <span className="text-[#39ff14]/30 font-mono text-xs">0{i+1}</span>
                                </div>

                                <h3 className="text-[#39ff14] font-mono text-[10px] uppercase tracking-[0.6em] mb-12">{stat.title}</h3>
                                <div className="text-7xl font-black mb-4 tracking-tighter text-white group-hover:text-[#39ff14] transition-colors duration-500">
                                    {stat.value}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-300 text-xs uppercase tracking-widest font-bold">{stat.label}</span>
                                    <span className="text-gray-500 text-[10px] uppercase tracking-wider">{stat.sub}</span>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#39ff14] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Legacy Header Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="w-full flex flex-col items-center mb-16 text-center"
                    >
                         <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white/20 uppercase italic">Legacy Archive</h2>
                         <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-[#00ffd5]/50 to-transparent mt-2" />
                    </motion.div>

                    {/* Legacy Archive Carousel */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="w-full mb-48 group"
                    >
                         <div className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 transform group-hover:scale-[1.01]">
                            <Carousel images={pastImages} />
                         </div>
                    </motion.div>

                    {/* Terminal Footer */}
                    <footer className="w-full pb-20 pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex flex-col gap-2 font-mono">
                            <span className="text-[#39ff14] text-[10px] tracking-[0.4em]">SYSTEM_VERSION // 2026.01</span>
                            <span className="text-gray-500 text-[9px] uppercase tracking-widest leading-none">All Transmission Rights Reserved &copy; 2026</span>
                        </div>
                        <div className="flex items-center gap-10">
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "rgba(57, 255, 20, 0.15)",
                                    boxShadow: "0 0 20px rgba(57, 255, 20, 0.2)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 border border-[#39ff14]/30 text-[#39ff14] font-mono text-[10px] uppercase tracking-[0.3em] transition-all bg-black/40 backdrop-blur-sm"
                            >
                                Initiate_Interface
                            </motion.button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Sponsor;
