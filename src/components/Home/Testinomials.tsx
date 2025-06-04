'use client'
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

const TestimonialSection = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "What I love about Helium is not just the product—it's the service. Fast, transparent, and customer-obsessed.",
      name: "Nikhil Verma",
      title: "Customer Experience Lead, Amazon",
      company: "amazon"
    },
    {
      quote: "We deployed Helium units in our co-working spaces and saw a 30% drop in user complaints overnight.",
      name: "Priya Desai",
      title: "COO, 91Springboard",
      company: "flipkart"
    },
    {
      quote: "I ordered a Helium AC after a friend recommended it, and it's been a total game-changer this summer.",
      name: "Arjun Mehta",
      title: "Helium Customer",
      company: "helium"
    },
    {
      quote: "Helium isn't selling ACs. They're selling experiences. This is what the future of appliances looks like.",
      name: "Tanvi Ghosh",
      title: "Design Strategist",
      company: "amazon"
    },
    {
      quote: "Helium is redefining comfort. The app-controlled cooling experience is so seamless, I can't imagine going back.",
      name: "Ritika Sharma",
      title: "Helium Customer",
      company: "helium"
    },

  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide functionality
  const startAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    autoSlideRef.current = setInterval(() => {
      if (!isUserInteracting) {
        nextSlide();
      }
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  // Initialize auto-slide and clean up
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [isUserInteracting]);

  // Reset auto-slide when slide changes
  useEffect(() => {
    if (!isUserInteracting) {
      startAutoSlide();
    }
  }, [currentSlide, isUserInteracting]);

  // Touch/Mouse event handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setTranslateX(0);
    setIsUserInteracting(true);
    stopAutoSlide();
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    setTranslateX(deltaX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50; // Minimum distance to trigger slide change

    if (translateX > threshold) {
      // Swipe right - go to previous slide
      prevSlide();
    } else if (translateX < -threshold) {
      // Swipe left - go to next slide
      nextSlide();
    }

    setTranslateX(0);

    // Resume auto-slide after user interaction
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 1000);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Mouse events (for desktop testing)
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  const getCompanyLogo = (company: string): React.ReactElement => {
    switch (company) {
      case 'amazon':
        return (
          <div className="text-white font-bold text-lg">
            amazon
            <div className="w-8 h-0.5 bg-orange-400 rounded-full mt-0.5"></div>
          </div>
        );
      case 'flipkart':
        return (
          <div className="text-white font-bold text-lg">
            Flipkart
            <div className="w-8 h-0.5 bg-red-400 rounded-full mt-0.5"></div>
          </div>
        );
      default:
        return (
          <div className="text-white font-bold text-lg">
            helium
            <div className="w-8 h-0.5 bg-blue-400 rounded-full mt-0.5"></div>
          </div>
        );
    }
  };

  return (
    <section className="py-20 px-4 w-full"
      style={{
        backgroundImage: `url('/assets/bg/modern-background-with-lines.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 mt-4 w-[90%] mx-auto">
          <h2 className='text-white text-4xl sm:text-5xl font-bold tracking-tighter'>
            What Our Customers <span className="text-[#f5b841] border-b-1 sm:border-b-2 border-[#f5b841]">Say</span>
          </h2>
          <p className="text-white/70 text-lg mx-auto mt-4 w-[90%] tracking-tight">
            Real experiences from customers who&apos;ve transformed their cooling experience with Helium
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={`desktop-${index}`} className="bg-black rounded-2xl p-8 text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300">
              {/* Background gradient effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                {/* Company Logo */}
                <div className="mb-8">
                  {getCompanyLogo(testimonial.company)}
                </div>

                {/* Quote */}
                <blockquote className="text-white text-base leading-relaxed mb-8">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                {/* Author Info */}
                <div className="border-t border-gray-700 pt-6">
                  <p className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {testimonial.title}
                  </p>
                </div>

                {/* Navigation dots */}
                <div className="flex space-x-2 mt-6">
                  <div className="w-6 h-0.5 bg-white rounded-full"></div>
                  <div className="w-2 h-0.5 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Carousel View */}
        <div className="lg:hidden pb-8 pt-8">
          <div className="relative">
            <div
              ref={containerRef}
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={isDragging ? handleMouseMove : undefined}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`flex transition-transform duration-300 ease-in-out ${isDragging ? 'transition-none' : ''}`}
                style={{
                  transform: `translateX(${-currentSlide * 100 + (translateX / (containerRef.current?.offsetWidth || 1)) * 100}%)`
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={`mobile-${index}`} className="w-full flex-shrink-0 px-4">
                    <div className="bg-black rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
                      {/* Background gradient effect */}
                      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>

                      <div className="relative z-10">
                        {/* Company Logo */}
                        <div className="mb-6">
                          {getCompanyLogo(testimonial.company)}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-white text-sm md:text-base leading-relaxed mb-6">
                          &quot;{testimonial.quote}&quot;
                        </blockquote>

                        {/* Author Info */}
                        <div className="border-t border-gray-700 pt-4">
                          <p className="text-white font-semibold text-sm">
                            {testimonial.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {testimonial.title}
                          </p>
                        </div>

                        {/* Navigation dots */}
                        <div className="flex space-x-2 mt-4">
                          <div className="w-6 h-0.5 bg-white rounded-full"></div>
                          <div className="w-2 h-0.5 bg-gray-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={`indicator-${index}`}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsUserInteracting(true);
                  stopAutoSlide();
                  setTimeout(() => setIsUserInteracting(false), 2000);
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentSlide ? 'bg-white' : 'bg-gray-500'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Grid for Remaining Testimonials on Desktop */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {testimonials.slice(3).map((testimonial, index) => (
            <div key={`bottom-${index + 3}`} className="bg-black rounded-2xl p-8 text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300">
              {/* Background gradient effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                {/* Company Logo */}
                <div className="mb-8">
                  {getCompanyLogo(testimonial.company)}
                </div>

                {/* Quote */}
                <blockquote className="text-white text-base leading-relaxed mb-8">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                {/* Author Info */}
                <div className="border-t border-gray-700 pt-6">
                  <p className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {testimonial.title}
                  </p>
                </div>

                {/* Navigation dots */}
                <div className="flex space-x-2 mt-6">
                  <div className="w-6 h-0.5 bg-white rounded-full"></div>
                  <div className="w-2 h-0.5 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;