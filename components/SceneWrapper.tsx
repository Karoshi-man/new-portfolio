"use client";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, ReactNode, createContext } from "react";

const SPRING = { stiffness: 80, damping: 30, restDelta: 0.0005 };

export const SceneContext = createContext<any>(null);

export default function SceneWrapper({
  children,
  isFirst = false,
  id,
  scrollLength = "400vh",
  overlap = "-mt-[100vh]",
}: {
  children: ReactNode;
  isFirst?: boolean;
  id?: string;
  scrollLength?: string;
  overlap?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(isFirst);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"], 
  });
  const rawOpacity = useTransform(
    scrollYProgress,
    isFirst ? [0, 0.1, 1] : [0, 0.15, 0.85, 1],
    isFirst ? [1, 0, 0] : [0, 1, 1, 0]
  );

  const rawScale = useTransform(
    scrollYProgress,
    isFirst ? [0, 0.1, 1] : [0, 0.15, 0.85, 1],
    isFirst ? [1, 0.9, 0.9] : [1.1, 1, 1, 0.8]
  );

  const rawY = useTransform(
    scrollYProgress,
    isFirst ? [0, 0.1, 1] : [0, 0.15, 0.85, 1],
    isFirst ? [0, 50, 50] : [50, 0, 0, -50]
  );

  const rawRotateX = useTransform(
    scrollYProgress,
    isFirst ? [0, 0.1, 1] : [0, 0.15, 0.85, 1],
    isFirst ? [0, 3, 3] : [-3, 0, 0, 5]
  );

  const rawBlur = useTransform(
    scrollYProgress,
    isFirst ? [0, 0.1, 1] : [0, 0.15, 0.85, 1],
    isFirst ? [0, 20, 20] : [20, 0, 0, 20]
  );

  const opacity = useSpring(rawOpacity, SPRING);
  const scale = useSpring(rawScale, SPRING);
  const y = useSpring(rawY, SPRING);
  const rotateX = useSpring(rawRotateX, SPRING);
  const blur = useSpring(rawBlur, SPRING);

  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  useMotionValueEvent(rawOpacity, "change", (v) => {
    setIsActive(v > 0.1);
  });

  return (
    <div
      id={id}
      ref={ref}
      className={`relative w-full z-10 ${isFirst ? "" : overlap}`}
      style={{ height: scrollLength }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ opacity, scale, y, rotateX, filter, perspective: "1200px", transformStyle: "preserve-3d" }}
          className={`w-full h-full flex flex-col items-center justify-center origin-center will-change-[transform,opacity,filter] ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <SceneContext.Provider value={scrollYProgress}>
            {children}
          </SceneContext.Provider>
        </motion.div>
      </div>
    </div>
  );
}