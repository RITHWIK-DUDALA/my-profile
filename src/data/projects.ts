import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'autonomous-driving-engine',
    title: 'Autonomous Driving Engine',
    tagline: 'Modular perception, ground projection, tracking, and trajectory planning in simulation',
    category: 'Autonomous Systems',
    summary:
      'A modular perception-to-control autonomous driving stack implemented in Python with closed-loop simulator integration. Splits end-to-end driving into deterministic, auditable components: YOLOv8 perception, homography-based ground plane mapping, Kalman tracking, and Frenet-frame local path planning.',
    status: 'prototype',
    featured: true,
    order: 1,
    year: '2024–2025',
    role: 'Algorithm & Pipeline Developer',
    technologies: [
      'Python',
      'YOLOv8',
      'OpenCV',
      'Kalman Filter',
      'NumPy',
      'Pygame / CARLA Bridge',
      'SciPy',
    ],
    coverColor: '#D5360C',
    highlightStat: {
      value: '< 42ms',
      label: 'End-to-End Pipeline Latency per Frame',
    },
    problem: {
      statement:
        'Monolithic black-box neural networks for autonomous navigation cannot guarantee safety constraints or explain sudden failure modes in edge cases. A modular architecture provides verifiable intermediate states at every stage.',
      context:
        'Developed as an exploratory engineering project to study the interaction between deep learning object detectors and classical geometric path planning algorithms under camera noise and dynamic obstacles.',
      constraints:
        [
          'Strict real-time budget (target <50ms frame time on mid-tier GPU).',
          'Monocular camera input requiring homography assumption for ground-plane distance estimation.',
          'Safe handling of occluded dynamic vehicles without sudden steering oscillation.',
          'Zero ground-truth simulator shortcuts; perception relies strictly on synthetic camera feed.',
        ],
    },
    approach: {
      overview:
        'Decomposed the autonomy problem into five clean decoupling layers: Perception -> Ground Plane Projection -> State Tracking -> Frenet Trajectory Optimization -> Stanley Steering Controller.',
      keyDecisions: [
        {
          decision: 'Frenet Frame (s, d) Representation over Cartesian (x, y)',
          rationale:
            'Decomposes motion along the road centerline (longitudinal s) and deviation from center (lateral d), making speed profiling and lane keeping mathematically decoupled.',
          tradeOff: 'Requires a continuous, differentiable road spline reference curve.',
        },
        {
          decision: 'Inverse Perspective Mapping (IPM) with Calibrated Homography',
          rationale:
            'Projects 2D image coordinates into 2D bird’s-eye vehicle-centric ground plane without requiring costly LiDAR sensors.',
          tradeOff:
            'Assumes flat road geometry; pitch/roll variations introduce radial distance errors.',
        },
        {
          decision: 'Constant Velocity Kalman Filter with Hungarian Association',
          rationale:
            'Smoothes jittery bounding box detections and maintains persistent track IDs through brief occlusions.',
          tradeOff:
            'Lags slightly during abrupt emergency braking of target vehicles.',
        },
      ],
    },
    architecture: {
      description:
        'Data flows sequentially through isolated modules with strict interface contracts, ensuring any component can be benchmarked or replaced independently.',
      inputs: ['Raw Camera RGB Feed (1280x720)', 'Vehicle Odometry (Speed, Yaw Rate)'],
      outputs: ['Throttle / Brake Command [0, 1]', 'Steering Angle [-35°, +35°]', 'Bird’s-Eye Trajectory Overlay'],
      nodes: [
        {
          title: 'Perception Stage',
          description: 'YOLOv8 bounding box inference & traffic light hue-saturation thresholding',
          tech: 'PyTorch / YOLOv8 / OpenCV',
          type: 'model',
        },
        {
          title: 'IPM Ground Projection',
          description: 'Homography transform projecting bottom-center of bounding boxes to vehicle ground coordinates',
          tech: 'Linear Algebra / Homography Matrix',
          type: 'processing',
        },
        {
          title: 'State Estimation & Tracking',
          description: '2D position & velocity state vector estimation with covariance gating',
          tech: 'Kalman Filter / Hungarian Algorithm',
          type: 'processing',
        },
        {
          title: 'Frenet Path Planner',
          description: 'Quartic / Quintic polynomial candidate generation with collision cost penalty',
          tech: 'SciPy / Polynomial Splines',
          type: 'control',
        },
        {
          title: 'Vehicle Actuation Controller',
          description: 'Stanley path-tracking controller for steering and proportional-integral speed regulator',
          tech: 'Feedback Control Theory',
          type: 'output',
        },
      ],
    },
    implementation: {
      overview:
        'Implemented in clean modular Python with typed dataclasses for intermediate representations (BoundingBox, TrackedObstacle, FrenetPath, VehicleCommand). Simulation bridge runs a closed-loop step loop evaluating tracking error.',
      codeHighlights: [
        {
          filename: 'perception/homography.py',
          language: 'python',
          description: 'Ground-plane projection from calibrated bird’s-eye matrix',
          code: `def image_to_ground(u: float, v: float, H_inv: np.ndarray) -> tuple[float, float]:
    """Projects pixel (u, v) bottom-center of detected vehicle to ground (X, Y)."""
    pixel_homo = np.array([u, v, 1.0])
    ground_homo = H_inv @ pixel_homo
    ground_homo /= (ground_homo[2] + 1e-9)
    # Returns coordinates in vehicle front-axle reference frame (meters)
    return float(ground_homo[0]), float(ground_homo[1])`,
        },
        {
          filename: 'planning/frenet_planner.py',
          language: 'python',
          description: 'Trajectory generation scoring candidate polynomials against obstacles',
          code: `def score_frenet_trajectory(path: FrenetPath, obstacles: list[TrackedObstacle]) -> float:
    cost = 0.0
    cost += W_JERK * path.total_jerk
    cost += W_TIME * path.terminal_time
    cost += W_DEVIATION * (path.d[-1] - TARGET_LANE_OFFSET)**2
    for obs in obstacles:
        dist = np.min(np.hypot(path.x - obs.x, path.y - obs.y))
        if dist < SAFETY_RADIUS:
            return float('inf') # Hard collision prune
        cost += W_OBSTACLE / (dist + 0.1)
    return cost`,
        },
      ],
    },
    evaluation: {
      methodology:
        'Tested in closed-loop simulated courses with static obstacles, moving lead vehicles, and lane curvature variations.',
      observations: [
        'Maintains lateral tracking error within ±0.18m along standard curves at 35 km/h.',
        'Successfully generates obstacle avoidance swerves when obstacle velocity is accurately tracked.',
        'Average frame cycle takes ~38ms on RTX 3060, leaving 24% headroom within a 50ms (20Hz) update rate.',
      ],
      honestLimitations: [
        'Homography assumes zero road incline; uphill/downhill transitions cause up to 2.4m depth distortion.',
        'No multi-camera fusion or LiDAR depth confirmation; relies entirely on accurate bounding box footing.',
        'Not tested in real-world adverse weather (heavy rain, lens glare, night driving without street lamps).',
      ],
      futureRoadmap: [
        'Integrate monocular depth estimation network (Depth Anything / MiDaS) to remove flat-ground assumption.',
        'Port heavy image pre-processing and post-processing kernels to C++ / TensorRT.',
        'Add Model Predictive Control (MPC) with actuator acceleration limits.',
      ],
    },
    repositoryUrl: 'https://github.com/rithwik-ai/autonomous-driving-engine',
  },
  {
    slug: 'cable-driven-parallel-robot',
    title: 'Planar Cable-Driven Parallel Robot',
    tagline: 'Kinematic modeling, tension-distribution quadratic programming, and workspace analysis',
    category: 'Robotics & Control',
    summary:
      'Geometric modeling and simulation of an over-constrained 4-cable planar parallel manipulator. Solves inverse kinematics in closed form and formulates the internal cable tension distribution as a constrained Quadratic Programming (QP) optimization problem to respect unilateral cable tension limits.',
    status: 'completed',
    featured: true,
    order: 2,
    year: '2024',
    role: 'Robotics & Simulation Developer',
    technologies: [
      'Python',
      'NumPy',
      'SciPy (optimize.qpsolvers)',
      'Matplotlib',
      'Pygame Canvas',
      'Analytical Mechanics',
    ],
    coverColor: '#D5360C',
    highlightStat: {
      value: '4-Winch',
      label: 'Over-Constrained Planar Parallel Kinematics',
    },
    problem: {
      statement:
        'Standard rigid serial arms have heavy link inertia and narrow workspaces. Cable-driven parallel robots (CDPRs) use lightweight cables suspended from fixed winches to maneuver an end-effector at high speeds. However, cables cannot push—they can only pull ($T_i > 0$).',
      context:
        'Built to study the mathematical constraints of parallel kinematics, tension wrench-closure workspace (WCW), and non-linear cable routing geometry.',
      constraints:
        [
          'Unilateral tension constraint: minimum tension $T_{min} = 5\\text{ N}$ to prevent cable sagging, and maximum $T_{max} = 250\\text{ N}$ to prevent cable snapping.',
          'Over-constrained system: 4 cables controlling 2 translational + 1 rotational degrees of freedom (redundant actuation).',
          'Singularity and workspace holes where wrench closure cannot be maintained.',
        ],
    },
    approach: {
      overview:
        'Derived closed-form inverse kinematics from frame geometry and formulated internal tension distribution via minimum-norm quadratic programming subject to linear equality and inequality bounds.',
      keyDecisions: [
        {
          decision: 'Quadratic Programming (QP) for Tension Distribution',
          rationale:
            'Minimizes energy consumption $\\sum T_i^2$ while strictly enforcing $T_{min} \\le T_i \\le T_{max}$ and equilibrium $\\mathbf{A}^T \\mathbf{T} + \\mathbf{w}_{ext} = \\mathbf{0}$.',
          tradeOff: 'Higher computational cost than pseudo-inverse, but guarantees zero cable slack.',
        },
        {
          decision: 'Grid-Search Discretization for Workspace Boundary Mapping',
          rationale:
            'Evaluates feasibility of the QP solver across a 2D spatial grid to render the true wrench-closure boundary.',
          tradeOff: 'Computationally demanding if calculated at high grid resolution in real time.',
        },
      ],
    },
    architecture: {
      description:
        'The simulation couples a kinematic geometry engine, a static equilibrium solver, and an interactive graphical canvas with real-time vector visualization.',
      inputs: ['Desired End-Effector Position $(x, y)$', 'External Disturbance Wrench $\\mathbf{w}_{ext}$'],
      outputs: ['Cable Lengths $[L_1, L_2, L_3, L_4]$', 'Tension Vector $[T_1, T_2, T_3, T_4]$', 'Feasibility Flag'],
      nodes: [
        {
          title: 'Pose Generator',
          description: 'Trajectory trajectory interpolation or interactive coordinate pointer',
          tech: 'Kinematics',
          type: 'input',
        },
        {
          title: 'Inverse Kinematics',
          description: 'Vector calculus from 4 frame anchor pulleys $A_i$ to end-effector attach points $B_i$',
          tech: 'Analytical Geometry',
          type: 'processing',
        },
        {
          title: 'Structure Matrix $\\mathbf{A}^T$',
          description: 'Calculates unit direction vectors and moments $\\mathbf{u}_i \\times \\mathbf{r}_i$',
          tech: 'Linear Algebra',
          type: 'processing',
        },
        {
          title: 'QP Tension Solver',
          description: 'Minimizes $\\frac{1}{2} \\mathbf{T}^T \\mathbf{Q} \\mathbf{T}$ subject to tension bounds',
          tech: 'Quadratic Programming',
          type: 'control',
        },
        {
          title: 'Canvas Renderer',
          description: 'Visualizes cables with color-coded tension strain and workspace boundaries',
          tech: 'Interactive Canvas',
          type: 'output',
        },
      ],
    },
    implementation: {
      overview:
        'Developed an interactive desktop & web canvas simulator allowing the user to drag the end-effector with the mouse and observe instantaneous cable lengths, tension spikes near boundary limits, and singularity warnings.',
      codeHighlights: [
        {
          filename: 'kinematics/cdpr_solver.py',
          language: 'python',
          description: 'Structure matrix and QP tension resolution',
          code: `def solve_cable_tensions(A_T: np.ndarray, w_ext: np.ndarray, 
                         t_min: float = 5.0, t_max: float = 250.0) -> np.ndarray:
    """Solves A^T * T + w_ext = 0 minimizing sum(T_i^2) under t_min <= T <= t_max."""
    # min 1/2 T^T I T
    P = matrix(np.eye(4))
    q = matrix(np.zeros(4))
    G = matrix(np.vstack([-np.eye(4), np.eye(4)]))
    h = matrix(np.hstack([-np.ones(4) * t_min, np.ones(4) * t_max]))
    A = matrix(A_T)
    b = matrix(-w_ext)
    
    sol = solvers.qp(P, q, G, h, A, b, options={'show_progress': False})
    return np.array(sol['x']).flatten()`,
        },
      ],
    },
    evaluation: {
      methodology:
        'Verified against theoretical static equilibrium equations and simulated dynamic trajectories with varying payload masses.',
      observations: [
        'Analytical inverse kinematics compute in <0.08ms per step.',
        'Identified safe operating envelope covering ~68% of the bounding rectangular frame.',
        'Near the boundary corners, cable tensions exhibit steep gradients as cables become nearly parallel.',
      ],
      honestLimitations: [
        'Assumes massless and inextensible cables; real synthetic dyneema cables exhibit slight elasticity under 200N load.',
        'Does not model pulley friction or spool wrapping radius changes.',
        'Planar model ignores out-of-plane gravitational swing.',
      ],
      futureRoadmap: [
        'Extend to 8-cable 6-DOF spatial manipulator model.',
        'Implement visual-servoing feedback using an overhead camera tracking ArUco markers on the end-effector.',
        'Fabricate a physical prototype using stepper winches and load cell feedback.',
      ],
    },
    repositoryUrl: 'https://github.com/rithwik-ai/cable-driven-parallel-robot',
  },
  {
    slug: 'probabilistic-models-visualizer',
    title: 'Probabilistic Graphical Models Visualizer',
    tagline: 'Interactive belief propagation, factor graph inference, and conformal prediction analysis',
    category: 'Machine Learning',
    summary:
      'An educational and diagnostic tool for visualizing exact inference algorithms on Bayesian Networks, Markov Random Fields, and Hidden Markov Models. Enables interactive evidence setting, factor graph compilation, and real-time visualization of marginal belief propagation.',
    status: 'prototype',
    featured: true,
    order: 3,
    year: '2024–2025',
    role: 'Author & Designer',
    technologies: [
      'TypeScript',
      'React',
      'Canvas API',
      'Probability Theory',
      'Bayesian Networks',
      'HMM Algorithms',
    ],
    coverColor: '#D5360C',
    highlightStat: {
      value: 'Exact Inference',
      label: 'Sum-Product Message Passing Engine',
    },
    problem: {
      statement:
        'Probabilistic Graphical Models (PGMs) provide rigorous machinery for reasoning under uncertainty, but the mathematical mechanics of message passing and variable elimination are notoriously difficult to conceptualize from static equations.',
      context:
        'Created to bridge the gap between abstract mathematical formulas (d-separation, factor marginalization, belief propagation) and visual diagnostic intuition.',
      constraints:
        [
          'Client-side computation: all factor multiplications and marginalizations run directly in browser without server roundtrips.',
          'Real-time responsiveness when the user clicks nodes to clamp evidence or adjust conditional probability tables (CPTs).',
          'Support for both directed (Bayesian networks) and undirected (Markov networks) representations.',
        ],
    },
    approach: {
      overview:
        'Constructed a pure TypeScript inference engine operating on discrete random variables. Implemented the Variable Elimination algorithm and tree-structured Sum-Product message passing, bound directly to a reactive canvas node graph.',
      keyDecisions: [
        {
          decision: 'Factor-First Internal Representation',
          rationale:
            'Representing both directed CPTs and undirected potentials as generic multi-dimensional Factors $\\phi(X_1, \\dots, X_k)$ unifies the inference engine.',
          tradeOff:
            'Requires an initial factor compilation step from directed graphs.',
        },
        {
          decision: 'Step-by-Step Message Vector Animation',
          rationale:
            'Instead of immediately flashing posterior numbers, animated pulses travel along edges showing messages $\\mu_{i \\to j}(x_j)$ transferring evidence.',
          tradeOff: 'Adds animation state machine management on top of mathematical logic.',
        },
      ],
    },
    architecture: {
      description:
        'A reactive pipeline connecting stateful graph topology to a clean discrete probability inference core.',
      inputs: ['Graph Structure (Nodes, Edges, Cardinalities)', 'Evidence Observations (e.g. $E=e$)', 'CPTs'],
      outputs: ['Posterior Marginals $P(X_i | \\mathbf{e})$', 'Message Vectors $\\mu_{i \\to j}$', 'Joint Factor Tables'],
      nodes: [
        {
          title: 'Graph Specification Layer',
          description: 'Topology definition with directed parent-child or undirected neighbor edges',
          tech: 'TypeScript Datatypes',
          type: 'input',
        },
        {
          title: 'Factor Graph Compiler',
          description: 'Converts CPT conditional distributions into potential factors',
          tech: 'Discrete Math',
          type: 'processing',
        },
        {
          title: 'Inference Engine',
          description: 'Executes Variable Elimination and Sum-Product belief propagation on tree topologies',
          tech: 'Algorithm Implementation',
          type: 'model',
        },
        {
          title: 'Reactive Canvas Graph',
          description: 'Renders probability bar distributions directly inside each circular node with evidence badges',
          tech: 'Canvas / SVG',
          type: 'output',
        },
      ],
    },
    implementation: {
      overview:
        'Built with zero heavy math dependencies. Includes custom implementations of multi-dimensional tensor indexing, factor multiplication, marginalization, and d-separation path search.',
      codeHighlights: [
        {
          filename: 'pgm/factor.ts',
          language: 'typescript',
          description: 'Factor multiplication and variable marginalization',
          code: `export class Factor {
  constructor(public vars: string[], public shape: number[], public values: Float64Array) {}

  marginalize(targetVar: string): Factor {
    const varIdx = this.vars.indexOf(targetVar);
    if (varIdx === -1) return this;
    const newVars = this.vars.filter((_, i) => i !== varIdx);
    const newShape = this.shape.filter((_, i) => i !== varIdx);
    const newSize = newShape.reduce((a, b) => a * b, 1);
    const newValues = new Float64Array(newSize);

    // Sum out target variable across all strata
    for (let i = 0; i < this.values.length; i++) {
      const newIdx = this.mapIndex(i, varIdx);
      newValues[newIdx] += this.values[i];
    }
    return new Factor(newVars, newShape, newValues);
  }
}`,
        },
      ],
    },
    evaluation: {
      methodology:
        'Validated against textbook PGM benchmarks (Student-Course-SAT network, Asia/Chest-Clinic network) and verified numerical outputs against pgmpy.',
      observations: [
        'Produces exact match (within floating point epsilon $10^{-7}$) to standard reference problems.',
        'Computes inference on 12-node networks in <1.2ms, enabling instantaneous 60fps UI manipulation.',
        'Helped peers understand why evidence at a descendant causes "explaining away" between two parents.',
      ],
      honestLimitations: [
        'Currently limited to discrete random variables; continuous Gaussian variables not yet integrated.',
        'Exact inference on general loopy graphs requires junction tree triangulation, which is NP-hard for large tree-widths.',
        'Browser UI scales well up to ~25 nodes; larger networks require pan/zoom graph clustering.',
      ],
      futureRoadmap: [
        'Add Loopy Belief Propagation and Gibbs Sampling for approximate inference on large cyclic graphs.',
        'Integrate Conformal Prediction set visualizer showing coverage guarantees under varying significance $\\alpha$.',
      ],
    },
    repositoryUrl: 'https://github.com/rithwik-ai/probabilistic-models-visualizer',
    demoUrl: '#demo',
  },
  {
    slug: 'edge-vision-defect-inspector',
    title: 'Edge Vision Anomaly Inspector',
    tagline: 'Unsupervised anomaly detection with lightweight patch autoencoders for industrial inspection',
    category: 'Computer Vision',
    summary:
      'Trained an unsupervised convolutional reconstruction network on normal-only surface textures to detect structural fractures and scratches on edge-constrained devices without manual defect annotations.',
    status: 'completed',
    featured: false,
    order: 4,
    year: '2024',
    role: 'Computer Vision Developer',
    technologies: ['PyTorch', 'TorchScript', 'OpenCV', 'FastAPI', 'NumPy'],
    coverColor: '#D5360C',
    problem: {
      statement:
        'In manufacturing inspection, defective samples are extremely rare, making supervised defect classifiers prone to false positives or blind spots. Training solely on normal distribution data allows detecting novel defects as high-reconstruction error outliers.',
      context:
        'Academic project exploring autoencoder reconstruction residuals and structural similarity index (SSIM) anomaly heatmaps.',
      constraints: [
        'Extremely unbalanced dataset with <0.5% defect presence.',
        'Inference must run locally without continuous cloud connection.',
      ],
    },
    approach: {
      overview:
        'Used a spatial autoencoder with perceptual loss and SSIM metric to compute pixel-wise residual anomaly scores.',
      keyDecisions: [
        {
          decision: 'SSIM Loss over Mean Squared Error',
          rationale: 'SSIM preserves structural boundaries and luminance contrasts without blurring high-frequency texture details.',
          tradeOff: 'Slightly higher compute overhead during training.',
        },
      ],
    },
    architecture: {
      description: 'Image patch extraction -> Autoencoder forward pass -> Residual difference map -> Gaussian thresholding.',
      inputs: ['512x512 Grayscale surface image'],
      outputs: ['Binary anomaly mask', 'Max deviation score [0, 1]'],
      nodes: [
        { title: 'Patch Extraction', description: 'Splits image into overlapping 128x128 patches', tech: 'OpenCV', type: 'processing' },
        { title: 'Reconstruction Autoencoder', description: 'Bottleneck latent encoding with skip connections', tech: 'PyTorch', type: 'model' },
        { title: 'SSIM Residual Map', description: 'Computes pixel-wise structural dissimilarity', tech: 'Custom PyTorch Metric', type: 'processing' },
        { title: 'Decision Gate', description: 'Adaptive thresholding based on validation mean + 3-sigma', tech: 'Statistics', type: 'output' },
      ],
    },
    implementation: {
      overview: 'Trained using PyTorch, exported to TorchScript for lightweight deployment, wrapped in an asynchronous evaluation harness.',
    },
    evaluation: {
      methodology: 'Evaluated on public industrial surface benchmark datasets with synthetic and real scratch defects.',
      observations: ['Achieved reliable localization on scratches and punctures with 0.89 AUROC.'],
      honestLimitations: [
        'Vulnerable to sudden changes in ambient factory lighting; requires consistent fixture illumination.',
      ],
      futureRoadmap: ['Explore feature-embedding models like PatchCore for even sharper defect boundaries.'],
    },
    repositoryUrl: 'https://github.com/rithwik-ai/edge-vision-anomaly-inspector',
  },
  {
    slug: 'multimodal-retrieval-rag',
    title: 'Hybrid Technical Document RAG',
    tagline: 'Dense and sparse reciprocal rank fusion pipeline for complex technical specifications',
    category: 'Data Science',
    summary:
      'Engineered a hybrid retrieval-augmented generation pipeline combining BM25 lexical search with dense vector embeddings (BGE-M3) and cross-encoder reranking to accurately extract equations and tables from engineering papers.',
    status: 'completed',
    featured: false,
    order: 5,
    year: '2024',
    role: 'Engineer',
    technologies: ['Python', 'LangChain', 'ChromaDB', 'BM25', 'Sentence-Transformers'],
    coverColor: '#D5360C',
    problem: {
      statement:
        'Pure vector similarity often fails on technical queries containing precise part numbers, equations, and exact acronyms because dense embeddings smear specific tokens across semantic space.',
      context:
        'Engineered to retrieve precise engineering formulas and algorithm descriptions from PDF specifications.',
      constraints: ['Must handle multi-column technical documents and embedded table structures.'],
    },
    approach: {
      overview:
        'Implemented Reciprocal Rank Fusion (RRF) to merge top-K candidates from BM25 and dense bi-encoder searches before passing through a local cross-encoder reranker.',
      keyDecisions: [
        {
          decision: 'RRF Rank Normalization',
          rationale: 'Avoids score calibration issues between unbounded BM25 scores and cosine vector similarity.',
          tradeOff: 'Requires two independent indexing and search passes.',
        },
      ],
    },
    architecture: {
      description: 'Document Chunking -> Dual Indexing (Sparse + Dense) -> RRF Merger -> Cross-Encoder -> Synthesizer.',
      inputs: ['Technical PDF query'],
      outputs: ['Source-grounded answer with verbatim context citations'],
      nodes: [
        { title: 'Structural Chunking', description: 'Preserves markdown headers and table boundaries', tech: 'Python', type: 'processing' },
        { title: 'Dual Indexer', description: 'ChromaDB vector store + Rank-BM25 inverted index', tech: 'Chroma / BM25', type: 'model' },
        { title: 'RRF Scoring', description: 'Computes 1 / (60 + rank_i) reciprocal rank fusion', tech: 'Rank Aggregation', type: 'processing' },
        { title: 'Cross-Encoder Reranker', description: 'Evaluates full query-document pair attention', tech: 'MiniLM-L6', type: 'output' },
      ],
    },
    implementation: {
      overview: 'Modular Python package with automated retrieval recall evaluation and local citation tracking.',
    },
    evaluation: {
      methodology: 'Benchmarked on a curated set of 85 technical queries against pure dense vector baseline.',
      observations: ['Reciprocal Rank Fusion boosted top-3 retrieval recall by 18.4% on keyword-specific queries.'],
      honestLimitations: ['Tables with merged cells sometimes lose column alignment during markdown conversion.'],
      futureRoadmap: ['Incorporate ColBERT late-interaction token scoring.'],
    },
    repositoryUrl: 'https://github.com/rithwik-ai/hybrid-technical-rag',
  },
];
