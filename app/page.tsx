// page.tsx
"use client";
import { motion } from "framer-motion";

import ThemeToggle from "../components/ThemeToggle";
import DataBlocks from "../components/DataBlocksBg";
import Footer from "../components/Footer";
import SectionIndicator from "../components/SectionIndicator"; 

import StackArea from "../components/StackArea";
import TechStack from "../components/TechStack";
import Languages from "../components/Languages";
import LifeHobbies from "../components/LifeHobbies";
import Connections from "../components/Connections";

import SceneWrapper from "../components/SceneWrapper";
import { smoothTransition } from "./constants";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-black transition-colors duration-500 overflow-clip font-aes">
      
      <ThemeToggle />
      <SectionIndicator /> 

      <div className="fixed inset-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
        <DataBlocks />
        <div className="absolute inset-0 bg-transparent dark:backdrop-invert pointer-events-none" />
      </div>

      {/* Головний контейнер з контентом */}
      <div className="relative z-10">
        
        {/* --- 1. HERO (isFirst = true, щоб не напливав, а вже був на екрані) --- */}
        <SceneWrapper id="hero" isFirst>
          <div className="text-left w-full max-w-5xl px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={smoothTransition}
              className="text-[12vw] md:text-[99px] font-bold leading-tight tracking-[5px] text-black dark:text-white"
            >
              Martin Fesenko &lt;/&gt;
            </motion.h1>
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <p className="text-2xl md:text-[40px] text-black dark:text-white">
                  ML Engineer | AI/LLM
                </p>
                <a href="/docs/CV.pdf" target="_blank" className="border-2 border-black dark:border-white px-12 py-3 rounded-2xl text-xl font-bold text-black dark:text-white text-center tracking-[4px] relative md:-top-1 md:left-5 cursor-pointer backdrop-blur-sm">
                  View Resume
                </a>
              </div>
            </div>
          </div>
        </SceneWrapper>

        {/* --- 2. PROJECTS TITLE --- */}
        <SceneWrapper>
          <h2 className="text-[10vw] md:text-[120px] font-bold tracking-tight text-black dark:text-white drop-shadow-2xl">
            Projects
          </h2>
        </SceneWrapper>

        {/* --- PROJECTS CONTENT (Слайдер карток) --- */}
        <SceneWrapper id="projects" scrollLength="1000vh">
            <StackArea />
        </SceneWrapper>

        {/* --- 3. TECH STACK TITLE & CONTENT --- */}
        <SceneWrapper>
          <h2 className="text-[10vw] md:text-[120px] font-bold tracking-tight text-black dark:text-white drop-shadow-2xl">
            Tech Stack
          </h2>
        </SceneWrapper>
        <SceneWrapper id="stack">
           <TechStack />
        </SceneWrapper>

        {/* --- 4. LANGUAGES TITLE & CONTENT --- */}
        <SceneWrapper>
          <h2 className="text-[10vw] md:text-[120px] font-bold tracking-tight text-black dark:text-white drop-shadow-2xl">
            Languages
          </h2>
        </SceneWrapper>
        <SceneWrapper id="languages">
           <Languages />
        </SceneWrapper>

        {/* --- 5. LIFE TITLE & CONTENT --- */}
        <SceneWrapper>
          <h2 className="text-[10vw] md:text-[120px] font-bold tracking-tight text-black dark:text-white drop-shadow-2xl text-center">
            Life & Hobbies
          </h2>
        </SceneWrapper>
        <SceneWrapper id="life">
           <LifeHobbies />
        </SceneWrapper>

        {/* --- 6. CONNECTIONS TITLE & CONTENT --- */}
        <SceneWrapper>
          <h2 className="text-[10vw] md:text-[120px] font-bold tracking-tight text-black dark:text-white drop-shadow-2xl">
            Connections
          </h2>
        </SceneWrapper>
        <SceneWrapper id="connections">
           <Connections />
        </SceneWrapper>

        {/* --- 7. FOOTER --- */}
        <div className="relative z-[100] min-h-screen flex flex-col items-center justify-center bg-transparent mt-[100vh]">
           <Footer />
        </div>

      </div>
    </main>
  );
}