"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import Link from "next/link"

interface ClayButtonProps {
  href: string
  children: React.ReactNode
  color?: string
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  className?: string
}

export function ClayButton({ href, children, color = "#3B82F6", size = "md", icon, className = "" }: ClayButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  // Size mapping
  const sizeMap = {
    sm: "text-sm px-6 py-3 rounded-[20px]",
    md: "text-base px-8 py-4 rounded-[30px]",
    lg: "text-lg px-10 py-5 rounded-[40px]",
  }

  useEffect(() => {
    if (!buttonRef.current || !textRef.current) return

    // Create press animation
    const pressAnimation = () => {
      const tl = gsap.timeline({ paused: true })

      tl.to(buttonRef.current, {
        y: 6,
        boxShadow: "0px 6px 0px rgba(0, 0, 0, 0.1), inset 0px -4px 0px rgba(0, 0, 0, 0.1)",
        duration: 0.2,
        ease: "power2.out",
      })

      tl.to(
        textRef.current,
        {
          y: 2,
          duration: 0.2,
          ease: "power2.out",
        },
        "-=0.2",
      )

      return tl
    }

    // Initialize animation
    const pressTl = pressAnimation()

    // Add event listeners
    const button = buttonRef.current
    button.addEventListener("mousedown", () => pressTl.play())
    button.addEventListener("mouseup", () => pressTl.reverse())
    button.addEventListener("mouseleave", () => pressTl.reverse())

    return () => {
      button.removeEventListener("mousedown", () => pressTl.play())
      button.removeEventListener("mouseup", () => pressTl.reverse())
      button.removeEventListener("mouseleave", () => pressTl.reverse())
    }
  }, [])

  return (
    <div
      ref={buttonRef}
      className={`relative inline-block ${sizeMap[size]} ${className} data-hoverable cursor-pointer transition-all duration-200`}
      style={{
        background: color,
        boxShadow:
          "0px 12px 0px rgba(0, 0, 0, 0.1), inset 0px -8px 0px rgba(0, 0, 0, 0.1), inset 0px 2px 0px rgba(255, 255, 255, 0.5)",
        border: "4px solid rgba(255, 255, 255, 0.5)",
      }}
    >
      <Link href={href} className="block">
        <div ref={textRef} className="flex items-center justify-center text-white font-medium">
          {children}
          {icon && <span className="ml-2">{icon}</span>}
        </div>
      </Link>
    </div>
  )
}
