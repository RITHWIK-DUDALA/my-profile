import React from 'react';
import Link from 'next/link';
import { researchInterests } from '@/data/research';
import SectionLabel from '@/components/ui/SectionLabel';
import { ArrowUpRight, FlaskConical } from 'lucide-react';

export default function HomeResearchPreview() {
  return (
    <section className="w-full bg-[#E6D5BD] text-[#101010] py-12 md:py-16 px-6 md:px-12 border-b border-[#35302C] transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#35302C]">
          <div className="flex flex-col gap-2">
            <SectionLabel number="03" label="ACADEMIC & EMPIRICAL INQUIRIES" />
            <h2 className="headline-section text-[#101010]">
              RESEARCH <span className="text-[#D5360C]">INTERESTS.</span>
            </h2>
          </div>
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#D5360C] hover:text-[#A92A0A] uppercase tracking-wider transition-colors"
          >
            <span>VIEW RESEARCH LOGS &amp; PAPERS</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D5360C]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {researchInterests.map((theme, idx) => (
            <div
              key={theme.title}
              className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] hover:border-[#D5360C] transition-colors shadow-xs flex flex-col justify-between gap-3.5"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-xs text-[#101010]">
                  <span className="font-bold">THEME 0{idx + 1}</span>
                  <FlaskConical className="w-3.5 h-3.5 text-[#D5360C]" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#101010]">
                  {theme.title}
                </h3>
                <p className="text-xs text-[#35302C] font-sans leading-relaxed">
                  {theme.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-[#35302C] font-mono text-[11px] text-[#35302C]">
                <span className="text-[#101010] font-bold block mb-0.5">
                  Active Inquiry:
                </span>
                <span>&bull; {theme.openQuestions[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
