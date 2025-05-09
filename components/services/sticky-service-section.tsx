"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { serviceItems } from "@/data/services"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import Link from "next/link"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export function StickyServiceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Add the required animation styles
  const animationStyles = `
    @keyframes wave {
      0% { transform: scale(1); opacity: 0; box-shadow: 0 0 30px rgba(30, 100, 200, 0.9); }
      35% { transform: scale(1.3); opacity: 1; }
      70%, 100% { transform: scale(1.6); opacity: 0; box-shadow: 0 0 30px rgba(30, 100, 200, 0.3); }
    }
    .animate-wave { animation: wave 1.5s linear infinite; }
    
    .panel-visible .gsap-panel-content {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .gsap-panel-content {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
  `

  useEffect(() => {
    const container = containerRef.current
    const panels = panelsRef.current

    if (!container || !panels) return
    
    // Clear any existing ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Type-safe selector function
    const safeSelect = (parent: Element, selector: string) => {
      return Array.from(parent.querySelectorAll(selector)) as HTMLElement[]
    }

    // Get all panel elements - explicitly cast as HTMLElement[]
    const sections = Array.from(container.querySelectorAll('.service-panel')) as HTMLElement[]

    // Calculate the width to ensure proper snapping
    const panelWidth = sections.length > 0 ? sections[0].offsetWidth : 0
    
    // Animate header elements - use simpler animation
    if (headerRef.current) {
      const headerElements = safeSelect(headerRef.current, '.header-anim')
      gsap.fromTo(headerElements, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      )
    }

    // Create a horizontal scroll animation with refined settings
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none", // Linear motion for the panels themselves
      scrollTrigger: {
        trigger: container,
        pin: true,
        pinSpacing: true,
        scrub: 0.2, // Make scrub very responsive
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: { min: 0.2, max: 0.3 }, // Quick snap
          delay: 0, // No delay for snapping
          ease: "power1.inOut"
        },
        start: "top top+=15%", // Start pinning when 15% of viewport from top hits the container top
        end: () => `+=${panelWidth * (sections.length - 1)}px`, // Correct end calculation
        invalidateOnRefresh: true,
        pinType: "transform", // Usually best for performance
        // anticipatePin: 0.5, // Try a small value if pinning feels abrupt
        onUpdate: self => {
          const newIndex = Math.min(
            Math.round(self.progress * (sections.length - 1)),
            sections.length - 1
          );
          if (newIndex !== activeIndex) {
            sections.forEach(panel => panel.classList.remove('panel-visible'));
            if (sections[newIndex]) {
              sections[newIndex].classList.add('panel-visible');
            }
            setActiveIndex(newIndex);
          }
        },
        onLeave: () => {
          ScrollTrigger.refresh(); // Refresh ScrollTrigger when leaving the pinned section
        },
        onEnterBack: () => {
          ScrollTrigger.refresh(); // Refresh on re-entry as well
        }
      },
    });

    // Add indicator animations for the progress dots - simplified
    const dots = Array.from(document.querySelectorAll(".progress-dot")) as HTMLElement[]
    if (dots.length > 0) {
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => scrollToPanel(i));
        // Set initial state
        dot.classList.toggle('active-dot', i === activeIndex);
      });
      
      ScrollTrigger.create({
        trigger: container,
        start: "top 15%",
        end: () => `+=${panelWidth * (sections.length - 1)}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const activeIndex = Math.round(progress * (sections.length - 1))

          dots.forEach((dot, i) => {
            // Use CSS classes instead of GSAP for simple state changes
            dot.classList.toggle('active-dot', i === activeIndex)
          })
        },
      })
    }

    // Add a marker after the services section to ensure we can scroll past
    const endMarker = document.createElement('div');
    endMarker.classList.add('scroll-end-marker');
    endMarker.style.height = '1px';
    endMarker.style.width = '100%';
    endMarker.style.position = 'relative';
    container.parentNode?.insertBefore(endMarker, container.nextSibling);

    return () => {
      if (scrollTween.scrollTrigger) {
        scrollTween.scrollTrigger.kill()
      }
      
      // Remove the end marker
      if (endMarker.parentNode) {
        endMarker.parentNode.removeChild(endMarker);
      }
    }
  }, [])

  const scrollToPanel = (index: number) => {
    const scrollTo = containerRef.current?.offsetTop || 0;
    
    // Simple scroll to section
    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth'
    });
    
    // After a small delay, update the active panel
    setTimeout(() => {
      setActiveIndex(index);
      
      // Remove active class from all panels
      if (containerRef.current) {
        const sections = Array.from(containerRef.current.querySelectorAll('.service-panel')) as HTMLElement[];
        sections.forEach(panel => panel.classList.remove('panel-visible'));
        
        // Add active class to current panel
        if (sections[index]) {
          sections[index].classList.add('panel-visible');
        }
      }
      
      // Update the horizontal scroll position
      if (panelsRef.current) {
        const panelWidth = window.innerWidth;
        panelsRef.current.style.transform = `translateX(-${index * panelWidth}px)`;
      }
    }, 500);
  }

  return (
    <section id="services" className="relative">
      <style>{animationStyles}</style>
      <style>{`
        .active-dot {
          transform: scale(1.5);
          background-color: #000000;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .progress-dot {
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .service-card-container {
          will-change: transform;
          transition: transform 0.5s ease-out, box-shadow 0.5s ease-out;
        }
        /* Make sure the horizontal scroll container doesn't block vertical scrolling */
        .horizontal-scroll-container {
          overflow: visible !important; 
          overscroll-behavior-x: contain; /* Prevent horizontal scroll from affecting vertical */
        }
        .panels-container {
            /* Ensure this container explicitly participates in the 3D rendering context */
            transform-style: preserve-3d;
        }
      `}</style>
      
      {/* Services Header - Reduced padding */}
      <div ref={headerRef} className="py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="uppercase text-sm tracking-widest mb-6 md:mb-10 text-gray-500 service-header header-anim">What we do</div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-12">
            <div className="header-anim">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight mb-6">
                Our
                <br />
                Services
              </h2>
            </div>

            <div className="self-end">
              <div className="mb-6 md:mb-10 p-6 glass-card rounded-[20px] header-anim">
                <p className="mb-3 text-gray-700 text-sm md:text-base">
                  We offer a complete range of digital services to help your business stand out online, connect with
                  customers, and grow your revenue.
                </p>
                <p className="text-gray-700 text-sm md:text-base">
                  From beautiful websites to effective marketing campaigns, we create digital experiences that deliver
                  real results.
                </p>
              </div>

              <div className="flex items-center gap-2 header-anim">
                <div className="text-sm text-gray-500 mr-2">Scroll to explore</div>
                <div className="flex space-x-3">
                  {serviceItems.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full bg-gray-300 progress-dot cursor-pointer ${index === activeIndex ? 'active-dot' : ''}`}
                      onClick={() => scrollToPanel(index)}
                      aria-label={`Service ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div ref={containerRef} className="horizontal-scroll-container">
        {/* Panels Container */}
        <div ref={panelsRef} className="panels-container flex">
          {serviceItems.map((service, index) => (
            <div key={index} className={`service-panel min-w-full p-6 ${index === activeIndex ? 'panel-visible' : ''}`}>
              <div
                className={`service-card-container max-w-5xl mx-auto overflow-hidden relative transform-style-preserve-3d ${
                  activeIndex === index ? 'scale-105' : 'scale-100'
                }`}
                style={{
                  boxSizing: "border-box",
                  position: "relative",
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.76) 0%, rgba(255, 255, 255, 0.76) 100%)",
                  border: "8px solid #FFFFFF",
                  boxShadow: isHovering && activeIndex === index 
                    ? "0px 30px 60px rgba(22, 29, 36, 0.18)" 
                    : "0px 24px 38px rgba(22, 29, 36, 0.08)",
                  backdropFilter: "blur(79px)",
                  borderRadius: "80px",
                  transformStyle: "preserve-3d",
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Add the wave effect animation elements - simplified */}
                <div className={`wave-effect absolute w-[300px] h-[300px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-300 ease-linear z-10 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute w-full h-full rounded-full border-2 border-white/80 shadow-[0_0_30px_rgba(30,100,200,0.5)] filter blur-sm inset-0 animate-wave"></div>
                  <div
                    className="absolute w-full h-full rounded-full border-2 border-white/80 shadow-[0_0_30px_rgba(30,100,200,0.5)] filter blur-sm inset-0 animate-wave"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <div className="relative z-20">
                  <div className="p-6 md:p-8">
                    <div className="mb-4">
                      <div className="gsap-panel-content text-2xl md:text-3xl font-extralight opacity-40 mb-2">{service.id}</div>
                      <h3 className="gsap-panel-content text-2xl md:text-4xl font-extralight mb-4">
                        {service.title}
                        {service.subtitle && <span className="block">{service.subtitle}</span>}
                      </h3>
                      <p className="gsap-panel-content text-sm md:text-base mb-6 max-w-2xl">{service.description}</p>
                    </div>

                    <div className="w-full gsap-panel-content">
                      <div className="bg-white/30 backdrop-blur-sm p-4 rounded-[16px] border border-black/10">
                        {service.leftContent}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Footer - Reduced padding */}
      <div className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row md:items-center">
            <div className="text-gray-500 mb-4 md:mb-0">See how we can help you</div>
            <div className="hidden md:block h-px bg-gray-200 flex-grow mx-4"></div>
            <div>
              <Link
                href="#work"
                className="inline-flex items-center rounded-full px-5 py-2 bg-black text-white hover:bg-gray-900 transition-colors"
              >
                View Our Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Services banner */}
          <div className="max-w-7xl mx-auto mt-6 md:mt-12">
            <div className="bg-black text-white rounded-[20px] p-4 md:p-6 flex items-center justify-center overflow-hidden shadow-lg border border-white/10">
              <div className="text-base md:text-xl font-light flex flex-wrap justify-center gap-x-4 md:gap-x-6">
                <span className="whitespace-nowrap">Web Design</span>
                <span className="opacity-50 hidden md:inline">•</span>
                <span className="whitespace-nowrap">Development</span>
                <span className="opacity-50 hidden md:inline">•</span>
                <span className="whitespace-nowrap">E-Commerce</span>
                <span className="opacity-50 hidden md:inline">•</span>
                <span className="whitespace-nowrap">Digital Marketing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
