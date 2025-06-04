"use client"

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
// Utility function to combine class names
const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ')
}

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulating content loading with a slight delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative w-full max-h-screen h-screen overflow-hidden bg-[#033129]">
      {/* Video Background - Desktop */}
      <div className="hidden md:block absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/assets/hero-3.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Background - Mobile */}
      <div className="block md:hidden absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/assets/hero-3.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* Explore Button - Bottom for mobile screens */}
      <div className="absolute bottom-40 sm:bottom-24 z-20 w-full">        
        <h1 className="text-[#e4e8e2] text-center font-Garet text-xl sm:text-2xl md:text-4xl font-bold leading-tight tracking-tight">
          <div className="mb-2">
            Reimagining AC for New India
          </div>
        </h1>
      </div>
      <div className="absolute bottom-24 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20">        
        <Button
          size="lg"
          className={cn(
            "bg-[#f5b841] text-[#1e2a28]  transition-all duration-300 delay-100 ease-out rounded-full px-8 py-6 text-lg max-w-fit",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          <Link href={'/'} className='flex justify-center items-center'>
           <p>Shop Now</p>
          <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}

export default HeroSection