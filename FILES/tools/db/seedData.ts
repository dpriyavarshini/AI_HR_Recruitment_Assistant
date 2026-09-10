import { Candidate, Job, ScoringWeights } from '../types';

export const initialWeights: ScoringWeights = {
  requiredSkills: 35,
  experience: 20,
  responsibilities: 15,
  domain: 10,
  preferredSkills: 10,
  education: 5,
  certifications: 5
};

export const sampleJobs: Job[] = [
  {
    id: 'job-101',
    title: 'Senior React / Frontend Engineer',
    department: 'Engineering',
    location: 'Remote / San Francisco, CA',
    type: 'full-time',
    status: 'active',
    createdAt: '2026-08-15T10:00:00Z',
    updatedAt: '2026-08-15T10:00:00Z',
    description: `We are looking for a Senior React / Frontend Engineer to lead the client-side architecture of our enterprise AI platform. You will build high-performance web applications using React, TypeScript, Next.js, Redux Toolkit, and Tailwind CSS, collaborating closely with UI/UX designers and backend AI engineers.`,
    requirements: {
      requiredSkills: ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5/CSS3', 'State Management (Redux/Zustand)', 'Web Performance Optimization'],
      preferredSkills: ['Next.js', 'Tailwind CSS', 'GraphQL', 'WebSockets', 'Jest/React Testing Library', 'CI/CD Pipelines'],
      minYearsExperience: 5,
      maxYearsExperience: 10,
      educationLevel: "Bachelor's in Computer Science or equivalent field",
      certifications: ['AWS Certified Developer (Optional)', 'Meta Frontend Developer (Optional)'],
      responsibilities: [
        'Architect and implement scalable React components and state management flows.',
        'Optimize Web Vitals, page rendering performance, and client-side asset loading.',
        'Integrate REST APIs and WebSockets with strict TypeScript interface validations.',
        'Mentor junior engineers and champion modern frontend testing standards.'
      ],
      domainExperience: ['SaaS Technology', 'Fintech or AI Applications', 'Enterprise Web Products'],
      seniorityLevel: 'senior'
    }
  },
  {
    id: 'job-102',
    title: 'Senior Backend AI / Node.js Engineer',
    department: 'AI Core Platform',
    location: 'Hybrid / New York, NY',
    type: 'full-time',
    status: 'active',
    createdAt: '2026-08-20T14:30:00Z',
    updatedAt: '2026-08-20T14:30:00Z',
    description: `Seeking an experienced Backend AI Node.js Engineer to design microservices, vector search pipelines, and LLM agent tool routing. You will build resilient API endpoints, database schemas with PostgreSQL & Redis, and integrate RAG vector search engines.`,
    requirements: {
      requiredSkills: ['Node.js', 'TypeScript', 'Express/Fastify', 'PostgreSQL', 'RESTful API Design', 'Vector Databases (pgvector/Pinecone)'],
      preferredSkills: ['Python', 'LangChain/LlamaIndex', 'Redis', 'Docker', 'Kubernetes', 'AWS Lambda'],
      minYearsExperience: 5,
      maxYearsExperience: 12,
      educationLevel: "Bachelor's or Master's in Computer Science",
      certifications: ['AWS Solutions Architect', 'Docker Certified Associate'],
      responsibilities: [
        'Develop secure, high-throughput microservices using Node.js and TypeScript.',
        'Build RAG pipelines, document ingestion services, and vector similarity search models.',
        'Design relational database schemas and optimize SQL query execution plans.',
        'Establish rate-limiting, authentication protocols, and OAuth2 security.'
      ],
      domainExperience: ['Cloud SaaS Architecture', 'AI & RAG Systems', 'Distributed Systems'],
      seniorityLevel: 'senior'
    }
  },
  {
    id: 'job-103',
    title: 'Lead Fullstack Product Architect',
    department: 'Product Engineering',
    location: 'Remote / Austin, TX',
    type: 'full-time',
    status: 'active',
    createdAt: '2026-08-25T09:15:00Z',
    updatedAt: '2026-08-25T09:15:00Z',
    description: `We need a Lead Fullstack Architect to drive product engineering from frontend micro-frontends to cloud backend microservices. You will oversee architectural decisions, performance benchmarks, and cross-functional feature delivery across web and API services.`,
    requirements: {
      requiredSkills: ['React', 'Node.js', 'TypeScript', 'System Architecture', 'PostgreSQL', 'AWS Services'],
      preferredSkills: ['Microservices', 'GraphQL', 'DevOps & CI/CD', 'Docker', 'Elasticsearch'],
      minYearsExperience: 7,
      maxYearsExperience: 15,
      educationLevel: "Bachelor's in Computer Science or related STEM field",
      certifications: ['AWS Certified Solutions Architect Professional'],
      responsibilities: [
        'Drive overall tech stack architecture across React SPA frontend and Node.js microservices.',
        'Conduct code reviews, architectural spikes, and performance profiling.',
        'Lead cross-functional sprints with product managers, QA, and security leads.',
        'Manage cloud deployment pipelines on AWS using Terraform and Docker.'
      ],
      domainExperience: ['Enterprise SaaS', 'High-Growth Tech Startups', 'E-commerce/Marketplace Platforms'],
      seniorityLevel: 'lead'
    }
  }
];

