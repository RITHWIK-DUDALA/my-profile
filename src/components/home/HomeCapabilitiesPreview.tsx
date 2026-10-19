import React from 'react';
import Link from 'next/link';
import { capabilitiesData } from '@/data/capabilities';
import SectionLabel from '@/components/ui/SectionLabel';
import { ArrowUpRight } from 'lucide-react';

export default function HomeCapabilitiesPreview() {
  return (
    <section className="w-full bg-[#E6D5BD] text-[#101010] py-12 md:py-16 px-6 md:px-12 border-b border-[#35302C] transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#35302C]">
          <div className="flex flex-col gap-2">
            <SectionLabel number="04" label="TOOLING & METHODOLOGY" />
            <h2 className="headline-section text-[#101010]">
              ENGINEERING <span className="text-[#D5360C]">CAPABILITIES.</span>
            </h2>
          </div>
          <Link
            href="/capabilities"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#D5360C] hover:text-[#A92A0A] uppercase tracking-wider transition-colors"
          >
            <span>VIEW COMPLETE SKILLS MATRIX</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D5360C]" />
          </Link>
        </div>

        {/* 6 Capabilities Cards Grid in Light Cream */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {capabilitiesData.map((group, idx) => (
            <div
              key={group.id}
              className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] hover:border-[#D5360C] transition-colors flex flex-col justify-between gap-3.5 shadow-xs"
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-xs font-bold text-[#D5360C]">
                  0{idx + 1} // DOMAIN
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#101010]">
                  {group.category}
                </h3>
                <p className="text-xs text-[#35302C] font-sans leading-relaxed">
                  {group.overview}
                </p>
              </div>

              <div className="pt-2.5 border-t border-[#35302C] flex flex-wrap gap-1">
                {group.items.slice(0, 3).map((item) => (
                  <span
                    key={item.name}
                    className="px-2 py-0.5 bg-[#E6D5BD] border border-[#35302C] text-[10px] font-mono text-[#101010] font-medium"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
