'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { projects } from '@/data/projects';
import { capabilityGroups, experienceItems } from '@/data/experience';
import SectionLabel from '@/components/ui/SectionLabel';
import { Printer, Copy, Check } from 'lucide-react';

export default function ResumePage() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#E6D5BD] text-[#101010] pt-20 sm:pt-22 pb-12 px-4 sm:px-6 md:px-10 tech-grid-bg print:bg-white print:text-black print:pt-4 print:px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-5 sm:gap-6">
        {/* Screen Action Bar (Hidden when printing) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#35302C] print:hidden">
          <div>
            <SectionLabel number="05" label="ACADEMIC &amp; TECHNICAL CV" />
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#101010]">
              ENGINEERING <span className="text-[#D5360C]">RÉSUMÉ.</span>
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-[#D5360C] hover:bg-[#A92A0A] text-[#F2E9DC] font-mono font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 border border-[#101010] shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={copyEmail}
              className="px-3 py-1.5 bg-[#F2E9DC] border border-[#35302C] text-[#101010] hover:bg-[#E6D5BD] font-mono text-xs transition-colors flex items-center gap-1.5 shadow-xs font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#D5360C]" /> : <Copy className="w-3.5 h-3.5 text-[#101010]" />}
              <span>{copied ? 'Copied' : 'Copy Email'}</span>
            </button>
          </div>
        </div>

        {/* Printable Resume Container in Light Cream */}
        <div className="p-5 sm:p-7 md:p-8 bg-[#F2E9DC] border border-[#35302C] flex flex-col gap-6 shadow-xs text-[#101010] print:bg-white print:border-none print:p-0 print:shadow-none print:text-black">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#35302C] print:border-black/20">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[#101010] tracking-tight print:text-black">
                {siteConfig.name.toUpperCase()}
              </h2>
              <div className="font-mono text-sm text-[#D5360C] font-bold mt-1 print:text-black">
                {siteConfig.role}
              </div>
              <div className="text-xs font-mono text-[#35302C] mt-1 print:text-neutral-700">
                {siteConfig.location} · {siteConfig.institution}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 font-mono text-xs text-[#101010] print:text-black">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-[#D5360C] transition-colors font-medium">
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.socials.find((s) => s.icon === 'github')?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D5360C] transition-colors font-medium"
              >
                github.com/{siteConfig.socials.find((s) => s.icon === 'github')?.handle}
              </a>
              <a
                href={siteConfig.socials.find((s) => s.icon === 'linkedin')?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D5360C] transition-colors font-medium"
              >
                linkedin.com/in/{siteConfig.socials.find((s) => s.icon === 'linkedin')?.handle}
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-xs font-bold text-[#101010] uppercase tracking-wider print:text-black print:border-b print:border-black/20 print:pb-1">
              {'//'} 01. EDUCATION
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <span className="font-display font-bold text-base text-[#101010] print:text-black">
                  {siteConfig.institution}
                </span>
                <span className="text-xs text-[#35302C] block print:text-neutral-700">
                  {siteConfig.degree}
                </span>
              </div>
              <div className="font-mono text-xs text-[#35302C] print:text-neutral-700">
                Chennai, India | 2022 – {siteConfig.expectedGraduation} (Expected)
              </div>
            </div>
            <div className="text-xs font-mono text-[#35302C] mt-1 print:text-neutral-800">
              <strong className="text-[#101010] font-bold print:text-black">Relevant Coursework:</strong> Linear Algebra, Multivariate Calculus, Probability &amp; Stochastic Processes, Deep Learning, Computer Vision, Robotics &amp; Kinematics, Data Structures &amp; Algorithms, Numerical Optimization.
            </div>
          </div>

          {/* Core Projects */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs font-bold text-[#101010] uppercase tracking-wider print:text-black print:border-b print:border-black/20 print:pb-1">
              {'//'} 02. KEY ENGINEERING PROJECTS
            </h3>

            {projects.slice(0, 3).map((p) => (
              <div key={p.slug} className="flex flex-col gap-1.5 pb-4 border-b border-[#35302C] print:border-black/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/work/${p.slug}`}
                      className="font-display font-bold text-base text-[#101010] hover:text-[#D5360C] transition-colors print:text-black"
                    >
                      {p.title}
                    </Link>
                    <span className="text-[11px] font-mono text-[#D5360C] font-bold print:text-black">
                      [{p.category}]
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#35302C] print:text-neutral-700">
                    {p.year}
                  </span>
                </div>

                <p className="text-xs text-[#35302C] font-sans leading-relaxed print:text-neutral-800">
                  {p.summary}
                </p>

                <div className="text-[11px] font-mono text-[#35302C] print:text-neutral-700">
                  <span className="text-[#101010] font-bold print:text-black">Technologies:</span>{' '}
                  {p.technologies.join(', ')}
                </div>
              </div>
            ))}
          </div>

          {/* Leadership & Activities */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs font-bold text-[#101010] uppercase tracking-wider print:text-black print:border-b print:border-black/20 print:pb-1">
              {'//'} 03. TECHNICAL LEADERSHIP &amp; INVOLVEMENT
            </h3>

            {experienceItems.map((exp) => (
              <div key={exp.id} className="flex flex-col gap-1 pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-display font-bold text-sm text-[#101010] print:text-black">
                    {exp.role} — {exp.organization}
                  </span>
                  <span className="font-mono text-xs text-[#35302C] print:text-neutral-700">
                    {exp.period}
                  </span>
                </div>
                <ul className="text-xs text-[#35302C] font-sans list-disc list-inside print:text-neutral-800">
                  {exp.responsibilities.slice(0, 2).map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technical Capabilities Matrix */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-xs font-bold text-[#101010] uppercase tracking-wider print:text-black print:border-b print:border-black/20 print:pb-1">
              {'//'} 04. TECHNICAL SKILLS &amp; TOOLING
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#35302C] print:text-neutral-800">
              {capabilityGroups.map((group) => (
                <div key={group.category} className="flex flex-col gap-1">
                  <strong className="text-[#101010] print:text-black font-bold">
                    {group.category}:
                  </strong>
                  <span className="text-[#35302C] print:text-neutral-700">
                    {group.items.map((it) => it.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
