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
      setChunkSize(width <= 768 ? 4 : 4);
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
    "air conditioning was boring",
    "clunky boxes on walls",
    "noisy, dumb, outdated",
    "built with zero soul",

    "helium is born different",
    "designed to feel magical",
    "crafted to look iconic",
    "engineered to be smart",

    "it cools with care",
    "learns how you live",
    "adapts to your day",
    "runs only when needed",

    "connects with your phone",
    "understands your patterns",
    "serves you silently",
    "saves more every month",

    "goodbye remote confusion",
    "hello clean control interface",
    "no more ugly grills",
    "just a sleek finish",

    "we don't build ACs",
    "we build future air",
    "personal, adaptive, intelligent",
    "a better standard, finally",

    "helium is coming soon",
    "and it changes everything"
  ];

  const chunks = paragraphs.flatMap(para => chunkWords(para, chunkSize));

  return (
    <div className="min-h-fit w-full bg-[#1B1B1B]">

      <section
        className="min-h-screen sm:mx-auto sm:w-[70%] lg:mx-auto lg:w-[60%] sm:pl-12 pr-0 mt-16 sm:mt-24 mb-16 "
        // style={{ backgroundColor: '#033129' }}
      >
        {/* header */}
        <div className="mb-12 sm:mb-16 mx-auto">
          <h2 className='text-white text-2xl font-heading font-semibold sm:text-5xl mb-4 tracking-tighter mx-auto w-[90%] sm:w-full'>
            NOT EVERY AC IS <span className="text-[#f3942c] border-b-2 border-[#f3942c] tracking-tighter">HELIUM</span>
          </h2>
        </div>
        {/* text */}
        <div className="max-w-6xl mx-auto w-[90%] sm:w-full">
          {chunks.map((chunk, index) => (
            <div
              key={index}
              ref={(el) => addToRefs(el, index)}
              className=" mb-2"
            >
              <p
                className=" text-left text-2xl md:text-5xl lg:text-6xl font-body sm:font-semibold leading-tight transition-colors duration-500 ease-out"
                style={{
                  color: visibleElements.has(index) ? '#ffffff' : '#4a5568',
                  textShadow: visibleElements.has(index)
                    ? '0 0 5px rgba(255, 255, 255, 0.3)'
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
