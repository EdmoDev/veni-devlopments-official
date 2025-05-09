"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
// Placeholder icons - these would be actual icon components
import { Code, Smartphone, Search, Edit3, LayoutGrid, Zap, type LucideProps } from 'lucide-react'; // Example icons, imported LucideProps

// --- Service Data and Types ---
interface Service {
  id: string;
  title: string; // For potential internal use or accessibility
  Icon1: React.FC<LucideProps>; // Made Icon type more specific
  Icon2: React.FC<LucideProps>; // Made Icon type more specific
  Illustration: React.FC; // For components that take no props
  footerLines: string[];
}

// Placeholder Illustration Components
const WebDevIllustration = () => <div className="text-center"><Code size={48} className="mx-auto mb-2 text-blue-400" />Web/Design Art</div>;
const MobileAppIllustration = () => <div className="text-center"><Smartphone size={48} className="mx-auto mb-2 text-green-400" />Mobile/Design Art</div>;
const SEOBrandingIllustration = () => <div className="text-center"><Search size={48} className="mx-auto mb-2 text-purple-400" />SEO/Brand Art</div>;
const GeneralIllustration = () => <div className="text-center"><Zap size={48} className="mx-auto mb-2 text-yellow-400" />More Services Art</div>;


const services: Service[] = [
  {
    id: 'webDev',
    title: 'Web Development & Design',
    Icon1: Edit3, // Placeholder, ideally specific
    Icon2: LayoutGrid, // Placeholder
    Illustration: WebDevIllustration,
    footerLines: ["Creative", "Web Dev", "& Design.", "Building", "responsive", "and engaging", "digital", "experiences", "with modern", "tech", "stacks."],
  },
  {
    id: 'mobileApp',
    title: 'Mobile App Development & Design',
    Icon1: Smartphone, // Placeholder
    Icon2: Zap, // Placeholder
    Illustration: MobileAppIllustration,
    footerLines: ["Intuitive", "Mobile Apps", "UX/UI.", "Designing", "and developing", "cross-platform", "mobile", "applications", "for iOS", "&", "Android."],
  },
  {
    id: 'seoBranding',
    title: 'SEO & Branding',
    Icon1: Search, // Placeholder
    Icon2: Edit3, // Placeholder
    Illustration: SEOBrandingIllustration,
    footerLines: ["Strategic", "SEO", "& Branding.", "Elevating", "your online", "presence and", "crafting a", "memorable", "brand", "identity", "."],
  },
   {
    id: 'moreServices',
    title: 'And More Creative Solutions',
    Icon1: Zap, 
    Icon2: Code, 
    Illustration: GeneralIllustration,
    footerLines: ["Innovative", "Solutions", "For You.", "Exploring", "new frontiers", "in technology", "and design", "to bring", "your unique", "ideas to", "life."],
  },
];

