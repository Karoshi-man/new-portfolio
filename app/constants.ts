import { Transition } from "framer-motion";

export const PROJECTS = [
  {
    title: "Simplified",
    content: "Complex tasks are now simple",
    color: "#407AFF",
    link: "https://github.com/..."
  },
  {
    title: "Boost Productivity",
    content: "Perform Tasks in less time",
    color: "#DD3E58",
    link: "https://github.com/..."
  },
  {
    title: "Project 3",
    content: "Machine Learning Model Visualization",
    color: "#BA71F5",
    link: "https://github.com/..."
  },
  {
    title: "Project 4",
    content: "AI Content Generator",
    color: "#F75CD0",
    link: "https://github.com/..."
  }
];

export const smoothTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
};

export const NewTransition: Transition = {
  duration: 0.5,
  ease: [0.0025, 0.001, 0.0025, 0.1],
};

export const sectionAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: smoothTransition,
};

export const NewAnimation = {
  initial : {opacity: 0, y: 10},
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: NewTransition,
}