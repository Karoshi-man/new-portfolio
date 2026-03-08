"use client";
import { motion } from "framer-motion";
import { useState } from "react";

// --- ДАНІ МОВ (без змін) ---
const languages = [
  { id: "UA", name: "Ukrainian", text: "Native Speaker", level: "C2", percent: 100, color: "#FFD700" },
  { id: "EN", name: "English", text: "Professional Proficiency", level: "C1", percent: 75, color: "#3b82f6" },
  { id: "PL", name: "Polish", text: "Advanced Communication", level: "B2", percent: 60, color: "#ef4444" },
  { id: "DE", name: "German", text: "Intermediate Learner", level: "A2", percent: 40, color: "#f59e0b" },
];

export default function Languages() {
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  return (
    // 👇 ОНОВЛЕНО: flex-col, justify-start, pt-40 (відступ від фонового заголовка), pb-[30vh] (гарантований порожній простір)
    <div className="w-full h-full flex flex-col items-center justify-center font-aes px-6">
      
      <div className="w-full max-w-4xl relative z-20">
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
                py-8 md:py-10 border-b border-black/5 dark:border-white/5 transition-colors duration-300
                ${index === languages.length - 1 ? "border-none" : ""}
              `}
            >
              {/* ЛІВА ЧАСТИНА (без змін) */}
              <div className="flex items-center gap-6 md:gap-12 relative z-10">
                <span className="text-5xl md:text-6xl font-black opacity-10 dark:opacity-[0.07] w-[80px] transition-all duration-500" style={{ color: hoveredLang === lang.id ? lang.color : "currentColor", opacity: hoveredLang === lang.id ? 0.3 : undefined }}>{lang.id}</span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-1">{lang.name}</h3>
                  <p className="text-sm md:text-base opacity-50 text-black dark:text-white font-light tracking-wide">{lang.text}</p>
                </div>
              </div>
              {/* ПРАВА ЧАСТИНА (без змін) */}
              <div className="mt-6 md:mt-0 flex flex-col items-end gap-2 w-full md:w-1/3">
                 <div className="flex justify-between w-full text-black dark:text-white">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-30">Level</span>
                    <span className="text-xl font-bold opacity-80">{lang.level}</span>
                 </div>
                 <div className="w-full h-[4px] bg-black/5 dark:bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${lang.percent}%` }} transition={{ duration: 1.5, ease: "circOut", delay: 0.2 + (index * 0.1) }} className="h-full rounded-full absolute top-0 left-0 bg-black/40 dark:bg-white/40" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}