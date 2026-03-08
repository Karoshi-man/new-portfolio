"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Tech Stack" },
  { id: "languages", label: "Languages" },
  { id: "life", label: "Life & Hobbies" },
  { id: "connections", label: "Connections" }
];

export default function SectionIndicator() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = id === "hero" ? 0 : window.innerHeight * 0.7; 
      const targetY = el.getBoundingClientRect().top + window.scrollY + offset;
      
      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      });
    }
  };

  return (
    // 👇 ДОДАНО: mix-blend-difference та text-white. 
    // Це зробить індикатор білим на чорному і чорним на білому АВТОМАТИЧНО!
    <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-3 font-aes mix-blend-difference text-white">
      {sections.map((s, index) => {
        const isActive = activeSection === s.id;
        const number = `0${index + 1}`;

        return (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            className="relative group flex items-center h-8 outline-none cursor-pointer"
          >
            {/* МІНІМАЛІСТИЧНИЙ КОНТЕЙНЕР ДЛЯ ЛІНІЇ/КРАПКИ */}
            <div className="relative flex items-center justify-center w-4 h-full">
              {/* Мікро-крапка (Неактивна) */}
              <div 
                className={`w-1 h-1 rounded-full bg-white transition-all duration-300 ${
                  isActive 
                    ? "opacity-0" 
                    : "opacity-30 group-hover:opacity-100 group-hover:scale-150"
                }`} 
              />

              {/* Магнітний ліфт (Активна лінія - ультратонка) */}
              {isActive && (
                <motion.div
                  layoutId="activeSectionIndicator"
                  className="absolute w-[2px] h-8 bg-white rounded-full"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </div>

            {/* ПІДКАЗКА (Тільки при наведенні, ніякого фону) */}
            <div 
              className="absolute left-6 flex items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap">
                <span className="opacity-50 mr-2">{number}</span>
                {s.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}