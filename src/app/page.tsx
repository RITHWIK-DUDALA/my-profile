import React from 'react';
import HomeHero from '@/components/home/HomeHero';
import IntroPreview from '@/components/home/IntroPreview';
import FeaturedWorkPreview from '@/components/home/FeaturedWorkPreview';
import HomeResearchPreview from '@/components/home/HomeResearchPreview';
import HomeCapabilitiesPreview from '@/components/home/HomeCapabilitiesPreview';
import HomeAboutPreview from '@/components/home/HomeAboutPreview';
import ContactCTASection from '@/components/home/ContactCTASection';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Typography-Led Hero */}
      <HomeHero />

      {/* 2. Short Engineering Introduction */}
      <IntroPreview />

      {/* 3. Selected Projects Preview with text-based links */}
      <FeaturedWorkPreview />

      {/* 4. Research Preview */}
      <HomeResearchPreview />

      {/* 5. Capabilities Preview */}
      <HomeCapabilitiesPreview />

      {/* 6. Short About Preview */}
      <HomeAboutPreview />

      {/* 7. Contact CTA */}
      <ContactCTASection />
    </div>
  );
}
