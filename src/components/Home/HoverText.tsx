'use client'
import { useEffect, useRef, useState } from 'react';

const HoverText = () => {
  const [visibleElements, setVisibleElements] = useState(new Set<number>());
  const [chunkSize, setChunkSize] = useState(4); // default to desktop

  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Responsive chunk size
    const updateChunkSize = () => {
      const width = window.innerWidth;
      setChunkSize(width <= 768 ? 3 : 4);
    };

    updateChunkSize(); // set on load
    window.addEventListener('resize', updateChunkSize);

    return () => {
      window.removeEventListener('resize', updateChunkSize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const newVisible = new Set<number>();
      const centerY = window.innerHeight / 2;

      elementsRef.current.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height / 2;

          if (elCenter <= centerY) {
            newVisible.add(index);
          }
        }
      });

      setVisibleElements(newVisible);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) elementsRef.current[index] = el;
  };

  // Helper: chunk words
  const chunkWords = (text: string, size: number): string[] => {
    const words = text.split(' ');
    const chunks = [];
    for (let i = 0; i < words.length; i += size) {
      chunks.push(words.slice(i, i + size).join(' '));
    }
    return chunks;
  };

  const paragraphs = [
    "Helium is reimagining air conditioning for a new India smarter, sleeker, and more intuitive.",
    "We build IoT-enabled, app-controlled ACs that offer personalized cooling, stunning design, and seamless service.",
    "Born from a vision to blend cutting-edge technology with everyday comfort, Helium delivers a futuristic experience tailored to modern lifestyles.",
    "Say goodbye to outdated appliances and hello to ACs that think, learn, and adapt to you."
  ];

  const chunks = paragraphs.flatMap(para => chunkWords(para, chunkSize));

  return (
    <div className="min-h-fit w-full">
      <section 
        className="min-h-screen py-20 flex items-center"
        style={{ backgroundColor: '#033129' }}
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          {chunks.map((chunk, index) => (
            <div
              key={index}
              ref={(el) => addToRefs(el, index)}
              className="text-center mb-8"
            >
              <p
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight transition-colors duration-500 ease-out"
                style={{
                  color: visibleElements.has(index) ? '#ffffff' : '#4a5568',
                  textShadow: visibleElements.has(index)
                    ? '0 0 15px rgba(255, 255, 255, 0.3)'
                    : 'none'
                }}
              >
                {chunk}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HoverText;
