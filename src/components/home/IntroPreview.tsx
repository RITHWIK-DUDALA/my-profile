import React from 'react';
import Link from 'next/link';
import SectionLabel from '@/components/ui/SectionLabel';
import { siteConfig } from '@/data/site';
import { Cpu, GitBranch, ShieldCheck, Code2, ArrowUpRight } from 'lucide-react';

export default function IntroPreview() {
  return (
    <section id="overview" className="w-full bg-[#E6D5BD] text-[#101010] py-12 md:py-16 px-6 md:px-12 border-b border-[#35302C] transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 sm:gap-10">
        <SectionLabel number="01" label="ENGINEERING PHILOSOPHY" />

        {/* Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-8">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-[#101010] tracking-tight leading-tight">
              Software is not just code—it is an{' '}
              <span className="text-[#D5360C] font-bold underline decoration-[#D5360C] decoration-2 underline-offset-4">
                empirical discipline
              </span>{' '}
              grounded in mathematical rigor, sensor uncertainty, and physical constraints.
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 text-[#35302C] font-sans text-xs sm:text-sm leading-relaxed">
            <p>
              Undergraduate engineer at{' '}
              <strong className="text-[#101010] font-bold">{siteConfig.institution}</strong> in Chennai, focusing on the boundary between statistical learning and physical systems.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#D5360C] hover:text-[#A92A0A] uppercase tracking-wider transition-colors pt-0.5"
            >
              <span>READ MORE ABOUT BACKGROUND</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D5360C]" />
            </Link>
          </div>
        </div>

        {/* 4 Architectural Focus Cards (Light Cream Panels with Soft Black Details) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-[#35302C]">
          <div className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] hover:border-[#D5360C] transition-all flex flex-col justify-between gap-3 shadow-xs">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#101010] font-bold">
              <Cpu className="w-4 h-4 text-[#D5360C]" />
              <span>01 // VISION</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#101010] mb-1">
                Deep Learning &amp; Vision
              </h3>
              <p className="text-xs text-[#35302C] font-sans leading-relaxed">
                Detection, metric depth estimation, and feature representations calibrated for edge latency.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] hover:border-[#D5360C] transition-all flex flex-col justify-between gap-3 shadow-xs">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#101010] font-bold">
              <GitBranch className="w-4 h-4 text-[#D5360C]" />
              <span>02 // CONTROL</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#101010] mb-1">
                Kinematics &amp; Optimization
              </h3>
              <p className="text-xs text-[#35302C] font-sans leading-relaxed">
                Convex quadratic programming, parallel robot geometry, and Frenet trajectory planning.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] hover:border-[#D5360C] transition-all flex flex-col justify-between gap-3 shadow-xs">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#101010] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#D5360C]" />
              <span>03 // UNCERTAINTY</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#101010] mb-1">
                Probabilistic Reasoning
              </h3>
              <p className="text-xs text-[#35302C] font-sans leading-relaxed">
                Factor graphs, exact message passing, and conformal prediction coverage under domain shift.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] hover:border-[#D5360C] transition-all flex flex-col justify-between gap-3 shadow-xs">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#101010] font-bold">
              <Code2 className="w-4 h-4 text-[#D5360C]" />
              <span>04 // SYSTEMS</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#101010] mb-1">
                Modular Systems
              </h3>
              <p className="text-xs text-[#35302C] font-sans leading-relaxed">
                Decoupled interfaces, observable data contracts, and reproducible simulation tests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
