"use client";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { useRef, useState } from "react";
import { smoothTransition } from "../app/constants";

const projects = [
  { 
    title: "RAG Assistant", 
    content: "Chat with PDFs via LLM", 
    color: "#fbbf24" 
  },
  { 
    title: "Neural Vision", 
    content: "Real-time Object Detection", 
    color: "#fb923c" 
  },
  { 
    title: "Market Predictor", 
    content: "Time-Series Forecasting", 
    color: "#f87171" 
  },
  { 
    title: "Voice Intelligence", 
    content: "Whisper Speech-to-Text", 
    color: "#f472b6" 
  },
];

export default function StackArea() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsLength = projects.length;
    const index = Math.min(Math.floor(latest * cardsLength), cardsLength - 1);
    setActiveCard(index);
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-transparent font-aes 
    transition-colors duration-500">
      <div className="sticky top-0 flex h-screen w-full overflow-hidden">
        
        {/* ЛІВА ЧАСТИНА */}
        <div className="w-1/2 flex flex-col justify-center items-center h-full z-10">
          <div className="w-[420px] ml-[180px]"> 
            <h2 className="text-[84px] font-bold leading-[88px] tracking-tight 
            text-black dark:text-white transition-colors duration-500">
              Selected Projects
            </h2>
            <div className="text-[16px] mt-[25px] leading-[1.6] max-w-[500px] 
            opacity-90 text-black dark:text-white transition-colors duration-500">
              A collection of projects where transform complex ideas...
              <br />
              <motion.button 
                whileHover={{ y: -5, backgroundColor: "rgba(128, 128, 128, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ ...smoothTransition, delay: 0.4 }}
                className="mt-6 px-10 py-3 border-2 border-black dark:border-white 
                rounded-4xl text-[16px] font-bold font-aes text-black dark:text-white 
                text-center tracking-[2px] transition-colors duration-500 cursor-pointer"
              >
                See More
              </motion.button>
            </div>
          </div>
        </div>

        {/* ПРАВА ЧАСТИНА */}
        <div className="w-1/2 flex items-center justify-center h-full relative">
          
          {/* 👇 НОВИНКА: ФОНОВЕ СВІТІННЯ (GLOW)
              Воно стоїть позаду карток і створює ефект глибини для скла */}
<div 
            className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 
            w-[700px] h-[700px] rounded-full 
            transition-colors duration-1000 ease-in-out pointer-events-none
            opacity-50 dark:opacity-30"
            style={{ 
              backgroundColor: projects[activeCard].color,
              // 👇 Ця магія робить краї невидимими:
              // Ми кажемо браузеру: показуй центр (black), а краї роби прозорими (transparent)
              maskImage: "radial-gradient(circle, black 0%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 70%)",
              // Додатковий блюр для м'якості
              filter: "blur(60px)" 
            }}
          />

          <div className="relative w-[350px] h-[350px] ml-[40px]"> 
            {projects.map((project, index) => {
              const isPast = index < activeCard;
              const isActive = index === activeCard;
              const fanRotation = (index - activeCard) * 6; 
              
              let transformStyle = "";
              let opacity = 1;

              if (isPast) {
                transformStyle = "translate(-50%, -160%) rotate(0deg)";
                opacity = 0;
              } else if (isActive) {
                transformStyle = "translate(-50%, -50%) rotate(0deg)";
                opacity = 1;
              } else {
                transformStyle = `translate(-50%, -50%) rotate(${fanRotation}deg)`;
                opacity = 1;
              }

              return (
                <div
                  key={index}
                  // 👇 ОНОВЛЕНИЙ СТИЛЬ КАРТКИ ДЛЯ ТЕМНОЇ ТЕМИ
                  className="absolute p-[35px] 
                  transition-all duration-700 ease-in-out 
                  rounded-[30px] border 
                  
                  /* Light Mode: Біле скло */
                  border-black/5 bg-white/60 shadow-xl
                  
                  /* Dark Mode: Темне, глибоке скло */
                  dark:border-white/10 dark:bg-gray-800/40 
                  dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
                  
                  backdrop-blur-xl
                  text-black dark:text-white"
                  
                  style={{
                    width: "380px",
                    height: "380px",
                    top: "50%",
                    left: "20%",
                    transform: transformStyle,
                    opacity: opacity,
                    zIndex: projects.length - index,
                    visibility: isPast && opacity === 0 ? "hidden" : "visible",
                  }}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div 
                        className="text-[24px] font-bold mb-3 drop-shadow-sm"
                        style={{ color: project.color }}
                      >
                        {project.title}
                      </div>
                      <div className="text-[44px] font-bold leading-[52px] text-black dark:text-white">
                        {project.content}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end border-t border-black/10 dark:border-white/10 pt-5">
                      <span className="font-bold text-[16px] uppercase tracking-widest opacity-80 text-black dark:text-white">
                        View Case
                      </span>
                      <div className="flex items-center gap-2">
                         <span style={{ color: project.color }} className="text-2xl">→</span>
                         <span className="text-6xl font-bold opacity-10 select-none text-black dark:text-white">
                            0{index + 1}
                         </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}