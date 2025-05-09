"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

interface CustomCursorProps {
  size?: number
  variant?: "default" | "inverted"
}

export default function CustomCursor({ size = 12, variant = "default" }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    // Hide the default cursor
    document.documentElement.style.cursor = "none"

    // Show custom cursor after it's positioned correctly
    setTimeout(() => setHidden(false), 100)

    // Initial position to avoid flashing at 0,0
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 })
    gsap.set(follower, { xPercent: -50, yPercent: -50, opacity: 0 })

    // Fade in
    gsap.to([cursor, follower], { opacity: 1, duration: 0.6, stagger: 0.1 })

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" })

    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3.out" })
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3.out" })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      xToFollower(e.clientX)
      yToFollower(e.clientY)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.3 })
    }

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.3 })
    }

    // Track hoverable elements
    const addHoverListeners = () => {
      const hoverableElements = document.querySelectorAll("a, button, [data-hoverable]")

      hoverableElements.forEach((element) => {
        element.addEventListener("mouseenter", () => setIsHovering(true))
        element.addEventListener("mouseleave", () => setIsHovering(false))
      })
    }

    // Initial setup
    addHoverListeners()

    // Update hover listeners after DOM changes
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)
    document.documentElement.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      // Clean up
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter)
      document.documentElement.style.cursor = ""
      observer.disconnect()

      // Remove hover listeners
      const hoverableElements = document.querySelectorAll("a, button, [data-hoverable]")
      hoverableElements.forEach((element) => {
        element.removeEventListener("mouseenter", () => setIsHovering(true))
        element.removeEventListener("mouseleave", () => setIsHovering(false))
      })
    }
  }, [])

  // Determine follower size based on state
  const getFollowerSize = () => {
    if (isHovering) return size * 4
    if (isClicking) return size * 2.5
    return size * 3
  }

  // Determine cursor color based on variant
  const getCursorStyles = () => {
    switch (variant) {
      case "inverted":
        return {
          cursor: { borderColor: "#ffffff", background: "#000000" },
          follower: { background: "#ffffff33", borderColor: "#ffffff" },
        }
      default:
        return {
          cursor: { borderColor: "#000000", background: "#000000" },
          follower: { background: "#00000022", borderColor: "#000000" },
        }
    }
  }

  const cursorStyles = getCursorStyles()
  const followerSize = getFollowerSize()

  return (
    <div className={`pointer-events-none fixed inset-0 z-[9999] ${hidden ? "opacity-0" : ""}`}>
      <div
        ref={cursorRef}
        className={`absolute rounded-full z-50 mix-blend-difference transition-[width,height] duration-200`}
        style={{
          width: isClicking ? size * 0.8 : size,
          height: isClicking ? size * 0.8 : size,
          backgroundColor: cursorStyles.cursor.background,
          border: `1px solid ${cursorStyles.cursor.borderColor}`,
          transition: "width 0.2s, height 0.2s, background-color 0.3s, border 0.3s",
        }}
      />
      <div
        ref={followerRef}
        className="absolute rounded-full transition-all duration-300"
        style={{
          width: followerSize,
          height: followerSize,
          backgroundColor: cursorStyles.follower.background,
          border: isHovering ? `1.5px solid ${cursorStyles.follower.borderColor}` : "none",
          boxShadow: isHovering ? `0 0 15px ${cursorStyles.follower.background}` : "none",
          transition: "width 0.3s, height 0.3s, border 0.2s, box-shadow 0.2s, background-color 0.3s",
        }}
      />
    </div>
  )
}
