"use client";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef, createContext, useContext, useState } from "react";


// --- CONTEXT SETUP ---
type SectionContextType = {
  activeId: string;
  setActiveId: (id: string) => void;
};
const SectionContext = createContext<SectionContextType>({
  activeId: "",
  setActiveId: () => {},
});
export const useSectionTracker = () => useContext(SectionContext);
export const SectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeId, setActiveId] = useState("");
  return (
    <SectionContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </SectionContext.Provider>
  );
};


// --- CONFIG ---
const smoothConfig = { 
  mass: 0.08,      // легша маса = швидша реакція
  stiffness: 100,  // м'якша пружина
  damping: 20,     // менше затухання для плавності
  restDelta: 0.0001 
};


// fade out
const fastConfig = {
  mass: 0.05,
  stiffness: 150,
  damping: 18,
  restDelta: 0.0001
};


// --- 1. HERO WRAPPER ---
export function HeroWrapper({ children, id }: { children: React.ReactNode; id?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveId } = useSectionTracker();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (id && latest > 0 && latest < 0.6) {
      setActiveId(id);
    }
  });
  // fade out
  const smoothY = useSpring(scrollYProgress, fastConfig);
  const opacity = useTransform(smoothY, [0, 0.15, 0.5], [1, 1, 0]);
  const scale = useTransform(smoothY, [0, 0.6], [1, 0.92]);
  const y = useTransform(smoothY, [0, 0.6], ["0%", "8%"]);
  const filter = useTransform(smoothY, [0, 0.4], ["blur(0px)", "blur(12px)"]);
  return (
    <div id={id} ref={containerRef} className="relative h-[115vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        <motion.div 
          style={{ opacity, scale, y, filter }} 
          className="w-full h-full will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}


// --- 2. TITLE WRAPPER ---
export function TitleWrapper({ text, className = "", id }: { text: string; className?: string; id?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveId } = useSectionTracker();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Змінений offset - секція починає анімацію раніше
    offset: ["start 85%", "end 15%"],
  });
  // Відстеження активності (коли текст по центру екрану)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (id && latest > 0.35 && latest < 0.65) {
      setActiveId(id);
    }
  });
  const smoothY = useSpring(scrollYProgress, smoothConfig);
  // Покращені криві для плавнішого fade in/out
  // Швидший fade in (0 -> 0.25), довше видно (0.25 -> 0.75), швидкий fade out (0.75 -> 1)
  const opacity = useTransform(smoothY, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothY, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);
  // Менший рух по Y для плавності
  const y = useTransform(smoothY, [0, 0.5, 1], [40, 0, -40]);
  return (
    // Зменшена висота - швидші переходи між секціями
    <section id={id} ref={containerRef} className="relative h-[100vh] z-10 pointer-events-none">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.h2
          style={{ opacity, scale, y }}
          className={`font-bold font-aes text-black dark:text-white tracking-[0.2em] 
          text-[60px] md:text-[90px] lg:text-[120px] text-center will-change-transform ${className}`}
        >
          {text}
        </motion.h2>
      </div>
    </section>
  );
}


// --- 3. STACK WRAPPER ---
export function StackWrapper({ children, id }: { children: React.ReactNode; id?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveId } = useSectionTracker();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Раніше починає з'являтися
    offset: ["start 90%", "start 40%"], 
  });
  // Відстеження активності
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (id && latest > 0.3) {
      setActiveId(id);
    }
  });
  
  const smoothY = useSpring(scrollYProgress, smoothConfig);
  // Плавніший fade in
  const opacity = useTransform(smoothY, [0, 0.6], [0, 1]);
  const y = useTransform(smoothY, [0, 0.8], [30, 0]);
  const scale = useTransform(smoothY, [0, 0.8], [0.98, 1]);
  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity, y, scale }}
      // Менший від'ємний margin для кращого з'єднання секцій
      className="relative z-20 w-full min-h-screen bg-transparent -mt-[8vh]"
    >
      {children}
    </motion.div>
  );
}


// --- 4. SPACER ---
export function Spacer({ height = "15vh" }: { height?: string }) {
  return <div style={{ height }} className="w-full" />;
}


// --- 5. FADE WRAPPER (Додатковий компонент для окремих елементів) ---
export function FadeWrapper({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 60%"],
  });
  const smoothY = useSpring(scrollYProgress, smoothConfig);
  const opacity = useTransform(smoothY, [0, 1], [0, 1]);
  const y = useTransform(smoothY, [0, 1], [25, 0]);
  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      transition={{ delay }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}