import { SiteConfig } from '@/types/site';

export const siteConfig: SiteConfig = {
  name: 'D Rithwik Satya',
  shortName: 'Rithwik',
  role: 'AI & Machine Learning Engineer',
  supportingStatement:
    'Building intelligent systems, exploring complex ideas, and turning experiments into working technology.',
  bio: 'AI & Machine Learning Engineering student at Amrita Vishwa Vidyapeetham, Chennai. Passionate about mathematical modeling, deep learning architectures, robotics simulation, and end-to-end intelligent pipelines. Approaching software as an empirical craft—grounded in rigorous math, clean systems architecture, and observable real-world constraints.',
  location: 'Chennai, India',
  institution: 'Amrita Vishwa Vidyapeetham',
  degree: 'B.Tech in Artificial Intelligence and Machine Learning',
  expectedGraduation: '2026',
  email: 'rithwik.ml.eng@gmail.com', // Editable contact email placeholder
  availabilityStatus: 'Open for Research Collaborations & AI/ML Internships',
  socials: [
    {
      label: 'GitHub',
      url: 'https://github.com/rithwik-ai', // Configurable personal profile
      handle: 'rithwik-ai',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/rithwik-aiml', // Configurable profile
      handle: 'rithwik-aiml',
      icon: 'linkedin',
    },
    {
      label: 'Email',
      url: 'mailto:rithwik.ml.eng@gmail.com',
      handle: 'rithwik.ml.eng@gmail.com',
      icon: 'mail',
    },
  ],
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'Research', href: '/research' },
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'About', href: '/about' },
    { label: 'Résumé', href: '/resume' },
  ],
  stats: [
    {
      value: '3 Core',
      label: 'Modular Architectures',
      description: 'End-to-end engineering pipelines with complete mathematical foundations.',
    },
    {
      value: 'B.Tech',
      label: 'AI & ML Major',
      description: 'Amrita Vishwa Vidyapeetham with strong focus on systems & algorithms.',
    },
    {
      value: 'Sim & Code',
      label: 'Empirical Verification',
      description: 'Bridging theoretical models with closed-loop simulations.',
    },
  ],
};
