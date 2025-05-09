"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import gsap from "gsap"

interface GlassElementProps {
  size?: "sm" | "md" | "lg"
  color?: string
  icon?: React.ReactNode
  className?: string
  animated?: boolean
  onClick?: () => void
}

export function GlassElement({
  size = "md",
  color = "linear-gradient(180deg, #747474 0%, #1F1F1F 100%)",
  icon,
  className = "",
  animated = true,
  onClick,
}: GlassElementProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  // Size mapping
  const sizeMap = {
    sm: {
      outer: "w-40 h-40 rounded-[40px] border-[6px]",
      inner: "w-24 h-24 rounded-[30px] border-[4px]",
      icon: "w-12 h-12",
    },
    md: {
      outer: "w-60 h-60 rounded-[80px] border-[8px]",
      inner: "w-[134px] h-[134px] rounded-[50px] border-[6px]",
      icon: "w-16 h-16",
    },
    lg: {
      outer: "w-80 h-80 rounded-[100px] border-[10px]",
      inner: "w-48 h-48 rounded-[60px] border-[8px]",
      icon: "w-20 h-20",
    },
  }

  useEffect(() => {
    if (!animated || !containerRef.current || !innerRef.current || !iconRef.current) return

    // Create hover animation
    const hoverAnimation = () => {
      const tl = gsap.timeline({ paused: true })

      // Outer container animation
      tl.to(containerRef.current, {
        scale: 1.05,
        boxShadow: "0px 30px 60px rgba(22, 29, 36, 0.15)",
        duration: 0.5,
        ease: "power2.out",
      })

      // Inner container animation
      tl.to(
        innerRef.current,
        {
          y: -10,
          boxShadow: "0px 30px 60px rgba(31, 31, 31, 0.5)",
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5",
      )

      // Icon animation
      tl.to(
        iconRef.current,
        {
          scale: 1.1,
          rotation: 5,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.5",
      )

      return tl
    }

    // Create floating animation
    const floatingAnimation = () => {
      gsap.to(containerRef.current, {
        y: "10px",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })

      gsap.to(innerRef.current, {
        y: "-5px",
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.2,
      })
    }

    // Initialize animations
    const hoverTl = hoverAnimation()
    floatingAnimation()

    // Add event listeners
    const container = containerRef.current
    container.addEventListener("mouseenter", () => hoverTl.play())
    container.addEventListener("mouseleave", () => hoverTl.reverse())

    return () => {
      container.removeEventListener("mouseenter", () => hoverTl.play())
      container.removeEventListener("mouseleave", () => hoverTl.reverse())
      gsap.killTweensOf(containerRef.current)
      gsap.killTweensOf(innerRef.current)
    }
  }, [animated])

  return (
    <div
      ref={containerRef}
      className={`relative ${sizeMap[size].outer} bg-white/70 border-white shadow-xl backdrop-blur-[79px] ${className}`}
      style={{
        background: "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.7) 100%)",
        boxShadow: "0px 24px 38px rgba(22, 29, 36, 0.08)",
      }}
      onClick={onClick}
    >
      <div
        ref={innerRef}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${sizeMap[size].inner} border-white/30`}
        style={{
          background: color,
          boxShadow: "0px 22px 44px rgba(31, 31, 31, 0.4)",
        }}
      >
        <div
          ref={iconRef}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${sizeMap[size].icon} text-white flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
