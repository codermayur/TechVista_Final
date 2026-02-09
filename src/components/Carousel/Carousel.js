import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        scale: 1.1,
        filter: "blur(12px)",
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
        }
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        scale: 0.9,
        filter: "blur(12px)",
        transition: { duration: 0.4 }
    })
};

const Carousel = ({ images = [] }) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isHovered, setIsHovered] = useState(false);

    // Replacement for the popmotion 'wrap' function
    // Formula: ((n % m) + m) % m ensures a positive index even with negative numbers
    const imageIndex = ((page % images.length) + images.length) % images.length;

    const paginate = useCallback((newDir) => {
        setPage([page + newDir, newDir]);
    }, [page]);

    useEffect(() => {
        if (isHovered || !images.length) return;
        const timer = setInterval(() => paginate(1), 5000);
        return () => clearInterval(timer);
    }, [paginate, isHovered, images.length]);

    if (!images || images.length === 0) {
        return (
            <div className="w-full aspect-video rounded-[2.5rem] bg-zinc-950 border border-emerald-500/20 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 animate-spin rounded-full" />
                <span className="text-emerald-500/50 font-mono text-xs uppercase tracking-[0.3em]">Stream Offline</span>
            </div>
        );
    }

    return (
        <section
            className="relative w-full max-w-6xl mx-auto mb-48 group select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main Frame */}
            <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-br from-emerald-500/30 via-white/5 to-white/10 shadow-2xl overflow-hidden">
                <div className="relative aspect-video rounded-[2.4rem] overflow-hidden bg-black border border-white/5">

                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.img
                            key={page}
                            src={images[imageIndex]}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 w-full h-full object-cover"
                            draggable="false"
                        />
                    </AnimatePresence>

                    {/* HUD Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
                    <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.12] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]" />

                    {/* Navigation Buttons */}
                    <div className="absolute inset-0 z-40 flex items-center justify-between px-6">
                        <button onClick={() => paginate(-1)} className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/50 hover:text-emerald-400 hover:border-emerald-500/50 transition-all opacity-0 group-hover:opacity-100">❮</button>
                        <button onClick={() => paginate(1)} className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/50 hover:text-emerald-400 hover:border-emerald-500/50 transition-all opacity-0 group-hover:opacity-100">❯</button>
                    </div>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-4 mt-8">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            const distance = i - imageIndex;
                            paginate(distance);
                        }}
                        className="group relative py-4"
                    >
                        <div className={`h-[2px] transition-all duration-500 rounded-full ${
                            i === imageIndex ? 'w-12 bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'w-4 bg-white/20 group-hover:bg-white/40'
                        }`} />
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Carousel;
