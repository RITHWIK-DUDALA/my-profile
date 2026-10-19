import React from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import SectionLabel from '@/components/ui/SectionLabel';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedWorkPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="w-full bg-[#E6D5BD] text-[#101010] py-12 md:py-16 px-6 md:px-12 border-b border-[#35302C] transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#35302C]">
          <div className="flex flex-col gap-2">
            <SectionLabel number="02" label="FEATURED ENGINEERING" />
            <h2 className="headline-section text-[#101010]">
              SELECTED <span className="text-[#D5360C]">PROJECTS.</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#D5360C] hover:text-[#A92A0A] uppercase tracking-wider transition-colors"
          >
            <span>VIEW ALL PROJECTS ({projects.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D5360C]" />
          </Link>
        </div>

        {/* Text-based Editorial Project Rows in Light Cream Panels */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {featured.map((project, idx) => (
            <article
              key={project.slug}
              className="p-4 sm:p-5 bg-[#F2E9DC] border border-[#35302C] hover:border-[#D5360C] transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs group"
            >
              <div className="flex flex-col gap-2 max-w-3xl">
                <div className="flex items-center gap-2.5 font-mono text-xs text-[#35302C]">
                  <span className="font-bold text-[#101010]">0{idx + 1}</span>
                  <span className="text-[#35302C]">{'//'}</span>
                  <span className="uppercase tracking-wider text-[11px] text-[#101010] font-semibold">{project.category}</span>
                  <span className="text-[#35302C]">·</span>
                  <span className="text-[11px] text-[#35302C]">{project.year}</span>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-[#101010] group-hover:text-[#D5360C] transition-colors">
                  <Link href={`/work/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-[#35302C] font-sans leading-relaxed line-clamp-2">
                  {project.summary}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-[#E6D5BD] border border-[#35302C] text-[10px] font-mono text-[#101010] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#35302C]">
                {project.highlightStat && (
                  <div className="text-left md:text-right font-mono">
                    <span className="block text-xs sm:text-sm font-bold text-[#D5360C]">
                      {project.highlightStat.value}
                    </span>
                    <span className="text-[10px] text-[#35302C] font-semibold">
                      {project.highlightStat.label}
                    </span>
                  </div>
                )}

                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D5360C] hover:bg-[#A92A0A] text-[#F2E9DC] font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-xs ml-auto md:ml-0 border border-[#101010]"
                >
                  <span>CASE STUDY</span>
                  <ArrowUpRight className="w-3 h-3 text-[#F2E9DC]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
