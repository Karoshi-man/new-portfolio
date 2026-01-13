"use client";
import { motion } from "framer-motion";
import StackArea from "../components/StackArea";
import ParticlesBg from "../components/ParticlesBg";
// 1. Додаємо імпорт StackWrapper
import { HeroWrapper, TitleWrapper, StackWrapper } from "../components/ScrollWrappers";

const sectionAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.3 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const smoothTransition = { duration: 2.2, ease: [0.49, 2.5, 0.22, 1] };

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBg />
      </div>

      <div className="relative z-10 bg-transparent">
        
        {/* HERO */}
        <HeroWrapper>
          <section className="min-h-screen flex flex-col items-center justify-center px-6">
            <div className="text-left w-full max-w-5xl">
              <motion.h1 
                initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={smoothTransition}
                className="text-[12vw] md:text-[99px] font-bold leading-tight tracking-[5px] font-aes text-black"
              >
                Martin Fesenko &lt;/&gt;
              </motion.h1>

              <div className="flex flex-col gap-6 mt-6">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <motion.p 
                    initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ ...smoothTransition, delay: 0.2 }}
                    className="text-2xl md:text-[40px] font-aes text-black"
                  >
                    ML Engineer | AI/LLM 🤖
                  </motion.p>

                  <motion.a 
                    href="/docs/CV.pdf"
                    target="_blank"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      ...smoothTransition, 
                      delay: 0.4,         
                      y: { duration: 0.2, ease: "easeOut" }, 
                      backgroundColor: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileHover={{ 
                      y: -5, 
                      backgroundColor: "rgba(8, 139, 247, 0.1)",
                    }}
                    whileTap={{ scale: 1.98 }}
                    className="border-2 border-black px-10 py-3 rounded-2xl text-xl font-bold font-aes text-black text-center tracking-[4px]"
                  >
                    View Resume
                  </motion.a>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                  className="flex items-center gap-4 text-[28px] font-aes text-black"
                >
                  <img src="/img/location-50.svg" alt="loc" className="w-10 h-10" />
                  <span>Lviv, Ukraine</span>
                </motion.div>
              </div>
            </div>
          </section>
        </HeroWrapper>

        {/* PROJECTS TITLE */}
        <TitleWrapper text="Projects" />

        {/* 3. STACK AREA (ОГОРНУЛИ В STACKWRAPPER) */}
        <StackWrapper>
           <StackArea />
        </StackWrapper>

        {/* HOBBIES */}
        <HeroWrapper>
          <section className="min-h-screen py-20 px-6 flex flex-col items-center bg-white/50 backdrop-blur-sm">
            <motion.div {...sectionAnimation} className="max-w-6xl w-full">
              <h2 className="text-[70px] font-bold font-aes mb-16 text-black">My Life & Hobbies</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-black/5 p-10 rounded-[40px] border border-black/10 backdrop-blur-sm"
                >
                  <h3 className="text-4xl font-bold font-aes mb-4 text-black">Waterpolo 🤽‍♂️</h3>
                  <p className="text-xl opacity-70 font-aes text-black">
                    More than 10 years in professional sports. Team captain and multiple champion of Ukraine.
                  </p>
                  <button className="mt-8 text-lg font-bold underline font-aes text-black">Learn more</button>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-black/5 p-10 rounded-[40px] border border-black/10 backdrop-blur-sm"
                >
                  <h3 className="text-4xl font-bold font-aes mb-4 text-black">Lviv Polytechnic 🎓</h3>
                  <p className="text-xl opacity-70 font-aes text-black">
                    Studying Applied Mathematics and Artificial Intelligence. Deep dive into algorithms and ML.
                  </p>
                  <button className="mt-8 text-lg font-bold underline font-aes text-black">Details</button>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </HeroWrapper>

        {/* FOOTER */}
        <section className="h-[60vh] flex items-center justify-center">
          <motion.div {...sectionAnimation} className="text-center">
            <h2 className="text-[50px] font-bold font-aes text-black">Let's build something together</h2>
            <p className="text-2xl opacity-60 mt-4 font-aes text-black">martinfesenko@email.com</p>
          </motion.div>
        </section>

      </div>
    </main>
  );
}