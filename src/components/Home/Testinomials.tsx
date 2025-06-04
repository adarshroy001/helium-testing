'use client'
import { useState } from 'react';
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
      quote: "Helium is redefining comfort. The app-controlled cooling experience is so seamless, I can't imagine going back.",
      name: "Ritika Sharma",
      title: "Helium Customer",
      company: "helium"
    },
    {
      quote: "I ordered a Helium AC after a friend recommended it, and it's been a total game-changer this summer.",
      name: "Arjun Mehta",
      title: "Helium Customer",
      company: "helium"
    },
    {
      quote: "We deployed Helium units in our co-working spaces and saw a 30% drop in user complaints overnight.",
      name: "Priya Desai",
      title: "COO, 91Springboard",
      company: "helium"
    },
    {
      quote: "What I love about Helium is not just the product—it's the service. Fast, transparent, and customer-obsessed.",
      name: "Nikhil Verma",
      title: "Customer Experience Lead, Amazon",
      company: "amazon"
    },
    {
      quote: "Helium isn't selling ACs. They're selling experiences. This is what the future of appliances looks like.",
      name: "Tanvi Ghosh",
      title: "Design Strategist, boAt",
      company: "boat"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getCompanyLogo = (company: string):  React.ReactElement => {
    switch (company) {
      case 'amazon':
        return (
          <div className="text-white font-bold text-lg">
            amazon
            <div className="w-8 h-0.5 bg-orange-400 rounded-full mt-0.5"></div>
          </div>
        );
      case 'boat':
        return (
          <div className="text-white font-bold text-lg">
            boAt
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
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

        {/* Mobile Carousel View */}
        <div className="lg:hidden pb-8 pt-8">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
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

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={`indicator-${index}`}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-black' : 'bg-gray-300'
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