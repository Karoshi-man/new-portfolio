"use client";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, MouseEvent } from "react";

const socialLinks = [
  { 
    title: "Thrive in social setting", 
    label: "LinkedIn",
    url: "https://www.linkedin.com/", 
    icon: "/img/linkedin.svg",
    color1: "#c70039", 
    color2: "#900c3f" 
  },
  { 
    title: "Excel at problem-solving", 
    label: "LeetCode",
    url: "https://leetcode.com/u/LustForCode/", 
    icon: "/img/leetcode.svg",
    color1: "#db9915", 
    color2: "#b67d0a" 
  },
  { 
    title: "Unveiling my projects", 
    label: "GitHub",
    url: "https://github.com/", 
    icon: "/img/github.svg",
    color1: "#8a23df", 
    color2: "#720dc5" 
  },
  { 
    title: "Get in touch if intrigued", 
    label: "Telegram",
    url: "https://web.telegram.org/k/#@me_Karoshi", 
    icon: "/img/telegram.svg",
    color1: "#0f81ca", 
    color2: "#0a6dad" 
  },
];

export default function Connections() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.9, 1], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full font-aes bg-transparent">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
        
        <motion.div 
          style={{ opacity, scale }}
          className="w-full max-w-5xl flex flex-col"
        >

          <div className="flex flex-col border-t border-black/10 dark:border-white/10">
            {socialLinks.map((link, index) => (
              <ConnectionItem key={index} link={link} />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}

function ConnectionItem({ link }: { link: typeof socialLinks[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="hover"
      className="group relative w-full py-12 px-6 md:px-10 border-b border-black/10 dark:border-white/10 overflow-hidden cursor-pointer"
    >
      
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${link.color1}33,  /* 33 = 20% opacity hex */
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        
        <div className="flex flex-col">
            <span className="text-sm font-bold uppercase tracking-widest opacity-40 mb-2 text-black dark:text-white group-hover:opacity-100 transition-opacity duration-300">
               {link.label}
            </span>
            
            <motion.h3 
              className="text-3xl md:text-5xl font-bold text-black dark:text-white"
              variants={{
                initial: { x: 0 },
                hover: { x: 20 }
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {link.title}
            </motion.h3>
        </div>

        <div className="flex items-center gap-8">
            
            <motion.div
               variants={{
                 initial: { opacity: 0, scale: 0.5, rotate: -20 },
                 hover: { opacity: 1, scale: 1, rotate: 0 }
               }}
               transition={{ type: "spring", stiffness: 200, damping: 15 }}
               className="hidden md:flex w-16 h-16 items-center justify-center rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 shadow-lg"
            >
               <img 
                 src={link.icon} 
                 alt={link.label} 
                 className="w-8 h-8 object-contain dark:invert opacity-80"
               />
            </motion.div>

            <motion.span 
              className="text-4xl md:text-6xl font-light text-black dark:text-white opacity-20 group-hover:opacity-100 transition-opacity duration-300"
              variants={{
                initial: { x: 0 },
                hover: { x: -10 }
              }}
            >
              ↗
            </motion.span>
        </div>

      </div>

    </motion.a>
  );
}