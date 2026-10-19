import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import AutonomousPipelineVisualizer from '@/components/visuals/AutonomousPipelineVisualizer';
import CableRobotVisualizer from '@/components/visuals/CableRobotVisualizer';
import ProbabilisticGraphVisualizer from '@/components/visuals/ProbabilisticGraphVisualizer';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Calendar,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="w-full min-h-screen bg-[#E6D5BD] text-[#101010] pt-20 sm:pt-22 pb-12 px-4 sm:px-6 md:px-10 tech-grid-bg transition-colors">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between font-mono text-xs text-[#101010] border-b border-[#35302C] pb-3">
          <Link
            href="/work"
            className="flex items-center gap-1.5 text-[#D5360C] hover:text-[#A92A0A] transition-colors font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#D5360C]" />
            <span>RETURN TO WORK INDEX</span>
          </Link>
          <span className="uppercase text-[#F2E9DC] bg-[#101010] px-2 py-0.5 border border-[#35302C] font-bold text-[11px]">
            {project.category}
          </span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-[#35302C]">
            <span className="px-2 py-0.5 bg-[#F2E9DC] border border-[#35302C] text-[#101010] uppercase font-bold text-[11px]">
              STATUS: {project.status}
            </span>
            <span className="text-[#35302C]">{'//'}</span>
            <span className="flex items-center gap-1 text-[11px] text-[#35302C]">
              <Calendar className="w-3 h-3 text-[#D5360C]" />
              {project.year}
            </span>
            <span className="text-[#35302C]">{'//'}</span>
            <span className="text-[11px] text-[#35302C]">ROLE: {project.role}</span>
          </div>

          <h1 className="font-display font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl text-[#101010]">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base text-[#35302C] font-sans leading-relaxed max-w-3xl">
            {project.tagline}
          </p>

          {/* Links & Repository Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#F2E9DC] border border-[#35302C] text-xs font-mono text-[#101010] hover:bg-[#E6D5BD] hover:border-[#101010] transition-colors flex items-center gap-1.5 shadow-xs font-semibold"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#101010]" />
                <span>Source Repository</span>
                <ArrowUpRight className="w-3 h-3 text-[#101010]" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                className="px-4 py-2 bg-[#D5360C] hover:bg-[#A92A0A] text-[#F2E9DC] font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs border border-[#101010]"
              >
                <span>Live Interactive Demo</span>
                <ArrowUpRight className="w-3 h-3 text-[#F2E9DC]" />
              </a>
            )}
          </div>
        </div>

        {/* Embedded Interactive Lab / Visualizer */}
        <div className="w-full">
          {project.slug === 'autonomous-driving-engine' && <AutonomousPipelineVisualizer />}
          {project.slug === 'cable-driven-parallel-robot' && <CableRobotVisualizer />}
          {project.slug === 'probabilistic-models-visualizer' && <ProbabilisticGraphVisualizer />}
          {project.slug !== 'autonomous-driving-engine' &&
            project.slug !== 'cable-driven-parallel-robot' &&
            project.slug !== 'probabilistic-models-visualizer' && (
              <div className="p-8 bg-[#F2E9DC] border border-[#35302C] flex flex-col gap-4 shadow-sm text-[#101010]">
                <span className="font-mono text-xs text-[#D5360C] uppercase font-bold">
                  ARCHITECTURAL TOPOLOGY SCHEMATIC
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {project.architecture.nodes.map((node, i) => (
                    <div key={i} className="p-4 bg-[#E6D5BD] border border-[#35302C] flex flex-col gap-2 shadow-xs">
                      <span className="font-mono text-[10px] text-[#35302C] uppercase font-semibold">
                        Stage 0{i + 1} {'//'} {node.type}
                      </span>
                      <h4 className="font-display font-bold text-[#101010] text-sm">
                        {node.title}
                      </h4>
                      <p className="text-xs text-[#35302C] font-sans">
                        {node.description}
                      </p>
                      <span className="mt-auto pt-2 font-mono text-[10px] text-[#D5360C] font-bold">
                        {node.tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* 1. Problem & Context */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 pt-6 border-t border-[#35302C]">
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-[#F2E9DC] bg-[#101010] px-2 py-0.5 border border-[#35302C] uppercase tracking-widest font-bold">
              {'//'} 01. PROBLEM &amp; CONSTRAINTS
            </span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-4 font-sans text-[#35302C] leading-relaxed text-xs sm:text-sm">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#101010]">
              The Engineering Problem
            </h3>
            <p className="text-[#101010]">{project.problem.statement}</p>
            <p className="text-[#35302C]">{project.problem.context}</p>

            <div className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] flex flex-col gap-2.5 mt-1 shadow-xs text-[#101010]">
              <span className="font-mono text-xs text-[#D5360C] uppercase tracking-wider font-bold">
                SYSTEM CONSTRAINTS &amp; REQUIREMENTS
              </span>
              <ul className="flex flex-col gap-1.5 font-mono text-xs text-[#35302C] list-disc list-inside">
                {project.problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 2. System Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 pt-6 border-t border-[#35302C]">
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-[#F2E9DC] bg-[#101010] px-2 py-0.5 border border-[#35302C] uppercase tracking-widest font-bold">
              {'//'} 02. SYSTEM ARCHITECTURE
            </span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-4 font-sans text-[#35302C] leading-relaxed text-xs sm:text-sm">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#101010]">
              Pipeline Topology &amp; Data Contracts
            </h3>
            <p className="text-[#35302C]">{project.architecture.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 sm:p-4 bg-[#F2E9DC] border border-[#35302C] font-mono text-xs shadow-xs text-[#101010]">
                <span className="text-[#D5360C] font-bold block mb-1.5">SYSTEM INPUTS:</span>
                <ul className="flex flex-col gap-1 text-[#35302C]">
                  {project.architecture.inputs.map((inp, i) => (
                    <li key={i}>&bull; {inp}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3.5 sm:p-4 bg-[#F2E9DC] border border-[#35302C] font-mono text-xs shadow-xs text-[#101010]">
                <span className="text-[#101010] font-bold block mb-1.5">SYSTEM OUTPUTS:</span>
                <ul className="flex flex-col gap-1 text-[#35302C]">
                  {project.architecture.outputs.map((out, i) => (
                    <li key={i}>&bull; {out}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Methodology & Key Decisions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 pt-6 border-t border-[#35302C]">
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-[#F2E9DC] bg-[#101010] px-2 py-0.5 border border-[#35302C] uppercase tracking-widest font-bold">
              {'//'} 03. METHODOLOGY &amp; TRADE-OFFS
            </span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-4 font-sans text-[#35302C] leading-relaxed text-xs sm:text-sm">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#101010]">
              Engineering Approach &amp; Justification
            </h3>
            <p className="text-[#35302C]">{project.approach.overview}</p>

            <div className="flex flex-col gap-3 mt-1">
              {project.approach.keyDecisions.map((decision, i) => (
                <div
                  key={i}
                  className="p-3.5 sm:p-4 bg-[#F2E9DC] border border-[#35302C] flex flex-col gap-1.5 shadow-xs text-[#101010]"
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#101010]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D5360C]" />
                    <span>DECISION: {decision.decision}</span>
                  </div>
                  <p className="text-xs text-[#101010] font-sans">
                    <strong>Rationale:</strong> {decision.rationale}
                  </p>
                  <p className="text-[11px] text-[#35302C] font-mono">
                    <strong>Trade-off Accepted:</strong> {decision.tradeOff}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Implementation Code Highlight */}
        {project.implementation.codeHighlights && project.implementation.codeHighlights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 pt-6 border-t border-[#35302C]">
            <div className="md:col-span-4">
              <span className="font-mono text-xs text-[#F2E9DC] bg-[#101010] px-2 py-0.5 border border-[#35302C] uppercase tracking-widest font-bold">
                {'//'} 04. CORE ALGORITHM
              </span>
            </div>
            <div className="md:col-span-8 flex flex-col gap-4">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#101010]">
                Algorithm Implementation Snippet
              </h3>
              <p className="font-sans text-[#35302C] text-xs sm:text-sm">
                {project.implementation.overview}
              </p>

              {project.implementation.codeHighlights.map((snippet, i) => (
                <div
                  key={i}
                  className="border border-[#35302C] bg-[#101010] overflow-hidden shadow-xs"
                >
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#1C1C1C] border-b border-[#35302C] font-mono text-xs text-[#E6D5BD]">
                    <span className="flex items-center gap-1.5 text-[#F2E9DC] font-bold">
                      <Code2 className="w-3.5 h-3.5 text-[#D5360C]" />
                      {snippet.filename}
                    </span>
                    <span className="uppercase text-[10px] text-[#C7B69F]">{snippet.language}</span>
                  </div>
                  <pre className="p-3.5 text-xs font-mono text-[#F2E9DC] overflow-x-auto leading-relaxed">
                    <code>{snippet.code}</code>
                  </pre>
                  <div className="px-3.5 py-1.5 bg-[#1C1C1C] border-t border-[#35302C] text-[11px] font-mono text-[#C7B69F]">
                    {snippet.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Evaluation, Observations & Honest Limitations */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 pt-6 border-t border-[#35302C]">
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-[#F2E9DC] bg-[#101010] px-2 py-0.5 border border-[#35302C] uppercase tracking-widest font-bold">
              {'//'} 05. EVALUATION &amp; LIMITS
            </span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-4 font-sans leading-relaxed text-xs sm:text-sm">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#101010]">
              Empirical Observations &amp; Reality Check
            </h3>
            <p className="text-[#35302C]">{project.evaluation.methodology}</p>

            {/* Observations */}
            <div className="p-3.5 sm:p-4 bg-[#F2E9DC] border border-[#35302C] flex flex-col gap-1.5 shadow-xs text-[#101010]">
              <span className="font-mono text-xs text-[#D5360C] font-bold">
                VERIFIED EMPIRICAL OBSERVATIONS
              </span>
              <ul className="flex flex-col gap-1 text-xs text-[#35302C] font-sans list-disc list-inside">
                {project.evaluation.observations.map((obs, i) => (
                  <li key={i}>{obs}</li>
                ))}
              </ul>
            </div>

            {/* Honest Limitations */}
            <div className="p-3.5 sm:p-4 bg-[#F2E9DC] border border-[#35302C] flex flex-col gap-1.5 text-[#101010]">
              <span className="font-mono text-xs text-[#D5360C] font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#D5360C]" />
                <span>EXPLICIT FAILURE MODES &amp; SYSTEM LIMITATIONS</span>
              </span>
              <ul className="flex flex-col gap-1 text-xs text-[#35302C] font-sans list-disc list-inside">
                {project.evaluation.honestLimitations.map((lim, i) => (
                  <li key={i}>{lim}</li>
                ))}
              </ul>
            </div>

            {/* Future Roadmap */}
            <div className="p-3.5 sm:p-4 bg-[#F2E9DC] border border-[#35302C] flex flex-col gap-1.5 shadow-xs text-[#101010]">
              <span className="font-mono text-xs text-[#101010] font-bold">
                Planned Future Improvements:
              </span>
              <ul className="flex flex-col gap-1 text-xs text-[#35302C] font-sans list-disc list-inside">
                {project.evaluation.futureRoadmap.map((road, i) => (
                  <li key={i}>{road}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Projects Navigation */}
        <div className="pt-8 border-t border-[#35302C] flex flex-col gap-4">
          <div className="font-mono text-xs text-[#101010] uppercase font-bold">
            RELATED ENGINEERING WORKS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.slug}
                href={`/work/${rel.slug}`}
                className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] hover:border-[#D5360C] transition-colors flex flex-col justify-between group shadow-xs text-[#101010]"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-[#35302C] uppercase font-semibold">
                    {rel.category}
                  </span>
                  <h4 className="font-display font-bold text-base sm:text-lg text-[#101010] group-hover:text-[#D5360C] transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#35302C] font-sans mt-0.5 line-clamp-2">
                    {rel.summary}
                  </p>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs text-[#D5360C] mt-3 font-bold">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
