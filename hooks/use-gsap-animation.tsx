"use client"

import { useEffect, type RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimationOptions {
  trigger: RefObject<HTMLElement>
  start?: string
  end?: string
  toggleActions?: string
  duration?: number
  stagger?: number
}

export function useGsapAnimation(
  selector: string,
  {
    trigger,
    start = "top 80%",
    end = "bottom 70%",
    toggleActions = "play none none none",
    duration = 0.8,
    stagger = 0.2,
  }: AnimationOptions,
) {
  useEffect(() => {
    if (!trigger.current) return

    const elements = trigger.current.querySelectorAll(selector)
    if (!elements.length) return

    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger,
        duration,
        scrollTrigger: {
          trigger: trigger.current,
          start,
          end,
          toggleActions,
        },
      },
    )
  }, [selector, trigger, start, end, toggleActions, duration, stagger])
}
