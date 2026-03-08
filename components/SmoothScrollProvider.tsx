"use client";

import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    // Властивість root означає, що Lenis бере на себе скрол усього вікна (window)
    <ReactLenis 
      root 
      options={{
        lerp: 0.08, // Сила інерції (ближче до 0 = більш плавно і повільно, 1 = миттєво)
        duration: 1.2, // Базова тривалість скролу
        smoothWheel: true, // Вмикаємо плавний скрол для миші
        syncTouch: true, // Плавний скрол для тачпадів/телефонів (за бажанням)
      }}
    >
      {children as any}
    </ReactLenis>
  );
}