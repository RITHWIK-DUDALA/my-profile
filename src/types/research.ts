export type ResearchStatus = 'Published' | 'Submitted' | 'In Progress' | 'Exploratory' | 'Conceptual';

export interface ResearchItem {
  id: string;
  title: string;
  area: string;
  status: ResearchStatus;
  year: string;
  abstract: string;
  investigation: string;
  methodology: string[];
  findingsOrHypotheses: string[];
  limitations: string[];
  tags: string[];
  paperLink?: string;
  codeLink?: string;
}

export interface ResearchInterest {
  title: string;
  description: string;
  openQuestions: string[];
}
