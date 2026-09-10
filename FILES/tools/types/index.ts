export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'database' | 'ai_ml' | 'cloud' | 'management' | 'other';

export interface CandidateSkill {
  name: string;
  category: SkillCategory;
  yearsOfExperience: number;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface CandidateExperience {
  company: string;
  title: string;
  startDate: string;
  endDate: string | 'Present';
  location?: string;
  responsibilities: string[];
  achievements?: string[];
  technologies: string[];
}

export interface CandidateEducation {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: number;
}

export interface CandidateProject {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  highlights?: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  currentRole: string;
  totalExperienceYears: number;
  summary: string;
  skills: CandidateSkill[];
  experience: CandidateExperience[];
  education: CandidateEducation[];
  projects: CandidateProject[];
  certifications: string[];
  rawResumeText: string;
  status: 'new' | 'screened' | 'matched' | 'interviewing' | 'offered' | 'rejected';
  uploadedAt: string;
}

export interface JobRequirements {
  requiredSkills: string[];
  preferredSkills: string[];
  minYearsExperience: number;
  maxYearsExperience?: number;
  educationLevel: string;
  certifications: string[];
  responsibilities: string[];
  domainExperience: string[];
  seniorityLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  description: string;
  requirements: JobRequirements;
  status: 'active' | 'draft' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface MatchScoreComponent {
  factor: 'requiredSkills' | 'experience' | 'responsibilities' | 'domain' | 'preferredSkills' | 'education' | 'certifications';
  name: string;
  weightPercent: number; // e.g. 35
  achievedScore: number; // 0 to 100
  weightedContribution: number; // (weightPercent * achievedScore) / 100
  details: string;
}

export interface ResumeEvidence {
  claim: string;
  snippet: string;
  relevanceScore: number;
  chunkId?: string;
}

export interface CandidateMatchResult {
  candidateId: string;
  candidateName: string;
  currentRole: string;
  totalExperienceYears: number;
  jobId: string;
  jobTitle: string;
  overallMatchScore: number; // 0-100
  scoreBreakdown: MatchScoreComponent[];
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  skillGaps: string[];
  domainMatch: boolean;
  resumeEvidence: ResumeEvidence[];
  aiRecommendation: 'Strong Match' | 'Potential Match' | 'Moderate Match' | 'Weak Match';
  aiReasoning: string;
}

export type QuestionCategory = 'Technical' | 'Behavioral' | 'Situational' | 'Resume-Based' | 'Role-Specific';
export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export interface InterviewQuestion {
  id: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  question: string;
  rationale: string;
  expectedSignals: string[];
  followUpQuestions?: string[];
  targetClaimOrSkill?: string;
}

export interface InterviewPlanSection {
  title: string;
  durationMinutes: number;
  purpose: string;
  suggestedQuestions: InterviewQuestion[];
}

export interface InterviewPlan {
  id: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  totalDurationMinutes: number;
  interviewType: 'Initial Screening' | 'Technical Deep Dive' | 'System Architecture' | 'Culture & Behavioral' | 'Final Round';
  sections: InterviewPlanSection[];
  createdAt: string;
}

export interface DocumentChunk {
  id: string;
  candidateId: string;
  chunkIndex: number;
  text: string;
  embedding?: number[];
  metadata?: Record<string, any>;
}

export interface AgentToolTrace {
  toolName: string;
  input: any;
  output: any;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  toolTraces?: AgentToolTrace[];
  candidateCards?: CandidateMatchResult[];
  interviewQuestions?: InterviewQuestion[];
}

export interface ScoringWeights {
  requiredSkills: number; // default 35
  experience: number;     // default 20
  responsibilities: number;// default 15
  domain: number;         // default 10
  preferredSkills: number;// default 10
  education: number;      // default 5
  certifications: number; // default 5
}

export interface RecruiterNote {
  id: string;
  candidateId: string;
  authorName: string;
  content: string;
  createdAt: string;
}
