"use client";

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseButtonScrollFadeOptions {
  topThreshold?: number; // Percentage from top of viewport to start fading (e.g., 0.2 for 20%)
  bottomThreshold?: number; // Percentage from bottom of viewport to start fading (e.g., 0.8 for 80%)
  fadeClass?: string;
}

const useButtonScrollFade = (
  elementRef: RefObject<HTMLElement | null>, // Allow null for the current property
  options?: UseButtonScrollFadeOptions
) => {
  const {
    topThreshold = 0.15, // Element top is above 15% of viewport height
    bottomThreshold = 0.85, // Element bottom is below 85% of viewport height
    fadeClass = 'is-scroll-faded',
  } = options || {};

  useEffect(() => {
    if (!elementRef.current) return;

    const el = elementRef.current;

    const st = ScrollTrigger.create({
      trigger: el,
      start: `top bottom-=${window.innerHeight * (1 - bottomThreshold)}px`, // When top of el enters the "active zone" from bottom
      end: `bottom top+=${window.innerHeight * topThreshold}px`,       // When bottom of el leaves the "active zone" to top
      toggleClass: { targets: el, className: fadeClass },
      // markers: true, // For debugging
      onEnter: () => el.classList.remove(fadeClass),
      onLeave: () => el.classList.add(fadeClass),
      onEnterBack: () => el.classList.remove(fadeClass),
      onLeaveBack: () => el.classList.add(fadeClass),
    });

    return () => {
      st?.kill();
    };
  }, [elementRef, topThreshold, bottomThreshold, fadeClass]);
};

export default useButtonScrollFade;