"use client"

import type React from "react"
import Image from "next/image"
import { useRef, useEffect } from "react"
import gsap from "gsap"

interface TestimonialProps {
  quote: string
  author: {
    name: string
    title: string
    company: string
    location: string
    avatar: string
  }
  companyLogo: string
}

export const Testimonial: React.FC<TestimonialProps> = ({ quote, author, companyLogo }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current || !quoteRef.current || !avatarRef.current) return

    // Create hover animation
    const hoverAnimation = () => {
      gsap.to(cardRef.current, {
        y: -10,
        boxShadow: "0px 30px 60px rgba(22, 29, 36, 0.15)",
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(quoteRef.current, {
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(avatarRef.current, {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    const resetAnimation = () => {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: "0px 10px 30px rgba(22, 29, 36, 0.08)",
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(quoteRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(avatarRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    const card = cardRef.current
    card.addEventListener("mouseenter", hoverAnimation)
    card.addEventListener("mouseleave", resetAnimation)

    return () => {
      card.removeEventListener("mouseenter", hoverAnimation)
      card.removeEventListener("mouseleave", resetAnimation)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="bg-white/80 backdrop-blur-md rounded-[40px] p-8 h-full flex flex-col border-4 border-white/50 shadow-lg"
      style={{ transition: "box-shadow 0.5s ease, transform 0.5s ease" }}
    >
      <div className="flex justify-between items-center mb-8">
        <div
          ref={avatarRef}
          className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg"
        >
          <Image
            src={author.avatar || "/placeholder.svg"}
            alt={author.name}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div className="bg-white rounded-full px-6 py-2 border-2 border-white/70 shadow-md">
          <Image
            src={companyLogo || "/placeholder.svg"}
            alt={author.company}
            width={80}
            height={30}
            className="object-contain"
          />
        </div>
      </div>

      <div className="text-5xl mb-6 text-gray-300">"</div>

      <div ref={quoteRef} className="text-2xl font-light mb-6 flex-grow">
        {quote}
      </div>

      <div className="glass-card p-4 rounded-[20px]">
        <div className="font-medium">{author.name}</div>
        <div className="text-sm text-gray-500">
          {author.title}, {author.company}
        </div>
        <div className="text-sm text-gray-500">{author.location}</div>
      </div>
    </div>
  )
}
