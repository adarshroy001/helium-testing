'use client';
import React, { useEffect, useRef } from 'react';

interface HeadingProps {
  text: string;
  highlight: string;
  maindesign?: string;
}

export const Heading: React.FC<HeadingProps> = ({ text = '', highlight = '' ,maindesign = ''  }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const parts = text.split(highlight);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      setTimeout(() => {
        el.classList.add('opacity-100', 'translate-y-0');
      }, 300);
    }
  }, []);

  return (
    <h1
      ref={ref}
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight opacity-0 translate-y-8 transition-all duration-1000 ease-out text-center ${maindesign}`}
    >
      {parts[0]}
      <span className="relative inline-block">
        <span className="bg-gradient-to-r from-[#1f4c55] to-[#033129] text-transparent bg-clip-text animate-pulse">
          {highlight}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 bg-[length:200%_100%] animate-shine" />
      </span>
      {parts[1]}
      <div className="relative h-1 w-24 mx-auto mt-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f4c55] to-[#033129] transform animate-move-gradient" />
      </div>
    </h1>
  );
};

interface SubHeadingProps {
  text: string;
  design?: string;
}

export const SubHeading: React.FC<SubHeadingProps> = ({ text ='' , design ='' }) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      setTimeout(() => {
        el.classList.add('opacity-100', 'translate-y-0');
      }, 700);
    }
  }, []);

  return (
    <p
      ref={ref}
      className={`mt-6 text-lg sm:text-xl md:text-2xl text-[#e2e8e6] max-w-3xl mx-auto text-center opacity-0 translate-y-8 transition-all duration-1000 ease-out ${design}`}
    >
      {text}
    </p>
  );
};
