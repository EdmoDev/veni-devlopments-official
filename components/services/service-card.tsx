"use client"

import type { ReactNode } from "react"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"

interface ServiceCardProps {
  id: string
  title: string
  subtitle?: string
  description: string
  isGradient?: boolean
  leftContent: ReactNode
  filterTags?: string[]
}

export function ServiceCard({
  id,
  title,
  subtitle,
  description,
  isGradient = false,
  leftContent,
  filterTags = [],
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [particleDensity, setParticleDensity] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Intersection Observer for isInView state
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            // Gradually increase particle density for better performance
            setTimeout(() => {
              setParticleDensity(0)
            }, 300)
          } else {
            // Reset when out of view to save resources
            setIsInView(false)
            setParticleDensity(0)
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  // Effect to detect scroll start/end
  useEffect(() => {
    const handleGlobalScroll = () => {
      setIsScrolling(true)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener("scroll", handleGlobalScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleGlobalScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Add parallax effect to waves on mouse movement
  useEffect(() => {
    // DIAGNOSTIC: Mouse-move parallax wave animation temporarily disabled
    /*
    if (!isInView || !waveRef.current || !cardRef.current) {
      return;
    }

    const currentCardElement = cardRef.current;
    const currentWaveElement = waveRef.current;
    let animationFrameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (isScrolling || !currentCardElement || !currentWaveElement) {
        if (animationFrameId) { 
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        return;
      }

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        if (isScrolling || !currentCardElement || !currentWaveElement) {
            animationFrameId = null; 
            return;
        }

        const rect = currentCardElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const relativeX = (e.clientX - centerX) / (rect.width / 2);
        const relativeY = (e.clientY - centerY) / (rect.height / 2);

        gsap.to(currentWaveElement, {
          x: relativeX * 12,
          y: relativeY * 12,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        });
        animationFrameId = null; 
      });
    };

    currentCardElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      currentCardElement.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };
    */
  }, [isInView, isScrolling]); // Dependencies remain for structure, though effect is inert

  // Hover animation effect with GSAP
  useEffect(() => {
    if (!cardRef.current) return

    if (isScrolling) {
      gsap.to(cardRef.current, {
        scale: 1,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto"
      });
      // If scrolling, ensure particle density state reflects that no particles should be active for rendering.
      // if (particleDensity !== 0) setParticleDensity(0); // DIAGNOSTIC: Particles disabled
      return; 
    }

    // If not scrolling, apply standard hover/default logic:
    if (isHovered && isInView) {
      gsap.to(cardRef.current, {
        scale: 1.01,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
      // setParticleDensity(25); // DIAGNOSTIC: Particles disabled
    } else { 
      gsap.to(cardRef.current, {
        scale: 1,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
      // setParticleDensity(isInView ? 15 : 0); // DIAGNOSTIC: Particles disabled
    }
  }, [isHovered, isInView, isScrolling, cardRef]);

  useEffect(() => {
    setParticleDensity(0);
  }, []);

  return (
    <div
      ref={cardRef}
      className="service-card bg-white/90 rounded-[30px] shadow-lg w-full overflow-hidden backdrop-blur-md border border-black/5 relative transform-style-preserve-3d h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Embedded styles for wave animation */}
      <style>{`
        .transform-style-preserve-3d { transform-style: preserve-3d; }

        @keyframes flow-wave {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-350px); }
        }

        .wave-path-base {
          animation-name: flow-wave;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform; /* Promote to own layer */
          backface-visibility: hidden;
        }

        .wave-path-1 {
          animation-duration: 12s;
        }

        .wave-path-2 {
          animation-duration: 18s;
          animation-delay: -3s;
        }

        .wave-path-3 {
          animation-duration: 24s;
          animation-delay: -6s;
        }

        .animate-paused { animation-play-state: paused !important; }
        .animate-running { animation-play-state: running !important; }

        .card-item {
          opacity: 0;
          transform: translateY(15px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          will-change: opacity, transform;
        }

        .in-view .card-item {
          opacity: 1;
          transform: translateY(0);
        }

        .in-view .card-item-1 { transition-delay: 0.1s; }
        .in-view .card-item-2 { transition-delay: 0.2s; }
        .in-view .card-item-3 { transition-delay: 0.3s; }
        .in-view .card-item-4 { transition-delay: 0.4s; }

        /* Particle styles */
        .particle {
          position: absolute;
          opacity: 0;
          animation: float-particle linear infinite;
          pointer-events: none;
        }

        @keyframes float-particle {
          0% { transform: translateY(10px); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-150px); opacity: 0; }
        }

        /* Gradient overlay for depth */
        .gradient-overlay {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(255, 255, 255, 0.3) 100%
          );
        }
      `}</style>

      {/* Background glow effect */}
      {isGradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50 z-0"></div>
      )}

      {/* Particles - DIAGNOSTIC: Rendering disabled */}
      {/* {!isScrolling && particleDensity > 0 && (
        <div className="particle-container absolute inset-0 w-full h-full overflow-hidden z-0">
          {[...Array(particleDensity)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="particle absolute rounded-full"
              style={{
                width: Math.random() * 4 + 1 + "px",
                height: Math.random() * 4 + 1 + "px", 
                backgroundColor: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 150}, ${Math.random() * 255}, ${Math.random() * 0.1 + 0.05})`,
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animationDuration: Math.random() * 10 + 5 + "s",
                animationDelay: Math.random() * 5 + "s"
              }}
            />
          ))}
        </div>
      )} */}

      {/* Seamless Wave Background with parallax effect */}
      <div
        ref={waveRef}
        className={`absolute inset-0 rounded-[inherit] transform-style-preserve-3d z-0 
                    transition-opacity duration-500 ease-linear
                    ${isInView ? "opacity-100" : "opacity-0"}`}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 350 350"
          preserveAspectRatio="none"
          className="absolute inset-0"
        >
          <defs>
            <path
              id={`wavePathDefinition-${id}`}
              d="M -350 175 C -250 125 -150 225 0 175 C 150 125 250 225 350 175 C 450 125 550 225 700 175 L 700 350 L -350 350 Z"
            />
            <path
              id={`wavePathDefinition2-${id}`}
              d="M -350 195 C -300 155 -200 215 -50 165 C 100 115 250 185 350 155 C 450 125 550 185 700 145 L 700 350 L -350 350 Z"
            />
          </defs>
          <use
            href={`#wavePathDefinition-${id}`}
            className={`wave-path-base wave-path-1 ${!isScrolling && isInView ? "animate-running" : "animate-paused"}`}
            fill="rgba(100, 150, 255, 0.08)"
          />
          <use
            href={`#wavePathDefinition-${id}`}
            className={`wave-path-base wave-path-2 ${!isScrolling && isInView ? "animate-running" : "animate-paused"}`}
            fill="rgba(100, 150, 255, 0.05)"
            transform="translate(60 15)"
          />
          <use
            href={`#wavePathDefinition2-${id}`}
            className={`wave-path-base wave-path-3 ${!isScrolling && isInView ? "animate-running" : "animate-paused"}`}
            fill="rgba(80, 130, 255, 0.03)"
            transform="translate(30 35)"
          />
        </svg>
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>

      {/* Main Card Content */}
      <div ref={contentRef} className={`p-8 relative z-10 flex flex-col h-full ${isInView ? "in-view" : ""}`}>
        <div className="mb-6 flex-grow">
          <div className="card-item card-item-1 text-3xl md:text-4xl font-extralight opacity-40 mb-4">{id}</div>

          <div className="card-item card-item-2">
            <h3 className="text-3xl md:text-4xl font-extralight mb-6">
              {title}
              {subtitle && <span className="block">{subtitle}</span>}
            </h3>
          </div>

          {/* Filter tags */}
          {filterTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 card-item card-item-3">
              {filterTags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-black/5 text-sm px-3 py-1 rounded-full backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="card-item card-item-3 text-base mb-8 max-w-2xl">{description}</p>
        </div>

        <div className="w-full card-item card-item-4">
          <div className="bg-white/40 backdrop-blur-sm p-6 rounded-[20px] border border-black/5 shadow-sm">
            {leftContent}
          </div>
        </div>
      </div>
    </div>
  )
}
