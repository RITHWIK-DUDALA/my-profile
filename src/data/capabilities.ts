export interface CapabilityItem {
  name: string;
  context: string;
  status: 'Core Focus' | 'Proficient' | 'Active Exploration';
}

export interface CapabilityGroup {
  id: string;
  category: string;
  overview: string;
  items: CapabilityItem[];
}

export const capabilitiesData: CapabilityGroup[] = [
  {
    id: 'ai-ml',
    category: 'AI and Machine Learning',
    overview:
      'Designing and training deep learning architectures, object detection pipelines, and probabilistic models grounded in mathematical optimization.',
    items: [
      {
        name: 'PyTorch & TorchScript',
        context: 'Convolutional neural networks, custom loss functions, autoencoders, and optimized TorchScript export for local edge inference.',
        status: 'Core Focus',
      },
      {
        name: 'YOLOv8 & Detection Pipelines',
        context: 'Bounding-box regression, dynamic anchor assignment, model fine-tuning, and real-time video frame inference (<42ms).',
        status: 'Core Focus',
      },
      {
        name: 'Probabilistic Graphical Models',
        context: 'Exact inference on discrete networks, factor multiplication, variable elimination, and message passing algorithms.',
        status: 'Core Focus',
      },
      {
        name: 'Conformal Prediction & Uncertainty',
        context: 'Non-conformity scoring, split conformal calibration sets, and empirical coverage guarantees under synthetic distribution shift.',
        status: 'Active Exploration',
      },
      {
        name: 'Classical Machine Learning',
        context: 'Support vector machines, random forests, clustering, cross-validation, and ROC/PR metric evaluation via scikit-learn.',
        status: 'Proficient',
      },
    ],
  },
  {
    id: 'data-science',
    category: 'Data Science',
    overview:
      'Rigorous exploratory data analysis, feature engineering, and state estimation algorithms bridging sensor measurement with mathematical modeling.',
    items: [
      {
        name: 'NumPy & SciPy Computing',
        context: 'Vectorized multi-dimensional tensor transformations, matrix decompositions, and numerical quadratic programming solvers.',
        status: 'Core Focus',
      },
      {
        name: 'Kalman & Covariance Filtering',
        context: 'Discrete state estimation, covariance propagation, innovation gating, and Hungarian algorithm for multi-object tracking.',
        status: 'Core Focus',
      },
      {
        name: 'Pandas & Tabular Wrangling',
        context: 'Sensor telemetry aggregation, missing value imputation, distribution profiling, and performance benchmark analysis.',
        status: 'Proficient',
      },
      {
        name: 'Statistical Hypothesis Testing',
        context: 'Confidence intervals, parametric & non-parametric evaluation, and empirical error distribution analysis.',
        status: 'Proficient',
      },
    ],
  },
  {
    id: 'programming',
    category: 'Programming',
    overview:
      'Writing type-safe, idiomatic, and maintainable software across systems programming, numerical analysis, and algorithmic implementations.',
    items: [
      {
        name: 'Python (3.10+)',
        context: 'Idiomatic OOP, type hinting, asynchronous tasks, memory profiling, and algorithm implementations without third-party bloat.',
        status: 'Core Focus',
      },
      {
        name: 'TypeScript & JavaScript (ESNext)',
        context: 'Strict type safety, reactive state architectures, interactive canvas visualizers, and performant web logic.',
        status: 'Core Focus',
      },
      {
        name: 'C++ Foundations',
        context: 'Standard template library, memory pointers, basic algorithmic simulation, and kinematics routines.',
        status: 'Proficient',
      },
      {
        name: 'SQL & Relational Schemas',
        context: 'Declarative queries, multi-table joins, indexing considerations, and transactional integrity.',
        status: 'Proficient',
      },
    ],
  },
  {
    id: 'software-engineering',
    category: 'Software Engineering',
    overview:
      'Architecting decoupled, modular software systems with explicit interfaces, unit test coverage, and clear separation of concerns.',
    items: [
      {
        name: 'Modular Architecture & Clean Design',
        context: 'Decoupling perceptual detectors from geometric path planners; deterministic intermediate contracts between pipeline nodes.',
        status: 'Core Focus',
      },
      {
        name: 'Modern Web Frontends (React / Next.js)',
        context: 'Server and client components, accessible semantic HTML, responsive editorial layouts, and sub-second page delivery.',
        status: 'Proficient',
      },
      {
        name: 'FastAPI & Microservices',
        context: 'High-throughput asynchronous REST endpoints, Pydantic data schemas, and clean model inference serving wrappers.',
        status: 'Proficient',
      },
      {
        name: 'Testing & Validation Frameworks',
        context: 'Pytest unit testing, assertion coverage for mathematical invariants, and synthetic test-case generation.',
        status: 'Proficient',
      },
    ],
  },
  {
    id: 'robotics-simulation',
    category: 'Robotics and Simulation',
    overview:
      'Formulating spatial kinematics, forward/inverse mechanics, and closed-loop control algorithms in physical and simulated environments.',
    items: [
      {
        name: 'Parallel Cable Kinematics',
        context: 'Formulation of structure matrices $A(X)$, forward kinematics iterative solvers, and tension boundary checks ($T_{min} \\le T_i \\le T_{max}$).',
        status: 'Core Focus',
      },
      {
        name: 'Convex Tension Optimization',
        context: 'Formulation of Quadratic Programming objectives $\\min \\frac{1}{2} T^T I T$ subject to static equilibrium $A(X) T + W_e = 0$.',
        status: 'Core Focus',
      },
      {
        name: 'Frenet Frame Trajectory Generation',
        context: 'Quintic polynomial curvature profiles in road-aligned coordinate frames with continuous lateral jerk bounds.',
        status: 'Core Focus',
      },
      {
        name: 'Control Theory (Stanley & PID)',
        context: 'Cross-track error minimization, yaw error compensation, and longitudinal velocity feedback controllers.',
        status: 'Proficient',
      },
      {
        name: 'Simulation Environments',
        context: 'Custom Canvas kinematics visualizers, 2D physics integration, and preliminary ROS 2 node architecture exploration.',
        status: 'Active Exploration',
      },
    ],
  },
  {
    id: 'tools-workflow',
    category: 'Tools and Engineering Workflow',
    overview:
      'Standardized development environments, version control hygiene, and command-line automation for reproducible engineering.',
    items: [
      {
        name: 'Git & GitHub Collaboration',
        context: 'Atomic semantic commits, structured feature branching, pull request code reviews, and issue triage.',
        status: 'Core Focus',
      },
      {
        name: 'Linux / POSIX Environments',
        context: 'Bash scripting, process isolation, remote SSH compute workflows, and environment orchestration.',
        status: 'Proficient',
      },
      {
        name: 'Mathematical Notebooks & Typst / LaTeX',
        context: 'Jupyter notebook prototyping, derivation documentation, and rigorous technical report typesetting.',
        status: 'Proficient',
      },
      {
        name: 'CI/CD & Automated Verification',
        context: 'GitHub Actions workflows for automated typechecking, linting, and build verification on push.',
        status: 'Proficient',
      },
    ],
  },
];
