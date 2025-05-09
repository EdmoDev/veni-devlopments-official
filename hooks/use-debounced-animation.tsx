"use client"

import { useState, useEffect } from "react"

// Helper hook to debounce scroll-driven animations
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Helper function to throttle scroll events
export function throttle(callback: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastRan = 0

  return function (this: any, ...args: any[]) {
    
    const now = Date.now()

    if (now - lastRan >= wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      lastRan = now
      callback.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(
        () => {
          lastRan = Date.now()
          timeout = null
          callback.apply(this, args)
        },
        wait - (now - lastRan),
      )
    }
  }
}
