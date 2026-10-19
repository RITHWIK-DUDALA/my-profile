export type ProjectStatus = 'completed' | 'in-progress' | 'prototype' | 'concept';

export interface ArchitectureNode {
  title: string;
  description: string;
  tech: string;
  type: 'input' | 'processing' | 'model' | 'control' | 'output';
}

export interface ProjectMetric {
  label: string;
  value: string;
  context: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: 'Autonomous Systems' | 'Robotics & Control' | 'Machine Learning' | 'Computer Vision' | 'Data Science';
  summary: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  year: string;
  role: string;
  technologies: string[];
  coverColor?: string;
  highlightStat?: {
    value: string;
    label: string;
  };
  problem: {
    statement: string;
    context: string;
    constraints: string[];
  };
  approach: {
    overview: string;
    keyDecisions: {
      decision: string;
      rationale: string;
      tradeOff: string;
    }[];
  };
  architecture: {
    description: string;
    nodes: ArchitectureNode[];
    inputs: string[];
    outputs: string[];
  };
  implementation: {
    overview: string;
    codeHighlights?: {
      filename: string;
      language: string;
      description: string;
      code: string;
    }[];
  };
  evaluation: {
    methodology: string;
    observations: string[];
    honestLimitations: string[];
    futureRoadmap: string[];
  };
  repositoryUrl?: string;
  demoUrl?: string;
}