const ServiceCube = () => {
  const [isActive, setIsActive] = useState(false);
  const [isWrapHovered, setIsWrapHovered] = useState(false);
  const [cardRotationStyle, setCardRotationStyle] = useState<React.CSSProperties>({}); // Explicitly typed
  const [isInView, setIsInView] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentService = services[currentServiceIndex];
  const CurrentIcon1 = currentService.Icon1;
  const CurrentIcon2 = currentService.Icon2;
  const CurrentIllustration = currentService.Illustration;


  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // Trigger when 10% is visible
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }
    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Auto-swapping logic
  useEffect(() => {
    if (isInView && !isWrapHovered && !isActive) {
      intervalRef.current = setInterval(() => {
        setIsFading(true);
        setTimeout(() => {
          setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
          setIsFading(false);
        }, 300); // Fade duration
      }, 7000); // Change service every 7 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isInView, isWrapHovered, isActive]);


  const handleToggleActive = () => setIsActive(!isActive);
  const handleWrapMouseEnter = () => setIsWrapHovered(true);
  const handleWrapMouseLeave = () => {
    setIsWrapHovered(false);
    setCardRotationStyle({});
  };

  const handleAreaMouseEnter = useCallback((rotationStyle: React.CSSProperties) => {
    if (isWrapHovered) {
      setCardRotationStyle(rotationStyle);
    }
  }, [isWrapHovered]);

  const handleAreaMouseLeave = useCallback(() => {}, []);

  const perspectiveValue = '800px';
  const areaRotationStyles: React.CSSProperties[] = [
    { transform: `perspective(${perspectiveValue}) rotateX(15deg) rotateY(-15deg) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(15deg) rotateY(-7deg) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(15deg) rotateY(0) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(15deg) rotateY(7deg) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(15deg) rotateY(15deg) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(0) rotateY(-15deg) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(0) rotateY(-7deg) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(0) rotateY(0) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(0) rotateY(7deg) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(0) rotateY(15deg) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(-15deg) rotateY(-15deg) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(-15deg) rotateY(-7deg) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(-15deg) rotateY(0) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(-15deg) rotateY(7deg) scale3d(1, 1, 1)` },
    { transform: `perspective(${perspectiveValue}) rotateX(-15deg) rotateY(15deg) scale3d(1, 1, 1)` },
  ].reverse();

  const playAnimations = isInView && !isActive;

  const waveClasses = `absolute w-[200px] h-[200px] inset-0 bottom-[60px] m-auto transition-opacity duration-300 ease-linear ${isWrapHovered && playAnimations ? 'opacity-100' : 'opacity-0'}`;
  const outlineBeforeClasses = `before:content-[''] before:absolute before:inset-0 before:w-[400px] before:h-[550px] before:m-auto before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:animate-rotate before:translate-z-[10px] ${isWrapHovered && playAnimations ? 'before:animate-running' : 'before:animate-paused'}`;
  
  const circle1Animation = playAnimations ? 'animate-circle1' : 'animate-paused';
  const circle2Animation = playAnimations ? 'animate-circle2' : 'animate-paused';
  const linesAnimation = playAnimations ? 'animate-rotate-lines' : 'animate-paused';
  const linesSvgAnimation = playAnimations ? 'animate-lines-svg' : 'animate-paused';
  const linePathAnimation = playAnimations ? 'animate-line opacity-100' : 'animate-paused opacity-0';
  const circle2BgAnimation = playAnimations && isWrapHovered ? 'animate-bgRotate animate-running' : 'animate-paused';
  const circle2BgBeforeOpacity = isWrapHovered && playAnimations ? 'before:opacity-20' : 'before:opacity-0';

  const icon1Classes = `absolute w-16 h-16 transition-all duration-[800ms] ease-[cubic-bezier(0.7,-1,0.3,1.5)] ${isWrapHovered ? 'translate-y-[-80px] scale-75 rotate-x-90 blur-sm opacity-0' : 'translate-y-0 scale-100 rotate-x-0 blur-0 opacity-100'}`;
  const icon2Classes = `absolute w-16 h-16 transition-all duration-[800ms] ease-[cubic-bezier(0.7,-1,0.3,1.5)] ${isWrapHovered ? 'translate-y-0 scale-100 rotate-x-0 blur-0 opacity-60' : 'translate-y-[80px] scale-75 rotate-x-90 blur-sm opacity-0'}`;

  const footerPClasses = `flex flex-wrap gap-x-1 text-[11px] relative z-10 leading-[17px] transition-transform duration-300 ease-in-out text-gray-600 ${isWrapHovered ? 'translate-y-[-4px] translate-z-[20px]' : 'translate-y-0 translate-z-[20px]'}`;
  const footerSpanAnimation = playAnimations ? 'animate-labels' : 'animate-paused opacity-100';

  // Corrected SVG path data from the original WebDevCard for consistency, reduced to 40 for performance.
  // In a real scenario, these paths would be designed.
  const originalPathsData = [
    "M231.5 97V5", "M248.295 98.0566L259.825 6.78207", "M264.824 101.21L287.704 12.1002", 
    "M280.829 106.41L314.696 20.8705", "M296.055 113.575L340.376 32.9547", "M310.263 122.592L364.339 48.1622",
    "M323.229 133.318L386.208 66.2531", "M334.749 145.585L405.636 86.9422", "M344.64 159.199L422.318 109.903",
    "M352.747 173.946L435.991 134.774", "M358.942 189.592L446.439 161.162", "M363.126 205.891L453.497 188.652",
    "M365.236 222.586L457.054 216.809", "M365.5 231L457.5 231", "M364.443 247.795L455.718 259.325",
    "M361.29 264.324L450.4 287.204", "M356.09 280.329L441.629 314.196", "M348.925 295.555L429.545 339.876",
    "M339.908 309.763L414.338 363.839", "M329.182 322.729L396.247 385.708", "M316.915 334.249L375.558 405.136",
    "M303.301 344.14L352.597 421.818", "M288.554 352.247L327.726 435.491", "M272.908 358.442L301.338 445.939",
    "M256.609 362.626L273.848 452.997", "M239.914 364.736L245.691 456.554", "M223.086 364.736L217.309 456.554",
    "M206.391 362.626L189.152 452.997", "M190.092 358.442L161.662 445.939", "M174.446 352.247L135.274 435.491",
    "M159.699 344.14L110.403 421.818", "M146.085 334.249L87.4422 405.136", "M133.818 322.729L66.7531 385.708",
    "M123.092 309.763L48.6622 363.839", "M114.075 295.555L33.4547 339.876", "M106.91 280.329L21.3705 314.196",
    "M101.71 264.324L12.6002 287.204", "M97.7644 239.414L5.94598 216.809", "M97.5 231H5.5"
  ];


  return (
    <div ref={componentRef} className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden font-sans p-10">
      <style>{`
        :root { --perspective: 800px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .transform-style-flat { transform-style: flat; }
        .translate-z-\\[10px\\] { transform: translateZ(10px); }
        .translate-z-\\[20px\\] { transform: translateZ(20px); }
        .translate-z-\\[30px\\] { transform: translateZ(30px); }
        .translate-z-\\[50px\\] { transform: translateZ(50px); }
        .rotate-x-90 { transform: rotateX(90deg); }

        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes rotate-lines { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes wave {
          0% { transform: scale(1); opacity: 0; box-shadow: 0 0 30px rgba(106, 76, 172, 0.9); }
          35% { transform: scale(1.3); opacity: 1; }
          70%, 100% { transform: scale(1.6); opacity: 0; box-shadow: 0 0 30px rgba(106, 76, 172, 0.3); }
        }
        @keyframes lines-svg {
            0% { transform: scale(0.41); } 15% { transform: scale(0.37); } 36% { transform: scale(0.41); }
            50% { transform: scale(0.38); } 65% { transform: scale(0.43); } 80% { transform: scale(0.39); }
            100% { transform: scale(0.41); }
        }
        @keyframes line {
            0% { stroke-dashoffset: 10; } 50% { stroke-dashoffset: 45; } 100% { stroke-dashoffset: 10; }
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
            0% { transform: rotate(0deg); } 20% { transform: rotate(90deg); }
            40% { transform: rotate(180deg) scale(0.95, 1); } 60%, 100% { transform: rotate(360deg); }
        }
        @keyframes bg {
            20% { background-color: #ff7e5f33; } /* Adjusted color with alpha */
            40% { background-color: #feb47b33; }
            60% { background-color: #4facfe33; }
            80% { background-color: #a18cd133; }
        }
        @keyframes footer {
            0%, 3% { transform: scaleY(0); filter: blur(15px) brightness(1.5); opacity: 0; }
            10%, 82% { filter: blur(0px); transform: scaleY(1); opacity: 1;}
            86%, 100% { transform: scaleY(0); filter: blur(15px) brightness(1.5); opacity: 0;}
        }
        @keyframes labels {
            0% { transform: translateY(-30px) rotate(-30deg); filter: blur(10px); opacity: 0; }
            5% { transform: translateY(10px); filter: blur(0px); opacity: 1; }
            10% { transform: translateY(0); opacity: 1; }
            73% { transform: translateY(0); opacity: 1; }
            76% { transform: translateY(-5px); filter: blur(0px); }
            80%, 100% { transform: translateY(15px); opacity: 0; filter: blur(5px); }
        }

        .animate-rotate { animation: rotate 3s linear infinite; }
        .animate-rotate-lines { animation: rotate-lines 30s linear infinite; }
        .animate-wave { animation: wave 1.5s linear infinite; }
        .animate-lines-svg { animation: lines-svg 3s ease-in-out infinite; }
        .animate-line { animation: line 3s ease-in-out infinite; stroke-dasharray: 55; } /* Added stroke-dasharray */
        .animate-circle1 { animation: circle1 4.2s ease-in-out infinite 0.3s; }
        .animate-circle2 { animation: circle2 4.2s ease-in-out infinite; }
        .animate-bgRotate { animation: bgRotate 2.5s linear infinite; }
        .animate-bg { animation: bg 4s linear infinite; }
        .animate-footer { animation: footer 9s ease infinite 0.8s; }
        .animate-labels { animation: labels 9s ease infinite; }

        .animate-paused { animation-play-state: paused !important; }
        .animate-running { animation-play-state: running !important; }
        .animate-delay-path { animation-delay: calc(1s + var(--i) * 0.05s); }
        
        .content-fade { transition: opacity 0.3s ease-in-out; }
        .content-fading { opacity: 0; }
        .content-visible { opacity: 1; }
      `}</style>

      <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 transform-style-preserve-3d">
        {areaRotationStyles.map((style, index) => (
          <div
            key={index}
            className="relative z-20" // Increased z-index for interaction areas
            onMouseEnter={() => handleAreaMouseEnter(style as React.CSSProperties)}
            onMouseLeave={handleAreaMouseLeave}
          />
        ))}
        <label
          className="flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transform-style-preserve-3d cursor-pointer col-start-2 col-span-3 row-start-1 row-span-3 w-full h-full"
          onMouseEnter={handleWrapMouseEnter}
          onMouseLeave={handleWrapMouseLeave}
        >
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0 absolute"
            checked={isActive}
            onChange={handleToggleActive}
            aria-label="Toggle Card State"
          />
          <div
            className={`transform-style-preserve-3d w-[326px] h-[360px] rounded-[25px] flex flex-col items-center justify-center shadow-[0_10px_40px_rgba(0,0,60,0.25),inset_0_0_10px_rgba(255,255,255,0.5)] pb-[70px] pointer-events-none transition-transform duration-600 ease-in-out relative overflow-hidden
              before:content-[''] before:absolute before:inset-[1px] before:rounded-[inherit] before:z-[-1] before:transition-all before:duration-500 before:ease-linear
              ${isWrapHovered ? 'before:bg-transparent before:backdrop-blur-[10px]' : 'before:bg-white/30 before:backdrop-blur-[10px]'}
            `}
            style={cardRotationStyle as React.CSSProperties}
          >
            <div className={`absolute overflow-hidden inset-0 outline-none transition-all duration-400 ease-in-out rounded-[27px] transform-style-preserve-3d ${outlineBeforeClasses}`}></div>
            <div className={waveClasses}>
              <div className="absolute w-full h-full rounded-full border-2 border-white shadow-[0_0_30px_rgba(106,76,172,0.5)] filter blur-sm inset-0 animate-wave"></div>
              <div className="absolute w-full h-full rounded-full border-2 border-white shadow-[0_0_30px_rgba(106,76,172,0.5)] filter blur-sm inset-0 animate-wave [animation-delay:0.4s]"></div>
            </div>

            {/* Main Content Area - For Illustration */}
            <div className={`flex-grow flex items-center justify-center relative transform-style-preserve-3d w-full content-fade ${isFading ? 'content-fading' : 'content-visible'}`}>
                <CurrentIllustration />
            </div>
            
            {/* Circles and Lines - Kept from original design, illustration might overlay or integrate */}
            <div
              className={`w-[224px] h-[224px] rounded-full absolute shadow-[inset_0_0_3px_0_white,inset_60px_40px_30px_-40px_rgba(106,76,172,0.15),20px_20px_70px_-5px_rgb(150,166,197),-50px_-50px_70px_20px_rgba(255,255,255,0.7),inset_0_0_30px_0_white] bg-gray-500/10 flex items-center justify-center transform-style-preserve-3d z-[1] ${circle1Animation}`}
              style={{ '--z': '0px' } as React.CSSProperties}
            >
              <div className="absolute rounded-full filter blur-[40px] w-[30%] h-[30%] bg-[#ff0073] top-[30%] right-[30%]"></div>
              <div className="absolute rounded-full filter blur-[40px] w-[30%] h-[30%] bg-[#00baff] bottom-[10%] left-[30%]"></div>
              <div className={`lines absolute inset-0 m-auto ${linesAnimation}`}> {/* Added absolute inset-0 m-auto */}
                <svg className={`stroke-white/50 stroke-2 ${linesSvgAnimation} overflow-visible`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 463 462" height={400} width={400}>
                  {originalPathsData.map((pathD, i) => (
                    <path key={i} strokeLinecap="round" d={pathD} style={{'--i': (i + 1) * 0.02 } as React.CSSProperties} className={linePathAnimation} />
                  ))}
                </svg>
              </div>
            </div>
            <div
              className={`w-[123px] h-[123px] rounded-full absolute transform-style-preserve-3d bg-white z-[9] ${circle2Animation}`}
              style={{ '--z': '10px' } as React.CSSProperties}
            >
              <div className="absolute rounded-full filter blur-[30px] z-[1] bg-[#ff0073] w-[30%] h-[30%] top-[20%] right-[20%]"></div>
              <div className="absolute rounded-full filter blur-[30px] z-[1] bg-[#00bbff] w-[20%] h-[20%] bottom-[10%] left-[40%]"></div>
              <div className={`absolute inset-0 rounded-full shadow-[inset_0_0_25px_10px_rgba(255,255,255,0.8),0_0_10px_10px_rgba(255,255,255,0.9)] bg-[#9292d8] transition-all duration-300 ease-in-out ${circle2BgAnimation}
                before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:shadow-[inset_0_0_25px_10px_rgba(255,255,255,0.8)] before:transition-opacity before:duration-400 before:ease-linear ${circle2BgBeforeOpacity} ${isWrapHovered && playAnimations ? 'before:animate-bg' : ''}
              `}></div>
            </div>

            {/* Icons Container - Dynamic Icons */}
            <div className={`absolute flex items-center justify-center pt-1 z-[10] translate-z-[50px] content-fade ${isFading ? 'content-fading' : 'content-visible'}`}>
              <CurrentIcon1 className={icon1Classes} strokeWidth="1.5" />
              <CurrentIcon2 className={icon2Classes} strokeWidth="1.5" />
            </div>

            {/* Footer - Dynamic Text */}
            <footer className="absolute bottom-[17px] left-[17px] right-[17px] p-3 transform-style-preserve-3d translate-z-[10px]">
              <div className={`absolute inset-0 rounded-[15px] z-[-1] shadow-[inset_0_0_2px_0_white,0_5px_10px_-5px_rgba(0,0,60,0.25)] backdrop-blur-[5px] bg-gradient-to-b from-[rgb(242_243_252/0.8)] to-[rgb(220_220_232/0.8)] ${playAnimations ? 'animate-footer' : 'animate-paused scale-y-100 blur-none'}`}></div>
              <p className={`${footerPClasses} content-fade ${isFading ? 'content-fading' : 'content-visible'}`}>
                {currentService.footerLines.map((line, index) => (
                  <span key={index} className={`inline-block ${index < 3 ? 'font-semibold text-black' : ''} ${footerSpanAnimation} animate-delay-path`} style={{ '--i': (index + 1) * 0.5 } as React.CSSProperties}>
                    {line}&nbsp;
                  </span>
                ))}
              </p>
            </footer>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ServiceCube;
