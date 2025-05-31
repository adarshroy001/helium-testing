"use client";

import React, { useEffect, useState, useRef } from "react";

// Simple cn utility function
const cn = (...classes: (string | undefined | null | boolean)[]) => classes.filter(Boolean).join(' ');

interface InfiniteMovingCardsProps {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    addAnimation();
    
    // Add event delegation for hover effects
    const handleMouseOver = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest('.testimonial-card');
      if (card) {
        handleCardHover(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest('.testimonial-card');
      if (card) {
        // Check if we're really leaving the card (not just moving to a child element)
        const rect = card.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
          handleCardHover(false);
        }
      }
    };
    
    if (containerRef.current) {
      containerRef.current.addEventListener('mouseover', handleMouseOver);
      containerRef.current.addEventListener('mouseout', handleMouseOut);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseover', handleMouseOver);
        containerRef.current.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item, index) => {
        const duplicatedItem = item.cloneNode(true) as HTMLElement;
        
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  const handleCardHover = (isHovering: boolean) => {
    if (pauseOnHover) {
      setIsPaused(isHovering);
      
      // Also directly set the animation play state for immediate effect
      if (scrollerRef.current) {
        scrollerRef.current.style.animationPlayState = isHovering ? 'paused' : 'running';
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller mx-auto relative z-20 max-w-7xl overflow-hidden",
        className
      )}
      style={{
        maskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)'
      }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll"
        )}
        style={{
          animation: start ? `scroll ${speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s'} ${direction === 'left' ? 'forwards' : 'reverse'} linear infinite` : 'none',
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
      >
        {items.map((item, idx) => (
          <li
            className="group relative w-[350px] max-w-full shrink-0 rounded-3xl border border-white/10 px-8 py-8 md:w-[450px] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer testimonial-card"
            style={{
              background: 'linear-gradient(135deg, rgba(243, 175, 102, 0.9) 0%, rgba(243, 148, 44, 0.8) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            key={`${item.name}-${idx}`}
          >
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 style={{
                   background: 'linear-gradient(45deg, #f3af66, #f3942c, #f3af66)',
                   backgroundSize: '200% 200%',
                   animation: 'gradient-shift 3s ease infinite',
                   padding: '2px'
                 }}>
              <div className="w-full h-full rounded-3xl" 
                   style={{
                     background: 'linear-gradient(135deg, rgba(243, 175, 102, 0.95) 0%, rgba(243, 148, 44, 0.9) 100%)'
                   }}></div>
            </div>
            
            <blockquote className="relative z-10">
              {/* Quote icon */}
              <div className="mb-4">
                <svg className="w-8 h-8 text-white/80 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              <span className="relative z-20 text-base leading-relaxed font-medium text-white/95 group-hover:text-white transition-colors duration-300 block mb-6">
                "{item.quote}"
              </span>
              
              <div className="relative z-20 flex flex-row items-center">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full mr-4 flex items-center justify-center text-white font-bold text-lg"
                     style={{
                       background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                       border: '2px solid rgba(255, 255, 255, 0.3)'
                     }}>
                  {item.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <span className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-white group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                  <span className="text-sm font-normal text-white/80 group-hover:text-white/90 transition-colors duration-300">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
      
      <style jsx>{`
        @keyframes scroll {
          to {
            transform: translate(calc(-50% - 0.75rem));
          }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;
        }
      `}</style>
    </div>
  );
};

const testimonials = [
  {
    quote:
      "Helium is the Apple of air conditioners. The design is stunning, and I love the app control—even when I'm not home.",
    name: "Rhea Malhotra",
    title: "Interior Designer, Mumbai",
  },
  {
    quote:
      "Not just an AC. I set routines, track energy use, and it even senses when I leave. Never going back to a dumb AC.",
    name: "Ankit Sharma",
    title: "Product Manager, Bangalore",
  },
  {
    quote:
      "Helium feels like it was made for me—young, modern, and always online. It's smart and looks beautiful.",
    name: "Simran Bedi",
    title: "Visual Artist, Delhi",
  },
  {
    quote:
      "I just tap a button to get service help. The app-first experience is a game changer.",
    name: "Rohit Verma",
    title: "Tech Entrepreneur, Pune",
  },
  {
    quote:
      "Helium checks all the boxes: app control, AI cooling, smart schedules, and a look that turns heads.",
    name: "Tanya Kulkarni",
    title: "UX Designer, Hyderabad",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 w-full bg-gradient-to-br from-[#033129] via-[#044832] to-[#033129] min-h-screen relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#f3af66] blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#f3942c] blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-[#f3af66] blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className='text-white text-4xl sm:text-6xl font-bold mb-4'>
            What People Are <span className="text-[#f3942c] relative">
              Saying
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#f3942c] to-[#f3af66] rounded-full"></div>
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Real experiences from customers who've transformed their homes with Helium
          </p>
        </div>
        
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="normal"
          pauseOnHover={true}
          className="text-white"
        />
      </div>
    </section>
  );
}