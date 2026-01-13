"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

// КІНЕМАТОГРАФІЧНА ПЛАВНІСТЬ
const luxuryTransition = { duration: 2.5, ease: [0.16, 1, 0.3, 1] };

// 1. HERO WRAPPER (Для коротких секцій: Hero, Hobbies)
export function HeroWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Реагує миттєво (на початку)
    const isScrolled = latest > 0.02;
    if (isScrolled !== hasScrolled) {
      setHasScrolled(isScrolled);
    }
  });

  return (
    <div ref={ref} className="h-[120vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <motion.div
          initial={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          animate={{
            y: hasScrolled ? "-100vh" : "0vh",
            opacity: hasScrolled ? 0 : 1,
            filter: hasScrolled ? "blur(20px)" : "blur(0px)",
            scale: hasScrolled ? 0.9 : 1
          }}
          transition={luxuryTransition}
          className="w-full origin-center"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// 2. TITLE WRAPPER ("Projects")
export function TitleWrapper({ text }: { text: string }) {
  const ref = useRef(null);
  const [animationState, setAnimationState] = useState<"hidden-bottom" | "visible" | "hidden-top">("hidden-bottom");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.15) {
      setAnimationState("hidden-bottom");
    } 
    else if (latest >= 0.15 && latest < 0.55) {
      if (animationState !== "visible") setAnimationState("visible");
    } 
    else if (latest >= 0.55) {
      setAnimationState("hidden-top");
    }
  });

  const variants = {
    "hidden-bottom": { y: "10vh", opacity: 0, filter: "blur(20px)", scale: 0.9 }, 
    "visible":       { y: "0vh", opacity: 1, filter: "blur(0px)", scale: 1 },
    "hidden-top":    { y: "-50vh", opacity: 0, filter: "blur(30px)", scale: 1.1 }
  };

  return (
    <section ref={ref} className="h-[150vh] relative z-20 pointer-events-none">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.h2
          initial="hidden-bottom"
          variants={variants}
          animate={animationState}
          transition={luxuryTransition}
          className="text-[80px] md:text-[120px] font-bold font-aes text-black tracking-[10px]"
        >
          {text}
        </motion.h2>
      </div>
    </section>
  );
}

// 3. STACK WRAPPER (Спеціально для карток)
// Логіка: Вона не відлітає, поки ти не проскролиш всі картки.
export function StackWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const [hasFinishedScroll, setHasFinishedScroll] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"], // Слідкуємо за всією довжиною (400vh)
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Відлітаємо тільки коли проскролили 95% секції (в самому кінці)
    const isFinished = latest > 0.95;
    if (isFinished !== hasFinishedScroll) {
      setHasFinishedScroll(isFinished);
    }
  });

  return (
    // Тут не ставимо фіксовану висоту, бо StackArea сама має висоту
    <div ref={ref} className="relative w-full">
      <motion.div
         animate={{
            y: hasFinishedScroll ? "-100vh" : "0vh",
            opacity: hasFinishedScroll ? 0 : 1,
            filter: hasFinishedScroll ? "blur(20px)" : "blur(0px)",
            scale: hasFinishedScroll ? 0.9 : 1
          }}
          transition={luxuryTransition}
          className="w-full origin-bottom"
      >
        {children}
      </motion.div>
    </div>
  );
}