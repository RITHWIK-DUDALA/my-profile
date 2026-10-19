import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import SectionLabel from '@/components/ui/SectionLabel';
import { ArrowUpRight } from 'lucide-react';

export default function HomeAboutPreview() {
  return (
    <section className="w-full bg-[#E6D5BD] text-[#101010] py-12 md:py-16 px-6 md:px-12 border-b border-[#35302C] transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
        <SectionLabel number="05" label="BACKGROUND & TRAJECTORY" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <h2 className="headline-section text-[#101010]">
              ABOUT <span className="text-[#D5360C]">{siteConfig.name.toUpperCase()}.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#35302C] font-sans leading-relaxed">
              {siteConfig.bio}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D5360C] hover:bg-[#A92A0A] text-[#F2E9DC] font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-xs border border-[#101010]"
              >
                <span>READ COMPLETE BACKGROUND</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F2E9DC]" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#101010] hover:bg-[#35302C] text-[#F2E9DC] font-mono text-xs uppercase tracking-wider font-semibold transition-colors border border-[#101010] shadow-xs"
              >
                <span>ENGINEERING RÉSUMÉ</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F2E9DC]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] flex flex-col gap-3 shadow-xs">
            <span className="font-mono text-xs text-[#D5360C] uppercase font-bold">
              ACADEMIC CONTEXT
            </span>
            <div className="flex flex-col gap-1 font-mono text-xs">
              <span className="font-bold text-[#101010]">{siteConfig.institution}</span>
              <span className="text-[#35302C] font-medium">{siteConfig.degree}</span>
              <span className="text-[#35302C]">Class of {siteConfig.expectedGraduation} · Chennai, India</span>
            </div>
            <div className="pt-2.5 border-t border-[#35302C] text-xs text-[#35302C] font-sans">
              Active student leadership in IEEE Computer Society and technical hackathon engineering.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
