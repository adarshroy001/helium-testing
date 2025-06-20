"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Snowflake, Shield, Palette, Zap, Smartphone, ArrowRight, Play } from "lucide-react"

export default function WhyHeliumPage() {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => new Set([...prev, entry.target.id]))
                    }
                })
            },
            { threshold: 0.1, rootMargin: "-50px" },
        )

        const sections = document.querySelectorAll("[data-animate]")
        sections.forEach((section) => observerRef.current?.observe(section))

        return () => observerRef.current?.disconnect()
    }, [])

    const beliefs = [
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
            image: "/placeholder.svg?height=600&width=800&text=Stylish+AC+Modern+Interior+Design",
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
            image: "/placeholder.svg?height=600&width=800&text=Energy+Efficient+Smart+AC+Savings",
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
            image: "/placeholder.svg?height=600&width=800&text=Smart+Phone+AC+Control+IoT",
        },
    ]

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* Hero Section */}
            <section
                id="hero"
                data-animate
                className={`relative min-h-[95vh] md:min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-all duration-1000 ${visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('/placeholder.svg?height=1080&width=1920&text=Modern+AC+Unit+Cooling+Technology')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="container mx-auto px-4 text-center text-white">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="">
                            <blockquote className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
                                "If you can fill the unforgiving minute with sixty seconds’ worth of distance run..."
                            </blockquote>
                            {/* <cite className="text-lg md:text-xl text-white/70 font-light tracking-wide">
                                — Rudyard Kipling
                            </cite> */}
                            <div className="w-24 h-0.5 mt-2 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
                            {/* <div className="w-24 mt-4 h-px bg-gradient-to-r from-transparent via-[#f5b841] to-transparent mx-auto mb-8"></div> */}
                        </div>

                        <div className={`flex flex-col justify-start transition-all duration-[2000ms] delay-[500ms] ease-out`}>
                            <p className="text-lg md:text-xl text-slate-300 font-light italic">
                                Kipling wrote that as a test of character — of grit, purpose, and relentless effort.
                            </p>
                            <p className="text-lg mt-6 md:text-xl text-slate-300 font-light italic">
                                <div className="text-[#28a57f] font-bold not-italic ">At Helium </div>
                                we hold ourselves to a similar standard. To make every second of your life more
                                <span className="text-[#f5b841]"> comfortable</span>,{' '}
                                <span className="text-[#f5b841]"> healthier</span>, and{' '}
                                <span className="text-[#f5b841]">effortless</span> {''}
                                — without burning a hole in your pocket.
                            </p>
                            {/* <p className="text-lg md:text-xl text-slate-300 font-light italic">
                                That’s why we’ve reimagined the air conditioner as more than just a cooling machine.
                            </p> */}
                        </div>

                        {/* <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Helium</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
                            Making every second more comfortable, healthier, effortless
                        </p> */}

                        {/* <Button
                            size="lg"
                            className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
                        >
                            Discover Why <ArrowRight className="ml-2 h-5 w-5" />
                        </Button> */}
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section
                id="mission"
                data-animate
                className={`py-24 bg-gray-600 transition-all duration-1000 delay-200 ${visibleSections.has("mission") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
            >
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        {/* <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Why Helium?</h2> */}
                        <p className="text-xl md:text-3xl font-bold text-[#28a57f] leading-relaxed">
                            That’s why we’ve reimagined the air conditioner as more than just a cooling machine.
                        </p>
                    </div>
                </div>
            </section>

            {/* Beliefs Sections */}
            {beliefs.map((belief, index) => {
                const isEven = index % 2 === 1
                const sectionId = `belief-${index}`

                return (
                    <section
                        key={belief.number}
                        id={sectionId}
                        data-animate
                        className={`relative min-h-screen py-24 overflow-hidden ${belief.bgColor}`}
                        style={{
                            backgroundImage: `url('${belief.image}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundAttachment: "fixed",
                        }}
                    >
                        <div className="container mx-auto px-4">
                            <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? "lg:grid-flow-col-dense" : ""}`}>
                                {/* Image/Info Side */}
                                <div
                                    className={`space-y-6 transition-all duration-1000 delay-300 ${visibleSections.has(sectionId)
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
                                            <belief.icon
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
                                        />
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-t ${belief.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                                        ></div>
                                    </div>
                                </div>

                                {/* Card Side */}
                                <div
                                    className={`transition-all duration-1000 delay-500 ${visibleSections.has(sectionId)
                                        ? "opacity-100 translate-x-0"
                                        : `opacity-0 ${isEven ? "-translate-x-8" : "translate-x-8"}`
                                        } ${isEven ? "lg:col-start-1" : ""}`}
                                >
                                    <Card className="p-8 md:p-12 backdrop-blur-lg bg-white/80 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
                                        <div className="space-y-6">
                                            <div
                                                className={`w-16 h-1 bg-gradient-to-r ${belief.gradient} rounded-full group-hover:w-24 transition-all duration-500`}
                                            ></div>

                                            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">{belief.description}</p>

                                            <Button
                                                variant="ghost"
                                                className={`group/btn hover:bg-gradient-to-r ${belief.gradient} hover:text-white transition-all duration-300 p-0 h-auto font-semibold`}
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
            })}

            {/* Closing Section */}
            <section
                id="closing"
                data-animate
                className={`relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white text-center transition-all duration-1000 delay-200 ${visibleSections.has("closing") ? "opacity-100 scale-100" : "opacity-0 scale-95"
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
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-12 py-6 text-xl font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
                            >
                                Experience Helium
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
