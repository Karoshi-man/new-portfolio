"use client";
import { motion } from "framer-motion";
import { useSectionTracker } from "./ScrollWrappers";

const sections = [
  { id: "hero", label: "Hi!" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "My Stack" },
  { id: "languages", label: "Languages" },
  { id: "life", label: "Life" },
  { id: "connections", label: "Connect" },
];

export default function SectionIndicator() {
  const { activeId } = useSectionTracker();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 hidden md:flex">
      {sections.map((section) => {
        const isActive = activeId === section.id;

        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center gap-3 outline-none"
          >
            {/* Лінія / Індикатор */}
            <div className="relative flex items-center justify-center w-4 h-4">
              <motion.div
                animate={{
                  height: isActive ? 24 : 4,
                  width: isActive ? 2 : 2,
                  backgroundColor: isActive ? "#888" : "#ccc",
                }}
                className="rounded-full bg-black dark:bg-white transition-colors duration-500"
              />
            </div>

            {/* Текстовий лейбл (з'являється при ховері або якщо активний) */}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: isActive || false ? 1 : 0, 
                x: isActive || false ? 0 : -10,
                color: isActive ? "currentColor" : "#888"
              }}
              className="text-xs font-aes font-bold tracking-widest 
              uppercase text-black dark:text-white opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 whitespace-nowrap absolute left-6"
            >
              {section.label}
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}