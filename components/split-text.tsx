"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface SplitTextProps {
  children: string
  type?: "chars" | "words" | "lines"
  className?: string
  tag?: keyof JSX.IntrinsicElements
}

export const SplitText: React.FC<SplitTextProps> = ({ children, type = "chars", className = "", tag: Tag = "div" }) => {
  const textRef = useRef<HTMLElement>(null)
  const splitTextRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    if (!textRef.current) return

    const text = textRef.current
    const splitItems: HTMLElement[] = []

    if (type === "chars") {
      // Split into characters
      const chars = children.split("")
      text.innerHTML = ""
      chars.forEach((char, i) => {
        const span = document.createElement("span")
        span.textContent = char
        span.style.display = "inline-block"
        span.style.position = "relative"
        text.appendChild(span)
        splitItems.push(span)
      })
    } else if (type === "words") {
      // Split into words
      const words = children.split(" ")
      text.innerHTML = ""
      words.forEach((word, i) => {
        const span = document.createElement("span")
        span.textContent = word + (i < words.length - 1 ? " " : "")
        span.style.display = "inline-block"
        span.style.position = "relative"
        text.appendChild(span)
        splitItems.push(span)
      })
    } else if (type === "lines") {
      // Split into lines (this is more complex and requires layout calculation)
      const words = children.split(" ")
      text.innerHTML = ""
      words.forEach((word, i) => {
        const span = document.createElement("span")
        span.textContent = word + (i < words.length - 1 ? " " : "")
        span.style.display = "inline-block"
        text.appendChild(span)
      })

      // Group words into lines based on their position
      const spans = Array.from(text.children) as HTMLElement[]
      const lines: HTMLElement[][] = []
      let currentLine: HTMLElement[] = []
      let prevTop = spans[0]?.offsetTop

      spans.forEach((span) => {
        if (span.offsetTop !== prevTop) {
          lines.push(currentLine)
          currentLine = []
          prevTop = span.offsetTop
        }
        currentLine.push(span)
      })
      lines.push(currentLine)

      // Create line wrappers
      text.innerHTML = ""
      lines.forEach((line) => {
        const lineWrapper = document.createElement("div")
        lineWrapper.style.display = "block"
        lineWrapper.style.position = "relative"
        line.forEach((word) => {
          lineWrapper.appendChild(word)
        })
        text.appendChild(lineWrapper)
        splitItems.push(lineWrapper)
      })
    }

    splitTextRef.current = splitItems
  }, [children, type])

  return (
    <Tag ref={textRef} className={className}>
      {children}
    </Tag>
  )
}
