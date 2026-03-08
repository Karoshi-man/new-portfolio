"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

export default function StackingWrapper({ 
  children, 
  zIndex,
  id // Додаємо ID для індикатора
}: { 
  children: ReactNode;
  zIndex: number;
  id?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"], 
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  // 👇 ОНОВЛЕНО: Тепер прозорість падає до 0, щоб секція повністю зникала!
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    // 👇 Додали id для індикатора
    <section id={id} ref={containerRef} className="relative w-full h-[150vh]" style={{ zIndex }}>
      <motion.div
        style={{ scale, opacity }}
        // 👇 ОНОВЛЕНО: Забрали bg-white dark:bg-black, тепер фон прозорий!
        className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden origin-top will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
}