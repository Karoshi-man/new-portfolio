"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type TechItem = {
  name: string;
  icon: string;
};

const baseRow1: TechItem[] = [
  { name: "Python", icon: "/img/py.svg" },
  { name: "PyTorch", icon: "/img/pytorch.svg" },
  { name: "NumPy", icon: "/img/NumPy.svg" },
  { name: "Docker", icon: "/img/docker.svg" },
  { name: "AWS", icon: "/img/aws.svg" },
  { name: "Kubernetes", icon: "/img/kubernetes.svg" },
  { name: "FastAPI", icon: "/img/fastapi.svg" },
  { name: "OpenCV", icon: "/img/opencv.svg" },
];

const baseRow2: TechItem[] = [
  { name: "GCP", icon: "/img/gc.svg" },
  { name: "Hugging Face", icon: "/img/hugface.svg" },
  { name: "Azure", icon: "/img/azure.svg" },
  { name: "PostgreSQL", icon: "/img/postgre.svg" },
  { name: "Redis", icon: "/img/redis.svg" },
  { name: "Git", icon: "/img/git.svg" },
  { name: "Scikit-learn", icon: "/img/sl.svg" },
  { name: "Pandas", icon: "/img/Pandas.svg" },
];

const row1 = [...baseRow1, ...baseRow1, ...baseRow1, ...baseRow1];
const row2 = [...baseRow2, ...baseRow2, ...baseRow2, ...baseRow2];

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.85, 1], [1, 0.9]);

  return (
    <section ref={containerRef} className="relative h-[250vh] w-full font-aes">
      
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <motion.div 
          style={{ opacity, scale }} 
          className="flex flex-col gap-10 w-full"
        >
          
          {/* Left */}
          <div className="relative flex w-full overflow-hidden select-none">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none" />

            <motion.div
              className="flex gap-8 whitespace-nowrap will-change-transform"
              initial={{ x: "0%" }}
              animate={{ x: "-15%" }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 50,
              }}
            >
              {[...row1, ...row1].map((tech, index) => (
                <TechCard key={`r1-${index}`} item={tech} />
              ))}
            </motion.div>
          </div>

          {/* Right */}
          <div className="relative flex w-full overflow-hidden select-none">
            <div className="absolute left-0 top-0 bottom-0 
            w-20 z-10 bg-gradient-to-r from-white dark:from-black 
            to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 
            w-20 z-10 bg-gradient-to-l from-white dark:from-black 
            to-transparent pointer-events-none" />

            <motion.div
              className="flex gap-8 whitespace-nowrap will-change-transform"
              initial={{ x: "-15%" }}
              animate={{ x: "0%" }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 50,
              }}
            >
              {[...row2, ...row2].map((tech, index) => (
                <TechCard key={`r2-${index}`} item={tech} />
              ))}
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

const TechCard = ({ item }: { item: TechItem }) => {
  return (
    <div className="
      px-6 py-3 md:px-8 md:py-4 
      border border-black/10 dark:border-white/20 
      rounded-full 
      bg-black/5 dark:bg-white/5 
      backdrop-blur-sm
      flex items-center justify-center gap-4
      transition-colors duration-500
      hover:bg-black/10 dark:hover:bg-white/10
      cursor-default
    ">
      <div className="w-8 h-8 md:w-10 md:h-10 relative flex-shrink-0">
        <img 
          src={item.icon} 
          alt={item.name} 
          className="w-full h-full object-contain" 
        />
      </div>
      <span className="text-xl md:text-3xl font-bold text-black dark:text-white">
        {item.name}
      </span>
    </div>
  );
};