export const sampleCandidates: Candidate[] = [
  {
    id: 'cand-001',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    currentRole: 'Senior Frontend Architect',
    totalExperienceYears: 7,
    status: 'matched',
    uploadedAt: '2026-08-28T11:20:00Z',
    summary: 'Accomplished Senior Frontend Architect with 7 years of specialized expertise building high-scale React, TypeScript, and Next.js SaaS applications. Proven track record optimizing Web Vitals by 42% and architecting design systems used by over 50 engineers.',
    skills: [
      { name: 'React', category: 'frontend', yearsOfExperience: 7, proficiency: 'expert' },
      { name: 'TypeScript', category: 'frontend', yearsOfExperience: 6, proficiency: 'expert' },
      { name: 'Next.js', category: 'frontend', yearsOfExperience: 4, proficiency: 'advanced' },
      { name: 'Redux / Zustand', category: 'frontend', yearsOfExperience: 6, proficiency: 'expert' },
      { name: 'Tailwind CSS', category: 'frontend', yearsOfExperience: 4, proficiency: 'advanced' },
      { name: 'Node.js', category: 'backend', yearsOfExperience: 3, proficiency: 'intermediate' },
      { name: 'GraphQL', category: 'backend', yearsOfExperience: 3, proficiency: 'intermediate' },
      { name: 'AWS (S3/CloudFront)', category: 'cloud', yearsOfExperience: 4, proficiency: 'intermediate' }
    ],
    experience: [
      {
        company: 'Vanguard Systems',
        title: 'Senior Frontend Architect',
        startDate: '2023-01',
        endDate: 'Present',
        location: 'San Francisco, CA',
        responsibilities: [
          'Architected next-gen SaaS React dashboard serving 200k+ daily active users.',
          'Reduced initial JS bundle size by 45% using code-splitting and dynamic imports.',
          'Built custom Design System component library with 100% TypeScript coverage.'
        ],
        achievements: [
          'Improved Google Core Web Vitals LCP from 3.8s to 1.2s.',
          'Mentored 8 mid-level developers and conducted weekly tech talks.'
        ],
        technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Jest']
      },
      {
        company: 'Apex Software',
        title: 'Frontend Developer',
        startDate: '2019-06',
        endDate: '2022-12',
        location: 'San Jose, CA',
        responsibilities: [
          'Developed responsive React component modules for analytics portal.',
          'Integrated RESTful APIs and implemented offline storage caching with IndexedDB.'
        ],
        technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'REST APIs', 'Webpack']
      }
    ],
    education: [
      {
        institution: 'University of California, Berkeley',
        degree: "Bachelor of Science",
        fieldOfStudy: 'Computer Science',
        graduationYear: 2019
      }
    ],
    projects: [
      {
        name: 'Enterprise Analytics Dashboard',
        description: 'Real-time data visualization platform handling streaming telemetry data.',
        technologies: ['React', 'TypeScript', 'D3.js', 'WebSockets', 'Tailwind']
      }
    ],
    certifications: ['AWS Certified Developer Associate', 'Meta Front-End Developer Professional'],
    rawResumeText: `SARAH JENKINS
San Francisco, CA | sarah.jenkins@example.com | +1 (555) 234-5678

PROFESSIONAL SUMMARY
Senior Frontend Architect with 7 years of hands-on experience designing and executing enterprise React & TypeScript single-page applications. Specialist in state management (Redux, Zustand), web performance optimization (Web Vitals), and scalable Design Systems.

WORK EXPERIENCE
Senior Frontend Architect | Vanguard Systems | Jan 2023 – Present
• Architected core React/Next.js SaaS web application delivering real-time analytics to 200,000+ daily active users.
• Spearheaded frontend performance refactoring, reducing First Contentful Paint by 60% and LCP to 1.2 seconds.
• Built and maintained enterprise UI component library in TypeScript using Tailwind CSS and Storybook.
• Integrated GraphQL and REST endpoints with strict Zod runtime schema validation.

Frontend Developer | Apex Software | Jun 2019 – Dec 2022
• Developed modular React applications using React Hooks, Context API, and Redux Toolkit.
• Automated cross-browser e2e testing suite using Cypress and React Testing Library.

EDUCATION & CERTIFICATIONS
BS in Computer Science, UC Berkeley (2019)
AWS Certified Developer Associate | Meta Front-End Developer Professional`
  },
  {
    id: 'cand-002',
    name: 'David Chen',
    email: 'david.chen@example.com',
    phone: '+1 (555) 345-6789',
    location: 'New York, NY',
    currentRole: 'Staff Backend & AI Engineer',
    totalExperienceYears: 8,
    status: 'matched',
    uploadedAt: '2026-08-29T14:15:00Z',
    summary: 'Senior Backend Engineer with 8 years building distributed systems, Node.js services, vector databases, and LLM RAG pipelines. Specialized in PostgreSQL tuning, pgvector search indexing, Redis caching, and microservices architecture.',
    skills: [
      { name: 'Node.js', category: 'backend', yearsOfExperience: 8, proficiency: 'expert' },
      { name: 'TypeScript', category: 'backend', yearsOfExperience: 6, proficiency: 'expert' },
      { name: 'PostgreSQL', category: 'database', yearsOfExperience: 7, proficiency: 'expert' },
      { name: 'Vector DB / pgvector', category: 'ai_ml', yearsOfExperience: 3, proficiency: 'advanced' },
      { name: 'Express / Fastify', category: 'backend', yearsOfExperience: 7, proficiency: 'expert' },
      { name: 'Python', category: 'backend', yearsOfExperience: 4, proficiency: 'advanced' },
      { name: 'Docker / Kubernetes', category: 'devops', yearsOfExperience: 5, proficiency: 'advanced' },
      { name: 'Redis', category: 'database', yearsOfExperience: 5, proficiency: 'expert' }
    ],
    experience: [
      {
        company: 'NeuralScale AI',
        title: 'Staff Backend & AI Engineer',
        startDate: '2022-03',
        endDate: 'Present',
        location: 'New York, NY',
        responsibilities: [
          'Engineered RAG vector retrieval system supporting 10M+ document embeddings.',
          'Built high-performance Node.js/Express APIs handling 15,000 requests per minute.',
          'Configured pgvector HNSW indexing to achieve sub-50ms semantic search latency.'
        ],
        achievements: [
          'Reduced API query latency by 48% via Redis multi-layer query caching.',
          'Designed microservices framework deployed on AWS EKS Kubernetes clusters.'
        ],
        technologies: ['Node.js', 'TypeScript', 'PostgreSQL', 'pgvector', 'Docker', 'Redis', 'AWS']
      },
      {
        company: 'CloudPulse Technologies',
        title: 'Senior Backend Developer',
        startDate: '2018-08',
        endDate: '2022-02',
        location: 'Boston, MA',
        responsibilities: [
          'Designed relational database schema and migration scripts for PostgreSQL databases.',
          'Implemented OAuth2 authentication servers and RBAC security layers.'
        ],
        technologies: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'Jest', 'Docker']
      }
    ],
    education: [
      {
        institution: 'Columbia University',
        degree: "Master of Science",
        fieldOfStudy: 'Computer Science',
        graduationYear: 2018
      }
    ],
    projects: [
      {
        name: 'RAG Semantic Engine',
        description: 'Scalable text chunking and embedding retrieval service for enterprise contracts.',
        technologies: ['Node.js', 'TypeScript', 'pgvector', 'OpenAI Embeddings', 'Redis']
      }
    ],
    certifications: ['AWS Certified Solutions Architect Associate', 'Docker Certified Associate'],
    rawResumeText: `DAVID CHEN
New York, NY | david.chen@example.com | +1 (555) 345-6789

SUMMARY
Staff Backend & AI Engineer with 8 years of specialization in Node.js, TypeScript, PostgreSQL, vector search engines (pgvector, Pinecone), and scalable microservices. Experience delivering RAG infrastructure for enterprise AI platforms.

EXPERIENCE
Staff Backend & AI Engineer | NeuralScale AI | Mar 2022 – Present
• Architected RAG document embedding & vector search backend in Node.js and TypeScript.
• Optimized PostgreSQL pgvector HNSW index queries, maintaining under 45ms retrieval latency across 10M chunks.
• Scaled RESTful microservices on Docker & AWS EKS processing 15,000 RPM with 99.99% uptime.
• Managed Redis caching strategy reducing database load by 52%.

Senior Backend Developer | CloudPulse Technologies | Aug 2018 – Feb 2022
• Developed core Node.js APIs and microservices using Express, PostgreSQL, and AWS S3/SQS.
• Implemented JWT/OAuth2 authentication and role-based access control (RBAC).

EDUCATION
MS in Computer Science, Columbia University (2018)
Certifications: AWS Solutions Architect Associate, Docker Certified Associate`
  },
  {
    id: 'cand-003',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    currentRole: 'Lead Fullstack Architect',
    totalExperienceYears: 10,
    status: 'interviewing',
    uploadedAt: '2026-08-27T09:00:00Z',
    summary: 'Versatile Lead Fullstack Architect with 10 years experience delivering cloud-native products across React, Node.js, AWS, and PostgreSQL. Expert in enterprise product engineering, design patterns, micro-frontends, and CI/CD pipelines.',
    skills: [
      { name: 'React', category: 'frontend', yearsOfExperience: 9, proficiency: 'expert' },
      { name: 'Node.js', category: 'backend', yearsOfExperience: 9, proficiency: 'expert' },
      { name: 'TypeScript', category: 'frontend', yearsOfExperience: 7, proficiency: 'expert' },
      { name: 'PostgreSQL', category: 'database', yearsOfExperience: 8, proficiency: 'expert' },
      { name: 'AWS (EC2, ECS, Lambda, RDS)', category: 'cloud', yearsOfExperience: 7, proficiency: 'expert' },
      { name: 'System Architecture', category: 'management', yearsOfExperience: 6, proficiency: 'expert' },
      { name: 'Docker / CI/CD', category: 'devops', yearsOfExperience: 6, proficiency: 'advanced' },
      { name: 'GraphQL', category: 'backend', yearsOfExperience: 4, proficiency: 'advanced' }
    ],
    experience: [
      {
        company: 'OmniCloud Platforms',
        title: 'Lead Fullstack Architect',
        startDate: '2021-04',
        endDate: 'Present',
        location: 'Austin, TX',
        responsibilities: [
          'Led fullstack engineering team of 14 across React frontend and Node.js backend microservices.',
          'Designed event-driven system architecture on AWS ECS, SQS, and RDS PostgreSQL.',
          'Established automated CI/CD deployment pipelines using GitHub Actions and Terraform.'
        ],
        achievements: [
          'Architected enterprise SaaS platform generating $12M ARR.',
          'Reduced build-to-deploy pipeline cycle times from 40 mins to 6 mins.'
        ],
        technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Terraform', 'Docker']
      },
      {
        company: 'BrightTech Solutions',
        title: 'Senior Software Engineer',
        startDate: '2016-09',
        endDate: '2021-03',
        location: 'Dallas, TX',
        responsibilities: [
          'Built web products using React, Redux, Node.js, and Express.',
          'Led migration from monolithic legacy stack to modern REST microservices.'
        ],
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL']
      }
    ],
    education: [
      {
        institution: 'University of Texas at Austin',
        degree: "Bachelor of Science",
        fieldOfStudy: 'Electrical & Computer Engineering',
        graduationYear: 2016
      }
    ],
    projects: [
      {
        name: 'OmniCloud Core SaaS',
        description: 'Multi-tenant enterprise cloud workflow automation product.',
        technologies: ['React', 'TypeScript', 'Node.js', 'AWS ECS', 'PostgreSQL']
      }
    ],
    certifications: ['AWS Certified Solutions Architect Professional'],
    rawResumeText: `ELENA ROSTOVA
Austin, TX | elena.rostova@example.com | +1 (555) 456-7890

SUMMARY
Lead Fullstack Architect with 10 years of software engineering leadership. Deep technical acumen across modern React frontends, Node.js APIs, PostgreSQL database architecture, and AWS cloud infrastructures.

CAREER HISTORY
Lead Fullstack Architect | OmniCloud Platforms | Apr 2021 – Present
• Lead architecture & engineering for enterprise SaaS suite powering multi-tenant customer portals.
• Technology stack: React 18, TypeScript, Node.js/Express, PostgreSQL, AWS ECS, SQS, Terraform.
• Oversee cross-functional development across 14 engineers, driving technical design and code quality standards.
• Reduced platform downtime to 0.01% with automated cloud fallback strategies.

Senior Software Engineer | BrightTech Solutions | Sep 2016 – Mar 2021
• Engineered fullstack React and Node.js solutions for e-commerce clients.
• Designed database schemas and REST API contracts for high-concurrency payment gateways.

EDUCATION & CREDENTIALS
BS in Electrical & Computer Engineering, UT Austin (2016)
AWS Certified Solutions Architect Professional`
  },
  {
    id: 'cand-004',
    name: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    phone: '+1 (555) 567-8901',
    location: 'Seattle, WA',
    currentRole: 'Senior React Engineer',
    totalExperienceYears: 6,
    status: 'screened',
    uploadedAt: '2026-08-30T16:45:00Z',
    summary: 'Frontend Engineer with 6 years experience crafting UI interfaces in React, TypeScript, and Redux. Passionate about design system components, CSS animations, accessibility (WCAG 2.1), and frontend testing.',
    skills: [
      { name: 'React', category: 'frontend', yearsOfExperience: 6, proficiency: 'advanced' },
      { name: 'TypeScript', category: 'frontend', yearsOfExperience: 5, proficiency: 'advanced' },
      { name: 'JavaScript (ES6+)', category: 'frontend', yearsOfExperience: 6, proficiency: 'expert' },
      { name: 'HTML5/CSS3', category: 'frontend', yearsOfExperience: 6, proficiency: 'expert' },
      { name: 'Redux Toolkit', category: 'frontend', yearsOfExperience: 4, proficiency: 'advanced' },
      { name: 'Tailwind CSS', category: 'frontend', yearsOfExperience: 3, proficiency: 'advanced' },
      { name: 'Jest / Testing Library', category: 'frontend', yearsOfExperience: 4, proficiency: 'intermediate' }
    ],
    experience: [
      {
        company: 'Pulse interactive',
        title: 'Senior Frontend Developer',
        startDate: '2022-08',
        endDate: 'Present',
        location: 'Seattle, WA',
        responsibilities: [
          'Developed responsive React UI components adhering strictly to WCAG AA accessibility standards.',
          'Built dynamic interactive dashboards using Chart.js and React-Query.'
        ],
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'Jest']
      },
      {
        company: 'Northwest Media',
        title: 'Frontend Developer',
        startDate: '2020-02',
        endDate: '2022-07',
        location: 'Seattle, WA',
        responsibilities: [
          'Converted Figma designs into pixel-perfect React components.',
          'Refactored legacy jQuery codebase into modular React applications.'
        ],
        technologies: ['React', 'JavaScript', 'CSS Modules', 'Webpack']
      }
    ],
    education: [
      {
        institution: 'University of Washington',
        degree: "Bachelor of Arts",
        fieldOfStudy: 'Informatics',
        graduationYear: 2020
      }
    ],
    projects: [
      {
        name: 'Accessible UI Library',
        description: 'Open-source accessible UI primitives built with React and Tailwind.',
        technologies: ['React', 'TypeScript', 'Tailwind']
      }
    ],
    certifications: ['W3C Accessibility Specialist'],
    rawResumeText: `MARCUS VANCE
Seattle, WA | marcus.vance@example.com | +1 (555) 567-8901

PROFILE
Frontend Engineer with 6 years experience building modern web interfaces with React, TypeScript, and CSS. Strong focus on design systems, web performance, and WCAG AA accessibility.

WORK HISTORY
Senior Frontend Developer | Pulse Interactive | Aug 2022 – Present
• Built modular React components with TypeScript and Tailwind CSS.
• Implemented client-side caching with React-Query, reducing network payloads by 30%.
• Achieved 100% WCAG 2.1 accessibility compliance across primary user journeys.

Frontend Developer | Northwest Media | Feb 2020 – Jul 2022
• Developed responsive Web UI components for digital media platform.

EDUCATION
BA in Informatics, University of Washington (2020)`
  },
  {
    id: 'cand-005',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+1 (555) 678-9012',
    location: 'Chicago, IL',
    currentRole: 'Backend Engineer - Node.js & Databases',
    totalExperienceYears: 5,
    status: 'new',
    uploadedAt: '2026-09-01T10:10:00Z',
    summary: 'Backend Developer with 5 years experience creating scalable Node.js microservices, REST APIs, and relational database schemas with PostgreSQL and Redis. Knowledgeable in TypeScript, Express, and Docker.',
    skills: [
      { name: 'Node.js', category: 'backend', yearsOfExperience: 5, proficiency: 'advanced' },
      { name: 'TypeScript', category: 'backend', yearsOfExperience: 4, proficiency: 'advanced' },
      { name: 'Express', category: 'backend', yearsOfExperience: 5, proficiency: 'advanced' },
      { name: 'PostgreSQL', category: 'database', yearsOfExperience: 4, proficiency: 'advanced' },
      { name: 'REST APIs', category: 'backend', yearsOfExperience: 5, proficiency: 'expert' },
      { name: 'Docker', category: 'devops', yearsOfExperience: 3, proficiency: 'intermediate' }
    ],
    experience: [
      {
        company: 'FinEdge Solutions',
        title: 'Backend Software Engineer',
        startDate: '2021-09',
        endDate: 'Present',
        location: 'Chicago, IL',
        responsibilities: [
          'Developed Node.js REST services for transaction processing and ledger validation.',
          'Optimized PostgreSQL query indexes and database connection pooling.'
        ],
        technologies: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'Docker']
      }
    ],
    education: [
      {
        institution: 'Illinois Institute of Technology',
        degree: "Master of Science",
        fieldOfStudy: 'Computer Science',
        graduationYear: 2021
      }
    ],
    projects: [],
    certifications: [],
    rawResumeText: `PRIYA SHARMA
Chicago, IL | priya.sharma@example.com | +1 (555) 678-9012

SUMMARY
Backend Software Engineer with 5 years experience in Node.js, Express, TypeScript, and PostgreSQL database management.

EXPERIENCE
Backend Engineer | FinEdge Solutions | Sep 2021 – Present
• Designed secure RESTful microservices in Node.js and Express.
• Managed PostgreSQL schema migrations and index optimizations.`
  },
  {
    id: 'cand-006',
    name: 'Alexander Wright',
    email: 'alex.wright@example.com',
    phone: '+1 (555) 789-0123',
    location: 'Denver, CO',
    currentRole: 'DevOps & Cloud Engineer',
    totalExperienceYears: 7,
    status: 'new',
    uploadedAt: '2026-09-02T08:30:00Z',
    summary: 'Cloud Infrastructure and DevOps Specialist with 7 years configuring Kubernetes clusters, AWS cloud architectures, Terraform IaC, and CI/CD pipelines. Basic exposure to Node.js backend integration.',
    skills: [
      { name: 'AWS', category: 'cloud', yearsOfExperience: 7, proficiency: 'expert' },
      { name: 'Docker / Kubernetes', category: 'devops', yearsOfExperience: 6, proficiency: 'expert' },
      { name: 'Terraform', category: 'devops', yearsOfExperience: 5, proficiency: 'expert' },
      { name: 'CI/CD (GitHub Actions / Jenkins)', category: 'devops', yearsOfExperience: 6, proficiency: 'expert' },
      { name: 'Node.js', category: 'backend', yearsOfExperience: 2, proficiency: 'beginner' }
    ],
    experience: [
      {
        company: 'CloudScale Infrastructure',
        title: 'Senior DevOps Engineer',
        startDate: '2021-01',
        endDate: 'Present',
        location: 'Denver, CO',
        responsibilities: [
          'Maintained high-availability Kubernetes clusters on AWS EKS across 4 regions.',
          'Automated cloud provisioning using Terraform IaC scripts.'
        ],
        technologies: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'Prometheus']
      }
    ],
    education: [
      {
        institution: 'University of Colorado Boulder',
        degree: "Bachelor of Science",
        fieldOfStudy: 'Computer Engineering',
        graduationYear: 2019
      }
    ],
    projects: [],
    certifications: ['AWS Certified Solutions Architect Professional', 'Certified Kubernetes Administrator (CKA)'],
    rawResumeText: `ALEXANDER WRIGHT
Denver, CO | alex.wright@example.com | +1 (555) 789-0123

SUMMARY
DevOps and Cloud Engineer with 7 years configuring AWS, Kubernetes, Terraform, and Docker pipelines. CKA and AWS Professional Certified.`
  },
  {
    id: 'cand-007',
    name: 'Maya Lin',
    email: 'maya.lin@example.com',
    phone: '+1 (555) 890-1234',
    location: 'San Jose, CA',
    currentRole: 'Senior React & Mobile Developer',
    totalExperienceYears: 6,
    status: 'screened',
    uploadedAt: '2026-09-02T14:20:00Z',
    summary: 'Frontend Engineer specializing in React, React Native, TypeScript, and modern state management. 6 years experience delivering cross-platform web and mobile web applications.',
    skills: [
      { name: 'React', category: 'frontend', yearsOfExperience: 6, proficiency: 'expert' },
      { name: 'React Native', category: 'frontend', yearsOfExperience: 4, proficiency: 'advanced' },
      { name: 'TypeScript', category: 'frontend', yearsOfExperience: 5, proficiency: 'advanced' },
      { name: 'Redux / MobX', category: 'frontend', yearsOfExperience: 5, proficiency: 'advanced' },
      { name: 'CSS/Sass', category: 'frontend', yearsOfExperience: 6, proficiency: 'expert' }
    ],
    experience: [
      {
        company: 'MobileX Solutions',
        title: 'Senior Frontend Developer',
        startDate: '2022-03',
        endDate: 'Present',
        location: 'San Jose, CA',
        responsibilities: [
          'Built web and mobile web interfaces using React and TypeScript.',
          'Integrated offline state persistence and push notifications.'
        ],
        technologies: ['React', 'TypeScript', 'Redux', 'Sass']
      }
    ],
    education: [
      {
        institution: 'San Jose State University',
        degree: "Bachelor of Science",
        fieldOfStudy: 'Software Engineering',
        graduationYear: 2020
      }
    ],
    projects: [],
    certifications: [],
    rawResumeText: `MAYA LIN
San Jose, CA | maya.lin@example.com

SUMMARY
Senior React & Mobile Web Developer with 6 years experience in React, TypeScript, and state management.`
  },
  {
    id: 'cand-008',
    name: 'Robert Miller',
    email: 'robert.miller@example.com',
    phone: '+1 (555) 901-2345',
    location: 'Boston, MA',
    currentRole: 'Backend AI Engineer',
    totalExperienceYears: 4,
    status: 'new',
    uploadedAt: '2026-09-03T11:00:00Z',
    summary: 'Backend & AI Engineer with 4 years experience in Python, Node.js, vector databases (Pinecone, pgvector), and LangChain. Passionate about building intelligent search engines and generative AI APIs.',
    skills: [
      { name: 'Node.js', category: 'backend', yearsOfExperience: 4, proficiency: 'advanced' },
      { name: 'Python', category: 'ai_ml', yearsOfExperience: 4, proficiency: 'expert' },
      { name: 'TypeScript', category: 'backend', yearsOfExperience: 3, proficiency: 'intermediate' },
      { name: 'pgvector / Vector Search', category: 'ai_ml', yearsOfExperience: 2, proficiency: 'advanced' },
      { name: 'PostgreSQL', category: 'database', yearsOfExperience: 3, proficiency: 'intermediate' }
    ],
    experience: [
      {
        company: 'Cognitive Tech Labs',
        title: 'Backend AI Engineer',
        startDate: '2022-06',
        endDate: 'Present',
        location: 'Boston, MA',
        responsibilities: [
          'Engineered vector search index service using pgvector and Python/FastAPI.',
          'Connected Node.js API gateway to Python AI inference workers.'
        ],
        technologies: ['Python', 'Node.js', 'pgvector', 'FastAPI', 'Docker']
      }
    ],
    education: [
      {
        institution: 'Northeastern University',
        degree: "Bachelor of Science",
        fieldOfStudy: 'Computer Science',
        graduationYear: 2022
      }
    ],
    projects: [],
    certifications: [],
    rawResumeText: `ROBERT MILLER
Boston, MA | robert.miller@example.com

SUMMARY
Backend AI Engineer with 4 years experience building vector search services with Python, Node.js, pgvector, and FastAPI.`
  },
  {
    id: 'cand-009',
    name: 'Jessica Taylor',
    email: 'jessica.taylor@example.com',
    phone: '+1 (555) 012-3456',
    location: 'Atlanta, GA',
    currentRole: 'Fullstack Software Engineer',
    totalExperienceYears: 5,
    status: 'new',
    uploadedAt: '2026-09-04T15:30:00Z',
    summary: 'Fullstack Developer with 5 years experience across React, Node.js, Express, and PostgreSQL. Experienced in building end-to-end web applications and RESTful APIs.',
    skills: [
      { name: 'React', category: 'frontend', yearsOfExperience: 5, proficiency: 'advanced' },
      { name: 'Node.js', category: 'backend', yearsOfExperience: 5, proficiency: 'advanced' },
      { name: 'TypeScript', category: 'frontend', yearsOfExperience: 3, proficiency: 'intermediate' },
      { name: 'PostgreSQL', category: 'database', yearsOfExperience: 4, proficiency: 'intermediate' }
    ],
    experience: [
      {
        company: 'Atlanta Digital Labs',
        title: 'Fullstack Software Engineer',
        startDate: '2021-07',
        endDate: 'Present',
        location: 'Atlanta, GA',
        responsibilities: [
          'Developed fullstack client portals in React and Node.js.',
          'Integrated payment services and database persistence layers.'
        ],
        technologies: ['React', 'Node.js', 'Express', 'PostgreSQL']
      }
    ],
    education: [
      {
        institution: 'Georgia Institute of Technology',
        degree: "Bachelor of Science",
        fieldOfStudy: 'Computer Science',
        graduationYear: 2021
      }
    ],
    projects: [],
    certifications: [],
    rawResumeText: `JESSICA TAYLOR
Atlanta, GA | jessica.taylor@example.com

SUMMARY
Fullstack Software Engineer with 5 years experience building React and Node.js applications.`
  },
  {
    id: 'cand-010',
    name: 'Kevin O\'Connor',
    email: 'kevin.oconnor@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Austin, TX',
    currentRole: 'Junior Frontend Developer',
    totalExperienceYears: 2,
    status: 'new',
    uploadedAt: '2026-09-05T09:45:00Z',
    summary: 'Enthusiastic Junior Frontend Developer with 2 years experience in React, JavaScript, HTML, and CSS. Eager to grow TypeScript and advanced performance optimization skills.',
    skills: [
      { name: 'React', category: 'frontend', yearsOfExperience: 2, proficiency: 'intermediate' },
      { name: 'JavaScript', category: 'frontend', yearsOfExperience: 2, proficiency: 'intermediate' },
      { name: 'HTML5/CSS3', category: 'frontend', yearsOfExperience: 2, proficiency: 'advanced' },
      { name: 'TypeScript', category: 'frontend', yearsOfExperience: 1, proficiency: 'beginner' }
    ],
    experience: [
      {
        company: 'StartupLaunch Austin',
        title: 'Junior Frontend Developer',
        startDate: '2024-06',
        endDate: 'Present',
        location: 'Austin, TX',
        responsibilities: [
          'Assisted senior engineers building UI components in React.',
          'Fixed cross-browser styling issues and UI bugs.'
        ],
        technologies: ['React', 'JavaScript', 'CSS']
      }
    ],
    education: [
      {
        institution: 'Texas State University',
        degree: "Bachelor of Science",
        fieldOfStudy: 'Digital Media Tech',
        graduationYear: 2024
      }
    ],
    projects: [],
    certifications: [],
    rawResumeText: `KEVIN O'CONNOR
Austin, TX | kevin.oconnor@example.com

SUMMARY
Junior Frontend Developer with 2 years experience building React interfaces.`
  }
];
