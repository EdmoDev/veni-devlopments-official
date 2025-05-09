"use client"

// Metadata is handled in layout.tsx for the home page

import { useEffect, useRef } from "react"
import { ArrowDown, ArrowRight } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { VeniLogo } from "@/components/ui/buttons"
import { StickyServiceSection } from "@/components/services/sticky-service-section"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ContactForm } from "@/components/contact-form"
import ServiceCube from "@/components/hero/service-cube"; // Added import

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const heroSubtitleRef = useRef<HTMLDivElement>(null)
  const heroButtonRef = useRef<HTMLDivElement>(null)
  const heroScrollRef = useRef<HTMLDivElement>(null)

  // Use our custom hook for scroll animations
  const portfolioRef = useScrollAnimation(".portfolio-item", {
    y: 50,
    stagger: 0.2,
    duration: 0.8,
  })

  const contactRef = useScrollAnimation(".contact-form-item", {
    y: 30,
    opacity: 0,
    duration: 0.8,
  })

  const footerRef = useScrollAnimation(".footer-item", {
    y: 30,
    stagger: 0.1,
    duration: 0.6,
  })

  // Enhanced Smooth Scrolling & Hero animations
  useEffect(() => {
    // GSAP Smooth Scroll for all anchor links
    const links = gsap.utils.toArray('a[href^="#"]');
    links.forEach((link) => {
      const anchor = link as HTMLAnchorElement;
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        if (targetId) {
          gsap.to(window, {
            duration: 1.2, // Slightly longer for a smoother feel
            ease: "power3.inOut",
            scrollTo: { y: targetId, offsetY: 70 }, // Added offsetY for header
          });
        }
      });
    });

    const heroTl = gsap.timeline({
      defaults: { ease: "power3.out" },
    })

    heroTl.fromTo(heroSubtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })

    // Staggered text reveal for each line
    const heroTextLines = heroTextRef.current?.querySelectorAll(".hero-line")
    if (heroTextLines) {
      heroTl.fromTo(heroTextLines, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 }, "-=0.4")
    }

    heroTl.fromTo(heroButtonRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
    heroTl.fromTo(heroScrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.2")

    // Add scroll-triggered animations for the header
    const header = document.querySelector("header")
    if (header) {
      ScrollTrigger.create({
        start: "top -10%",
        end: "bottom top",
        toggleClass: { targets: header, className: "scrolled" },
        onEnter: () => {
          gsap.to(header, {
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            duration: 0.3,
          })
        },
        onLeaveBack: () => {
          gsap.to(header, {
            boxShadow: "none",
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            duration: 0.3,
          })
        },
      })
    }

    // Scroll Overlay Animation
    const overlay = document.querySelector(".scroll-overlay.left-right");
    if (overlay) {
      ScrollTrigger.create({
        trigger: "body", // Trigger based on overall body scroll
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          // Fade in quickly, stay, then fade out towards the end
          if (progress > 0.05 && progress < 0.95) {
            gsap.to(overlay, { opacity: 1, duration: 0.3 });
          } else if (progress <= 0.05) {
            gsap.to(overlay, { opacity: progress / 0.05, duration: 0.3 }); // Fade in from 0 to 0.05
          } else { // progress >= 0.95
            gsap.to(overlay, { opacity: (1 - progress) / 0.05, duration: 0.3 }); // Fade out from 0.95 to 1
          }
        },
      });
    }

    // Cleanup function for event listeners is not strictly necessary here as they are on static elements
    // and GSAP handles its own cleanup for tweens and ScrollTriggers.
  }, [])

  return (
    <main className="min-h-screen bg-white text-black overflow-x-hidden font-light">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 bg-white/80 backdrop-blur-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <VeniLogo />
          </Link>

          <nav className="hidden md:flex space-x-10 items-center">
            <Link href="#about" className="hover:text-gray-600 transition-colors data-hoverable">
              About
            </Link>
            <Link href="#services" className="hover:text-gray-600 transition-colors data-hoverable">
              Services
            </Link>
            <Link href="#work" className="hover:text-gray-600 transition-colors data-hoverable">
              Our Work
            </Link>
            <Link href="#clients" className="hover:text-gray-600 transition-colors data-hoverable">
              Clients
            </Link>
            <Link href="#contact" className="relative data-hoverable">
              <div className="container">
                <div className="button-container">
                  <div className="button-text">
                    <span>Contact Us</span>
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-16 px-6 min-h-screen flex flex-col justify-center relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="z-10">
            <div ref={heroSubtitleRef} className="text-xs uppercase tracking-widest mb-6 text-gray-500">
              Creative Digital Agency
            </div>

            <div ref={heroTextRef} className="mb-8">
              <h1 className="text-5xl md:text-6xl font-extralight leading-tight">
                <span className="block hero-line">We create digital</span>
                <span className="block hero-line">experiences that</span>
                <span className="block hero-line">help your business</span>
                <span className="block hero-line">stand out and</span>
                <span className="block hero-line">succeed online</span>
              </h1>
            </div>

            <div ref={heroButtonRef}>
              <Link href="#contact" className="btn-primary">
                Let&apos;s Talk <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div ref={heroScrollRef} className="flex justify-between items-center mt-24">
              <div className="flex items-center space-x-2 text-gray-500">
                <ArrowDown className="h-4 w-4 animate-bounce" />
                <span className="text-sm">Scroll to explore</span>
              </div>
              <div className="text-sm text-right text-gray-500">
                We deliver projects
                <br />
                on time, every time
              </div>
            </div>
          </div>

          {/* Right column for ServiceCube */}
          <div className="relative flex items-center justify-center"> {/* Removed hidden md:block, added flex for centering */}
            <ServiceCube />
          </div>
        </div>
      </section>

      {/* Services Section - Sticky Card Experience */}
      <StickyServiceSection />

      {/* Portfolio */}
      <section ref={portfolioRef} id="work" className="py-32 px-6 bg-gray-50 rounded-t-[80px]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-7xl md:text-8xl font-extralight mb-12 portfolio-item">Our Work</h2>
          <p className="text-xl max-w-2xl mb-12 portfolio-item">
            We've helped businesses of all sizes transform their digital presence with innovative solutions
            tailored to their specific needs.
          </p>
          <Link href="#contact" className="btn-primary">
            Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={contactRef} id="contact" className="py-16 px-6">
        <div className="max-w-7xl mx-auto contact-form-item">
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="py-12 px-6 bg-black text-white rounded-t-[60px]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="footer-item">
            <VeniLogo />
            <div className="mt-4 text-sm opacity-70">Creative Digital Agency</div>
          </div>

          <div className="footer-item">
            <h4 className="font-medium mb-4">Services</h4>
            <ul className="space-y-2 opacity-70">
              <li>
                <span className="data-hoverable">Web Design</span>
              </li>
              <li>
                <span className="data-hoverable">Web Development</span>
              </li>
              <li>
                <span className="data-hoverable">E-Commerce</span>
              </li>
              <li>
                <span className="data-hoverable">Digital Marketing</span>
              </li>
            </ul>
          </div>

          <div className="footer-item">
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2 opacity-70">
              <li>
                <span className="data-hoverable">hello@veniagency.com</span>
              </li>
              <li>
                <span className="data-hoverable">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>

          <div className="footer-item">
            <h4 className="font-medium mb-4">Social</h4>
            <ul className="space-y-2 opacity-70">
              <li>
                <span className="data-hoverable">Instagram</span>
              </li>
              <li>
                <span className="data-hoverable">Twitter</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-sm opacity-50 footer-item">
          © {new Date().getFullYear()} Veni Developments Lab. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
