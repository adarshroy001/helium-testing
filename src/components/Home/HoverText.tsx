// 'use client'
// import { useEffect, useRef, useState } from 'react';
// import { Heading } from '../Heading/Heading';

// const HoverText = () => {
//   const [visibleElements, setVisibleElements] = useState(new Set<number>());
//   const [chunkSize, setChunkSize] = useState(4); // default to desktop

//   const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     // Responsive chunk size
//     const updateChunkSize = () => {
//       const width = window.innerWidth;
//       setChunkSize(width <= 768 ? 4 : 4);
//     };

//     updateChunkSize(); // set on load
//     window.addEventListener('resize', updateChunkSize);

//     return () => {
//       window.removeEventListener('resize', updateChunkSize);
//     };
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const newVisible = new Set<number>();
//       const centerY = window.innerHeight / 2;

//       elementsRef.current.forEach((el, index) => {
//         if (el) {
//           const rect = el.getBoundingClientRect();
//           const elCenter = rect.top + rect.height / 2;

//           if (elCenter <= centerY) {
//             newVisible.add(index);
//           }
//         }
//       });

//       setVisibleElements(newVisible);
//     };

//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('resize', handleScroll);
//     handleScroll();

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('resize', handleScroll);
//     };
//   }, []);

//   const addToRefs = (el: HTMLDivElement | null, index: number) => {
//     if (el) elementsRef.current[index] = el;
//   };

//   // Helper: chunk words
//   const chunkWords = (text: string, size: number): string[] => {
//     const words = text.split(' ');
//     const chunks = [];
//     for (let i = 0; i < words.length; i += size) {
//       chunks.push(words.slice(i, i + size).join(' '));
//     }
//     return chunks;
//   };

//   const paragraphs = [
//     "air conditioning was boring",
//     "clunky boxes on walls",
//     "noisy, dumb, outdated",
//     "built with zero soul",

//     "helium is born different",
//     "designed to feel magical",
//     "crafted to look iconic",
//     "engineered to be smart",

//     "it cools with care",
//     "learns how you live",
//     "adapts to your day",
//     "runs only when needed",

//     "connects with your phone",
//     "understands your patterns",
//     "serves you silently",
//     "saves more every month",

//     "goodbye remote confusion",
//     "hello clean control interface",
//     "no more ugly grills",
//     "just a sleek finish",

//     "we don't build ACs",
//     "we build future air",
//     "personal, adaptive, intelligent",
//     "a better standard, finally",

//     "helium is coming soon",
//     "and it changes everything"
//   ];

//   const chunks = paragraphs.flatMap(para => chunkWords(para, chunkSize));

//   return (
//     <div className="min-h-fit w-full bg-[#1B1B1B] pt-6 sm:pt-12">
//         <Heading text="NOT EVERY AC IS " highlight="HELIUM" maindesign='pt-16' />

//       <section
//         className="min-h-screen sm:mx-auto sm:w-[70%] lg:mx-auto lg:w-[60%] sm:pl-12 pr-0 mt-16 sm:mt-24 mb-16 "
//       // style={{ backgroundColor: '#033129' }}
//       >
//         {/* header */}
//         {/* text */}
//         <div className="max-w-6xl mx-auto w-[90%] sm:w-full">
//           {chunks.map((chunk, index) => (
//             <div
//               key={index}
//               ref={(el) => addToRefs(el, index)}
//               className=" mb-2"
//             >
//               <p
//                 className="text-left inline-block transition-all duration-700 ease-out transform text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-wide"
//                 style={{
//                   color: visibleElements.has(index) ? '#ffffff' : '#4a5568',
//                   textShadow: visibleElements.has(index)
//                     ? '0 0 5px rgba(255, 255, 255, 0.3)'
//                     : 'none'
//                 }}
//               >
//                 {chunk}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HoverText;

"use client"
import { useEffect, useRef, useState } from "react"
import { Heading } from "../Heading/Heading"

const HoverText = () => {
  const [visibleWords, setVisibleWords] = useState(new Set<number>())
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const newVisible = new Set<number>()
      const viewportHeight = window.innerHeight
      const triggerPoint = viewportHeight * 0.6 // Trigger when word reaches 60% of viewport

      wordsRef.current.forEach((wordEl, index) => {
        if (wordEl) {
          const rect = wordEl.getBoundingClientRect()
          const wordCenter = rect.top + rect.height / 2

          // Word becomes visible when it crosses the trigger point
          if (wordCenter <= triggerPoint) {
            newVisible.add(index)
          }
        }
      })

      setVisibleWords(newVisible)
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    // Initial call
    handleScroll()

    return () => {
      window.removeEventListener("scroll", throttledScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  const addToWordRefs = (el: HTMLSpanElement | null, index: number) => {
    if (el) wordsRef.current[index] = el
  }

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
    "and it changes everything",
  ]

  // Split all paragraphs into individual words with their paragraph index
  const allWords: Array<{ word: string; isLastInParagraph: boolean }> = []

  paragraphs.forEach((paragraph, paragraphIndex) => {
    const words = paragraph.split(" ")
    words.forEach((word, wordIndex) => {
      allWords.push({
        word,
        isLastInParagraph: wordIndex === words.length - 1,
      })
    })
  })

  return (
    <div className="min-h-fit w-full bg-[#000000]  scroll-smooth"
    // bg-gradient-to-b from-[#1B1B1B] via-[#1B1B1B] to-[#0F0F0F]
    >
      <Heading text="NOT EVERY AC IS " highlight="HELIUM" maindesign="pt-16" />

      <section className="min-h-screen mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 mt-16 sm:mt-24 mb-16">
        <div className="relative">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1B1B1B]/20 to-transparent pointer-events-none" />

          <div className="relative z-10 leading-relaxed sm:leading-relaxed">
            {allWords.map((wordData, index) => (
              <span key={index} className="inline-block">
                <span
                  ref={(el) => addToWordRefs(el, index)}
                  className={`
                    inline-block transition-all duration-300 ease-out transform
                    text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                    font-light tracking-wide
                    ${
                      visibleWords.has(index) ? "text-white scale-100 opacity-100" : "text-gray-600 scale-95 opacity-40"
                    }
                  `}
                  style={{
                    textShadow: visibleWords.has(index)
                      ? "0 0 20px rgba(255, 255, 255, 0.15), 0 0 40px rgba(255, 255, 255, 0.1)"
                      : "none",
                    filter: visibleWords.has(index) ? "brightness(1.1) contrast(1.05)" : "brightness(0.7)",
                    transitionDelay: `${(index%10 ) * 1}ms`, // Stagger animation
                  }}
                >
                  {wordData.word}
                </span>
                {/* Add space after each word, and extra space after paragraphs */}
                <span className="inline-block w-3 sm:w-4 md:w-5 lg:w-6" />
                {wordData.isLastInParagraph && <span className="block h-4 sm:h-6 md:h-8 lg:h-10" />}
              </span>
            ))}
          </div>

          {/* Subtle animated background elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse opacity-20" />
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse opacity-30"
            style={{ animationDelay: "0s" }}
          />
        </div>
      </section>
    </div>
  )
}

export default HoverText

