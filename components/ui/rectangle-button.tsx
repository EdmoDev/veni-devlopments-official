"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import gsap from "gsap"

interface RectangleButtonProps {
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}

export function RectangleButton({ onClick, children, className = "" }: RectangleButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    const button = buttonRef.current

    const hoverAnimation = () => {
      gsap.to(button, {
        y: -5,
        boxShadow: "0px 26px 48px rgba(0, 0, 0, 0.45)",
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const resetAnimation = () => {
      gsap.to(button, {
        y: 0,
        boxShadow: "0px 22px 44px rgba(0, 0, 0, 0.4)",
        duration: 0.3,
        ease: "power2.out",
      })
    }

    button.addEventListener("mouseenter", hoverAnimation)
    button.addEventListener("mouseleave", resetAnimation)

    return () => {
      button.removeEventListener("mouseenter", hoverAnimation)
      button.removeEventListener("mouseleave", resetAnimation)
    }
  }, [])

  return (
    <div
      ref={buttonRef}
      onClick={onClick}
      className={`data-hoverable ${className}`}
      style={{
        boxSizing: "border-box",
        position: "absolute",
        width: "134px",
        height: "144px",
        left: "585px",
        top: "681px",
        background: "#000000",
        border: "6px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0px 22px 44px rgba(0, 0, 0, 0.4)",
        borderRadius: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#FFFFFF",
      }}
    >
      {children}
    </div>
  )
}
