import { ResearchItem, ResearchInterest } from '@/types/research';

export const researchInterests: ResearchInterest[] = [
  {
    title: 'Model Uncertainty & Conformal Prediction',
    description:
      'Investigating distribution-free uncertainty quantification methods that guarantee coverage for deep neural network predictions in safety-critical robotics and perception settings.',
    openQuestions: [
      'How do conformal prediction sets behave under gradual domain shift in autonomous vehicle video streams?',
      'Can calibration metrics (ECE, NLL) reliably signal when an object detector should yield control to a safe stop planner?',
    ],
  },
  {
    title: 'Parallel Kinematics & Constrained Actuation',
    description:
      'Exploring geometric optimization, redundancy resolution, and real-time tension distribution algorithms for cable-driven parallel robots under non-linear actuator dynamics.',
    openQuestions: [
      'What is the optimal winch placement topology to maximize the wrench-closure volume for asymmetric planar tasks?',
      'How can dynamic cable elasticity be compensated for in closed-loop trajectory tracking?',
    ],
  },
  {
    title: 'Interpretable Hybrid Perception Pipelines',
    description:
      'Bridging modern statistical deep learning with classical projective geometry, Kalman filters, and physics-informed models to retain auditable failure modes in AI systems.',
    openQuestions: [
      'Can neural feature maps be directly constrained by epipolar geometry without losing representational capacity?',
      'How to quantify sensor degradation before it propagates into catastrophic path planning errors?',
    ],
  },
];

export const researchItems: ResearchItem[] = [
  {
    id: 'res-01',
    title: 'Evaluation of Conformal Prediction Sets under Autonomous Vehicle Vision Corruptions',
    area: 'Uncertainty Quantification & Vision',
    status: 'In Progress',
    year: '2025',
    abstract:
      'Evaluating split conformal prediction and temperature scaling on modern object detection backbones subjected to synthetic weather corruptions (fog, motion blur, rain drops). Measuring the trade-off between guaranteed empirical coverage and prediction set efficiency.',
    investigation:
      'Standard neural networks are notoriously overconfident on out-of-distribution inputs. We set up an experimental pipeline that applies conformal risk control to 2D bounding box coordinate bounds and class logits to observe whether prediction sets expand informatively before model accuracy collapses.',
    methodology: [
      'Split conformal calibration on in-distribution clear daylight driving sequences.',
      'Evaluation against 15 standardized ImageNet-C style corruption benchmarks applied to driving data.',
      'Comparison of marginal coverage rates vs. conditional slice coverage (e.g. small/distant objects).',
    ],
    findingsOrHypotheses: [
      'Hypothesis: Standard calibration metrics deteriorate faster on distant, small-scale objects than full-frame averages indicate.',
      'Initial Observation: Conformal set sizes explode predictably under severe fog, effectively acting as an automated out-of-distribution alert.',
    ],
    limitations: [
      'Work currently in progress; experiments limited to synthetic image augmentations rather than diverse real-world rain/sensor noise.',
      'Conformal guarantees assume exchangeability, which is violated in continuous time-series video frames.',
    ],
    tags: ['Conformal Prediction', 'Uncertainty', 'Computer Vision', 'YOLOv8'],
  },
  {
    id: 'res-02',
    title: 'Tension-Distribution Optimization in Redundantly Actuated Planar Cable Robots',
    area: 'Parallel Robotics & Optimization',
    status: 'Exploratory',
    year: '2024',
    abstract:
      'Investigating quadratic programming and $L_1$-regularized solvers for internal cable tension resolution in over-constrained planar cable-driven parallel manipulators to minimize energy consumption while avoiding slack cable singularities.',
    investigation:
      'Because cables can only pull, determining the 4-cable tension distribution for a 3-DOF planar platform is an under-determined problem with an infinite number of feasible tension vectors. We study how different objective functions impact actuator thermal strain and trajectory smoothness.',
    methodology: [
      'Formulation of minimum 2-norm $\\min \\sum T_i^2$ and variance-minimizing quadratic programming objectives.',
      'Simulation of continuous figure-8 trajectories across the wrench-closure workspace boundary.',
      'Stress testing with simulated external impulsive force disturbances.',
    ],
    findingsOrHypotheses: [
      'Quadratic programming provides significantly smoother tension transitions across workspace center than simple pseudo-inverse with offset.',
      'Near boundary edges, tension distribution is dominated by geometric ill-conditioning rather than objective selection.',
    ],
    limitations: [
      'Evaluated in simulation with idealized rigid cables; experimental hardware validation is pending winch prototype construction.',
    ],
    tags: ['Cable Robotics', 'Quadratic Programming', 'Kinematics', 'SciPy'],
  },
  {
    id: 'res-03',
    title: 'Comparative Analysis of Exact vs. Loopy Message Passing in Bayesian Sensor Networks',
    area: 'Probabilistic Graphical Models',
    status: 'Conceptual',
    year: '2024',
    abstract:
      'Analytical comparison of exact Variable Elimination against Loopy Belief Propagation on cyclic sensor topology graphs. Analyzing convergence rates and marginal error bounds under varying edge coupling strengths.',
    investigation:
      'Sensor networks with spatial correlations naturally form cyclic graphs where exact inference via junction trees becomes computationally intractable. This conceptual study explores error bounds when approximating marginal sensor health states with loopy message passing.',
    methodology: [
      'Implementation of junction tree exact baseline in TypeScript/Python.',
      'Evaluation of Bethe free energy approximations on synthetic grid topologies.',
    ],
    findingsOrHypotheses: [
      'Weakly coupled sensors converge reliably within 4 message passing iterations with <2% marginal discrepancy.',
    ],
    limitations: [
      'Theoretical exploration and small-scale benchmark; has not been deployed on physical sensor nodes.',
    ],
    tags: ['Probabilistic Inference', 'Belief Propagation', 'Sensor Fusion'],
  },
];
