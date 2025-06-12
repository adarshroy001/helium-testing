'use client'

import React, { useEffect, useRef } from 'react';
import { Heading, SubHeading } from '@/components/Heading/Heading';

// Define image panel data with TypeScript interface
interface ImagePanelData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  height?: string;
}

const ImageStackedPinning: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<any>(null);
  const ScrollTriggerRef = useRef<any>(null);

  // Image panels with consistent dimensions (16:9 aspect ratio)
  const imagePanels: ImagePanelData[] = [
    {
      id: '1',
      title: 'Integrated Air Purifier',
      subtitle: 'Not just cool air — clean air.',
      description:
        'Save cost, space, and complexity with built-in purification. Perfect for health-conscious urban homes like Delhi NCR & Bengaluru.',
      imageUrl: '/assets/bg/2.jpg'
    },
    {
      id: '2',
      title: 'Refrigerant Leakage Detector',
      subtitle: 'Helium ACs protect themselves.',
      description:
        'Detect gas leaks before they become breakdowns. No surprise service calls — just peace of mind.',
      imageUrl: '/assets/bg/4.JPG'
    },
    {
      id: '3',
      title: 'Front Panel Customisation',
      subtitle: 'Your AC, your style.',
      description:
        'Match your AC to your vibe. Make it yours with design-forward front panels — a first in the industry.',
      imageUrl: '/assets/bg/3.png'
    },
    {
      id: '4',
      title: 'IoT Control & Smart Features',
      subtitle: 'The smartest AC you have ever owned.',
      description:
        'Control from anywhere, get smart alerts, and unlock advanced diagnostics — all from your phone.',
      imageUrl: '/assets/bg/1.jpg'
    },
    {
      id: '5',
      title: 'Heavy-Duty, Best-in-Class Machine',
      subtitle: 'Built for extremes. Ready for anything.',
      description:
        'Engineered for Indian summers. Delivers top performance even at 55°C — powerful and durable.',
      imageUrl: '/assets/bg/5.jpg'
    }

  ];

  useEffect(() => {
    let gsap: any;
    let ScrollTrigger: any;

    const loadGSAP = async () => {
      // Load GSAP and ScrollTrigger from CDN
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      document.head.appendChild(gsapScript);

      await new Promise(resolve => {
        gsapScript.onload = resolve;
      });

      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      document.head.appendChild(scrollTriggerScript);

      await new Promise(resolve => {
        scrollTriggerScript.onload = resolve;
      });

      // Access GSAP from window
      gsap = (window as any).gsap;
      ScrollTrigger = (window as any).ScrollTrigger;

      gsapRef.current = gsap;
      ScrollTriggerRef.current = ScrollTrigger;

      // Register plugin
      gsap.registerPlugin(ScrollTrigger);

      // Initialize the stacked pinning effect
      initStackedPinning();
    };

const initStackedPinning = () => {
  if (!gsap || !ScrollTrigger || !containerRef.current) return;

  // Check if we're on desktop or mobile
  const isDesktop = window.innerWidth >= 1024; // lg breakpoint
  
  // Get panel elements based on screen size
  const panelElements = gsap.utils.toArray(
    isDesktop ? '.image-panel-desktop' : '.image-panel-mobile'
  ) as HTMLElement[];

  // Create pinning ScrollTrigger for each panel
  panelElements.forEach((panel: HTMLElement, index: number) => {
    // Skip pinning for the last panel to ensure it's always visible
    if (index === panelElements.length - 1) return;

    ScrollTrigger.create({
      trigger: panel,
      start: () => panel.offsetHeight < window.innerHeight ? 'top top+=80' : 'bottom bottom',
      pin: true,
      pinSpacing: false,
      end: () => {
        // End pinning when the next panel reaches the top
        if (index < panelElements.length - 1) {
          const nextPanel = panelElements[index + 1];
          return `+=${nextPanel.offsetTop - panel.offsetTop}`;
        }
        return '+=100vh'; // Ensure enough scroll distance
      }
    });
  });

  // Add effects to panels (exclude the last one from fade out)
  panelElements.forEach((panel: HTMLElement, index: number) => {
    // Don't animate the last panel
    if (index >= panelElements.length - 1) return;

    const nextPanel = panelElements[index + 1];
    const triggerElement = nextPanel;

    // Animate the entire panel to disappear smoothly
    gsap.fromTo(panel,
      {
        scale: 1,
        opacity: 1,
        transformOrigin: 'top top+=100'
      },
      {
        scale: 0.85,
        opacity: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top bottom-=200px',
          end: 'top top+=100',
          scrub: true,
        }
      }
    );

    // Additional fade effect for content text
    const content = panel.querySelector('.panel-content');
    if (content) {
      gsap.fromTo(content,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top bottom-=200px',
            end: 'top top+=100',
            scrub: 0
          }
        }
      );
    }
  });
};

    loadGSAP();

    // Cleanup function
    return () => {
      if (ScrollTriggerRef.current) {
        ScrollTriggerRef.current.killAll();
      }

      // Remove scripts
      const scripts = document.querySelectorAll('script[src*="gsap"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <section className='w-full bg-[#131313] pt-6 sm:pt-12'>
      {/* <div className="text-center mb-16 mt-16 w-[90%] mx-auto">
        <h2 className='text-white text-4xl sm:text-5xl font-bold tracking-tighter'>
          Innovation at its
          <span className="text-[#f3942c] border-b-2 border-[#f3942c]"> finest</span>
        </h2>
        <p className="text-white/70 text-lg mx-auto mt-4 w-[90%] tracking-tight">
          Everyday moments, reimagined with smart, app-first cooling.
        </p>
      </div> */}
      <Heading text="Innovation at its finest" highlight="finest" maindesign='pt-16' />
      <SubHeading text="Everyday moments, reimagined with smart, app-first cooling." design='' />

      <div ref={containerRef} className="relative w-[90%] lg:w-4/5 mx-auto my-20 pb-4 lg:pb-10">
        {/* Desktop Layout - Full Background Image with Text Overlay */}
        <div className="hidden lg:block">
          {imagePanels.map((panel, index) => (
            <section
              key={`desktop-${panel.id}`}
              className="image-panel-desktop relative overflow-hidden rounded-2xl h-[80vh] mb-12"
              style={{
                zIndex: index + 10,
                backgroundImage: `url(${panel.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>

              {/* Text Content - Left Side */}
              <div className="panel-content relative z-10 h-full flex items-center">
                <div className="max-w-2xl p-12">
                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full text-base font-medium backdrop-blur-sm text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 leading-tight text-white">
                    {panel.title}
                  </h2>

                  <h3 className="text-2xl xl:text-3xl font-light mb-6 text-blue-200">
                    {panel.subtitle}
                  </h3>

                  <p className="text-lg xl:text-xl leading-relaxed opacity-90 text-white/90 mb-8 max-w-lg">
                    {panel.description}
                  </p>

                  {/* Decorative line */}
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Mobile/Tablet Layout - Card with Black Text Section + Image Section */}
        <div className="lg:hidden">
          {imagePanels.map((panel, index) => (
            <section
              key={`mobile-${panel.id}`}
              className="image-panel-mobile relative overflow-hidden rounded-2xl mb-8 border h-[70vh] border-[#282626]"
              style={{
                zIndex: index + 10
              }}
            >
              {/* Black Text Section at Top */}
              <div className="panel-content bg-[#121111] rounded-t-2xl h-[32%] p-4 sm:p-8">
                <div className="text-center">
                  {/* <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium backdrop-blur-sm text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div> */}

                  <h2 className="text-2xl sm:text-4xl font-bold mb-2 mt-4 tracking-tight text-white">
                    {panel.title}
                  </h2>

                  {/* <h3 className="text-lg sm:text-xl font-light mb-2 tracking-tighter text-blue-200">
                    {panel.subtitle}
                  </h3> */}

                  <p className="text-sm sm:text-lg tracking-tighter opacity-90 text-white/80">
                    {panel.description}
                  </p>
                </div>
              </div>

              {/* Image Section at Bottom */}
              <div
                className="h-full sm:h-80 rounded-b-2xl bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${panel.imageUrl})`
                }}
              ></div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageStackedPinning;