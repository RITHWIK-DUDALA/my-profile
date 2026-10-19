import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { capabilitiesData } from '@/data/capabilities';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technical Capabilities & Tooling — Rithwik',
  description:
    'Comprehensive engineering capabilities across AI/ML, data science, systems programming, and robotics simulation.',
};

export default function CapabilitiesPage() {
  return (
    <div className="w-full min-h-screen bg-[#E6D5BD] text-[#101010] pt-20 sm:pt-22 pb-10 px-6 md:px-10 lg:px-12 tech-grid-bg transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col gap-5 sm:gap-6">
        {/* Compact Editorial Header & Legend */}
        <div className="flex flex-col gap-2.5 pb-4 border-b border-[#35302C]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D5360C]"></span>
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#F2E9DC] bg-[#101010] px-2 py-0.5 border border-[#35302C]">
              03 // TECHNICAL TOOLING &amp; METHODS
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
            <div>
              <h1 className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-[#101010]">
                ENGINEERING <span className="text-[#D5360C]">CAPABILITIES.</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#35302C] font-sans max-w-2xl mt-0.5 leading-relaxed">
                Practical competencies across systems, machine learning, and robotics without arbitrary skill percentage bars.
              </p>
            </div>

            {/* Inline Compact Legend */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#101010] bg-[#F2E9DC] px-3 py-1.5 border border-[#35302C] self-start lg:self-auto shrink-0 shadow-xs font-semibold">
              <span className="font-bold">STATUS:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D5360C]"></span>
                <span>Core</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#101010]"></span>
                <span>Proficient</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#35302C]"></span>
                <span>Exploring</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Capability Groups in a Responsive 3-Column Grid of Light Cream Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {capabilitiesData.map((group, groupIdx) => (
            <section
              key={group.id}
              className="p-4 bg-[#F2E9DC] border border-[#35302C] hover:border-[#D5360C] transition-all duration-200 shadow-xs flex flex-col justify-between gap-3 text-[#101010]"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#35302C]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#D5360C]">
                      0{groupIdx + 1}
                    </span>
                    <span className="text-[#35302C]">/</span>
                    <h2 className="font-display font-bold text-base text-[#101010] tracking-tight">
                      {group.category}
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono text-[#35302C] font-semibold">
                    {group.items.length} skills
                  </span>
                </div>

                <p className="text-[11px] text-[#35302C] font-sans leading-relaxed line-clamp-2">
                  {group.overview}
                </p>
              </div>

              {/* Skills Typographic List */}
              <div className="flex flex-col gap-1.5 pt-1">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between py-1 px-2 bg-[#E6D5BD] border border-[#35302C] text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          item.status === 'Core Focus'
                            ? 'bg-[#D5360C]'
                            : item.status === 'Proficient'
                            ? 'bg-[#101010]'
                            : 'bg-[#35302C]'
                        }`}
                      />
                      <span className="font-bold text-[#101010] truncate text-[11px]">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-[9px] uppercase tracking-wider text-[#35302C] shrink-0 font-sans font-semibold">
                      {item.status.replace(' Focus', '')}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Compact Cross-Page Action Bar */}
        <div className="pt-3 border-t border-[#35302C] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-[#D5360C] hover:text-[#A92A0A] font-bold transition-colors"
          >
            <span>SEE THESE CAPABILITIES APPLIED IN SELECTED WORK</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D5360C]" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-[#D5360C] hover:text-[#A92A0A] transition-colors text-[11px] font-semibold"
          >
            <span>Discuss A Technical Problem &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
