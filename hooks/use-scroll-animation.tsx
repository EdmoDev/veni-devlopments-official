"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type AnimationOptions = {
  y?: number
  x?: number
  opacity?: number
  scale?: number
  delay?: number
  duration?: number
  stagger?: number
  scrub?: boolean | number
  start?: string
  end?: string
  markers?: boolean
  toggleActions?: string
}

export function useScrollAnimation(selector: string, options: AnimationOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    y = 50,
    x = 0,
    opacity = 0,
    scale = 1,
    delay = 0,
    duration = 0.8,
    stagger = 0.1,
    scrub = false,
    start = "top 80%",
    end = "bottom 20%",
    markers = false,
    toggleActions = "play none none none",
  } = options

  useEffect(() => {
    if (!containerRef.current) return

    const elements = containerRef.current.querySelectorAll(selector)
    if (!elements.length) return

    // Set initial state
    gsap.set(elements, {
      y,
      x,
      opacity,
      scale,
    })

    // Create animation
    gsap.to(elements, {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      duration,
      delay,
      stagger,
      scrollTrigger: {
        trigger: containerRef.current,
        start,
        end: scrub ? end : undefined,
        scrub,
        markers,
        toggleActions,
      },
    })

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill()
        }
      })
    }
  }, [selector, y, x, opacity, scale, delay, duration, stagger, scrub, start, end, markers, toggleActions])

  return containerRef
}
