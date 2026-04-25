import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 50,
  className = '',
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const x = direction === 'left' ? distance : direction === 'right' ? -distance : 0;
    const y = direction === 'up' ? distance : direction === 'down' ? -distance : 0;

    gsap.fromTo(
      element,
      {
        x,
        y,
        opacity: 0,
        visibility: 'hidden',
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        visibility: 'visible',
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [direction, delay, duration, distance]);

  return (
    <div ref={elementRef} className={className} style={{ visibility: 'hidden' }}>
      {children}
    </div>
  );
}
