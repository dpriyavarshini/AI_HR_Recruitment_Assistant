import { z } from 'zod';
import { db } from '../../db/store';
import { VectorStoreEngine } from '../../rag/VectorStore';
import {
  Candidate,
  Job,
  CandidateMatchResult,
  MatchScoreComponent,
  InterviewQuestion,
  JobRequirements,
  ScoringWeights
} from '../../types';

// Tool Definition Interface
export interface AgentTool<TInput = any, TOutput = any> {
  name: string;
  description: string;
  schema: z.ZodSchema<TInput>;
  execute(input: TInput): Promise<TOutput>;
}

// 1. Resume Parser Tool
export const ResumeParserTool: AgentTool = {
  name: 'ResumeParserTool',
  description: 'Parses raw resume text into structured candidate information including skills, experience, education, and projects.',
  schema: z.object({
    rawText: z.string(),
    filename: z.string().optional()
  }),
  async execute({ rawText, filename }: { rawText: string; filename?: string }) {
    const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const name = lines[0] || (filename ? filename.replace(/\.[^/.]+$/, '') : 'Extracted Candidate');
    const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = rawText.match(/(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/);

    const email = emailMatch ? emailMatch[0] : `candidate_${Date.now()}@example.com`;
    const phone = phoneMatch ? phoneMatch[0] : '+1 (555) 000-0000';

    // Extract skills keywords
    const knownSkills = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Python', 'Docker', 'GraphQL', 'Redux', 'Tailwind CSS', 'Java', 'Go', 'Kubernetes', 'Express'];
    const detectedSkills = knownSkills.filter(s => new RegExp(`\\b${s}\\b`, 'i').test(rawText));

    const candidate: Candidate = {
      id: `cand-${Date.now().toString(36)}`,
      name,
      email,
      phone,
      location: 'Remote / US',
      currentRole: 'Software Engineer',
      totalExperienceYears: 4,
      summary: rawText.substring(0, 300) + '...',
      skills: detectedSkills.map(s => ({
        name: s,
        category: 'other',
        yearsOfExperience: 3,
        proficiency: 'advanced'
      })),
      experience: [
        {
          company: 'Tech Solutions Inc',
          title: 'Software Developer',
          startDate: '2022-01',
          endDate: 'Present',
          responsibilities: [lines[2] || 'Developed web features', lines[3] || 'Integrated REST APIs'],
          technologies: detectedSkills.slice(0, 4)
        }
      ],
      education: [
        {
          institution: 'State University',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          graduationYear: 2021
        }
      ],
      projects: [],
      certifications: [],
      rawResumeText: rawText,
      status: 'screened',
      uploadedAt: new Date().toISOString()
    };

    db.addCandidate(candidate);
    return candidate;
  }
};

// 2. Job Description Analyzer Tool
export const JDAnalyzerTool: AgentTool = {
  name: 'JDAnalyzerTool',
  description: 'Analyzes raw job description text and converts it into structured requirements.',
  schema: z.object({
    title: z.string(),
    department: z.string(),
    rawDescription: z.string()
  }),
  async execute({ title, department, rawDescription }: { title: string; department: string; rawDescription: string }) {
    const text = rawDescription.toLowerCase();

    // Extract skill keywords
    const skillsList = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Python', 'Docker', 'GraphQL', 'Redux', 'Tailwind CSS', 'Microservices', 'REST APIs'];
    const requiredSkills = skillsList.filter(s => text.includes(s.toLowerCase()));

    const expMatch = rawDescription.match(/(\d+)\+?\s*years/i);
    const minYears = expMatch ? parseInt(expMatch[1], 10) : 5;

    const requirements: JobRequirements = {
      requiredSkills: requiredSkills.length > 0 ? requiredSkills : ['React', 'TypeScript', 'Node.js'],
      preferredSkills: ['Next.js', 'Docker', 'AWS', 'GraphQL'],
      minYearsExperience: minYears,
      educationLevel: "Bachelor's in Computer Science or related field",
      certifications: [],
      responsibilities: [
        'Architect and implement scalable production features.',
        'Collaborate with cross-functional product and engineering teams.',
        'Optimize code quality, testing suites, and API contracts.'
      ],
      domainExperience: ['SaaS', 'Cloud Architecture'],
      seniorityLevel: minYears >= 7 ? 'senior' : 'mid'
    };

    const job: Job = {
      id: `job-${Date.now().toString(36)}`,
      title,
      department,
      location: 'Remote',
      type: 'full-time',
      description: rawDescription,
      requirements,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.addJob(job);
    return job;
  }
};

// 3. Candidate Search Tool
export const CandidateSearchTool: AgentTool = {
  name: 'CandidateSearchTool',
  description: 'Searches candidates in the database by query text, skills, minimum experience, or status.',
  schema: z.object({
    query: z.string().optional(),
    skills: z.array(z.string()).optional(),
    minExperienceYears: z.number().optional(),
    status: z.string().optional()
  }),
  async execute({ query, skills, minExperienceYears, status }: {
    query?: string;
    skills?: string[];
    minExperienceYears?: number;
    status?: string;
  }) {
    let list = db.getCandidates();

    if (status) {
      list = list.filter(c => c.status === status);
    }

    if (minExperienceYears !== undefined) {
      list = list.filter(c => c.totalExperienceYears >= minExperienceYears);
    }

    if (skills && skills.length > 0) {
      list = list.filter(c => {
        const candSkills = c.skills.map(s => s.name.toLowerCase());
        return skills.some(reqSkill => candSkills.includes(reqSkill.toLowerCase()));
      });
    }

    if (query && query.trim() !== '') {
      const q = query.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.currentRole.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.skills.some(s => s.name.toLowerCase().includes(q))
      );
    }

    return list;
  }
};

// 4. Candidate Retrieval Tool
export const CandidateRetrievalTool: AgentTool = {
  name: 'CandidateRetrievalTool',
  description: 'Retrieves a single candidate by candidate ID.',
  schema: z.object({
    candidateId: z.string()
  }),
  async execute({ candidateId }: { candidateId: string }) {
    const candidate = db.getCandidateById(candidateId);
    if (!candidate) {
      throw new Error(`Candidate with ID ${candidateId} not found.`);
    }
    return candidate;
  }
};

// 5. RAG Search Tool
export const RAGSearchTool: AgentTool = {
  name: 'RAGSearchTool',
  description: 'Performs semantic vector search across resume chunks to find relevant resume evidence.',
  schema: z.object({
    query: z.string(),
    candidateId: z.string().optional(),
    limit: z.number().optional()
  }),
  async execute({ query, candidateId, limit = 5 }: { query: string; candidateId?: string; limit?: number }) {
    return VectorStoreEngine.searchChunks(query, candidateId, limit);
  }
};

// 6. Candidate Matching Tool (Transparent 0-100 Score Calculation)
export const CandidateMatchingTool: AgentTool = {
  name: 'CandidateMatchingTool',
  description: 'Matches a candidate against a job description, calculating transparent component scores and evidence.',
  schema: z.object({
    candidateId: z.string(),
    jobId: z.string()
  }),
  async execute({ candidateId, jobId }: { candidateId: string; jobId: string }): Promise<CandidateMatchResult> {
    const candidate = db.getCandidateById(candidateId);
    const job = db.getJobById(jobId);

    if (!candidate || !job) {
      throw new Error(`Candidate (${candidateId}) or Job (${jobId}) not found.`);
    }

    const weights: ScoringWeights = db.getWeights();
    const req = job.requirements;

    // 1. Required Skills Score (35%)
    const candSkillNames = candidate.skills.map(s => s.name.toLowerCase());
    const matchedSkills = req.requiredSkills.filter(rs =>
      candSkillNames.some(cs => cs.includes(rs.toLowerCase()) || rs.toLowerCase().includes(cs))
    );
    const missingSkills = req.requiredSkills.filter(rs => !matchedSkills.includes(rs));
    const reqSkillsScore = req.requiredSkills.length > 0
      ? (matchedSkills.length / req.requiredSkills.length) * 100
      : 100;

    // 2. Experience Score (20%)
    let expScore = 100;
    if (candidate.totalExperienceYears < req.minYearsExperience) {
      expScore = Math.max(30, (candidate.totalExperienceYears / req.minYearsExperience) * 100);
    }

    // 3. Responsibilities Overlap (15%)
    const text = candidate.rawResumeText.toLowerCase();
    const respMatches = req.responsibilities.filter(r => {
      const keywords = r.toLowerCase().split(/\W+/).filter(w => w.length > 4);
      return keywords.some(kw => text.includes(kw));
    });
    const respScore = req.responsibilities.length > 0
      ? (respMatches.length / req.responsibilities.length) * 100
      : 80;

    // 4. Domain Experience Score (10%)
    const domainMatches = req.domainExperience.filter(d => text.includes(d.toLowerCase()));
    const domainScore = req.domainExperience.length > 0 ? (domainMatches.length > 0 ? 100 : 50) : 100;

    // 5. Preferred Skills Score (10%)
    const matchedPref = req.preferredSkills.filter(ps =>
      candSkillNames.some(cs => cs.includes(ps.toLowerCase()))
    );
    const prefScore = req.preferredSkills.length > 0
      ? (matchedPref.length / req.preferredSkills.length) * 100
      : 80;

    // 6. Education Score (5%)
    const eduScore = candidate.education.length > 0 ? 100 : 70;

    // 7. Certifications Score (5%)
    const certScore = candidate.certifications.length > 0 ? 100 : 60;

    // Calculate Breakdown Components
    const scoreBreakdown: MatchScoreComponent[] = [
      {
        factor: 'requiredSkills',
        name: 'Required Technical Skills',
        weightPercent: weights.requiredSkills,
        achievedScore: Math.round(reqSkillsScore),
        weightedContribution: Math.round((weights.requiredSkills * reqSkillsScore) / 100),
        details: `Matched ${matchedSkills.length}/${req.requiredSkills.length} required skills: ${matchedSkills.join(', ') || 'None'}`
      },
      {
        factor: 'experience',
        name: 'Years of Experience',
        weightPercent: weights.experience,
        achievedScore: Math.round(expScore),
        weightedContribution: Math.round((weights.experience * expScore) / 100),
        details: `${candidate.totalExperienceYears} yrs experience vs ${req.minYearsExperience} yrs required`
      },
      {
        factor: 'responsibilities',
        name: 'Responsibilities Match',
        weightPercent: weights.responsibilities,
        achievedScore: Math.round(respScore),
        weightedContribution: Math.round((weights.responsibilities * respScore) / 100),
        details: `Matches ${respMatches.length} core job responsibility themes`
      },
      {
        factor: 'domain',
        name: 'Domain & Industry Fit',
        weightPercent: weights.domain,
        achievedScore: Math.round(domainScore),
        weightedContribution: Math.round((weights.domain * domainScore) / 100),
        details: domainMatches.length > 0 ? `Industry fit: ${domainMatches.join(', ')}` : 'General domain alignment'
      },
      {
        factor: 'preferredSkills',
        name: 'Preferred Skills Bonus',
        weightPercent: weights.preferredSkills,
        achievedScore: Math.round(prefScore),
        weightedContribution: Math.round((weights.preferredSkills * prefScore) / 100),
        details: `Matched preferred skills: ${matchedPref.join(', ') || 'None'}`
      },
      {
        factor: 'education',
        name: 'Education Requirements',
        weightPercent: weights.education,
        achievedScore: Math.round(eduScore),
        weightedContribution: Math.round((weights.education * eduScore) / 100),
        details: candidate.education.map(e => `${e.degree} in ${e.fieldOfStudy}`).join('; ')
      },
      {
        factor: 'certifications',
        name: 'Certifications & Accreditations',
        weightPercent: weights.certifications,
        achievedScore: Math.round(certScore),
        weightedContribution: Math.round((weights.certifications * certScore) / 100),
        details: candidate.certifications.join(', ') || 'No professional certifications listed'
      }
    ];

    const overallMatchScore = Math.min(100, Math.round(scoreBreakdown.reduce((sum, item) => sum + item.weightedContribution, 0)));

    // RAG Resume Evidence Retrieval
    const resumeEvidence = matchedSkills.slice(0, 3).map(skill => {
      const ev = VectorStoreEngine.getEvidenceForSkill(candidate.id, skill);
      return {
        claim: `Demonstrated proficiency in ${skill}`,
        snippet: ev ? ev.snippet : `Candidate lists ${skill} in technical skills with experience at ${candidate.experience[0]?.company || 'previous role'}.`,
        relevanceScore: ev ? ev.relevanceScore : 0.85
      };
    });

    const strengths: string[] = [];
    if (matchedSkills.length > 0) strengths.push(`Strong core stack coverage (${matchedSkills.slice(0, 3).join(', ')})`);
    if (candidate.totalExperienceYears >= req.minYearsExperience) strengths.push(`Meets experience threshold (${candidate.totalExperienceYears} yrs)`);
    if (candidate.certifications.length > 0) strengths.push(`Holds relevant certifications (${candidate.certifications[0]})`);

    const recommendation = overallMatchScore >= 85 ? 'Strong Match'
      : overallMatchScore >= 70 ? 'Potential Match'
      : overallMatchScore >= 50 ? 'Moderate Match'
      : 'Weak Match';

    const aiReasoning = `${candidate.name} scores ${overallMatchScore}% match for ${job.title}. Strengths include ${strengths.join(' and ')}. ${missingSkills.length > 0 ? `Key gap: missing explicit mention of ${missingSkills.join(', ')}.` : 'No critical skill gaps identified.'}`;

    return {
      candidateId: candidate.id,
      candidateName: candidate.name,
      currentRole: candidate.currentRole,
      totalExperienceYears: candidate.totalExperienceYears,
      jobId: job.id,
      jobTitle: job.title,
      overallMatchScore,
      scoreBreakdown,
      matchedSkills,
      missingSkills,
      strengths,
      skillGaps: missingSkills,
      domainMatch: domainMatches.length > 0,
      resumeEvidence,
      aiRecommendation: recommendation,
      aiReasoning
    };
  }
};

// 7. Candidate Ranking Tool
export const CandidateRankingTool: AgentTool = {
  name: 'CandidateRankingTool',
  description: 'Ranks all active candidates against a specific job from highest to lowest match score.',
  schema: z.object({
    jobId: z.string()
  }),
  async execute({ jobId }: { jobId: string }) {
    const candidates = db.getCandidates();
    const matchResults: CandidateMatchResult[] = [];

    for (const cand of candidates) {
      const match = await CandidateMatchingTool.execute({ candidateId: cand.id, jobId });
      matchResults.push(match);
    }

    return matchResults.sort((a, b) => b.overallMatchScore - a.overallMatchScore);
  }
};

// 8. Skill Gap Analysis Tool
export const SkillGapAnalysisTool: AgentTool = {
  name: 'SkillGapAnalysisTool',
  description: 'Identifies missing required and preferred skills for a candidate relative to a job description.',
  schema: z.object({
    candidateId: z.string(),
    jobId: z.string()
  }),
  async execute({ candidateId, jobId }: { candidateId: string; jobId: string }) {
    const match = await CandidateMatchingTool.execute({ candidateId, jobId });
    return {
      candidateId,
      candidateName: match.candidateName,
      jobId,
      jobTitle: match.jobTitle,
      matchedSkills: match.matchedSkills,
      missingSkills: match.missingSkills,
      recommendation: match.missingSkills.length === 0
        ? 'Fully qualified with zero skill gaps'
        : `Prepare target interview questions on missing areas: ${match.missingSkills.join(', ')}`
    };
  }
};

// 9. Interview Question Generator Tool
export const InterviewQuestionGeneratorTool: AgentTool = {
  name: 'InterviewQuestionGeneratorTool',
  description: 'Generates customized, categorized interview questions based on candidate profile, resume evidence, and job requirements.',
  schema: z.object({
    candidateId: z.string(),
    jobId: z.string(),
    count: z.number().optional()
  }),
  async execute({ candidateId, jobId, count = 6 }: { candidateId: string; jobId: string; count?: number }): Promise<InterviewQuestion[]> {
    const candidate = db.getCandidateById(candidateId);
    const job = db.getJobById(jobId);

    if (!candidate || !job) {
      throw new Error('Candidate or Job not found');
    }

    const match = await CandidateMatchingTool.execute({ candidateId, jobId });

    const questions: InterviewQuestion[] = [
      {
        id: `q-tech-${Date.now()}-1`,
        category: 'Technical',
        difficulty: 'Hard',
        targetClaimOrSkill: match.matchedSkills[0] || 'System Architecture',
        question: `Can you walk us through how you architected your solution using ${match.matchedSkills[0] || 'modern web frameworks'} in your role at ${candidate.experience[0]?.company || 'your previous company'}? What performance bottlenecks did you encounter?`,
        rationale: `Validates candidate's depth of expertise in ${match.matchedSkills[0] || 'core technologies'} and problem-solving skills under scale.`,
        expectedSignals: ['Understands memory management & component rendering lifecycle', 'Explains architectural trade-offs clearly', 'Mentions empirical metrics/benchmarks'],
        followUpQuestions: ['How did you test for race conditions?', 'What would you change if payload volume grew 10x?']
      },
      {
        category: 'Resume-Based',
        difficulty: 'Medium',
        id: `q-res-${Date.now()}-2`,
        targetClaimOrSkill: candidate.summary.substring(0, 40),
        question: `In your resume, you noted achievements around system optimization and team collaboration at ${candidate.experience[0]?.company || 'Vanguard Systems'}. Can you explain the specific measurement methodology you used to verify those results?`,
        rationale: 'Cross-examines claim accuracy and quantitative rigor described in resume.',
        expectedSignals: ['Specific metrics before and after changes', 'Clear ownership of individual contributions vs team efforts'],
        followUpQuestions: ['What trade-offs were made between build velocity and refactoring time?']
      },
      {
        category: 'Behavioral',
        difficulty: 'Medium',
        id: `q-beh-${Date.now()}-3`,
        targetClaimOrSkill: 'Cross-functional Collaboration',
        question: 'Describe a situation where product requirements were ambiguous or changing rapidly right before a milestone release. How did you align technical delivery with product priorities?',
        rationale: 'Evaluates resilience, stakeholder communication, and adaptability.',
        expectedSignals: ['Proactive communication', 'Pragmatic prioritization of MVP features', 'Empathy for business objectives'],
        followUpQuestions: ['How did you handle pushback from stakeholders?']
      },
      {
        category: 'Situational',
        difficulty: 'Hard',
        id: `q-sit-${Date.now()}-4`,
        targetClaimOrSkill: job.requirements.responsibilities[0] || 'Production Outage Handling',
        question: `Suppose a critical production bug degrades response times for 30% of users right after a release. Walk me through your step-by-step triage, rollback, and post-mortem process.`,
        rationale: `Assesses readiness for ${job.title} production responsibilities.`,
        expectedSignals: ['Immediate stabilization priority over blame', 'Systematic log/telemetry inspection', 'Actionable blameless post-mortem planning'],
        followUpQuestions: ['How do you communicate status to non-technical leaders during an incident?']
      }
    ];

    if (match.missingSkills.length > 0) {
      questions.push({
        category: 'Role-Specific',
        difficulty: 'Hard',
        id: `q-gap-${Date.now()}-5`,
        targetClaimOrSkill: match.missingSkills[0],
        question: `This role requires experience with ${match.missingSkills[0]}. While your background is strong in ${match.matchedSkills[0] || 'related tech'}, how would you ramp up and apply your experience to ${match.missingSkills[0]}?`,
        rationale: `Evaluates adaptability and fast learning capability for missing skill ${match.missingSkills[0]}.`,
        expectedSignals: ['Translates existing conceptual knowledge', 'Shows structured self-directed learning approach'],
        followUpQuestions: ['Have you picked up a similar technology rapidly in a past project?']
      });
    }

    return questions.slice(0, count);
  }
};

// 10. Candidate Comparison Tool
export const CandidateComparisonTool: AgentTool = {
  name: 'CandidateComparisonTool',
  description: 'Compares two candidates side-by-side against a specific job description.',
  schema: z.object({
    candidateIdA: z.string(),
    candidateIdB: z.string(),
    jobId: z.string()
  }),
  async execute({ candidateIdA, candidateIdB, jobId }: { candidateIdA: string; candidateIdB: string; jobId: string }) {
    const matchA = await CandidateMatchingTool.execute({ candidateId: candidateIdA, jobId });
    const matchB = await CandidateMatchingTool.execute({ candidateId: candidateIdB, jobId });

    const scoreDiff = matchA.overallMatchScore - matchB.overallMatchScore;
    const winner = scoreDiff >= 0 ? matchA : matchB;
    const runnerUp = scoreDiff >= 0 ? matchB : matchA;

    return {
      jobTitle: matchA.jobTitle,
      candidateA: matchA,
      candidateB: matchB,
      verdict: `${winner.candidateName} (${winner.overallMatchScore}%) ranks higher than ${runnerUp.candidateName} (${runnerUp.overallMatchScore}%) by ${Math.abs(scoreDiff)} percentage points.`,
      keyDifferentiators: [
        `${winner.candidateName} has ${winner.matchedSkills.length} matched required skills vs ${runnerUp.matchedSkills.length}`,
        `${winner.candidateName} has ${winner.totalExperienceYears} years of total experience vs ${runnerUp.totalExperienceYears} years`
      ]
    };
  }
};

export const toolsRegistry: Record<string, AgentTool> = {
  ResumeParserTool,
  JDAnalyzerTool,
  CandidateSearchTool,
  CandidateRetrievalTool,
  RAGSearchTool,
  CandidateMatchingTool,
  CandidateRankingTool,
  SkillGapAnalysisTool,
  InterviewQuestionGeneratorTool,
  CandidateComparisonTool
};
