"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full h-[60vh] flex flex-col items-center justify-center relative z-20 font-aes">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center flex flex-col items-center gap-6 md:gap-8 px-4"
      >
        {/* Головний заклик */}
        <h2 className="text-4xl md:text-7xl font-bold text-black dark:text-white transition-colors duration-500 tracking-tight">
          Let's build something together
        </h2>

        {/* Пошта - мінімалістично і стильно */}
        <a 
          href="mailto:martinfesenko@email.com"
          className="text-xl md:text-3xl text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300 border-b border-transparent hover:border-black dark:hover:border-white pb-1"
        >
          mfesenko2003@gmail.com
        </a>

        {/* Копірайт (майже непомітний) */}
        <div className="absolute bottom-10 text-xs md:text-sm text-black/30 dark:text-white/30 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Martin Fesenko
        </div>
      </motion.div>
    </footer>
  );
}