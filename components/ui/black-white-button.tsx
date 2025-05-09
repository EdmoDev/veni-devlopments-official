"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import Link from "next/link"

interface BlackWhiteButtonProps {
  href?: string
  onClick?: () => void
  children?: React.ReactNode
  width?: number
  height?: number
  className?: string
  icon?: React.ReactNode
  variant?: "black" | "white"
}

export function BlackWhiteButton({
  href,
  onClick,
  children,
  width = 134,
  height = 144,
  className = "",
  icon,
  variant = "black",
}: BlackWhiteButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    // Add hover animation
    const button = buttonRef.current

    const hoverAnimation = () => {
      gsap.to(button, {
        y: -5,
        boxShadow: variant === "black" ? "0px 25px 44px rgba(0, 0, 0, 0.4)" : "0px 25px 44px rgba(0, 0, 0, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const resetAnimation = () => {
      gsap.to(button, {
        y: 0,
        boxShadow: variant === "black" ? "0px 22px 44px rgba(0, 0, 0, 0.4)" : "0px 22px 44px rgba(0, 0, 0, 0.1)",
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
  }, [variant])

  const buttonStyles = {
    width: `${width}px`,
    height: `${height}px`,
    background: variant === "black" ? "#000000" : "#FFFFFF",
    border: variant === "black" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: variant === "black" ? "0px 22px 44px rgba(0, 0, 0, 0.4)" : "0px 22px 44px rgba(0, 0, 0, 0.1)",
    borderRadius: "50px",
    color: variant === "black" ? "#FFFFFF" : "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  }

  const renderContent = () => (
    <div className="flex flex-col items-center justify-center space-y-2">
      {icon && <div className="text-2xl">{icon}</div>}
      {children && <div className="text-center">{children}</div>}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className={`block relative data-hoverable ${className}`}>
        <div
\
