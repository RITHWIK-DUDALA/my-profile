'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export default function SiteFooter() {
  const currentYear = 2026;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#A92A0A] border-t border-[#35302C] text-[#E6D5BD] py-8 sm:py-10 px-6 md:px-10 lg:px-12 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#35302C]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="font-display font-semibold text-base text-[#F2E9DC] tracking-tight">
              {siteConfig.name}
            </span>
            <span className="hidden sm:inline text-[#35302C]">/</span>
            <span className="text-xs font-mono text-[#101010] bg-[#E6D5BD] px-2 py-0.5 font-bold border border-[#35302C]">
              {siteConfig.role}
            </span>
            <span className="hidden sm:inline text-[#35302C]">/</span>
            <span className="text-xs font-mono text-[#F2E9DC]">
              {siteConfig.institution}
            </span>
          </div>

          {/* Nav & Social Quick Links */}
          <div className="flex flex-wrap items-center gap-3">
            {siteConfig.socials.map((social) => {
              const Icon =
                social.icon === 'github'
                  ? GithubIcon
                  : social.icon === 'linkedin'
                  ? LinkedinIcon
                  : Mail;

              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E6D5BD] border border-[#35302C] hover:bg-[#F2E9DC] hover:border-[#101010] text-[11px] font-mono text-[#101010] font-semibold transition-all duration-200 shadow-2xs"
                >
                  <Icon className="w-3 h-3 text-[#101010]" />
                  <span>{social.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Sub-row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-[#E6D5BD]">
          <div className="flex items-center gap-2">
            <span>© {currentYear} {siteConfig.name}. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans">
            <Link href="/work" className="hover:text-[#FFFFFF] transition-colors">
              Work
            </Link>
            <Link href="/research" className="hover:text-[#FFFFFF] transition-colors">
              Research
            </Link>
            <Link href="/capabilities" className="hover:text-[#FFFFFF] transition-colors">
              Capabilities
            </Link>
            <Link href="/about" className="hover:text-[#FFFFFF] transition-colors">
              About
            </Link>
            <Link href="/resume" className="hover:text-[#FFFFFF] transition-colors">
              Résumé
            </Link>
            <Link href="/contact" className="hover:text-[#FFFFFF] transition-colors">
              Contact
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#E6D5BD] hover:text-[#FFFFFF] transition-colors focus:outline-none ml-2"
              aria-label="Return to top of page"
            >
              <span className="font-mono text-[10px] text-[#101010] font-bold bg-[#E6D5BD] px-1 py-0.5">TOP</span>
              <ArrowUp className="w-3 h-3 text-[#F2E9DC]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
