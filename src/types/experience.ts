export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'Leadership' | 'Community' | 'Academic' | 'Hackathon';
  responsibilities: string[];
  keyOutcomes: string[];
  technologies?: string[];
  link?: string;
}

export interface CapabilityGroup {
  category: string;
  description: string;
  items: {
    name: string;
    level: 'Core Focus' | 'Proficient' | 'Active Exploration';
    context: string;
  }[];
}
