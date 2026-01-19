"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const languages = [
  { 
    id: "UA",
    name: "Ukrainian",
    text: "Native Speaker", 
    level: "C2",
    percent: 100, 
    color: "#FFD700" 
  },
  { 
    id: "EN",
    name: "English",
    text: "Professional Proficiency", 
    level: "C1",
    percent: 75,
    color: "#3b82f6" 
  },
  { 
    id: "PL",
    name: "Polish",
    text: "Advanced Communication", 
    level: "B2",
    percent: 60,
    color: "#ef4444" 
  },
  { 
    id: "DE",
    name: "German",
    text: "Intermediate Learner", 
    level: "A2",
    percent: 40,
    color: "#f59e0b" 
  },
];

export default function Languages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // 👇 Це важливо для sticky: починаємо, коли верх секції торкається верху екрану
    offset: ["start start", "end end"],
  });

  // 👇 Анімація появи та зникнення при скролі
  // [0, 0.1] -> плавна поява на початку
  // [0.9, 1] -> плавне зникнення в кінці
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.9, 1], [1, 0.95]); // Трохи зменшується в кінці

  return (
    // 👇 1. Робимо секцію високою (250vh), щоб було місце для скролу
    <div ref={containerRef} className="relative h-[250vh] w-full font-aes">
      
      {/* 👇 2. Sticky контейнер, який тримає контент на екрані */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        <motion.div 
          style={{ opacity, scale }}
          className="w-full max-w-4xl px-6"
        >

          {/* СПИСОК МОВ */}
          <div className="flex flex-col">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                
                onMouseEnter={() => setHoveredLang(lang.id)}
                onMouseLeave={() => setHoveredLang(null)}
                
                className={`
                  group relative flex flex-col md:flex-row md:items-center justify-between
                  py-8 md:py-10 border-b border-black/5 dark:border-white/5
                  transition-colors duration-300
                  ${index === languages.length - 1 ? "border-none" : ""}
                `}
              >
                
                {/* ЛІВА ЧАСТИНА */}
                <div className="flex items-center gap-6 md:gap-12 relative z-10">
                  <span 
                    className="text-5xl md:text-6xl font-black opacity-10 dark:opacity-[0.07] w-[80px] transition-all duration-500"
                    style={{ 
                      color: hoveredLang === lang.id ? lang.color : "currentColor",
                      opacity: hoveredLang === lang.id ? 0.3 : undefined 
                    }}
                  >
                    {lang.id}
                  </span>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-1">
                      {lang.name}
                    </h3>
                    <p className="text-sm md:text-base opacity-50 text-black dark:text-white font-light tracking-wide">
                      {lang.text}
                    </p>
                  </div>
                </div>

                {/* ПРАВА ЧАСТИНА */}
                <div className="mt-6 md:mt-0 flex flex-col items-end gap-2 w-full md:w-1/3">
                   <div className="flex justify-between w-full text-black dark:text-white">
                      <span className="text-xs font-bold uppercase tracking-widest opacity-30">Level</span>
                      <span className="text-xl font-bold opacity-80">{lang.level}</span>
                   </div>

                   {/* ФОН ЛІНІЇ */}
                   <div className="w-full h-[4px] bg-black/5 dark:bg-white/5 
                   rounded-full overflow-hidden relative">
                      
                      {/* ЛІНІЯ ПРОГРЕСУ */}
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        transition={{ duration: 1.5, ease: "circOut", delay: 0.2 + (index * 0.1) }}

                        className="h-full rounded-full absolute top-0 left-0 
                        bg-black/40 dark:bg-white/40"
                      />
                   </div>
                </div>

              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  );
}