// "use client"
// import { useEffect, useRef, useState } from "react"
// import { Heading } from "../Heading/Heading"

// const HoverText = () => {
//   const [visibleWords, setVisibleWords] = useState(new Set<number>())
//   const wordsRef = useRef<(HTMLSpanElement | null)[]>([])

//   useEffect(() => {
//     const handleScroll = () => {
//       const newVisible = new Set<number>()
//       const viewportHeight = window.innerHeight
//       const triggerPoint = viewportHeight * 0.6 // Trigger when word reaches 60% of viewport

//       wordsRef.current.forEach((wordEl, index) => {
//         if (wordEl) {
//           const rect = wordEl.getBoundingClientRect()
//           const wordCenter = rect.top + rect.height / 2

//           // Word becomes visible when it crosses the trigger point
//           if (wordCenter <= triggerPoint) {
//             newVisible.add(index)
//           }
//         }
//       })

//       setVisibleWords(newVisible)
//     }

//     // Throttle scroll events for better performance
//     let ticking = false
//     const throttledScroll = () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           handleScroll()
//           ticking = false
//         })
//         ticking = true
//       }
//     }

//     window.addEventListener("scroll", throttledScroll, { passive: true })
//     window.addEventListener("resize", handleScroll)

//     // Initial call
//     handleScroll()

//     return () => {
//       window.removeEventListener("scroll", throttledScroll)
//       window.removeEventListener("resize", handleScroll)
//     }
//   }, [])

//   const addToWordRefs = (el: HTMLSpanElement | null, index: number) => {
//     if (el) wordsRef.current[index] = el
//   }

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
//     "and it changes everything",
//   ]

//   // Split all paragraphs into individual words with their paragraph index
//   const allWords: Array<{ word: string; isLastInParagraph: boolean }> = []

//   paragraphs.forEach((paragraph, paragraphIndex) => {
//     const words = paragraph.split(" ")
//     words.forEach((word, wordIndex) => {
//       allWords.push({
//         word,
//         isLastInParagraph: wordIndex === words.length - 1,
//       })
//     })
//   })

//   return (
//     <div className="min-h-fit w-full bg-[#000000]  scroll-smooth"
//     // bg-gradient-to-b from-[#1B1B1B] via-[#1B1B1B] to-[#0F0F0F]
//     >
      // <Heading text="NOT EVERY AC IS " highlight="HELIUM" maindesign="pt-16" />

//       <section className="min-h-screen mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 mt-16 sm:mt-24 mb-16">
//         <div className="relative">
//           {/* Background gradient overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1B1B1B]/20 to-transparent pointer-events-none" />

//           <div className="relative z-10 leading-relaxed sm:leading-relaxed">
//             {allWords.map((wordData, index) => (
//               <span key={index} className="inline-block">
//                 <span
//                   ref={(el) => addToWordRefs(el, index)}
//                   className={`
//                     inline-block transition-all duration-300 ease-out transform
//                     text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
//                     font-light tracking-wide
//                     ${
//                       visibleWords.has(index) ? "text-white scale-100 opacity-100" : "text-gray-600 scale-95 opacity-40"
//                     }
//                   `}
//                   style={{
//                     textShadow: visibleWords.has(index)
//                       ? "0 0 20px rgba(255, 255, 255, 0.15), 0 0 40px rgba(255, 255, 255, 0.1)"
//                       : "none",
//                     filter: visibleWords.has(index) ? "brightness(1.1) contrast(1.05)" : "brightness(0.7)",
//                     transitionDelay: `${(index%10 ) * 1}ms`, // Stagger animation
//                   }}
//                 >
//                   {wordData.word}
//                 </span>
//                 {/* Add space after each word, and extra space after paragraphs */}
//                 <span className="inline-block w-3 sm:w-4 md:w-5 lg:w-6" />
//                 {wordData.isLastInParagraph && <span className="block h-4 sm:h-6 md:h-8 lg:h-10" />}
//               </span>
//             ))}
//           </div>

//           {/* Subtle animated background elements */}
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse opacity-20" />
//           <div
//             className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse opacity-30"
//             style={{ animationDelay: "0s" }}
//           />
//         </div>
//       </section>
//     </div>
//   )
// }

// export default HoverText

"use client"
import { useState, useEffect, useRef } from "react"
import { Heading } from "../Heading/Heading"

export default function HoverText() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  
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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const section = sectionRef.current
      const sectionRect = section.getBoundingClientRect()
      const screenCenter = window.innerHeight / 2
      
      // Calculate how much of the section has passed the center line
      const sectionTop = sectionRect.top
      const sectionHeight = sectionRect.height
      
      // Progress from 0 to 1 based on how much the section has scrolled past center
      let progress = 0
      if (sectionTop <= screenCenter) {
        const distancePastCenter = screenCenter - sectionTop
        progress = Math.min(distancePastCenter / sectionHeight, 1)
      }
      
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial calculation
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate total words across all paragraphs
  const allWords = paragraphs.flatMap(paragraph => paragraph.split(" "))
  const totalWords = allWords.length

  const getWordColor = (wordIndex: number) => {
    const wordProgress = wordIndex / totalWords
    // Start with gray, transition to white as we scroll
    const opacity = scrollProgress >= wordProgress ? 1 : 0.2
    return `rgba(255, 255, 255, ${opacity})`
  }

  return (
    <div className="min-h-screen w-full bg-black scroll-smooth">
      <Heading text="NOT EVERY AC IS " highlight="HELIUM" maindesign="pt-16" />
      {/* Main text section */}
      <div ref={sectionRef} className="min-h-[200vh] px-2 md:px-8 py-4 md:pt-8 md:pb-16 flex items-center justify-center">
        <div className="min-h-screen mx-auto max-w-7xl px-0 sm:px-12 lg:px-16 mt-16 sm:mt-24 mb-16">
          <div className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-normal md:tracking-wide leading-loose md:leading-28  text-left pl-4 md:pl-32 space-y-0">
            {paragraphs.map((paragraph, paragraphIndex) => {
              const wordsBeforeThisParagraph = paragraphs.slice(0, paragraphIndex)
                .reduce((count, p) => count + p.split(" ").length, 0)
              
              return (
                <div key={paragraphIndex}>
                  {paragraph.split(" ").map((word, wordIndex) => {
                    const globalWordIndex = wordsBeforeThisParagraph + wordIndex
                    return (
                      <span
                        key={wordIndex}
                        style={{
                          color: getWordColor(globalWordIndex),
                          transition: "color 0.5s ease",
                        }}
                        className="inline-block mr-4 md:mr-12"
                      >
                        {word}
                      </span>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
    </div>
  )
}