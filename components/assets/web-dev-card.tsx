"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Code, Monitor } from "lucide-react"
import gsap from "gsap"

const WebDevCard = () => {
  // State for checkbox checked status (simulates an on/off or active/inactive state)
  const [isActive, setIsActive] = useState(false)
  // State for hover status on the main wrap element
  const [isWrapHovered, setIsWrapHovered] = useState(false)
  // State to hold the dynamic transform style for the card based on area hover
  const [cardRotationStyle, setCardRotationStyle] = useState({})
  // State to track if card is in viewport
  const [isInView, setIsInView] = useState(false)
  // State for controlling background wave opacity for seamless transitions
  const [waveOpacity, setWaveOpacity] = useState(0)
  // State for particle density - helps with performance
  const [particleDensity, setParticleDensity] = useState(0)

  // Refs for the main component and animated elements
  const componentRef = useRef<HTMLDivElement>(null)
  const waveContainerRef = useRef<HTMLDivElement>(null)
  const outerCircleRef = useRef<HTMLDivElement>(null)
  const innerCircleRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Set up intersection observer to detect when card is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            // Gradually fade in waves and increase particle density when card comes into view
            setTimeout(() => {
              setWaveOpacity(0.8)
              setParticleDensity(40)
            }, 300)
          } else {
            // Reset animations when out of view for performance
            setIsInView(false)
            setWaveOpacity(0)
            setParticleDensity(0)
          }
        })
      },
      { threshold: 0.2, rootMargin: "50px" }, // More sensitive triggering
    )

    if (componentRef.current) {
      observer.observe(componentRef.current)
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current)
      }
    }
  }, [])

  // Add subtle parallax movement to background waves based on mouse position
  useEffect(() => {
    if (!isInView || !waveContainerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!componentRef.current || !waveContainerRef.current) return

      // Get component dimensions and position
      const rect = componentRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Calculate mouse position relative to center (values between -1 and 1)
      const relativeX = (e.clientX - centerX) / (rect.width / 2)
      const relativeY = (e.clientY - centerY) / (rect.height / 2)

      // Apply gentle transform to wave container (subtle parallax)
      gsap.to(waveContainerRef.current, {
        x: relativeX * 20, // 20px max movement
        y: relativeY * 20,
        rotateX: relativeY * -2, // Subtle tilt
        rotateY: relativeX * 2,
        duration: 1.2,
        ease: "power2.out"
      })
    }

    // Throttled event listener to improve performance
    let timeout: NodeJS.Timeout
    const throttledMove = (e: MouseEvent) => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => handleMouseMove(e), 10)
    }

    document.addEventListener('mousemove', throttledMove)
    
    return () => {
      document.removeEventListener('mousemove', throttledMove)
    }
  }, [isInView])

  // --- Event Handlers ---
  // Toggle active state
  const handleToggleActive = () => {
    setIsActive(!isActive)

    // Add subtle animation when toggling
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: !isActive ? 0.98 : 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.7)",
        yoyo: true
      })
    }
  }

  // Handle mouse enter on the wrap element
  const handleWrapMouseEnter = () => {
    setIsWrapHovered(true)
    // Increase wave opacity and particle density on hover
    setWaveOpacity(1)
    setParticleDensity(60)

    // Add subtle animation when hovering
    if (outerCircleRef.current && innerCircleRef.current) {
      gsap.to(outerCircleRef.current, {
        scale: 1.02,
        duration: 0.8,
        ease: "power2.out"
      })
      gsap.to(innerCircleRef.current, {
        scale: 1.05,
        duration: 0.6,
        ease: "power2.out"
      })
    }
  }

  // Handle mouse leave on the wrap element
  const handleWrapMouseLeave = () => {
    setIsWrapHovered(false)
    // Reset rotation when not hovering the wrap anymore
    setCardRotationStyle({})
    // Reduce wave opacity and particle density to normal
    setWaveOpacity(isInView ? 0.8 : 0)
    setParticleDensity(isInView ? 40 : 0)

    // Reset animations
    if (outerCircleRef.current && innerCircleRef.current) {
      gsap.to(outerCircleRef.current, {
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      })
      gsap.to(innerCircleRef.current, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      })
    }
  }

  // Handle mouse enter on an area div - applies rotation with improved smoothness
  const handleAreaMouseEnter = useCallback(
    (rotationStyle: React.CSSProperties) => {
      if (isWrapHovered && cardRef.current) {
        // Only apply rotation if the wrap is also hovered
        setCardRotationStyle(rotationStyle)
        
        // Add subtle scaling animation
        gsap.to(cardRef.current, {
          scale: 1.01,
          duration: 0.4,
          ease: "power2.out"
        })
      }
    },
    [isWrapHovered],
  )

  // Handle mouse leave on an area div
  const handleAreaMouseLeave = useCallback(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      })
    }
  }, [])

  // Define rotation styles for each area with improved values for better 3D effect
  const perspectiveValue = "1000px" // Increased for better depth
  const areaRotationStyles = [
    { transform: `perspective(${perspectiveValue}) rotateX(10deg) rotateY(-12deg) scale3d(1, 1, 1)` }, // Area 1
    { transform: `perspective(${perspectiveValue}) rotateX(10deg) rotateY(-6deg) scale3d(1, 1, 1)` }, // Area 2
    { transform: `perspective(${perspectiveValue}) rotateX(10deg) rotateY(0) scale3d(1, 1, 1)` }, // Area 3
    { transform: `perspective(${perspectiveValue}) rotateX(10deg) rotateY(6deg) scale3d(1, 1, 1)` }, // Area 4
    { transform: `perspective(${perspectiveValue}) rotateX(10deg) rotateY(12deg) scale3d(1, 1, 1)` }, // Area 5
    { transform: `perspective(${perspectiveValue}) rotateX(0) rotateY(-12deg) scale3d(1, 1, 1)` }, // Area 6
    { transform: `perspective(${perspectiveValue}) rotateX(0) rotateY(-6deg) scale3d(1, 1, 1)` }, // Area 7
    { transform: `perspective(${perspectiveValue}) rotateX(0) rotateY(0) scale3d(1, 1, 1)` }, // Area 8 (Center)
    { transform: `perspective(${perspectiveValue}) rotateX(0) rotateY(6deg) scale3d(1, 1, 1)` }, // Area 9
    { transform: `perspective(${perspectiveValue}) rotateX(0) rotateY(12deg) scale3d(1, 1, 1)` }, // Area 10
    { transform: `perspective(${perspectiveValue}) rotateX(-10deg) rotateY(-12deg) scale3d(1, 1, 1)` }, // Area 11
    { transform: `perspective(${perspectiveValue}) rotateX(-10deg) rotateY(-6deg) scale3d(1, 1, 1)` }, // Area 12
    { transform: `perspective(${perspectiveValue}) rotateX(-10deg) rotateY(0) scale3d(1, 1, 1)` }, // Area 13
    { transform: `perspective(${perspectiveValue}) rotateX(-10deg) rotateY(6deg) scale3d(1, 1, 1)` }, // Area 14
    { transform: `perspective(${perspectiveValue}) rotateX(-10deg) rotateY(12deg) scale3d(1, 1, 1)` }, // Area 15
  ].reverse() // Keep reverse or remove based on desired grid mapping

  // --- Dynamic Classes for improved animations ---
  // Animation pause logic - only animate when in view for performance
  const circle1Animation = !isInView || isActive ? "animate-paused" : "animate-circle1"
  const circle2Animation = !isInView || isActive ? "animate-paused" : "animate-circle2"
  
  // Circle 2 background animation/opacity
  const circle2BgAnimation =
    isActive || !isWrapHovered || !isInView ? "before:animate-paused" : "before:animate-bgRotate before:animate-running"
  const circle2BgBeforeOpacity = isWrapHovered && isInView ? "before:opacity-25" : "before:opacity-0"

  // Icon visibility logic with improved transitions
  // Icon 1 (Code) is visible by default, hides on hover
  const icon1Classes = `absolute w-24 h-24 transition-all duration-[800ms] ease-[cubic-bezier(0.7,-1,0.3,1.5)] ${
    isWrapHovered ? "translate-y-[-80px] scale-75 rotate-x-90 blur-sm opacity-0" : "translate-y-0 scale-100 rotate-x-0 blur-0 opacity-100"
  }`
  // Icon 2 (Monitor) appears on hover
  const icon2Classes = `absolute w-24 h-24 transition-all duration-[800ms] ease-[cubic-bezier(0.7,-1,0.3,1.5)] ${
    isWrapHovered ? "translate-y-0 scale-100 rotate-x-0 blur-0 opacity-80" : "translate-y-[80px] scale-75 rotate-x-90 blur-sm opacity-0"
  }`

  // Footer text animation
  const footerPClasses = `flex flex-wrap gap-x-1 text-base relative z-10 leading-[17px] transition-transform duration-300 ease-in-out text-gray-600 ${
    isWrapHovered ? "translate-y-[-4px] translate-z-[20px]" : "translate-y-0 translate-z-[20px]"
  }`
  const footerSpanAnimation = !isInView || isActive ? "animate-paused opacity-100" : "animate-labels"

  return (
    <div
      ref={componentRef}
      className="relative w-full min-h-[400px] flex items-center justify-center overflow-hidden font-sans"
    >
      {/* Ambient, seamless background effects */}
      <div 
        ref={waveContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none transform-style-preserve-3d"
        style={{ 
          opacity: waveOpacity, 
          transition: "opacity 800ms cubic-bezier(0.4, 0.0, 0.2, 1)",
          transform: "translateZ(0)", // Hardware acceleration
          filter: "blur(0.5px)" // Subtle blur for better visual integration with the card
        }}
      >
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-200/20 via-indigo-200/10 via-purple-200/5 to-transparent"></div>
        
        {/* Dynamic particle background - only rendered when in view for performance */}
        {particleDensity > 0 && (
          <div className="particle-container absolute inset-0 w-full h-full">
            {[...Array(particleDensity)].map((_, i) => (
              <div
                key={i}
                className="particle absolute rounded-full"
                style={{
                  width: Math.random() * 5 + 1 + "px",
                  height: Math.random() * 5 + 1 + "px", 
                  backgroundColor: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 255}, ${Math.random() * 0.15 + 0.03})`,
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  animationDuration: Math.random() * 20 + 10 + "s",
                  animationDelay: Math.random() * 5 + "s"
                }}
              />
            ))}
          </div>
        )}
        
        {/* Wave container */}
        <div className="wave-container absolute inset-0 w-full h-full">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <div className="wave wave4"></div>
        </div>
      </div>

      {/* Embedded styles for keyframes and complex styles */}
      <style>{`
        /* Custom Properties */
        :root {
          --perspective: 1000px;
        }
        
        /* Tailwind Plugin Equivalents & Utilities */
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .transform-style-flat { transform-style: flat; }
        .translate-z-\\[10px\\] { transform: translateZ(10px); }
        .translate-z-\\[20px\\] { transform: translateZ(20px); }
        .translate-z-\\[30px\\] { transform: translateZ(30px); }
        .translate-z-\\[50px\\] { transform: translateZ(50px); }
        .rotate-x-90 { transform: rotateX(90deg); }
        
        /* Background & particle styles */
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
        
        .particle {
          position: absolute;
          opacity: 0;
          animation: float-particle linear infinite;
        }
        
        @keyframes float-particle {
          0% { transform: translateY(10px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-30vh); opacity: 0; }
        }
        
        /* Wave container styles */
        .wave-container {
          transform: rotate(0deg) scale(1.5);
          opacity: 0.7;
          will-change: transform;
          backface-visibility: hidden;
          mix-blend-mode: overlay; /* Better blending with background */
        }
        
        .wave {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          border-radius: 38%; /* Slightly increased border-radius */
          animation: wave-rotate 12s linear infinite;
          pointer-events: none;
          will-change: transform; /* Performance optimization */
        }
        
        .wave1 {
          border: 2px solid rgba(0, 114, 255, 0.25);
          animation-duration: 20s; /* Slightly slower for better smoothness */
        }
        
        .wave2 {
          border: 3px solid rgba(34, 197, 94, 0.15);
          animation-duration: 15s;
          animation-direction: reverse;
          top: -45%;
          left: -55%;
        }
        
        .wave3 {
          border: 2px dashed rgba(0, 198, 255, 0.2);
          animation-duration: 25s; /* Slower for more stability */
          top: -55%;
          left: -45%;
        }
        
        .wave4 {
          border: 1px dotted rgba(99, 102, 241, 0.2);
          animation-duration: 18s;
          animation-direction: reverse;
          top: -52%;
          left: -48%;
        }
        
        @keyframes wave-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Add a subtle pulse animation to enhance the wave effect */
        .wave::after {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: inherit;
          opacity: 0.3;
          filter: blur(10px);
          background: inherit;
          animation: wave-pulse 8s ease-in-out infinite;
        }
        
        @keyframes wave-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.4; }
        }

        /* Card keyframes with improved smoothness */
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes rotate-lines { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        @keyframes wave {
          0% { transform: scale(1); opacity: 0; box-shadow: 0 0 30px rgba(30, 100, 200, 0.9); }
          35% { transform: scale(1.3); opacity: 1; }
          70%, 100% { transform: scale(1.8); opacity: 0; box-shadow: 0 0 30px rgba(30, 100, 200, 0.3); }
        }
        
        @keyframes circle1 {
            0% { transform: scale(0.97) translateZ(calc(20px + var(--z, 0px))); }
            15% { transform: scale(1) translateZ(calc(30px + var(--z, 0px))); }
            30% { transform: scale(0.98) translateZ(calc(20px + var(--z, 0px))); }
            45% { transform: scale(1) translateZ(calc(30px + var(--z, 0px))); }
            60% { transform: scale(0.97) translateZ(calc(20px + var(--z, 0px))); }
            85% { transform: scale(1) translateZ(calc(30px + var(--z, 0px))); }
            100% { transform: scale(0.97) translateZ(calc(20px + var(--z, 0px))); }
        }
        
        @keyframes circle2 {
            0% { transform: scale(1) translateZ(calc(20px + var(--z, 10px))); }
            15% { transform: scale(1.03) translateZ(calc(30px + var(--z, 10px))); }
            30% { transform: scale(0.98) translateZ(calc(20px + var(--z, 10px))); }
            45% { transform: scale(1.04) translateZ(calc(30px + var(--z, 10px))); }
            60% { transform: scale(0.97) translateZ(calc(20px + var(--z, 10px))); }
            85% { transform: scale(1.03) translateZ(calc(30px + var(--z, 10px))); }
            100% { transform: scale(1) translateZ(calc(20px + var(--z, 10px))); }
        }
        
        @keyframes bgRotate {
            0% { transform: rotate(0deg); } 
            20% { transform: rotate(90deg); }
            40% { transform: rotate(180deg) scale(0.95, 1); } 
            60%, 100% { transform: rotate(360deg); }
        }
        
        @keyframes bg {
            20% { background-color: rgba(0, 220, 255, 0.2); }
            40% { background-color: rgba(0, 120, 255, 0.2); }
            60% { background-color: rgba(50, 205, 50, 0.2); }
            80% { background-color: rgba(100, 149, 237, 0.2); }
        }
        
        @keyframes footer {
            0%, 100% { opacity: 0.7; transform: scaleY(0.95); } 
            50% { opacity: 1; transform: scaleY(1); }
        }
        
        @keyframes labels {
            0% { transform: translateY(-20px) rotate(-15deg); filter: blur(8px); opacity: 0; }
            5% { transform: translateY(5px); filter: blur(0px); opacity: 1; }
            10% { transform: translateY(0); opacity: 1; } 
            73% { transform: translateY(0); opacity: 1; }
            76% { transform: translateY(-3px); filter: blur(0px); }
            80% { transform: translateY(10px); opacity: 0; filter: blur(3px); }
        }

        /* Apply animations with better performance */
        .animate-rotate { animation: rotate 3s linear infinite; }
        .animate-wave { animation: wave 1.5s linear infinite; }
        .animate-circle1 { animation: circle1 4.2s ease-in-out infinite 0.3s; }
        .animate-circle2 { animation: circle2 4.2s ease-in-out infinite; }
        .animate-bgRotate { animation: bgRotate 2.5s linear infinite; }
        .animate-bg { animation: bg 4s linear infinite; }
        .animate-footer { animation: footer 9s ease infinite 0.8s; }
        .animate-labels { animation: labels 9s ease infinite; }

        /* Animation play state - better for performance */
        .animate-paused { animation-play-state: paused !important; }
        .animate-running { animation-play-state: running !important; }

        /* Styling for the rotating background on Circle 2 */
        .circle2-bg::before {
            content: ''; position: absolute; inset: -20px; border-radius: 50%;
            background: conic-gradient(from 0deg, #00c6ff, #0072ff, #22c55e, #6366f1, #00c6ff);
            transition: opacity 0.5s ease-in-out; z-index: -1;
            will-change: transform; /* Performance optimization */
        }
      `}</style>
      
      {/* Interaction Grid (3 rows, 5 columns) */}
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 transform-style-preserve-3d z-10">
        {areaRotationStyles.map((style, index) => (
          <div
            key={index}
            className="relative z-10" // Area divs for hover interaction
            onMouseEnter={() => handleAreaMouseEnter(style)}
            onMouseLeave={handleAreaMouseLeave}
          />
        ))}
        
        {/* Card Wrapper - Positioned via label, handles main hover */}
        <label
          className="flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transform-style-preserve-3d cursor-pointer col-start-2 col-span-3 row-start-1 row-span-3 w-full h-full" // Made full size for better interaction
          onMouseEnter={handleWrapMouseEnter}
          onMouseLeave={handleWrapMouseLeave}
        >
          {/* Hidden input to toggle state */}
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0 absolute"
            checked={isActive}
            onChange={handleToggleActive}
            aria-label="Toggle Card State"
          />
          
          {/* The Card */}
          <div
            ref={cardRef}
            className={`transform-style-preserve-3d w-[350px] h-[350px] rounded-[35px] flex flex-col items-center justify-center shadow-[0_10px_40px_rgba(0,0,60,0.25),inset_0_0_10px_rgba(255,255,255,0.5)] pb-[60px] pointer-events-none transition-transform duration-600 ease-in-out relative overflow-hidden
              before:content-[''] before:absolute before:inset-[1px] before:rounded-[inherit] before:z-[-1] before:transition-all before:duration-500 before:ease-linear
              ${isWrapHovered ? "before:bg-transparent" : "before:bg-transparent"}
            `}
            style={{
              ...cardRotationStyle,
              willChange: "transform", // Performance optimization
              backfaceVisibility: "hidden", // Performance optimization
            } as React.CSSProperties}
          >
            {/* Card Wave Effect */}
            <div className={`absolute w-full h-full inset-0 m-auto transition-opacity duration-500 ease-in-out z-0 ${
              isInView && !isActive ? "opacity-100" : "opacity-0"
            }`}>
              <div className="absolute w-[300px] h-[300px] rounded-full border border-white/50 shadow-[0_0_30px_rgba(30,100,200,0.5)] filter blur-sm inset-0 m-auto animate-wave"></div>
              <div className="absolute w-[300px] h-[300px] rounded-full border border-white/50 shadow-[0_0_30px_rgba(30,100,200,0.5)] filter blur-sm inset-0 m-auto animate-wave [animation-delay:0.4s]"></div>
            </div>

            {/* Main Content Area with improved 3D effect */}
            <div className="flex-grow flex items-center justify-center relative transform-style-preserve-3d w-full">
              {/* Circle 1 (Outer) */}
              <div
                ref={outerCircleRef}
                className={`w-[250px] h-[250px] rounded-full absolute shadow-[inset_0_0_3px_0_white,inset_60px_40px_30px_-40px_rgba(30,100,200,0.15),20px_20px_70px_-5px_rgb(150,166,197),-50px_-50px_70px_20px_rgba(255,255,255,0.7),inset_0_0_30px_0_white] bg-gray-500/10 flex items-center justify-center transform-style-preserve-3d z-[1] ${circle1Animation} animate-bg`}
                style={{ 
                  "--z": "0px",
                  willChange: "transform",
                  backfaceVisibility: "hidden" 
                } as React.CSSProperties}
              >
                {/* Blur spots */}
                <div className="absolute rounded-full filter blur-[40px] w-[30%] h-[30%] bg-[#0072ff] top-[30%] right-[30%] opacity-80"></div>
                <div className="absolute rounded-full filter blur-[40px] w-[30%] h-[30%] bg-[#22c55e] bottom-[10%] left-[30%] opacity-80"></div>
              </div>

              {/* Circle 2 (Inner) */}
              <div
                ref={innerCircleRef}
                className={`w-[150px] h-[150px] rounded-full absolute transform-style-preserve-3d bg-white z-[9] flex items-center justify-center overflow-hidden circle2-bg ${circle2Animation} ${circle2BgAnimation} ${circle2BgBeforeOpacity}`}
                style={{ 
                  "--z": "10px",
                  willChange: "transform",
                  backfaceVisibility: "hidden"
                } as React.CSSProperties}
              >
                {/* Icons Container */}
                <div className="relative w-full h-full flex items-center justify-center transform-style-preserve-3d">
                  {/* Icon 1: Code (Default) */}
                  <div className={icon1Classes}>
                    <Code className="w-full h-full text-gray-500" strokeWidth={1.5} />
                  </div>
                  {/* Icon 2: Monitor (On Hover) */}
                  <div className={icon2Classes}>
                    <Monitor className="w-full h-full text-blue-600" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-[60px] flex items-center justify-center rounded-b-[inherit] px-5 transform-style-preserve-3d ${isActive ? "animate-paused" : "animate-footer"}`}
            >
              <p className={footerPClasses}>
                {/* Web Development text */}
                {"Web Development".split("").map((char, index) => (
                  <span key={index} style={{ "--i": index * 0.1 } as React.CSSProperties} className={`${footerSpanAnimation} inline-block`}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </label>
      </div>
    </div>
  )
}

export default WebDevCard
