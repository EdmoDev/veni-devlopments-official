"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface ScrollProgressProps {
  totalSteps: number
  activeStep: number
}

export function ScrollProgress({ totalSteps, activeStep }: ScrollProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const totalCards = totalSteps // Fix: Use totalSteps instead of undeclared totalCards

  useEffect(() => {
    if (!progressRef.current || !stepsRef.current) return

    // Animate progress bar
    gsap.to(progressRef.current, {
      height: `${(activeStep / (totalSteps - 1)) * 100}%`,
      duration: 0.6,
      ease: "power2.inOut",
    })

    // Highlight active step
    const steps = stepsRef.current.querySelectorAll(".step-marker")
    steps.forEach((step, index) => {
      if (index <= activeStep) {
        gsap.to(step, {
          scale: index === activeStep ? 1.5 : 1.2,
          backgroundColor: index === activeStep ? "#000" : "#666",
          duration: 0.4,
          ease: "power2.out",
        })
      } else {
        gsap.to(step, {
          scale: 1,
          backgroundColor: "#ccc",
          duration: 0.4,
          ease: "power2.out",
        })
      }
    })
  }, [activeStep, totalSteps])

  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
      <div className="h-[200px] w-1 bg-gray-200 rounded-full relative">
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 w-full bg-black rounded-full"
          style={{ height: `${(activeStep / (totalSteps - 1)) * 100}%` }}
        ></div>

        <div ref={stepsRef} className="absolute h-full w-full">
          {Array.from({ length: totalCards }).map((_, index) => (
            <div
              key={index}
              className="step-marker absolute w-3 h-3 bg-gray-300 rounded-full transform -translate-x-1/3"
              style={{
                top: `${(index / (totalSteps - 1)) * 100}%`,
                left: 0,
                transition: "all 0.4s ease",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
