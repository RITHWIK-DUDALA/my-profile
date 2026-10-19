import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import ContactCTASection from '@/components/home/ContactCTASection';

export const metadata: Metadata = {
  title: 'Contact — Rithwik',
  description: `Contact ${siteConfig.name}, AI & ML Engineering student at ${siteConfig.institution}.`,
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#E6D5BD] text-[#101010] pt-16 sm:pt-18 flex flex-col justify-between tech-grid-bg transition-colors">
      <ContactCTASection isStandalone={true} />
    </div>
  );
}
