"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Play, Pause } from "lucide-react";
import { cn } from "../lib/utils";

interface VideoStepGuideProps {
    step: number;
    isVisible: boolean;
    onClose: () => void;
}

const stepVideos: Record<number, string> = {
    1: "TuDbyx2nVUs",
    2: "05L7n46UTVg",
    3: "6RR-efvsAr4",
    4: "QDQnK8hPMHY",
    5: "BbT8dYvNoHU",
    6: "aJbOc4o3VKc",
};

export default function VideoStepGuide({ step, isVisible, onClose }: VideoStepGuideProps) {
    const [isMinimized, setIsMinimized] = useState(false);

    if (!isVisible) return null;

    const videoId = stepVideos[step] || stepVideos[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    width: isMinimized ? "60px" : "300px",
                    height: isMinimized ? "60px" : "auto"
                }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                className={cn(
                    "fixed bottom-6 right-6 z-[100] bg-navy/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden shadow-primary/20 transition-all duration-500",
                    isMinimized && "rounded-full cursor-pointer hover:scale-110"
                )}
                onClick={() => isMinimized && setIsMinimized(false)}
            >
                {isMinimized ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <Play size={20} className="text-primary fill-current" />
                    </div>
                ) : (
                    <div className="relative group">
                        {/* Header Control */}
                        <div className="absolute top-3 right-3 z-[110] flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                                className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                            >
                                <Minimize2 size={14} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onClose(); }}
                                className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Video Layer (YouTube Embed) */}
                        <div className="aspect-[9/16] w-full bg-black relative">
                            <iframe
                                src={embedUrl}
                                title="Guía Alejandra"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* Caption Area */}
                        <div className="p-4 pt-3 flex items-center gap-3 bg-navy">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/80">
                                Guía Alejandra: Paso {step}
                            </p>
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
