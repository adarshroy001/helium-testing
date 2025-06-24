"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Snowflake, Shield, Palette, Zap, Smartphone, ArrowRight } from "lucide-react"
import Link from "next/link"

// Memoized beliefs data to prevent recreation on every render
const BELIEFS_DATA = [
    {
        number: "01",
        title: "Innovation",
        subtitle: "Built for Indian Summers",
        description:
            "Heavy-duty cooling engineered to perform flawlessly at 55°C. When the mercury soars and other ACs struggle, Helium delivers consistent, powerful cooling that transforms your space into an oasis of comfort.",
        icon: Snowflake,
        gradient: "from-blue-600 to-cyan-600",
        bgColor: "bg-blue-50",
        image: "https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-cold-summer-taobao-tmall-background-banner-image_158782.jpg",
    },
    {
        number: "02",
        title: "Health",
        subtitle: "Breathe Pure, Live Better",
        description:
            "Integrated HEPA air purification system removes 99.97% of airborne particles, allergens, and pollutants. Every breath you take is cleaner, fresher, and healthier for you and your family.",
        icon: Shield,
        gradient: "from-green-600 to-emerald-600",
        bgColor: "bg-green-50",
        image: "/assets/bg/2.jpg",
    },
    {
        number: "03",
        title: "Aesthetics",
        subtitle: "Beauty Meets Function",
        description:
            "Customizable front panels let you match your décor perfectly. No more boring white boxes disrupting your interior design. Choose from premium finishes that complement your style and elevate your space.",
        icon: Palette,
        gradient: "from-purple-600 to-pink-600",
        bgColor: "bg-purple-50",
        image: "/assets/bg/5.jpg",
    },
    {
        number: "04",
        title: "Savings",
        subtitle: "Smart Energy, Smart Savings",
        description:
            "TOD Smart Mode intelligently adapts to time-of-day electricity rates, automatically optimizing energy consumption during peak and off-peak hours. Save up to 40% on your electricity bills without compromising comfort.",
        icon: Zap,
        gradient: "from-amber-600 to-orange-600",
        bgColor: "bg-amber-50",
        image: "/assets/bg/4.JPG",
    },
    {
        number: "05",
        title: "Digital Convenience",
        subtitle: "Control at Your Fingertips",
        description:
            "Complete smartphone integration with real-time insights, remote control, scheduling, and energy monitoring. Your AC learns your preferences and adapts automatically, making comfort effortless.",
        icon: Smartphone,
        gradient: "from-cyan-600 to-blue-600",
        bgColor: "bg-cyan-50",
        image: "/assets/bg/3.png",
    },
]

const HERO_TEXT = "If you can fill the unforgiving minute with sixty seconds' worth of distance run..."

// Optimized hook with cleanup and performance improvements
function useLetterByLetterAnimation(text: string, delay = 100, startDelay = 1000) {
    const [displayedText, setDisplayedText] = useState("")
    const [isAnimating, setIsAnimating] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        // Clear any existing timers
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        if (intervalRef.current) clearInterval(intervalRef.current)

        timeoutRef.current = setTimeout(() => {
            setIsAnimating(true)
            let currentIndex = 0

            intervalRef.current = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayedText(text.slice(0, currentIndex))
                    currentIndex++
                } else {
                    if (intervalRef.current) clearInterval(intervalRef.current)
                    setIsAnimating(false)
                }
            }, delay)
        }, startDelay)

        // Cleanup function
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [text, delay, startDelay])

    return { displayedText, isAnimating }
}

