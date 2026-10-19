export interface SocialLink {
  label: string;
  url: string;
  handle?: string;
  icon: 'github' | 'linkedin' | 'mail' | 'twitter' | 'external';
}

export interface NavigationItem {
  label: string;
  href: string;
  badge?: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  role: string;
  supportingStatement: string;
  bio: string;
  location: string;
  institution: string;
  degree: string;
  expectedGraduation: string;
  email: string;
  availabilityStatus: string;
  portraitImage?: string;
  technicalMaskImage?: string;
  socials: SocialLink[];
  navItems: NavigationItem[];
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
}
