"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { NewAnimation } from "@/app/constants"; 

// --- ДАНІ КАРТОК ---
const hobbies = [
  { 
    id: 'waterpolo', 
    title: "Waterpolo", 
    icon: "🤽‍♂️", 
    desc: "More than 10 years in professional sports. Team captain and multiple champion.", 
    btn: "Learn more", 
    color: "#0ea5e9", 
    action: "modal" 
  },
  { 
    id: 'university', 
    title: "Lviv Polytechnic", 
    icon: "🎓", 
    desc: "Studying Applied Mathematics and AI. Deep dive into algorithms and ML.", 
    btn: "View Diploma", 
    color: "#8b5cf6", 
    action: "modal" 
  },
  { 
    id: 'typing', 
    title: "Fast Typing", 
    icon: "⌨️", 
    desc: "Obsessed with efficiency. Consistently hitting top speeds in coding.", 
    btn: "Check Profile", 
    color: "#eab308", 
    action: "modal" 
  },
  { 
    id: 'chess', 
    title: "Chess", 
    icon: "♟️", 
    desc: "Strategic thinking and pattern recognition. Always up for a challenge.", 
    btn: "Challenge Me", 
    color: "#10b981", 
    action: "modal" 
  }
];

// --- ТИПИ ТА КОНТЕНТ МОДАЛОК ---
type ModalData = { 
  title: string; 
  description: string; 
  mediaSrc: string; 
  mediaType: 'image' | 'video'; 
  link?: string; 
  linkText?: string; 
};

const modalContent: Record<string, ModalData> = { 
  waterpolo: { 
    title: "Waterpolo 🤽‍♂️", 
    description: "Professional career spanning over 10 years. Discipline and teamwork.", 
    mediaSrc: "/img/waterpolo-card.jpeg", 
    mediaType: "image" 
  }, 
  university: { 
    title: "Lviv Polytechnic 🎓", 
    description: "Master's degree in Applied Mathematics. Specialization in AI.", 
    mediaSrc: "/img/uni-card.jpg", 
    mediaType: "image" 
  }, 
  typing: { 
    title: "Fast Typing ⌨️", 
    description: "I use Monkeytype to improve efficiency.", 
    mediaSrc: "/img/keyb.jpg", 
    mediaType: "image", 
    link: "https://monkeytype.com/profile/Martyyy46", 
    linkText: "View Monkeytype Profile" 
  }, 
  chess: { 
    title: "Chess ♟️", 
    description: "Daily training on Chess.com.", 
    mediaSrc: "./img/chess2.jpg", 
    mediaType: "image", 
    link: "https://www.chess.com/stats/overview/karnavaal46/0?", 
    linkText: "Challenge on Chess.com" 
  } 
};

