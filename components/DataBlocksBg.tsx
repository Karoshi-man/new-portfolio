"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Instances, Instance, Environment, Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { Color, MathUtils } from "three";
import { useTheme } from "next-themes";

function NeuralData() {
  const { resolvedTheme } = useTheme();
  const ref = useRef<any>(0);

  // Налаштування кольорів для Темної та Світлої теми
  // Dark: світло-сині/фіолетові кубики, що світяться
  // Light: темно-сірі/індиго кубики, чіткі та контрастні
  const cubeColor = useMemo(() => {
    return resolvedTheme === "dark" 
      ? new Color("#6366f1") // Indigo-500 (світиться в темряві)
      : new Color("#1e293b"); // Slate-800 (темний графіт для білого фону)
  }, [resolvedTheme]);

  // Налаштування матеріалу (прозорість, металічність)
  const materialProps = useMemo(() => {
    return resolvedTheme === "dark"
      ? { opacity: 0.6, roughness: 0.2, metalness: 0.8 } // Більш скляні/металеві в темряві
      : { opacity: 0.85, roughness: 0.5, metalness: 0.1 }; // Більш матові та щільні на світлі
  }, [resolvedTheme]);

  // Генеруємо "дані" (150 токенів/кубиків)
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 150; i++) {
      const speed = MathUtils.randFloat(0.1, 0.5); // Різна швидкість "плавання"
      const rotationSpeed = MathUtils.randFloat(0.2, 1); // Швидкість обертання самого кубика
      // Розподіляємо їх у широкому просторі
      const x = MathUtils.randFloatSpread(40); 
      const y = MathUtils.randFloatSpread(40); 
      const z = MathUtils.randFloatSpread(30); 
      // Випадковий розмір (важливість токена)
      const scale = MathUtils.randFloat(0.3, 0.8);
      
      temp.push({ speed, rotationSpeed, x, y, z, scale });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    // Повільне обертання всієї хмари даних (Global Rotation)
    // Це створює відчуття, що ми летимо крізь дані
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
  });

  return (
    <group ref={ref}>
      <Instances range={150}>
        <boxGeometry args={[1, 1, 1]} /> {/* Базова геометрія */}
        <meshStandardMaterial
          color={cubeColor}
          transparent
          {...materialProps}
        />

        {particles.map((data, i) => (
          <Float
            key={i}
            speed={data.speed} // Швидкість плавання
            rotationIntensity={data.rotationSpeed} // Інтенсивність обертання
            floatIntensity={1.5} // Амплітуда плавання
            floatingRange={[-2, 2]} // Діапазон
          >
            <Instance 
              position={[data.x, data.y, data.z]} 
              scale={data.scale} 
            />
          </Float>
        ))}
      </Instances>
    </group>
  );
}

export default function DataBlocksBg() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000">
      <Canvas 
        camera={{ position: [0, 0, 25], fov: 45 }} 
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={[resolvedTheme === 'dark' ? '#000000' : '#ffffff', 10, 40]} />
        
        <ambientLight intensity={resolvedTheme === 'dark' ? 0.5 : 1.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={resolvedTheme === 'dark' ? 2 : 1} 
          color={resolvedTheme === 'dark' ? "#818cf8" : "#ffffff"} 
        />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#38bdf8" />

        <NeuralData />

        <Environment files="/img/city.hdr" />
      </Canvas>
    </div>
  );
}