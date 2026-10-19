'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/site';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-3.5 transition-colors duration-200 pointer-events-none bg-[#D5360C]/95 backdrop-blur-md border-b border-[#35302C] text-[#E6D5BD] shadow-xs"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between pointer-events-auto">
          {/* Brand Monogram & Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#101010]"
            aria-label={`${siteConfig.name} - Homepage`}
          >
            <div className="w-7 h-7 flex items-center justify-center bg-[#101010] text-[#F2E9DC] transition-colors duration-200 group-hover:bg-[#35302C]">
              <span className="font-display font-bold text-xs tracking-tight">
                R
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold tracking-tight text-[14px] sm:text-[15px] leading-tight text-[#F2E9DC] group-hover:text-[#FFFFFF] transition-colors">
                {siteConfig.name.toUpperCase()}
              </span>
              <span className="font-mono text-[9px] tracking-wider uppercase text-[#C7B69F]">
                AI &amp; ML ENGINEER
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-5 lg:gap-7 text-[13px] font-sans font-medium tracking-tight"
            aria-label="Main Navigation"
          >
            {siteConfig.navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative py-1 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#101010] ${
                    isActive
                      ? 'text-[#FFFFFF] font-bold'
                      : 'text-[#E6D5BD] hover:text-[#FFFFFF]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#101010] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F2E9DC] hover:bg-[#E6D5BD] text-[#101010] font-sans font-semibold text-xs tracking-tight transition-all duration-200 border border-[#101010] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#101010] shadow-sm"
            >
              <span>CONTACT</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#101010]" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F2E9DC] hover:text-[#101010] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#101010]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-40 bg-[#A92A0A]/98 backdrop-blur-xl md:hidden flex flex-col justify-between pt-24 pb-12 px-8 text-[#E6D5BD]"
        >
          <div className="flex flex-col gap-6 mt-4">
            <div className="text-[11px] font-mono text-[#F2E9DC] tracking-widest uppercase pb-2 border-b border-[#35302C]">
              NAVIGATION INDEX
            </div>
            {siteConfig.navItems.map((item, idx) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-display font-bold text-2xl uppercase tracking-tight transition-colors flex items-center justify-between ${
                    isActive ? 'text-[#101010]' : 'text-[#F2E9DC] hover:text-[#101010]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[#E6D5BD] font-normal">
                    0{idx + 1}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-[#35302C]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F2E9DC]">
              <span className="w-2 h-2 rounded-full bg-[#101010]"></span>
              <span>{siteConfig.availabilityStatus}</span>
            </div>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 bg-[#F2E9DC] hover:bg-[#E6D5BD] text-[#101010] font-mono font-bold text-center text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-[#101010] shadow-sm transition-colors"
            >
              <span>Initiate Contact</span>
              <ArrowUpRight className="w-4 h-4 text-[#101010]" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
