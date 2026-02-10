import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import SidebarNav from '../components/Nav/SidebarNav.js';
import SocialSidebar from '../components/Nav/SocialSidebar.js';
import Footer from '../components/Nav/Footer.js';
import Preloader from '../components/Common/Preloader.js';
import '../App.css';

const useScrollNavigation = (maxState, scrollCooldown) => {
    const [currentState, setCurrentState] = useState(0);
    const [canScroll, setCanScroll] = useState(true);
    const stateRef = useRef(0);

    const goToState = (newState) => {
        if (newState < 0 || newState > maxState || !canScroll) return;

        setCanScroll(false);
        setCurrentState(newState);
        stateRef.current = newState;

        setTimeout(() => {
            setCanScroll(true);
        }, scrollCooldown);
    };

    useEffect(() => {
        const handleWheel = (event) => {
            if (!canScroll) return;
            if (event.deltaY > 0) {
                if (stateRef.current < maxState) goToState(stateRef.current + 1);
            } else if (event.deltaY < 0) {
                if (stateRef.current > 0) goToState(stateRef.current - 1);
            }
        };

        let touchStartY = 0;
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (!canScroll) {
                if (e.cancelable) e.preventDefault();
            }
        };

        const handleTouchEnd = (e) => {
            if (!canScroll) return;
            const deltaY = touchStartY - e.changedTouches[0].clientY;

            if (Math.abs(deltaY) > 70) {
                if (deltaY > 0 && stateRef.current < maxState) {
                    goToState(stateRef.current + 1);
                } else if (deltaY < 0 && stateRef.current > 0) {
                    goToState(stateRef.current - 1);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [canScroll, maxState]);

    return { currentState, goToState, canScroll };
};

const Drone = ({ side, mouseX, mouseY }) => {
    const gimbalRef = useRef(null);
    const springRotation = useSpring(0, { damping: 30, stiffness: 150 });

    useLayoutEffect(() => {
        const updateRotation = () => {
            if (!gimbalRef.current) return;
            const rect = gimbalRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top;
            const dx = mouseX.get() - centerX;
            const dy = mouseY.get() - centerY;
            const angleRad = Math.atan2(dy, dx);
            const angleDeg = angleRad * (180 / Math.PI);
            springRotation.set(angleDeg - 90);
        };
        const unsubX = mouseX.on("change", updateRotation);
        const unsubY = mouseY.on("change", updateRotation);
        return () => { unsubX(); unsubY(); };
    }, [mouseX, mouseY, springRotation]);

    return (
        <div className={`drone-unit drone-${side}`}>
            <div className="drone-arm arm-left"><div className="motor-hub"><div className="propeller"></div></div></div>
            <div className="drone-arm arm-right"><div className="motor-hub"><div className="propeller"></div></div></div>
            <div className="drone-chassis"></div>
            <div className="mounting-bracket">
                <motion.div
                    ref={gimbalRef}
                    className="gimbal-frame"
                    style={{ rotate: springRotation, originX: "50%", originY: "0%" }}
                >
                    <div className="light-pod">
                        <div className="pod-lens"></div>
                        <div className="spotlight-beam"></div>
                    </div>
                </motion.div>
</div>
        </div>
    );
};

const HeroSection = () => (
    <div id="hero-text" className="w-full relative z-10 flex flex-col justify-center items-center h-full">
        {/* VSIT PRESENTS - Cyberframe Header */}
        <div className="fade-in-up delay-1 mb-2">
            <div className="flex flex-col items-center">
                <div className="w-24 h-[3px] bg-[#00ffd5] mb-2 shadow-[0_0_15px_#00ffd5]"></div>
                <p className="text-white text-2xl md:text-4xl tracking-[0.4em] font-black text-center uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    VSIT PRESENTS
                </p>
                <div className="w-24 h-[3px] bg-[#00ffd5] mt-2 shadow-[0_0_15px_#00ffd5]"></div>
            </div>
        </div>

        <div className="w-full flex flex-col items-center my-4 md:my-8">
            <div className="relative">
                {/* HUD Elements around logo */}
                <div className="absolute -inset-10 border border-[#00ffd5]/5 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none"></div>
                <div className="absolute -inset-16 border border-[#00ffd5]/5 rounded-full animate-[spin_30s_linear_infinite_reverse] pointer-events-none"></div>

                <img
                    src="../files/Untitled.png"
                    alt="TechVista"
                    className="w-auto h-24 md:h-44 lg:h-52 glitch fade-in-up delay-2 object-contain mx-auto relative z-10 filter drop-shadow-[0_0_20px_rgba(0,255,213,0.2)]"
                />
            </div>

            {/* DATES - Technical Data Block */}
            <div className="flex flex-col items-center mt-6 fade-in-up delay-3">
                <div className="flex items-baseline gap-2">
                    <span className="text-[#00ffd5] font-orbitron text-xs font-bold opacity-50">[ DATE ]</span>
                    <p className="font-orbitron text-xl md:text-4xl text-white tracking-[0.15em] font-bold">
                        27<span className="text-[#00ffd5]">—</span>28
                    </p>
                    <p className="font-orbitron text-lg md:text-3xl text-[#00ffd5] tracking-[0.1em] font-light uppercase">
                        FEB
                    </p>
                </div>

                <div className="mt-2 flex flex-col items-center">
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ffd5]/50 to-transparent"></div>
                    <p className="font-orbitron text-5xl md:text-8xl text-white tracking-[-0.05em] font-black leading-none py-2">
                        2026
                    </p>
                    <div className="w-full h-[4px] bg-[#00ffd5] shadow-[0_0_15px_#00ffd5]"></div>
                </div>
            </div>
        </div>

        <div className="flex flex-col items-center gap-6 mt-4">
            <div className="fade-in-up delay-6 text-center">
                <p className="text-white/60 text-[10px] md:text-xs font-orbitron tracking-[0.4em] uppercase mb-1">Sector Architecture</p>
                <p className="text-[#00ffd5] text-xl md:text-3xl tracking-[0.2em] font-black uppercase italic drop-shadow-[0_0_10px_#00ffd5]">
                    Simulated Paradigm
                </p>
            </div>


        </div>
    </div>
);

const AftermovieSection = () => (
    <div id="aftermovie-content" className="w-full px-4 md:px-0 flex flex-col items-center justify-center h-full">
        <h2 className="font-orbitron text-xl md:text-4xl lg:text-6xl font-bold uppercase tracking-widest text-white text-neon-pink mb-8 relative z-[105]">Aftermovie</h2>
        <div className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-2xl video-container relative z-10">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/8of5w7RgcTc" title="TechVista" frameBorder="0" allowFullScreen></iframe>
        </div>
    </div>
);

const AboutSection = () => (
    <div id="about-us-content" className="w-full px-4 md:px-0 flex flex-col items-center justify-center h-full">
        <h2 className="font-orbitron text-xl md:text-4xl lg:text-6xl font-bold uppercase tracking-widest text-white text-neon-pink mb-8 relative z-10">About TechVista</h2>
        <div className="w-full max-w-3xl bg-black/20 backdrop-blur-lg rounded-lg border border-[#00ffd5]/20 p-6 md:p-8 description-box relative z-10">
            <p className="text-[10px] md:text-lg lg:text-xl text-gray-300 leading-relaxed font-light text-center">
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
    </div>
);

const Home = () => {
    const [isLoading, setIsLoading] = useState(() => {
        return sessionStorage.getItem('hasLoaded') !== 'true';
    });

    const maxState = 2;
    const scrollCooldown = 1000;
    const { currentState, goToState, canScroll } = useScrollNavigation(maxState, scrollCooldown);
    const [activeNav, setActiveNav] = useState('home');

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 150 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 150 });

    const paginatorDotsRef = useRef([]);
    const paginatorPillRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        const handleTouchMoveDrones = (e) => {
            if (e.touches.length > 0) {
                mouseX.set(e.touches[0].clientX);
                mouseY.set(e.touches[0].clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMoveDrones, { passive: true });

        if (isLoading) {
            const timer = setTimeout(() => {
                sessionStorage.setItem('hasLoaded', 'true');
                setIsLoading(false);
            }, 4000);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('touchmove', handleTouchMoveDrones);
                clearTimeout(timer);
            };
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMoveDrones);
        };
    }, [mouseX, mouseY, isLoading]);

    const getStateClass = () => currentState === 1 ? 'state-aftermovie' : currentState === 2 ? 'state-about-us' : '';

    useLayoutEffect(() => {
        if (!isLoading && paginatorPillRef.current && paginatorDotsRef.current[currentState]) {
            const activeDot = paginatorDotsRef.current[currentState];
            const dotCenter = activeDot.offsetTop + (activeDot.offsetHeight / 2);
            const pillHalfHeight = paginatorPillRef.current.offsetHeight / 2;
            const targetY = dotCenter - pillHalfHeight;
            paginatorPillRef.current.style.transform = `translate(-50%, ${targetY}px)`;
        }
    }, [currentState, isLoading]);

    const flashlightOverlay = useTransform([smoothX, smoothY], ([x, y]) =>
        `radial-gradient(circle 500px at ${x}px ${y}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 100%)`
    );

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 1 }} style={{position: 'fixed', inset: 0, zIndex: 10000}}>
                        <Preloader />
                    </motion.div>
                )}
            </AnimatePresence>

            <div ref={containerRef} className={`app-container relative h-screen text-white overflow-hidden bg-black flex flex-col ${getStateClass()}`}>
                <div className="fixed inset-0 z-[1] h-screen w-screen overflow-hidden pointer-events-none">
                    <video className="w-full h-full object-cover" src="../files/hehe.mp4" autoPlay loop muted playsInline />
                </div>

                <motion.div className="fixed inset-0 z-[3] pointer-events-none" style={{ background: flashlightOverlay }} />
                <div className="fixed top-4 left-4 md:top-6 md:left-6 z-[200] font-orbitron text-xl md:text-3xl font-bold text-white">
                        <img
                            src="/logo.png"
                            alt="TechVista"
                            className="h-12 md:h-16 w-auto" // Added sizing to ensure it shows up!
                        />
                    </div>

                <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} onHomeClick={goToState} />
                <SocialSidebar />
                <Footer activeNav={activeNav} setActiveNav={setActiveNav} onHomeClick={goToState} />

                <Drone side="left" mouseX={mouseX} mouseY={mouseY} />
                <Drone side="right" mouseX={mouseX} mouseY={mouseY} />

                <div id="scroll-paginator" className="z-[130]">
                    <div ref={paginatorPillRef} className="paginator-pill"></div>
                    {[0, 1, 2].map((idx) => (
                        <div key={idx} ref={(el) => (paginatorDotsRef.current[idx] = el)}
                            className={`paginator-dot ${currentState === idx ? 'active' : ''}`}
                            onClick={() => canScroll && goToState(idx)}></div>
                    ))}
                </div>

                <main className="flex-1 flex flex-col relative z-[10] overflow-hidden no-scrollbar">
                    <div className="flex-1 flex flex-col items-center justify-center ml-4 md:ml-24 mr-4 md:mr-24 relative">
                        <header className="absolute top-0 py-6 md:py-10 z-40">
                            <Link to="/events">
                                <h1 className="font-orbitron tracking-[0.3em] text-sm md:text-lg font-black uppercase text-gray-300 hover:text-[#39ff14] transition-all duration-300">
                                    Competitions
                                </h1>
                            </Link>
                        </header>

                        <div className="w-full h-full flex flex-col items-center justify-center relative">
                            {currentState === 0 && <HeroSection />}
                            {currentState === 1 && <AftermovieSection />}
                            {currentState === 2 && <AboutSection />}

                            <div className="scroll-indicator z-[110]" onClick={() => canScroll && currentState < maxState && goToState(currentState + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#d7fff1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;
