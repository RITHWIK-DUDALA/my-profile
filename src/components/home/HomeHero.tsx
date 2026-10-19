'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import FluxLines from '@/components/ui/FluxLines';

export default function HomeHero() {
  return (
    <section 
      className="relative w-full min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-32 pb-8 px-6 md:px-12 bg-[#E6D5BD] text-[#101010] transition-colors overflow-hidden"
      style={{ backgroundColor: '#E6D5BD' }}
    >
      {/* Moving Ambient WebGL FluxLines Background (Orange Moving Lines on Warm Ivory Background) */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden" aria-hidden="true">
        <FluxLines
          colors={['#D5360C', '#E0441D', '#F4511E', '#FF5722', '#C02F08', '#B22A06', '#E64A19']}
          glow={2.0}
          rimWidth={0.28}
          lineWidth={1.8}
          flowDirection="down"
          mouseInteraction
          clickSwirl
          speed={0.38}
          scale={1.4}
          turbulence={0.85}
          fluidity={0.15}
          sharpness={1.8}
          shimmer={0.8}
          mouseStrength={1.2}
          mouseRadius={0.35}
          intro
          lightMode={true}
          transparent={true}
          backgroundColor="#E6D5BD"
        />
      </div>

      {/* Main Two-Column Editorial Hero Content */}
      <div className="relative z-10 pointer-events-none max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Typography & Intent */}
        <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
          {/* Top Identifier & Greeting */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#D5360C]"></span>
              <span className="font-mono text-xs md:text-sm font-bold tracking-widest uppercase text-[#101010]">
                AI / MACHINE LEARNING / ENGINEERING
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-sm sm:text-base font-semibold text-[#101010] tracking-tight">
                Hi, this is D Rithwik Satya
              </span>
              <span className="text-[#D5360C] font-mono text-xs font-bold">{'//'}</span>
            </div>
          </div>

          {/* Dominant Headline */}
          <div className="flex flex-col">
            <h1 className="font-display font-bold tracking-tight leading-[0.96] text-[#101010] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              <span>ENGINEERING</span>
              <br />
              <span className="text-[#D5360C]">INTELLIGENCE.</span>
            </h1>
          </div>

          {/* Editorial Introduction */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#35302C] max-w-2xl leading-relaxed font-normal">
            I explore intelligent systems, build technical prototypes, and turn complex engineering ideas into working software.
          </p>

          {/* Functional Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2 pointer-events-auto">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D5360C] hover:bg-[#A92A0A] text-[#F2E9DC] font-mono text-xs md:text-sm uppercase tracking-wider font-bold transition-all duration-200 shadow-md border border-[#101010]"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowUpRight className="w-4 h-4 text-[#F2E9DC]" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#101010] hover:bg-[#35302C] text-[#F2E9DC] font-mono text-xs md:text-sm uppercase tracking-wider font-bold transition-all duration-200 border border-[#101010] shadow-sm"
            >
              <span>ABOUT ME</span>
              <ArrowUpRight className="w-4 h-4 text-[#F2E9DC]" />
            </Link>
          </div>
        </div>

        {/* Right Column: Blended Portrait Cutout */}
        <div className="lg:col-span-5 relative flex items-end justify-center lg:justify-end pointer-events-auto h-[480px] sm:h-[560px] lg:h-[640px]">
          <div className="relative w-full h-full max-w-[380px] lg:max-w-[440px] flex items-end justify-center">
            <Image
              src="/images/pics/use4.png"
              alt="D Rithwik Satya — AI & Machine Learning Engineer"
              width={514}
              height={998}
              priority
              className="h-full w-auto object-contain object-bottom select-none drop-shadow-xl"
              style={{
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Identity & Subtle Scroll Cue */}
      <div className="relative z-10 pointer-events-auto max-w-7xl mx-auto w-full pt-4 border-t border-[#35302C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#35302C]">
        <div className="flex items-center gap-2 tracking-wider">
          <span className="text-[#101010] font-bold">DISCIPLINES:</span>
          <span>AI · ROBOTICS · PROBABILISTIC SYSTEMS</span>
        </div>

        <a
          href="#overview"
          className="flex items-center gap-2 text-[#101010] hover:text-[#D5360C] transition-colors font-semibold"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#D5360C]" />
        </a>
      </div>
    </section>
  );
}
