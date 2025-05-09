"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { GlassElement } from "./glass-element"
import { Zap, Star, Heart, Sparkles } from "lucide-react"

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create random positions for elements
    const elements = containerRef.current.children
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // Position elements randomly
    Array.from(elements).forEach((element, index) => {
      const el = element as HTMLElement

      // Set random positions
      const xPos = Math.random() * (windowWidth - 200)
      const yPos = Math.random() * (windowHeight - 200) + 200 // Start below header

      gsap.set(el, {
        x: xPos,
        y: yPos,
        rotation: Math.random() * 20 - 10,
        scale: Math.random() * 0.4 + 0.6,
        opacity: 0,
      })

      // Animate in
      gsap.to(el, {
        opacity: 1,
        duration: 1,
        delay: index * 0.2,
        ease: "power2.out",
      })

      // Create floating animation
      gsap.to(el, {
        y: yPos + (Math.random() * 60 - 30),
        rotation: Math.random() * 20 - 10,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    // Handle window resize
    const handleResize = () => {
      gsap.killTweensOf(elements)

      Array.from(elements).forEach((element) => {
        const el = element as HTMLElement
        const xPos = Math.random() * (window.innerWidth - 200)
        const yPos = Math.random() * (window.innerHeight - 200) + 200

        gsap.set(el, {
          x: xPos,
          y: yPos,
        })

        gsap.to(el, {
          y: yPos + (Math.random() * 60 - 30),
          rotation: Math.random() * 20 - 10,
          duration: 5 + Math.random() * 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      gsap.killTweensOf(elements)
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <GlassElement
        size="sm"
        color="linear-gradient(180deg, #FF6B6B 0%, #FF2525 100%)"
        icon={<Heart className="w-6 h-6" />}
      />
      <GlassElement
        size="md"
        color="linear-gradient(180deg, #747474 0%, #1F1F1F 100%)"
        icon={<Zap className="w-8 h-8" />}
      />
      <GlassElement
        size="sm"
        color="linear-gradient(180deg, #4158D0 0%, #C850C0 100%)"
        icon={<Star className="w-6 h-6" />}
      />
      <GlassElement
        size="sm"
        color="linear-gradient(180deg, #43E97B 0%, #38F9D7 100%)"
        icon={<Sparkles className="w-6 h-6" />}
      />
    </div>
  )
}
