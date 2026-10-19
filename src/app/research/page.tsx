import React from 'react';
import type { Metadata } from 'next';
import { researchItems, researchInterests } from '@/data/research';
import { Layers, FlaskConical } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Research & Technical Inquiries — Rithwik',
  description:
    'Research explorations in model uncertainty, conformal prediction, and parallel robot kinematics.',
};

export default function ResearchPage() {
  return (
    <div className="w-full min-h-screen bg-[#E6D5BD] text-[#101010] pt-20 sm:pt-22 pb-12 px-6 md:px-10 lg:px-12 tech-grid-bg transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
        {/* Compact Header */}
        <div className="flex flex-col gap-2.5 pb-4 border-b border-[#35302C]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D5360C]"></span>
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#F2E9DC] bg-[#101010] px-2 py-0.5 border border-[#35302C]">
              04 // METHODOLOGY &amp; RESEARCH NOTES
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <h1 className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-[#101010]">
              RESEARCH <span className="text-[#D5360C]">INQUIRIES.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#35302C] font-sans max-w-lg sm:text-right leading-relaxed">
              Distribution shift dynamics, model uncertainty quantification, and parallel robot kinematics.
            </p>
          </div>
        </div>

        {/* Primary Research Pillars / Interests */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#101010] font-bold tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#D5360C]" />
            <span>CORE INVESTIGATION THEMES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {researchInterests.map((interest, idx) => (
              <div
                key={interest.title}
                className="p-4 bg-[#F2E9DC] border border-[#35302C] shadow-xs flex flex-col justify-between gap-3 hover:border-[#D5360C] transition-all text-[#101010]"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#D5360C]">THEME 0{idx + 1}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#101010] tracking-tight">
                    {interest.title}
                  </h3>
                  <p className="text-xs text-[#35302C] font-sans leading-relaxed">
                    {interest.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#35302C] flex flex-col gap-1 font-mono text-[10px] text-[#35302C]">
                  <span className="text-[#101010] font-bold">Active Questions:</span>
                  {interest.openQuestions.map((q, i) => (
                    <span key={i} className="text-[#35302C]">
                      &bull; {q}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In-Depth Working Papers & Investigations */}
        <div className="flex flex-col gap-4 pt-4 border-t border-[#35302C]">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#101010] font-bold tracking-wider">
            <FlaskConical className="w-3.5 h-3.5 text-[#D5360C]" />
            <span>DETAILED INVESTIGATION LOGS</span>
          </div>

          <div className="flex flex-col gap-4">
            {researchItems.map((item, idx) => (
              <article
                key={item.id}
                className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] shadow-xs flex flex-col gap-4 hover:border-[#D5360C] transition-all text-[#101010]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#35302C]">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#D5360C]">
                      LOG 0{idx + 1}
                    </span>
                    <span className="text-[#35302C]">/</span>
                    <span className="font-mono text-[11px] text-[#101010] font-semibold uppercase tracking-wider">
                      {item.area}
                    </span>
                    <span className="text-[#35302C]">/</span>
                    <span className="font-mono text-[11px] text-[#35302C]">{item.year}</span>
                  </div>

                  <span className="self-start sm:self-auto px-2 py-0.5 rounded-xs text-[10px] font-mono uppercase tracking-wider font-bold bg-[#E6D5BD] text-[#101010] border border-[#35302C]">
                    {item.status}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h2 className="font-display font-bold text-lg sm:text-xl text-[#101010] tracking-tight">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#35302C] font-sans leading-relaxed">
                    {item.abstract}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-[#E6D5BD] border border-[#35302C]">
                    <strong className="text-[#D5360C] font-mono text-[11px] block mb-1 font-bold uppercase">
                      Methodology &amp; Exploration:
                    </strong>
                    <ul className="flex flex-col gap-1 text-[11px] text-[#35302C] list-disc list-inside">
                      {item.methodology.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-[#E6D5BD] border border-[#35302C]">
                    <strong className="text-[#101010] font-mono text-[11px] block mb-1 font-bold uppercase">
                      Limitations &amp; Hypotheses:
                    </strong>
                    <ul className="flex flex-col gap-1 text-[11px] text-[#35302C] list-disc list-inside">
                      {item.limitations.map((lim, i) => (
                        <li key={i}>{lim}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-[#E6D5BD] border border-[#35302C] text-[10px] font-mono text-[#101010] font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-[#35302C] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
          <a
            href="/work"
            className="text-[#D5360C] hover:text-[#A92A0A] font-bold transition-colors inline-flex items-center gap-1"
          >
            <span>&larr; EXPLORE PRACTICAL WORK &amp; SYSTEMS</span>
          </a>
          <a
            href="/capabilities"
            className="text-[#D5360C] hover:text-[#A92A0A] font-bold transition-colors inline-flex items-center gap-1"
          >
            <span>VIEW TECHNICAL CAPABILITIES &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