// Memoized belief section component
const BeliefSection = ({ belief, index, isVisible }: { 
    belief: typeof BELIEFS_DATA[0], 
    index: number, 
    isVisible: boolean 
}) => {
    const isEven = index % 2 === 1
    const sectionId = `belief-${index}`
    const IconComponent = belief.icon

    const imageStyle = useMemo(() => ({
        backgroundImage: `url('${belief.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
    }), [belief.image])

    return (
        <section
            id={sectionId}
            data-animate
            className={`relative min-h-screen py-24 overflow-hidden ${belief.bgColor} scroll-smooth`}
            style={imageStyle}
        >
            <div className="container mx-auto px-4">
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? "lg:grid-flow-col-dense" : ""}`}>
                    {/* Image/Info Side */}
                    <div
                        className={`space-y-6 transition-all duration-1000 delay-300 ${
                            isVisible
                                ? "opacity-100 translate-x-0"
                                : `opacity-0 ${isEven ? "translate-x-8" : "-translate-x-8"}`
                        } ${isEven ? "lg:col-start-2" : ""}`}
                    >
                        <div className="relative">
                            <div
                                className={`text-8xl md:text-9xl font-black bg-gradient-to-r ${belief.gradient} bg-clip-text text-transparent opacity-20 absolute -top-8 -left-4`}
                            >
                                {belief.number}
                            </div>
                            <div className="relative z-10">
                                <IconComponent
                                    className={`h-16 w-16 mb-6 text-transparent bg-gradient-to-r ${belief.gradient} bg-clip-text`}
                                />
                                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{belief.title}</h3>
                                <p
                                    className={`text-xl font-semibold bg-gradient-to-r ${belief.gradient} bg-clip-text text-transparent mb-6`}
                                >
                                    {belief.subtitle}
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                            <img
                                src={belief.image || "/placeholder.svg"}
                                alt={`${belief.title} - ${belief.subtitle}`}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div
                                className={`absolute inset-0 bg-gradient-to-t ${belief.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                            />
                        </div>
                    </div>

                    {/* Card Side */}
                    <div
                        className={`transition-all duration-1000 delay-500 ${
                            isVisible
                                ? "opacity-100 translate-x-0"
                                : `opacity-0 ${isEven ? "-translate-x-8" : "translate-x-8"}`
                        } ${isEven ? "lg:col-start-1" : ""}`}
                    >
                        <Card className="p-8 md:p-12 backdrop-blur-lg bg-white/80 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
                            <div className="space-y-6">
                                <div
                                    className={`w-16 h-1 bg-gradient-to-r ${belief.gradient} rounded-full group-hover:w-24 transition-all duration-500`}
                                />

                                <p className="text-lg md:text-xl text-slate-700 leading-relaxed">{belief.description}</p>

                                <Button
                                    variant="ghost"
                                    className={`group/btn hover:bg-gradient-to-r ${belief.gradient} hover:text-white text-slate-800 px-2 py-1 transition-all duration-300 h-auto font-semibold`}
                                >
                                    Learn More
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function WhyHeliumPage() {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
    const observerRef = useRef<IntersectionObserver | null>(null)

    const { displayedText, isAnimating } = useLetterByLetterAnimation(HERO_TEXT, 80, 500)

    // Memoized intersection observer callback
    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        const newVisibleSections = new Set<string>()
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                newVisibleSections.add(entry.target.id)
            }
        })
        
        if (newVisibleSections.size > 0) {
            setVisibleSections((prev) => new Set([...prev, ...newVisibleSections]))
        }
    }, [])

    useEffect(() => {
        // Create intersection observer with optimized options
        observerRef.current = new IntersectionObserver(handleIntersection, {
            threshold: 0.1,
            rootMargin: "0px"
        })

        // Observe all sections at once
        const sections = document.querySelectorAll("[data-animate]")
        sections.forEach((section) => observerRef.current?.observe(section))

        return () => {
            observerRef.current?.disconnect()
        }
    }, [handleIntersection])

    // Memoized computed values
    const isHeroComplete = displayedText.length === HERO_TEXT.length
    const isHeroMostlyComplete = displayedText.length > 70

    return (
        <div className="overflow-hidden scroll-smooth">
            {/* Hero Section */}
            <section
                id="hero"
                data-animate
                className="relative min-h-[97vh] md:min-h-screen flex items-center justify-center bg-[#033129] transition-all duration-1000"
            >
                <div className="text-white text-center transition-all duration-[2000ms] ease-out">
                    <blockquote className="text-4xl mx-2 mt-10 md:mt-20 md:mx-6 sm:text-[clamp(1.5rem,8vw,3rem)] md:text-5xl lg:text-8xl leading-loose md:leading-32 mb-4 md:mb-8 font-[Georgia,'Times New Roman',serif] min-h-[200px] md:min-h-[300px]">
                        <span className="relative">
                            "{displayedText}"{isAnimating && <span className="animate-pulse text-[#f5b841] ml-1">|</span>}
                        </span>
                    </blockquote>
                    <div
                        className={`w-24 mt-2 h-px bg-gradient-to-r from-transparent via-[#f5b841] to-transparent mx-auto mb-8 transition-all duration-1000 ${
                            isHeroMostlyComplete ? "opacity-100 scale-100" : "opacity-0 scale-0"
                        }`}
                    />
                    <p
                        className={`text-lg md:text-3xl text-slate-300 font-light italic transition-all duration-1000 delay-500 ${
                            isHeroComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                    >
                        Kipling wrote that as a test of character — of grit, purpose, and relentless effort.
                    </p>
                </div>
            </section>

            {/* Mission Statement */}
            <section
                id="mission"
                data-animate
                className="py-16 md:py-24 min-h-screen bg-[#e2e8e6]"
            >
                <div className="container mx-auto px-4 text-center">
                    <div className="mx-auto max-w-[90%]">
                        <p className="mt-8 text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#4a5754] font-normal mx-auto font-[Georgia,'Times New Roman',serif]">
                            <div>At Helium</div>
                            we hold ourselves to a similar standard. To make every second of your life more
                            <span className="text-[#f5b841] font-semibold"> comfortable</span>,{' '}
                            <span className="text-[#f5b841] font-semibold"> healthier</span>, and{' '}
                            <span className="text-[#f5b841] font-semibold">effortless</span> {''}
                            without burning a hole in your pocket.
                        </p>
                        <p className="mt-8 md:mt-12 text-xl md:text-2xl lg:text-3xl leading-relaxed text-[#4a5754] font-normal max-w-3xl mx-auto">
                            That's why we've reimagined the air conditioner as more than just a cooling machine.
                        </p>
                    </div>
                </div>
            </section>

            {/* Beliefs Sections */}
            {BELIEFS_DATA.map((belief, index) => (
                <BeliefSection
                    key={belief.number}
                    belief={belief}
                    index={index}
                    isVisible={visibleSections.has(`belief-${index}`)}
                />
            ))}

            {/* Closing Section */}
            <section
                id="closing"
                data-animate
                className={`relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white text-center transition-all duration-1000 delay-200 ${
                    visibleSections.has("closing") ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url('/placeholder.svg?height=800&width=1920&text=Premium+Comfort+Lifestyle+AC')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="space-y-2">
                            <p className="text-xl md:text-4xl font-medium">
                                And we believe that if we do all this — really do it
                            </p>
                            <h2 className="text-xl md:text-4xl font-light text-slate-300">
                                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                                    You won't just like Helium.
                                </span>
                            </h2>
                            <p className="text-xl md:text-4xl font-light text-slate-300">You'll love it.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link
                                href="/shop"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-6 py-3 md:px-12 md:py-6 text-xl font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
                            >
                                Experience Helium
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}