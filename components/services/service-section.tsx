"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import LiquidButton from "@/components/liquid-button"
import { throttle } from "@/hooks/use-debounced-animation"
import useButtonScrollFade from "@/hooks/useButtonScrollFade" // Import the new hook

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ServiceSectionProps {
  children: React.ReactNode
  totalCards: number
  onCardChange?: (index: number) => void
}

export function ServiceSection({ children, totalCards, onCardChange }: ServiceSectionProps) {
  const servicesRef = useRef<HTMLDivElement>(null)
  const servicesContainerRef = useRef<HTMLDivElement>(null)
  const serviceCardsRef = useRef<HTMLDivElement>(null)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const scrollDistanceRef = useRef<number>(0);
  const viewCasesButtonRef = useRef<HTMLDivElement>(null); // Ref for the button

  useEffect(() => {
    // Services header animation
    gsap.fromTo(
      ".service-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )

    // Create the scroll-triggered horizontal animation
    if (servicesContainerRef.current && serviceCardsRef.current) {
      const cardsContainer = serviceCardsRef.current;
      const serviceCards = Array.from(cardsContainer.children) as HTMLElement[];

      // Ensure cards container is ready for flex layout
      gsap.set(cardsContainer, { display: 'flex', width: 'max-content', flexWrap: 'nowrap' });
      
      const cardWidthPercentage = 0.8; // 80% of viewport width
      let totalWidth = 0;

      serviceCards.forEach((card, i) => {
        const cardWidth = window.innerWidth * cardWidthPercentage;
        gsap.set(card, {
          width: cardWidth,
          flexShrink: 0,
          marginRight: i < serviceCards.length - 1 ? window.innerWidth * 0.05 : 0
        });
        totalWidth += cardWidth + (i < serviceCards.length - 1 ? window.innerWidth * 0.05 : 0);
      });
      gsap.set(cardsContainer, { width: totalWidth });

      // Calculate the distance to scroll horizontally and store in ref
      scrollDistanceRef.current = totalWidth - window.innerWidth + (window.innerWidth * (1 - cardWidthPercentage) / 2);

      if (scrollDistanceRef.current <= 0) {
        // Not enough content to scroll horizontally
        return;
      }
      
      // Create a scroll trigger for the services section
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: servicesContainerRef.current,
        pin: servicesContainerRef.current,
        start: "top top",
        end: () => `+=${scrollDistanceRef.current}`, // Use ref value
        scrub: 1.5,
        anticipatePin: 0.2,
        onUpdate: (self) => {
          if (isAnimating) return;
          gsap.to(cardsContainer, {
            x: () => -self.progress * scrollDistanceRef.current, // Use ref value
            ease: "none",
            overwrite: "auto",
          });

          // Determine active card based on horizontal scroll progress
          let accumulatedWidth = 0;
          let currentCardIndex = 0;
          const currentX = self.progress * scrollDistanceRef.current; // Use ref value

          for (let i = 0; i < serviceCards.length; i++) {
            const card = serviceCards[i];
            const cardEffectiveWidth = card.offsetWidth + (i < serviceCards.length - 1 ? parseFloat(getComputedStyle(card).marginRight) || 0 : 0);
            if (currentX >= accumulatedWidth && currentX < accumulatedWidth + cardEffectiveWidth / 2) {
              currentCardIndex = i;
              break;
            }
            if (currentX >= accumulatedWidth + cardEffectiveWidth / 2 && currentX < accumulatedWidth + cardEffectiveWidth) {
              currentCardIndex = i;
              if (i < serviceCards.length -1) currentCardIndex = i; else currentCardIndex = serviceCards.length -1;
              break;
            }
            accumulatedWidth += cardEffectiveWidth;
            if (i === serviceCards.length - 1 && currentX >= accumulatedWidth) {
                currentCardIndex = serviceCards.length -1;
                break;
            }
          }
          
          if (currentCardIndex !== activeServiceIndex) {
            setActiveServiceIndex(currentCardIndex);
            onCardChange?.(currentCardIndex);
          }
        },
        onRefresh: () => {
          // Recalculate scrollDistance and totalWidth on resize
          let newTotalWidth = 0;
          serviceCards.forEach((card, i) => {
            const cardWidth = window.innerWidth * cardWidthPercentage;
            gsap.set(card, { width: cardWidth });
            newTotalWidth += cardWidth + (i < serviceCards.length - 1 ? window.innerWidth * 0.05 : 0);
          });
          gsap.set(cardsContainer, { width: newTotalWidth });
          scrollDistanceRef.current = newTotalWidth - window.innerWidth + (window.innerWidth * (1 - cardWidthPercentage) / 2); // Update ref value
          // ScrollTrigger.refresh() will call the 'end' function again, which uses scrollDistanceRef.current
        }
      });

      return () => {
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }
        gsap.killTweensOf(cardsContainer);
      };
    }
  }, [totalCards, isAnimating, onCardChange]);

  // Apply scroll fade to the "View Our Cases" button
  useButtonScrollFade(viewCasesButtonRef);

  const navigateToCard = (index: number) => {
    if (isAnimating || !scrollTriggerRef.current || !serviceCardsRef.current || index === activeServiceIndex) return;

    const cardsContainer = serviceCardsRef.current;
    const serviceCards = Array.from(cardsContainer.children) as HTMLElement[];
    
    if (index < 0 || index >= serviceCards.length) return;

    let targetX = 0;
    for (let i = 0; i < index; i++) {
      targetX += serviceCards[i].offsetWidth + parseFloat(getComputedStyle(serviceCards[i]).marginRight || '0');
    }
    
    targetX = Math.max(0, Math.min(targetX, scrollDistanceRef.current)); // Use ref value


    // Calculate the progress required for ScrollTrigger
    const progress = scrollDistanceRef.current > 0 ? targetX / scrollDistanceRef.current : 0; // Use ref value
    
    const st = scrollTriggerRef.current;
    const targetScrollY = st.start + progress * (st.end - st.start);

    setIsAnimating(true);
    gsap.to(window, {
      scrollTo: {
        y: targetScrollY,
        autoKill: false // ScrollSmoother will handle this
      },
      duration: 1, // Adjust duration as needed
      ease: "power2.inOut",
      onComplete: () => {
        setIsAnimating(false);
        // setActiveServiceIndex(index); // ScrollTrigger's onUpdate should handle this
        // onCardChange?.(index);
        // It's better to let ScrollTrigger's onUpdate set the active index
        // to keep it synchronized with the actual scroll position.
      },
      onInterrupt: () => { // Ensure isAnimating is reset if scroll is interrupted
        setIsAnimating(false);
      }
    });
  };

  const handleServiceNavigation = (direction: "prev" | "next") => {
    const newIndex = direction === "prev"
      ? Math.max(0, activeServiceIndex - 1)
      : Math.min(totalCards - 1, activeServiceIndex + 1);
    navigateToCard(newIndex);
  };

  const handleDotClick = (index: number) => {
    navigateToCard(index);
  };

  return (
    <section ref={servicesRef} id="services" className="relative overflow-hidden">
      {/* Services Header */}
      <div className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="uppercase text-sm tracking-wider mb-8 md:mb-16 text-gray-500 service-header">
            How we can help you
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-10 md:mb-20">
            <div className="service-header">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight mb-8">
                Services
                <br />
                We Offer
              </h2>
            </div>

            <div className="self-end service-header">
              <div className="mb-8 md:mb-16">
                <p className="mb-4 text-gray-700">
                  IT solutions that improve organizational capabilities for high-paced product development, faster
                  delivery of applications and services are still essential for every company to gain a competitive
                  edge.
                </p>
                <p className="text-gray-700">
                  Drive rapid growth and high value for your business with our proven, dynamic and scalable offerings.
                </p>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex space-x-3">
                  {Array.from({ length: totalCards }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeServiceIndex === index ? "bg-black scale-125" : "bg-gray-300"
                      }`}
                      aria-label={`Go to service ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex space-x-2">
                  <button
                    className="w-10 h-10 rounded-full border flex items-center justify-center data-hoverable"
                    onClick={() => handleServiceNavigation("prev")}
                    disabled={activeServiceIndex === 0 || isAnimating}
                    aria-label="Previous service"
                  >
                    <ArrowLeft className={`h-5 w-5 ${activeServiceIndex === 0 ? "opacity-50" : ""}`} />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center data-hoverable"
                    onClick={() => handleServiceNavigation("next")}
                    disabled={activeServiceIndex === totalCards - 1 || isAnimating}
                    aria-label="Next service"
                  >
                    <ArrowRight className={`h-5 w-5 ${activeServiceIndex === totalCards - 1 ? "opacity-50" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Cards Container - Storytelling Scroll Experience */}
      <div
        ref={servicesContainerRef}
        className="relative overflow-hidden"
        style={{ height: "90vh" }} // Taller container for full card visibility
      >
        {/* Service Cards Stack */}
        <div ref={serviceCardsRef} className="relative h-full max-w-7xl mx-auto px-4 md:px-6">
          {children}
        </div>
      </div>

      {/* Services Footer */}
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row md:items-center service-item">
            <div className="text-gray-500 mb-4 md:mb-0">We are the best in</div>
            <div className="hidden md:block h-px bg-gray-200 flex-grow mx-4"></div>
            <div>
              {/* Assign the ref to the LiquidButton's wrapper div if possible, or wrap LiquidButton */}
              {/* Assuming LiquidButton's outermost element can accept a ref or is a div */}
              {/* If LiquidButton is a functional component, it needs to use React.forwardRef */}
              {/* For now, we'll try to assign it directly. If it's a div, it will work. */}
              {/* The LiquidButton component itself uses a div with a ref, so we need to modify LiquidButton to accept an external ref or wrap it. */}
              {/* Let's wrap it for simplicity here, assuming LiquidButton doesn't forward refs. */}
              <div ref={viewCasesButtonRef}>
                <LiquidButton href="#cases" color="#000000">
                  View Our Cases
                </LiquidButton>
              </div>
            </div>
          </div>

          {/* Services banner */}
          <div className="max-w-7xl mx-auto mt-8 md:mt-16 service-item">
            <div className="bg-gradient-to-r from-blue-300/50 to-purple-300/50 rounded-3xl p-6 md:p-8 flex items-center justify-center overflow-hidden backdrop-blur-sm shadow-lg border border-white/20">
              <div className="text-lg md:text-2xl text-white font-light flex flex-wrap justify-center gap-x-4 md:gap-x-8">
                <span className="whitespace-nowrap">DevOps</span>
                <span className="opacity-50 hidden md:inline">•</span>
                <span className="whitespace-nowrap">Data And Analytics</span>
                <span className="opacity-50 hidden md:inline">•</span>
                <span className="whitespace-nowrap">Managed Support</span>
                <span className="opacity-50 hidden md:inline">•</span>
                <span className="whitespace-nowrap">DevSecOps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