const LifeHobbies = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeModal]);
  
  const currentHobby = activeModal ? hobbies.find(h => h.id === activeModal) : null;

  return (
    <>
      {/* 👇 ОНОВЛЕНО: Ідеальне центрування по вертикалі та горизонталі */}
      <div className="w-full h-full flex flex-col items-center justify-center font-aes relative overflow-hidden px-6">
        
        {/* Background Glow */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-teal-400/20 blur-[60px] rounded-full opacity-40 dark:opacity-30 pointer-events-none" 
          style={{ maskImage: "radial-gradient(circle, black 0%, transparent 60%)", WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 60%)" }} 
        />

        <div className="relative z-20 max-w-6xl w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {hobbies.map((item, index) => {
              const isBlurred = hoveredIndex !== null && hoveredIndex !== index;
              return (
                <motion.div 
                  key={item.id} 
                  {...NewAnimation} 
                  transition={{ ...NewAnimation.transition, delay: index * 0.1 }} 
                  onMouseEnter={() => setHoveredIndex(index)} 
                  onMouseLeave={() => setHoveredIndex(null)} 
                  onClick={() => setActiveModal(item.id)}
                  className={`
                    relative group overflow-hidden h-[280px] w-full rounded-[30px] 
                    bg-white/90 border border-neutral-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                    dark:bg-gray-800/40 dark:border-white/10 dark:shadow-none 
                    backdrop-blur-xl flex flex-col justify-between p-8 
                    transition-all duration-500 ease-out cursor-pointer 
                    ${isBlurred ? "blur-sm opacity-40 scale-95 grayscale" : "opacity-100 scale-100"}
                  `}
                  whileHover={{ borderColor: item.color, boxShadow: `0 0 30px ${item.color}30` }}
                >
                  
                  <div 
                    className="absolute -right-2 -bottom-6 text-[120px] md:text-[140px] opacity-[0.05] dark:opacity-[0.1] pointer-events-none transition-colors duration-300 select-none grayscale group-hover:grayscale-0" 
                    style={{ color: hoveredIndex === index ? item.color : "currentColor" }}
                  >
                    {item.icon}
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-sm uppercase tracking-[3px] opacity-50 mb-2 text-black dark:text-white font-bold">
                      0{index + 1}
                    </p>
                    <h3 className="text-3xl font-bold leading-tight text-black dark:text-white group-hover:translate-x-2 transition-transform duration-500">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-lg opacity-70 text-black dark:text-white font-light line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-between mt-auto pt-4">
                    <div className="flex items-center gap-3">
                      <span 
                        className="w-3 h-3 rounded-full transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_10px_currentColor]" 
                        style={{ backgroundColor: item.color }} 
                      />
                      <span className="text-md font-bold uppercase tracking-wider opacity-80 text-black dark:text-white">
                        {item.btn}
                      </span>
                    </div>
                    <span 
                      className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-2xl" 
                      style={{ color: item.color }}
                    >
                      →
                    </span>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- МОДАЛЬНЕ ВІКНО --- */}
      {mounted && createPortal(
        <AnimatePresence>
          {activeModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.4 }} 
                onClick={() => setActiveModal(null)} 
                className="absolute inset-0 bg-black/60 backdrop-blur-xl" 
              />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-6xl w-full pointer-events-none">
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, x: -50 }} 
                  animate={{ opacity: 1, scale: 1, x: 0 }} 
                  exit={{ opacity: 0, scale: 0.9, x: -50 }} 
                  transition={{ type: "spring", damping: 25, stiffness: 200 }} 
                  onClick={(e) => e.stopPropagation()} 
                  className="pointer-events-auto relative shrink-0 w-full md:w-auto flex justify-center"
                >
                  {modalContent[activeModal].mediaType === 'video' ? (
                    <div className="relative overflow-hidden w-full max-w-[600px] md:w-[500px] aspect-video md:aspect-[4/3] rounded-[30px] shadow-2xl border border-white/10 bg-black">
                      <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source src={modalContent[activeModal].mediaSrc} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    </div>
                  ) : (
                    <img 
                      src={modalContent[activeModal].mediaSrc} 
                      alt={modalContent[activeModal].title} 
                      className="w-auto h-auto max-w-full md:max-w-[600px] max-h-[50vh] md:max-h-[600px] object-contain rounded-[30px] shadow-2xl border border-white/10" 
                    />
                  )}
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 100 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 100 }} 
                  transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.1 }} 
                  onClick={(e) => e.stopPropagation()} 
                  className="pointer-events-auto relative w-full md:max-w-lg bg-white/90 dark:bg-gray-900/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl flex flex-col justify-center"
                >
                  
                  <button 
                    onClick={() => setActiveModal(null)} 
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-2xl"
                  >
                    &times;
                  </button>
                  
                  <h3 className="text-4xl md:text-5xl font-bold font-aes mb-6 text-black dark:text-white leading-tight">
                    {modalContent[activeModal].title}
                  </h3>
                  
                  <div 
                    className="w-20 h-1.5 mb-8 rounded-full" 
                    style={{ backgroundColor: currentHobby?.color || '#ccc' }} 
                  />
                  
                  <p className="text-xl opacity-80 font-aes text-black dark:text-white leading-relaxed mb-8">
                    {modalContent[activeModal].description}
                  </p>
                  
                  {modalContent[activeModal].link && (
                    <a 
                      href={modalContent[activeModal].link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg" 
                      style={{ backgroundColor: currentHobby?.color || 'black', boxShadow: `0 10px 30px -10px ${currentHobby?.color}60` }}
                    >
                      {modalContent[activeModal].linkText} ↗
                    </a>
                  )}

                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default LifeHobbies;