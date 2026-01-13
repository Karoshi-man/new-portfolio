"use client";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  { title: "Simplified", content: "Complex tasks are now simple", color: "#407AFF" },
  { title: "Boost Productivity", content: "Perform Tasks in less time", color: "#DD3E58" },
  { title: "Facilitated learning", content: "train anyone from anywhere", color: "#BA71F5" },
  { title: "Support", content: "Now its 24/7 support", color: "#F75CD0" },
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
    <div ref={containerRef} className="relative h-[400vh] w-full bg-transparent font-aes">
      <div className="sticky top-0 flex h-screen w-full overflow-hidden">
        
        {/* ЛІВА ЧАСТИНА */}
        <div className="w-1/2 flex flex-col justify-center items-center h-full z-10">
          {/* Зменшив від'ємний марджин для кращого балансу */}
          <div className="w-[420px] ml-[180px]"> 
            <h2 className="text-[84px] font-bold leading-[88px] tracking-tight">
              Selected Projects
            </h2>
            <div className="text-[16px] mt-[25px] leading-[1.6] max-w-[500px] opacity-90">
              A collection of projects where I transform complex ideas 
              into digital reality. My focus lies in writing clean, maintainable 
              code that deliver seamless experiences.
              <br />
              {/* Кнопка: зменшив padding по вертикалі (12px замість 16px) */}
              <button className="mt-6 px-7 py-3 bg-black text-white rounded-full text-[14px] font-medium hover:-translate-y-1 transition-all duration-300 shadow-sm active:scale-95 font-aes">
                See More Details
              </button>
            </div>
          </div>
        </div>

        {/* ПРАВА ЧАСТИНА */}
        <div className="w-1/2 flex items-center justify-center h-full relative">
          {/* gap між текстом і картками регулюється через ml тут */}
          <div className="relative w-[350px] h-[350px] ml-[40px]"> 
            {projects.map((project, index) => {
              const isPast = index < activeCard;
              const isActive = index === activeCard;
              
              const fanRotation = (index - activeCard) * 6; 
              
              let transformStyle = "";
              let opacity = 1;

              if (isPast) {
                // Виліт чітко вгору
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
                  className="absolute p-[35px] text-black shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700 ease-in-out border border-black/5"
                  style={{
                    width: "380px",
                    height: "380px",
                    borderRadius: "25px", // твій оригінальний радіус
                    backgroundColor: project.color,
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
                      <div className="text-[20px] font-bold mb-3">
                        {project.title}
                      </div>
                      <div className="text-[44px] font-bold leading-[52px]">
                        {project.content}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end border-t border-black/10 pt-5">
                      <span className="font-bold text-[16px] cursor-pointer hover:opacity-60 transition-opacity">
                        Details →
                      </span>
                      <span className="text-6xl font-bold opacity-10 select-none">
                        0{index + 1}
                      </span>
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