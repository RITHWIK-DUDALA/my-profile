import React from 'react';

interface SectionLabelProps {
  number: string;
  label: string;
  light?: boolean;
}

export default function SectionLabel({ number, label, light = true }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-2.5 font-mono text-xs tracking-widest uppercase mb-3">
      <span className="px-1.5 py-0.5 font-bold border text-[#F2E9DC] bg-[#101010] border-[#35302C]">
        {'//'} {number}
      </span>
      <span className="text-[#101010] font-bold tracking-wider">
        {label}
      </span>
      <div className="h-px flex-1 max-w-[50px] bg-[#35302C]" />
    </div>
  );
}
