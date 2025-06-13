'use client';

import React, { useEffect, useState } from 'react';
import {
    Snowflake,
    Shield,
    Palette,
    Zap,
    Smartphone,
    LucideIcon,
} from 'lucide-react';
import { Spotlight } from "../../components/ui/Spotlight";
import { cn } from "@/lib/utils";

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

const WhyHelium: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features: Feature[] = [
        { icon: Snowflake, title: '1. We believe in innovation.', description: 'That’s why Helium brings you a feature-rich, heavy-duty cooling system — built to perform even at 55°C. It’s engineered for the extremes of Indian summers, and for the expectations of future-first homes.' },
        { icon: Shield, title: '2. We believe in health.', description: 'You deserve more than cold air — you deserve clean air.Helium integrates a true HEPA air purifier, built into the AC itself. So your kids, your parents, your family, and your customers breathe better — without buying another device.' },
        { icon: Palette, title: '3. We believe in aesthetics.', description: 'Why should every AC be dull, white, and boxy? Helium lets you choose how your AC looks — with customizable front panels that match your space and your style.' },
        { icon: Zap, title: '4. We believe in savings.', description: 'Helium’s trademark TOD Smart Mode understands when power is expensive — and cools around it. It learns your routine, shifts load intelligently, and saves you money every single day. You cool smart, not hard.' },
        { icon: Smartphone, title: '5. We believe in digital convenience.', description: 'Control Helium from your phone. Get usage insights, smart diagnostics, and maintenance alerts — all in one elegant, easy-to-use app.' },
    ];

    return (
        <div 
        className={cn(
        //   "pointer-events-none  inset-0 [background-size:40px_40px] select-none",
        //   "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
          'min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800  text-white overflow-x-hidden scroll-smooth'
        )}
        >
            {/* bg-gradient-to-br from-gray-900 via-black to-gray-800 */}
            {/* Noise Background */}
            {/* <div className="fixed inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div> */}

            {/* Hero Quote Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 py-24 lg:py-28">
                <Spotlight
                    className="top-6 left-36 md:-top-20 md:left-2/5"
                    fill="white"
                />
                <Spotlight
                    className="top-20 left-28 md:-top-10 md:left-96"
                    fill="white"
                />
                <div className="max-w-4xl mx-auto text-center ">
                    <div className={`min-h-[90vh] sm:min-h-screen mt-[-5rem] flex flex-col justify-center transition-all duration-[2000ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <blockquote className="text-3xl sm:text-[clamp(1.5rem,8vw,3rem)] md:text-5xl lg:text-6xl italic leading-relaxed mb-8 font-[Georgia,'Times New Roman',serif]">
                            "If you can fill the unforgiving minute<br />
                            <span className="block mt-4">...distance run."</span>
                        </blockquote>
                        <cite className="text-lg md:text-xl text-white/70 font-light tracking-wide">
                            — Rudyard Kipling
                        </cite>

                        <div className="w-24 mt-4 h-px bg-gradient-to-r from-transparent via-[#f5b841] to-transparent mx-auto mb-8"></div>
                    </div>

                    <div className={`flex flex-col justify-start transition-all duration-[2000ms] delay-[500ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/90 font-light max-w-3xl mx-auto">
                            Kipling wrote that as a test of character — of grit, purpose, and relentless effort.
                        </p>
                        <p className=" mt-8 text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/90 font-light max-w-3xl mx-auto">
                            At Helium, we hold ourselves to a similar standard. To make every second of your life more
                            <span className="text-[#f5b841]"> comfortable</span>,{' '}
                            <span className="text-[#f5b841]"> healthier</span>, and{' '}
                            <span className="text-[#f5b841]">effortless</span> {''}
                            — without burning a hole in your pocket.
                        </p>
                        <p className="mt-8 text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/90 font-light max-w-3xl mx-auto">
                            That’s why we’ve reimagined the air conditioner as more than just a cooling machine.
                        </p>
                    </div>
                </div>
            </section>

            {/* Belief Cards Section */}
            <section className="relative py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className={`w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-300/50 transition-all duration-500 ease-out hover:bg-white/10 hover:scale-100 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                        }`}
                                    style={{
                                        transitionDelay: `${index * 200 + 1000}ms`,
                                    }}
                                >
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                                    <div className="relative z-10 text-center space-y-6">
                                        <div className="inline-flex p-4 rounded-full bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors duration-300">
                                            <Icon className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                                        </div>

                                        <h3 className="text-xl font-bold uppercase tracking-widest text-white group-hover:text-orange-500 transition-colors duration-300">
                                            {feature.title}
                                        </h3>

                                        <p className="text-white/70 leading-relaxed text-sm font-light">{feature.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Emotional Close Section */}
            <section className="relative py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className={`transition-all duration-[2000ms] delay-[1000ms] ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
                            And we believe that if we do all this — <span className="italic text-[#f5b841]">really do it</span> —
                        </h2>
                        <div className="space-y-4 text-2xl md:text-3xl lg:text-4xl font-light text-white/90">
                            <p>You won't just like Helium.</p>
                            <p className="text-[#f5b841] font-medium">You'll love it.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Spacing */}
            <div className="h-20"></div>
        </div>
    );
};

export default WhyHelium;
