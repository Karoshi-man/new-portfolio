"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TitleWrapper({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Відслідковуємо скрол блоку 150vh
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"]
  });

  // Заголовок зникає і трохи зменшується, коли час його паузи закінчився
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    // Висота 150vh створює ту саму ідеальну "паузу", поки ми скролимо
    <div ref={ref} className="relative w-full h-[150vh] z-20">
      <motion.div 
        style={{ opacity, scale }}
        className="sticky top-0 w-full h-screen flex justify-center items-center bg-transparent pointer-events-none origin-top will-change-transform"
      >
        <h2 className="text-[10vw] md:text-[120px] font-bold tracking-tight text-black dark:text-white drop-shadow-2xl">
          {text}
        </h2>
      </motion.div>
    </div>
  );
}