"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"

interface LiquidButtonProps {
  href: string
  className?: string
  children: React.ReactNode
  icon?: React.ReactNode
  color?: string
  glassEffect?: boolean
}

export default function LiquidButton({
  href,
  className = "",
  children,
  icon = <ArrowRight className="ml-2 h-4 w-4" />,
  color = "#000000",
  glassEffect = true,
}: LiquidButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const liquidRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!buttonRef.current || !liquidRef.current) return

    // Set initial states
    gsap.set(liquidRef.current, {
      scaleX: 1,
      scaleY: 1,
      opacity: 0,
      borderRadius: "9999px",
    })

    const handleMouseEnter = () => {
      setIsHovering(true)
      gsap.to(liquidRef.current, {
        opacity: 1,
        scaleX: 1.1,
        scaleY: 1.4,
        borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      })

      gsap.to(contentRef.current, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      gsap.to(liquidRef.current, {
        opacity: 0,
        scaleX: 1,
        scaleY: 1,
        borderRadius: "9999px",
        duration: 0.4,
        ease: "power2.inOut",
      })

      gsap.to(contentRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    // Add liquid movement on mousemove
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering || !buttonRef.current || !liquidRef.current) return

      const buttonRect = buttonRef.current.getBoundingClientRect()
      const xPos = (e.clientX - buttonRect.left) / buttonRect.width
      const yPos = (e.clientY - buttonRect.top) / buttonRect.height

      // Calculate "skew" based on mouse position relative to button center
      const xSkew = (xPos - 0.5) * 10 // max skew of 5 degrees
      const ySkew = (yPos - 0.5) * 5 // max skew of 2.5 degrees

      gsap.to(liquidRef.current, {
        borderRadius: `${30 + yPos * 40}% ${70 - yPos * 40}% ${70 - xPos * 40}% ${30 + xPos * 40}% / ${30 + xPos * 40}% ${30 + yPos * 40}% ${70 - yPos * 40}% ${70 - xPos * 40}%`,
        x: (xPos - 0.5) * 8,
        y: (yPos - 0.5) * 8,
        rotation: (xPos - 0.5) * 5,
        skewX: xSkew,
        skewY: ySkew,
        duration: 0.5,
      })
    }

    const button = buttonRef.current
    button.addEventListener("mouseenter", handleMouseEnter)
    button.addEventListener("mouseleave", handleMouseLeave)
    button.addEventListener("mousemove", handleMouseMove as EventListener)

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter)
      button.removeEventListener("mouseleave", handleMouseLeave)
      button.removeEventListener("mousemove", handleMouseMove as EventListener)
    }
  }, [isHovering])

  // We're now ensuring all buttons use either black or white colors
  const actualColor = "#000000" // Default to black
  const textColor = "text-white"

  return (
    <div
      ref={buttonRef}
      className={`group relative inline-flex overflow-hidden rounded-full data-hoverable ${className}`}
      style={{
        minWidth: "fit-content",
        cursor: "pointer",
      }}
    >
      {/* Liquid background element */}
      <div
        ref={liquidRef}
        className="absolute inset-0 transform origin-center transition-all"
        style={{
          backgroundColor: actualColor,
          opacity: 0,
          filter: glassEffect ? "blur(8px)" : "none",
          backdropFilter: glassEffect ? "blur(4px)" : "none",
          boxShadow: glassEffect ? `0 0 20px ${actualColor}44, inset 0 0 10px ${actualColor}22` : "none",
        }}
      ></div>

      {/* Main button with glass effect */}
      <Link
        href={href}
        className={`relative z-10 px-6 py-3 flex items-center bg-black ${textColor} rounded-full transition-colors`}
        style={{
          backdropFilter: glassEffect ? "blur(5px)" : "none",
          boxShadow: glassEffect ? `0 4px 12px rgba(0, 0, 0, 0.1)` : "none",
          backgroundColor: glassEffect ? `${actualColor}dd` : actualColor,
          borderBottom: glassEffect ? `1px solid rgba(255, 255, 255, 0.2)` : "none",
          borderTop: glassEffect ? `1px solid rgba(255, 255, 255, 0.1)` : "none",
        }}
      >
        <div ref={contentRef} className="flex items-center transition-transform">
          <span>{children}</span>
          {icon}
        </div>
      </Link>
    </div>
  )
}
