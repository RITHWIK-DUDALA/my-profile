import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About — Rithwik',
  description: `Background and engineering philosophy of ${siteConfig.name}, AI & ML Engineering student at ${siteConfig.institution}.`,
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-[#E6D5BD] text-[#101010] pt-20 sm:pt-22 pb-12 px-6 md:px-10 lg:px-12 tech-grid-bg transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
        {/* Compact Editorial Header */}
        <div className="flex flex-col gap-2.5 pb-4 border-b border-[#35302C]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D5360C]"></span>
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#F2E9DC] bg-[#101010] px-2 py-0.5 border border-[#35302C]">
              05 // BACKGROUND &amp; PHILOSOPHY
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <h1 className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-[#101010]">
              ABOUT <span className="text-[#D5360C]">{siteConfig.name.toUpperCase()}.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#35302C] font-sans max-w-md sm:text-right leading-relaxed">
              {siteConfig.role} exploring mathematical foundations of autonomous systems in {siteConfig.location}.
            </p>
          </div>
        </div>

        {/* Narrative Biography & Structured Cards in Light Cream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Theoretical Grounding & Engineering Principles */}
          <div className="lg:col-span-7 flex flex-col gap-4 text-[#101010] font-sans leading-relaxed text-xs sm:text-[13px]">
            <div className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] shadow-xs flex flex-col gap-2.5">
              <h2 className="font-display font-bold text-lg text-[#101010] tracking-tight">
                First Principles &amp; Physical Mechanics
              </h2>
              <p className="text-[#35302C]">
                My engineering path is rooted in understanding why algorithms work before writing code. At{' '}
                <strong className="text-[#101010] font-bold">{siteConfig.institution}</strong> in Chennai, I study Artificial Intelligence and Machine Learning Engineering—bridging linear algebra, multivariate calculus, and probability theory with practical computing systems.
              </p>
              <p className="text-[#35302C]">
                I view intelligent software through control systems: every perception model has noise, every sensor projection has distortion, and dynamic agents must obey physical laws. Rather than chasing fleeting leaderboard increments on static datasets, I focus on closed-loop systems that remain robust when assumptions break.
              </p>
            </div>

            {/* Approach to Problem Solving: 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-[#F2E9DC] border border-[#35302C] shadow-xs flex flex-col gap-1">
                <span className="font-mono text-[10px] text-[#D5360C] font-bold">01 // DECOUPLING</span>
                <span className="text-xs font-bold text-[#101010]">Modular Decoupling</span>
                <p className="text-[11px] text-[#35302C] font-sans">
                  Splitting pipelines into deterministic stages with observable data contracts.
                </p>
              </div>

              <div className="p-3.5 bg-[#F2E9DC] border border-[#35302C] shadow-xs flex flex-col gap-1">
                <span className="font-mono text-[10px] text-[#D5360C] font-bold">02 // EMPIRICISM</span>
                <span className="text-xs font-bold text-[#101010]">Simulation First</span>
                <p className="text-[11px] text-[#35302C] font-sans">
                  Testing tracking errors, singularity boundaries, and edge cases in simulation.
                </p>
              </div>

              <div className="p-3.5 bg-[#F2E9DC] border border-[#35302C] shadow-xs flex flex-col gap-1">
                <span className="font-mono text-[10px] text-[#D5360C] font-bold">03 // UNCERTAINTY</span>
                <span className="text-xs font-bold text-[#101010]">Honest Calibration</span>
                <p className="text-[11px] text-[#35302C] font-sans">
                  Quantifying when a model is OOD using conformal prediction and covariance gating.
                </p>
              </div>

              <div className="p-3.5 bg-[#F2E9DC] border border-[#35302C] shadow-xs flex flex-col gap-1">
                <span className="font-mono text-[10px] text-[#D5360C] font-bold">04 // TRANSPARENCY</span>
                <span className="text-xs font-bold text-[#101010]">Documenting Limits</span>
                <p className="text-[11px] text-[#35302C] font-sans">
                  Publishing failure modes, flat-ground homography limits, and physical assumptions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Details & Lab Agenda */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] shadow-xs flex flex-col gap-3 text-[#101010]">
              <span className="font-mono text-[11px] text-[#D5360C] uppercase font-bold tracking-wider">
                ACADEMIC PROFILE
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-display font-bold text-base text-[#101010]">
                  {siteConfig.institution}
                </span>
                <span className="text-xs font-mono text-[#D5360C] font-bold">
                  {siteConfig.degree}
                </span>
                <span className="text-[11px] font-mono text-[#35302C]">
                  Class of {siteConfig.expectedGraduation} · Chennai, India
                </span>
              </div>

              <div className="pt-2 border-t border-[#35302C] flex flex-col gap-1 font-mono text-[11px]">
                <span className="text-[#101010] font-bold text-xs">Core Focus Areas:</span>
                <span className="text-[#35302C]">&bull; Deep Learning &amp; Computer Vision</span>
                <span className="text-[#35302C]">&bull; Parallel Cable Robotics &amp; Kinematics</span>
                <span className="text-[#35302C]">&bull; Probabilistic Graphical Models</span>
                <span className="text-[#35302C]">&bull; Numerical Optimization (QP solvers)</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] shadow-xs flex flex-col gap-2.5 text-[#101010]">
              <span className="font-mono text-[11px] text-[#D5360C] uppercase font-bold tracking-wider">
                ACTIVE LAB AGENDA &amp; COMMUNITY
              </span>
              <div className="flex flex-col gap-2 font-sans text-xs text-[#35302C]">
                <div>
                  <strong className="text-[#101010] block font-mono text-[11px] mb-0.5">
                    1. Cable Robot Hardware Prototype:
                  </strong>
                  Designing a physical 4-winch frame with load cells to evaluate real-world cable friction.
                </div>
                <div>
                  <strong className="text-[#101010] block font-mono text-[11px] mb-0.5">
                    2. IEEE Computer Society Student Branch:
                  </strong>
                  Organizing departmental workshops and mentoring peers in systems and machine learning.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Action Row */}
        <div className="pt-3 border-t border-[#35302C] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
          <Link
            href="/resume"
            className="inline-flex items-center gap-1.5 text-[#D5360C] hover:text-[#A92A0A] transition-colors font-bold"
          >
            <span>VIEW COMPLETE RÉSUMÉ &amp; COURSEWORK</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D5360C]" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-[#D5360C] hover:text-[#A92A0A] transition-colors text-[11px] font-semibold"
          >
            <span>Initiate Collaboration &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
