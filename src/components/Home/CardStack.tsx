'use client'

import React, { useEffect, useRef } from 'react';

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
      id: 'panel-1',
      title: 'Integrated Air Purifier',
      subtitle: 'Not just cool air — clean air.',
      description:
        'Save cost, space, and complexity with built-in purification. Perfect for health-conscious urban homes like Delhi NCR & Bengaluru.',
      imageUrl: '/assets/bg/1.jpg'
    },
    {
      id: 'panel-2',
      title: 'Refrigerant Leakage Detector',
      subtitle: 'Helium ACs protect themselves.',
      description:
        'Detect gas leaks before they become breakdowns. No surprise service calls — just peace of mind.',
      imageUrl: '/assets/bg/2.jpg'
    },
    {
      id: 'panel-3',
      title: 'Front Panel Customisation',
      subtitle: 'Your AC, your style.',
      description:
        'Match your AC to your vibe. Make it yours with design-forward front panels — a first in the industry.',
      imageUrl: '/assets/bg/3.png'
    },
    {
      id: 'panel-4',
      title: 'IoT Control & Smart Features',
      subtitle: 'The smartest AC you have ever owned.',
      description:
        'Control from anywhere, get smart alerts, and unlock advanced diagnostics — all from your phone.',
      imageUrl: '/assets/bg/4.JPG'
    },
    {
      id: 'panel-5',
      title: 'Innovative Pricing Model',
      subtitle: 'Try Helium for ₹8,000.',
      description:
        'Affordable like a subscription. Pay ₹8K upfront — commit fully only if you love it. No risk, just cool comfort.',
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

      // Get all panel elements
      const panelElements = gsap.utils.toArray('.image-panel') as HTMLElement[];

      // Create pinning ScrollTrigger for each panel
      panelElements.forEach((panel: HTMLElement, index: number) => {
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
            return '+=0%';
          }
        });
      });

      // Add effects to panels
      panelElements.forEach((panel: HTMLElement, index: number) => {
        const img = panel.querySelector('.panel-image') as HTMLElement;
        if (img) {
          // Parallax effect
          // gsap.fromTo(img,
          //   { yPercent: -20 },
          //   {
          //     yPercent: 20,
          //     ease: 'none',
          //     scrollTrigger: {
          //       trigger: panel,
          //       start: 'top bottom',
          //       end: 'bottom top',
          //       scrub: true
          //     }
          //   }
          // );

          // Scale and fade out effect when next panel approaches
          if (index < panelElements.length - 1) {
            const nextPanel = panelElements[index + 1];

            // Create a longer, smoother animation trigger
            const triggerElement = nextPanel;

            // Animate the entire panel to disappear smoothly
            gsap.fromTo(panel,
              {
                scale: 1,
                opacity: 1,
                transformOrigin: 'top top+=100'
              },
              {
                scale: 0.85, // Less aggressive scaling
                opacity: 0,
                ease: 'power2.inOut', // Smoother easing
                scrollTrigger: {
                  trigger: triggerElement,
                  start: 'top bottom-=200px', // Start earlier
                  end: 'top top+=100', // End later for longer animation
                  scrub: 0, // Slower scrub for smoother animation
                  // Remove the visibility callbacks to prevent instant hiding
                }
              }
            );

            // Separate blur effect with different timing
            // gsap.fromTo(img,
            //   { filter: 'blur(0px)' },
            //   {
            //     filter: 'blur(8px)', // Slightly more blur
            //     scrollTrigger: {
            //       trigger: triggerElement,
            //       start: 'top bottom-=50px', // Start blur slightly later
            //       end: 'top center',
            //       scrub: 2 // Even slower for smoother blur transition
            //     }
            //   }
            // );

            // Additional fade effect for content text
            const content = panel.querySelector('.text-center');
            if (content) {
              gsap.fromTo(content,
                { opacity: 1 },
                {
                  opacity: 0,
                  scrollTrigger: {
                    trigger: triggerElement,
                    start: 'top bottom-=200px', // Start earlier
                    end: 'top top+=100', // End later for longer animation
                    scrub: 0
                  }
                }
              );
            }
          }
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
    <section className='w-full bg-[#033129] pt-6 sm:pt-12'>
      {/* <p className='text-white text-4xl text-center sm:text-6xl font-bold w-fit mx-auto border-b-2 border-white'>Innovation at its <span className='text-[#f3942c]'>finest</span></p> */}
      <div className="text-center mb-16 w-[90%] mx-auto">
        <h2 className='text-white text-4xl sm:text-8xl font-bold  tracking-tight'>
          Innovation at its
          <span className="text-[#f3942c] border-b-2 border-[#f3942c] "> finest</span>
        </h2>
        <p className="text-white/70 text-3xl mx-auto mt-4  w-[90%] tracking-tight">
          Everyday moments, reimagined with smart, app-first cooling.
        </p>
      </div>
      <div ref={containerRef} className="relative w-4/5 mx-auto my-20">
        {/* Image Panels */}
        {imagePanels.map((panel, index) => (
          <section
            key={panel.id}
            className="image-panel relative overflow-hidden rounded-2xl h-[60vh] lg:h-[80vh] mb-8 lg:mb-12"
            style={{
              zIndex: index + 10// Higher z-index for later panels
            }}
          >
            {/* Background Image with Parallax */}
            <div
              className="panel-image absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat rounded-2xl"
              style={{
                backgroundImage: `url(${panel.imageUrl})`,
                top: '-10%',
              }}
            >
              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center text-white px-4 sm:px-8 rounded-2xl">
                <div className="text-center max-w-4xl rounded-2xl">
                  <div className="mb-4 rounded-2xl">
                    <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm sm:text-base font-medium backdrop-blur-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                    {panel.title}
                  </h2>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-light mb-6 text-blue-200">
                    {panel.subtitle}
                  </h3>

                  <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-90">
                    {panel.description}
                  </p>

                  {/* Decorative line */}
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-8"></div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default ImageStackedPinning;