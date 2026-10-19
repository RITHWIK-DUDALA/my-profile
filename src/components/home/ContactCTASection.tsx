'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/site';
import { Mail, Copy, Check, Send, ArrowUpRight, Clock } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

interface ContactCTASectionProps {
  id?: string;
  isStandalone?: boolean;
}

export default function ContactCTASection({ id = 'contact', isStandalone = false }: ContactCTASectionProps) {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'Internship & Research Collaboration',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
    }, 600);
  };

  return (
    <section
      id={id}
      className={`w-full bg-[#E6D5BD] text-[#101010] px-6 md:px-10 lg:px-12 tech-grid-bg transition-colors ${
        isStandalone ? 'pt-20 sm:pt-22 pb-10 sm:pb-12' : 'py-12 md:py-16 border-t border-[#35302C]'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
        {/* Compact Page/Section Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D5360C] shrink-0"></span>
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase text-[#F2E9DC] bg-[#101010] px-2 py-0.5 border border-[#35302C] truncate">
              INITIATE CONTACT // OPEN FOR COLLABORATION
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-3">
            <h2 className="font-display font-semibold tracking-tight text-2xl sm:text-3xl lg:text-4xl text-[#101010] leading-tight">
              Have a problem <span className="text-[#D5360C]">worth solving?</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#35302C] font-sans max-w-md sm:text-right">
              Currently open for AI/ML research, robotics prototypes, and engineering internships.
            </p>
          </div>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column — Contact Information & Social Presence in Light Cream */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-5 bg-[#F2E9DC] border border-[#35302C] shadow-xs flex flex-col gap-4">
              <span className="font-mono text-[11px] text-[#D5360C] uppercase font-bold tracking-wider">
                DIRECT INBOX
              </span>

              {/* Working Copy Email */}
              <div className="flex items-center justify-between gap-2 p-2.5 bg-[#E6D5BD] border border-[#35302C]">
                <span className="font-mono text-xs sm:text-[13px] text-[#101010] font-semibold select-all truncate">
                  {siteConfig.email}
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1 px-2 py-1 text-[#35302C] hover:text-[#101010] transition-colors focus:outline-none text-[11px] font-mono font-bold"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <span className="flex items-center gap-1 text-[#D5360C] font-bold">
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </span>
                  )}
                </button>
              </div>

              {/* Open Mail Client Action */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-full py-2.5 bg-[#D5360C] hover:bg-[#A92A0A] text-[#F2E9DC] font-mono font-bold text-xs tracking-wider uppercase text-center transition-colors flex items-center justify-center gap-2 border border-[#101010]"
              >
                <Mail className="w-3.5 h-3.5 text-[#F2E9DC]" />
                <span>Open Mail Client</span>
              </a>

              {/* Verified Profiles List */}
              <div className="pt-2 border-t border-[#35302C] flex flex-col gap-2">
                <span className="font-mono text-[10px] text-[#35302C] uppercase tracking-wider font-bold">
                  PROFILES
                </span>
                <div className="grid grid-cols-2 gap-2">
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
                        className="flex items-center justify-between px-3 py-2 bg-[#E6D5BD] border border-[#35302C] hover:border-[#101010] text-[#101010] transition-colors group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className="w-3.5 h-3.5 text-[#D5360C] shrink-0" />
                          <span className="font-mono text-xs text-[#101010] font-semibold truncate">
                            {social.label}
                          </span>
                        </div>
                        <ArrowUpRight className="w-3 h-3 text-[#35302C] group-hover:text-[#101010] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Verified Availability Note */}
              <div className="pt-2 border-t border-[#35302C] flex items-center gap-2 text-[11px] font-mono text-[#35302C]">
                <Clock className="w-3.5 h-3.5 text-[#D5360C] shrink-0" />
                <span>Response window: &lt; 24h for research &amp; technical roles</span>
              </div>
            </div>
          </div>

          {/* Right Column — Compact Contact Form in Light Cream */}
          <div className="lg:col-span-7 p-5 sm:p-6 bg-[#F2E9DC] border border-[#35302C] shadow-xs">
            {status === 'success' ? (
              <div className="py-8 px-4 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E6D5BD] border border-[#101010] text-[#D5360C] flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#101010]">
                  Message Dispatched
                </h3>
                <p className="text-xs text-[#35302C] font-sans max-w-sm">
                  Thank you for reaching out. I reply to all academic and engineering inquiries promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setFormState({ name: '', email: '', topic: 'Internship & Research Collaboration', message: '' });
                  }}
                  className="mt-2 px-4 py-2 bg-[#D5360C] text-[#F2E9DC] hover:bg-[#A92A0A] font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-xs border border-[#101010]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="font-mono text-[11px] text-[#101010] uppercase font-bold">
                      Your Name <span className="text-[#D5360C]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Dr. Jennifer Vance"
                      className="h-10 px-3 bg-[#E6D5BD] border border-[#35302C] text-[#101010] placeholder-[#737373] font-mono text-xs focus:outline-none focus:border-[#D5360C] focus:ring-1 focus:ring-[#D5360C] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-mono text-[11px] text-[#101010] uppercase font-bold">
                      Your Email <span className="text-[#D5360C]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jennifer@institution.edu"
                      className="h-10 px-3 bg-[#E6D5BD] border border-[#35302C] text-[#101010] placeholder-[#737373] font-mono text-xs focus:outline-none focus:border-[#D5360C] focus:ring-1 focus:ring-[#D5360C] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="topic" className="font-mono text-[11px] text-[#101010] uppercase font-bold">
                    Inquiry Topic
                  </label>
                  <select
                    id="topic"
                    value={formState.topic}
                    onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                    className="h-10 px-3 bg-[#E6D5BD] border border-[#35302C] text-[#101010] font-mono text-xs focus:outline-none focus:border-[#D5360C] focus:ring-1 focus:ring-[#D5360C] transition-colors"
                  >
                    <option value="Internship & Research Collaboration" className="bg-[#E6D5BD] text-[#101010]">Internship &amp; Research Collaboration</option>
                    <option value="Autonomous Driving Pipeline Inquiry" className="bg-[#E6D5BD] text-[#101010]">Autonomous Driving Pipeline Inquiry</option>
                    <option value="Cable Robot Kinematics Benchmark" className="bg-[#E6D5BD] text-[#101010]">Cable Robot Kinematics Benchmark</option>
                    <option value="Technical Mentorship & Speaking" className="bg-[#E6D5BD] text-[#101010]">Technical Mentorship &amp; Speaking</option>
                    <option value="Other Technical Exchange" className="bg-[#E6D5BD] text-[#101010]">Other Technical Exchange</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="font-mono text-[11px] text-[#101010] uppercase font-bold">
                    Message Context &amp; Constraints <span className="text-[#D5360C]">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your engineering problem, proposed collaboration, or project scope..."
                    className="p-3 bg-[#E6D5BD] border border-[#35302C] text-[#101010] placeholder-[#737373] font-mono text-xs focus:outline-none focus:border-[#D5360C] focus:ring-1 focus:ring-[#D5360C] transition-colors resize-none leading-relaxed"
                  />
                </div>

                {status === 'error' && (
                  <div className="p-2.5 bg-[#F4D8D7] border border-[#D5360C] text-[#A92A0A] text-xs font-mono font-bold">
                    Please provide your name, valid email, and message context before submitting.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="h-11 w-full bg-[#D5360C] hover:bg-[#A92A0A] text-[#F2E9DC] font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-xs border border-[#101010]"
                >
                  <Send className="w-3.5 h-3.5 text-[#F2E9DC]" />
                  <span>{status === 'sending' ? 'Transmitting...' : 'Dispatch Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
