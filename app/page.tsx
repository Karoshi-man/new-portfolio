"use client";
import { motion } from "framer-motion";
import StackArea from "../components/StackArea";
import Languages from "../components/Languages"; 
import Connections from "../components/Connections"; 
import Footer from "../components/Footer";
import TechStack from "../components/TechStack"; 
import { HeroWrapper, TitleWrapper, StackWrapper, Spacer, SectionProvider } from "../components/ScrollWrappers";
import ThemeToggle from "../components/ThemeToggle";
import DataBlocks from "../components/DataBlocksBg";
import { smoothTransition } from "./constants";
import LifeHobbies from "../components/LifeHobbies"; 
import SectionIndicator from "../components/SectionIndicator";

export default function Home() {
  return (
    <SectionProvider>
      <main className="relative min-h-screen bg-white dark:bg-black transition-colors duration-500">
        
        <ThemeToggle />
        <SectionIndicator />

        <div className="fixed inset-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
          <DataBlocks />
          <div className="absolute inset-0 bg-transparent dark:backdrop-invert pointer-events-none" />
        </div>

        <div className="relative z-10 bg-transparent">
          
          {/* HERO SECTION */}
          <HeroWrapper id="hero">
            <section className="min-h-screen flex flex-col items-center justify-center px-6">
               <div className="text-left w-full max-w-5xl">
                <motion.h1 
                  initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={smoothTransition}
                  className="text-[12vw] md:text-[99px] font-bold leading-tight 
                  tracking-[5px] font-aes text-black dark:text-white 
                  transition-colors duration-500"
                >
                  Martin Fesenko &lt;/&gt;
                </motion.h1>

                <div className="flex flex-col gap-6 mt-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    <motion.p 
                      initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{ ...smoothTransition, delay: 0.2 }}
                      className="text-2xl md:text-[40px] font-aes text-black 
                      dark:text-white transition-colors duration-500"
                    >
                      ML Engineer | AI/LLM
                    </motion.p>

                    <motion.a 
                      href="/docs/CV.pdf"
                      target="_blank"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        ...smoothTransition, 
                        delay: 0.4,         
                        y: { duration: 0.2, ease: "easeOut", delay: 0 }, 
                        backgroundColor: { duration: 0.002, ease: "easeOut" }
                      }}
                      whileHover={{ 
                        y: -5, 
                        backgroundColor: "rgba(99, 115, 129, 0.2)",
                      }}
                      whileTap={{ scale: 1.98 }}
                      className="border-2 border-black dark:border-white px-12 py-3 
                      rounded-2xl text-xl font-bold font-aes text-black dark:text-white 
                      text-center tracking-[4px] transition-colors duration-500 relative -top-1 left-5"
                    >
                      View Resume
                    </motion.a>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    className="flex items-center gap-4 text-[18px] font-aes text-black 
                    dark:text-white transition-colors duration-500"
                  >
                    <img src="/img/location-50.svg" alt="loc" 
                    className="w-8 h-8 dark:invert transition-all duration-500" />
                    <span className="translate-y-1.5 text-[30px] tracking-widest">
                      Lviv, Ukraine
                    </span>
                  </motion.div>
                </div>
              </div>
            </section>
          </HeroWrapper>

          <Spacer height="80vh" />

          {/* --- PROJECTS --- */}
          <div className="dark:text-white transition-colors duration-500">
             <TitleWrapper text="Projects" id="projects" />
          </div>

          <Spacer height="20vh" />

          <StackWrapper>
             <StackArea />
          </StackWrapper>

          <Spacer height="80vh" />

          {/* --- NEW SECTION: MY STACK --- */}
          <div className="dark:text-white transition-colors duration-500">
             <TitleWrapper text="Tech Stack" id="stack" />
          </div>

          <Spacer height="80vh" />

          <StackWrapper>
             <TechStack />
          </StackWrapper>

          <Spacer height="80vh" />

          {/* --- LANGUAGES --- */}
          <div className="dark:text-white transition-colors duration-500">
             <TitleWrapper text="Languages" id="languages" />
          </div>

          <Spacer height="80vh" />

          <StackWrapper>
             <Languages />
          </StackWrapper>

          <Spacer height="20vh" />

          {/* --- MY LIFE & HOBBIES --- */}
          <div className="dark:text-white transition-colors duration-500">
             <TitleWrapper 
               text="My Life & Hobbies" 
               className="text-[6vw] md:text-[80px]" 
               id="life"
             />
          </div>

          <Spacer height="20vh" />

          <StackWrapper>
              <LifeHobbies />
          </StackWrapper>

          <Spacer height="20vh" />

          {/* --- CONNECTIONS --- */}
          <div className="dark:text-white transition-colors duration-500">
             <TitleWrapper 
               text="Connections" 
               className="text-[60px] md:text-[100px]" 
               id="connections"
              />
          </div>

          <Spacer height="20vh" />

          <StackWrapper>
               <Connections />
          </StackWrapper>

          <Spacer height="20vh" />

          <Footer />

        </div>
      </main>
    </SectionProvider>
  );
}