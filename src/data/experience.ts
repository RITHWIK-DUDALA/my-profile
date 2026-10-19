import { CapabilityGroup, ExperienceItem } from '@/types/experience';

export const capabilityGroups: CapabilityGroup[] = [
  {
    category: 'AI & Machine Learning',
    description: 'Statistical modeling, deep learning architectures, and inference algorithms.',
    items: [
      { name: 'PyTorch', level: 'Core Focus', context: 'Custom CNN/autoencoder training, loss functions, TorchScript export' },
      { name: 'YOLOv8 / Ultralytics', level: 'Core Focus', context: 'Object detection pipelines, fine-tuning, frame inference' },
      { name: 'Probabilistic Graphical Models', level: 'Core Focus', context: 'Bayesian networks, factor graphs, belief propagation' },
      { name: 'scikit-learn', level: 'Proficient', context: 'Supervised/unsupervised algorithms, evaluation metrics' },
      { name: 'Conformal Prediction', level: 'Active Exploration', context: 'Split conformal calibration, coverage guarantees under shift' },
      { name: 'TensorFlow / Keras', level: 'Proficient', context: 'Model architectures, transfer learning benchmarks' },
    ],
  },
  {
    category: 'Robotics & Control',
    description: 'Kinematics, trajectory generation, and simulation frameworks.',
    items: [
      { name: 'Analytical Kinematics', level: 'Core Focus', context: 'Inverse & forward kinematics, structure matrices, Jacobian formulation' },
      { name: 'Quadratic Programming (QP)', level: 'Core Focus', context: 'Constrained tension distribution, convex optimization via SciPy' },
      { name: 'Frenet Frame Planning', level: 'Proficient', context: 'Polynomial trajectory generation, speed profiling, obstacle costs' },
      { name: 'Stanley / PID Control', level: 'Proficient', context: 'Closed-loop lateral/longitudinal path tracking' },
      { name: 'ROS 2 Basics', level: 'Active Exploration', context: 'Nodes, topics, sensor message pipelines, URDF exploration' },
      { name: 'Physics Simulation', level: 'Proficient', context: '2D/3D dynamic simulation in Pygame and PyBullet environments' },
    ],
  },
  {
    category: 'Data Science & Math',
    description: 'Foundational mathematics and numerical computation.',
    items: [
      { name: 'Linear Algebra & Calculus', level: 'Core Focus', context: 'Eigendecomposition, matrix factorizations, multivariate gradients' },
      { name: 'NumPy & SciPy', level: 'Core Focus', context: 'Vectorized tensor operations, numerical optimization, scientific computing' },
      { name: 'Pandas', level: 'Proficient', context: 'Data cleaning, feature engineering, exploratory data analysis' },
      { name: 'Kalman Filtering', level: 'Proficient', context: 'State estimation, covariance propagation, Hungarian data association' },
      { name: 'OpenCV', level: 'Proficient', context: 'Homography, perspective warps, color spaces, contour analysis' },
    ],
  },
  {
    category: 'Software & Systems',
    description: 'Modern engineering workflows, web frontends, and backend tooling.',
    items: [
      { name: 'Python', level: 'Core Focus', context: 'Idiomatic object-oriented & functional code, typing, poetry/pip' },
      { name: 'TypeScript / JavaScript', level: 'Proficient', context: 'Type-safe interactive web interfaces, algorithmic visualizers' },
      { name: 'Next.js & React', level: 'Proficient', context: 'App router, component architecture, responsive UI design' },
      { name: 'Git & GitHub', level: 'Core Focus', context: 'Feature branch workflows, pull requests, semantic versioning' },
      { name: 'Linux / Bash', level: 'Proficient', context: 'Command-line development, SSH, remote compute management' },
      { name: 'Tailwind CSS', level: 'Proficient', context: 'Design tokens, responsive layouts, accessible typography' },
    ],
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    id: 'exp-01',
    role: 'Student Member & Technical Contributor',
    organization: 'IEEE Computer Society Student Branch',
    period: '2023 – Present',
    location: 'Amrita Vishwa Vidyapeetham, Chennai',
    type: 'Leadership',
    responsibilities: [
      'Collaborated in organizing technical seminars and coding workshops on machine learning fundamentals and data science for junior peers.',
      'Assisted in peer code reviews and shared implementations of foundational algorithms (regression, classification, neural nets).',
      'Coordinated technical logistics and speaker coordination for departmental symposia.',
    ],
    keyOutcomes: [
      'Facilitated practical Python & PyTorch introductory walkthroughs for 60+ undergraduate participants.',
      'Strengthened technical communication and ability to explain mathematical intuitions clearly.',
    ],
    technologies: ['Python', 'Technical Mentorship', 'Event Coordination'],
  },
  {
    id: 'exp-02',
    role: 'Hackathon Competitor & Project Builder',
    organization: 'University Technical Hackathons & Competitions',
    period: '2023 – 2024',
    location: 'Chennai & Regional Events',
    type: 'Hackathon',
    responsibilities: [
      'Designed and engineered rapid prototypes under 24–36 hour constraints.',
      'Led pipeline integration: connected sensor inputs/APIs with machine learning inference backends.',
      'Prepared architecture diagrams, problem pitches, and technical demonstrations for faculty and industry judges.',
    ],
    keyOutcomes: [
      'Built functional multi-modal prototypes bridging frontend visualization with Python machine learning scripts.',
      'Gained deep experience in rapid debugging, system decoupling, and delivering within time-critical windows.',
    ],
    technologies: ['FastAPI', 'PyTorch', 'React', 'Rapid Prototyping'],
  },
  {
    id: 'exp-03',
    role: 'Undergraduate AI & ML Engineering Student',
    organization: 'Amrita Vishwa Vidyapeetham',
    period: '2022 – 2026 (Expected)',
    location: 'Chennai, India',
    type: 'Academic',
    responsibilities: [
      'Rigorous coursework across Linear Algebra, Probability & Random Processes, Deep Learning, Data Structures & Algorithms, and Robotics.',
      'Active lab implementations exploring computer vision, reinforcement learning, and numerical optimization.',
      'Independent project exploration in autonomous driving pipelines and parallel cable manipulators.',
    ],
    keyOutcomes: [
      'Solid theoretical grounding coupled with an engineering habit of verifying every concept in code.',
    ],
    technologies: ['Machine Learning', 'Linear Algebra', 'Robotics', 'Systems Design'],
  },
];
