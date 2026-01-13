"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBg() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: true, zIndex: -1 },
    background: { color: "transparent" },
    fpsLimit: 100,
    particles: {
      number: { value: 80, density: { enable: true, area: 2500 } },
      color: { value: "#dddddd" },
      shape: { type: "circle" },
      opacity: { value: 0.8 },
      size: { value: { min: 4, max: 9 } },
      links: {
        enable: true,
        distance: 150,
        color: "#dddddd",
        opacity: 0.4, 
        width: 4
      },
      move: {
        enable: true,
        speed: 1.9,
        direction: "none" as const,
        outModes: { default: "bounce" as const }
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      }
    },
    detectRetina: true,
  }), []);

  if (init) {
    return <Particles id="tsparticles" options={options} />;
  }

  return null;
}