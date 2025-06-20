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
            Hello
        </div>
    );
};

export default WhyHelium;
