'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

export default function WorkIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Autonomous Systems',
    'Robotics & Control',
    'Machine Learning',
    'Computer Vision',
    'Data Science',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full min-h-screen bg-[#E6D5BD] text-[#101010] pt-20 sm:pt-22 pb-12 px-6 md:px-10 lg:px-12 tech-grid-bg transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
        {/* Compact Editorial Header */}
        <div className="flex flex-col gap-3 pb-5 border-b border-[#35302C]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D5360C]"></span>
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#F2E9DC] bg-[#101010] px-2 py-0.5 border border-[#35302C]">
              01 // ENGINEERING PROTOTYPES &amp; SYSTEMS
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h1 className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-[#101010]">
                SELECTED <span className="text-[#D5360C]">WORK.</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#35302C] font-sans max-w-2xl mt-1 leading-relaxed">
                Autonomous vehicle perception, parallel cable robotics, and exact probabilistic graphical models with authentic technical trade-offs.
              </p>
            </div>

            {/* Compact Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-all border ${
                    selectedCategory === cat
                      ? 'bg-[#D5360C] text-[#F2E9DC] border-[#101010] font-bold shadow-xs'
                      : 'bg-[#F2E9DC] border-[#35302C] text-[#101010] hover:border-[#101010]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Entries: Compact Editorial Rows in Light Cream */}
        <div className="flex flex-col gap-3.5">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.slug}
              className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] hover:border-[#D5360C] transition-all duration-200 shadow-xs flex flex-col gap-3 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-[#35302C]">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-[#D5360C]">
                    0{idx + 1}
                  </span>
                  <span className="text-[#35302C]">/</span>
                  <span className="font-mono text-[11px] text-[#101010] font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-[#35302C]">/</span>
                  <span className="font-mono text-[11px] text-[#35302C]">{project.year}</span>
                </div>

                <span className="self-start sm:self-auto px-2 py-0.5 text-[10px] uppercase font-mono bg-[#E6D5BD] text-[#101010] border border-[#35302C] font-bold">
                  {project.status}
                </span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex flex-col gap-1 max-w-3xl">
                  <h2 className="font-display font-bold text-lg sm:text-xl text-[#101010] tracking-tight group-hover:text-[#D5360C] transition-colors">
                    <Link href={`/work/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#35302C] font-sans leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#101010] hover:bg-[#E6D5BD] border border-[#35302C] transition-colors"
                      aria-label="Source code repository"
                      title="Source code"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D5360C] hover:bg-[#A92A0A] text-[#F2E9DC] font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-xs border border-[#101010]"
                  >
                    <span>CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#F2E9DC]" />
                  </Link>
                </div>
              </div>

              {/* Compact Tech Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {project.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-[#E6D5BD] border border-[#35302C] text-[10px] font-mono text-[#101010] font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 6 && (
                  <span className="text-[10px] font-mono text-[#35302C] font-semibold">
                    +{project.technologies.length - 6} more
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
