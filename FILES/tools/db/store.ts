import { Candidate, Job, RecruiterNote, ScoringWeights, InterviewPlan, DocumentChunk } from '../types';
import { sampleCandidates, sampleJobs, initialWeights } from './seedData';

class DatabaseStore {
  private candidates: Map<string, Candidate> = new Map();
  private jobs: Map<string, Job> = new Map();
  private weights: ScoringWeights = { ...initialWeights };
  private notes: Map<string, RecruiterNote[]> = new Map();
  private interviewPlans: Map<string, InterviewPlan> = new Map();
  private documentChunks: Map<string, DocumentChunk[]> = new Map(); // candidateId -> DocumentChunk[]

  constructor() {
    this.seed();
  }

  private seed() {
    sampleCandidates.forEach(cand => {
      this.candidates.set(cand.id, cand);
      this.createCandidateChunks(cand);
    });

    sampleJobs.forEach(job => {
      this.jobs.set(job.id, job);
    });

    // Sample initial recruiter note
    this.addNote('cand-001', {
      id: 'note-001',
      candidateId: 'cand-001',
      authorName: 'Senior Recruiter',
      content: 'Excellent candidate profile. Web vitals optimization results align directly with Senior React role requirements.',
      createdAt: '2026-08-29T10:00:00Z'
    });
  }

  public createCandidateChunks(candidate: Candidate): DocumentChunk[] {
    const text = candidate.rawResumeText;
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const chunks: DocumentChunk[] = [];

    // Simple paragraph/section based chunking
    let currentChunk = '';
    let idx = 0;

    for (const line of lines) {
      currentChunk += line + ' ';
      if (currentChunk.length > 250) {
        chunks.push({
          id: `chunk-${candidate.id}-${idx}`,
          candidateId: candidate.id,
          chunkIndex: idx,
          text: currentChunk.trim()
        });
        idx++;
        currentChunk = '';
      }
    }

    if (currentChunk.trim().length > 0) {
      chunks.push({
        id: `chunk-${candidate.id}-${idx}`,
        candidateId: candidate.id,
        chunkIndex: idx,
        text: currentChunk.trim()
      });
    }

    this.documentChunks.set(candidate.id, chunks);
    return chunks;
  }

  // Candidate DB Operations
  public getCandidates(): Candidate[] {
    return Array.from(this.candidates.values());
  }

  public getCandidateById(id: string): Candidate | undefined {
    return this.candidates.get(id);
  }

  public addCandidate(candidate: Candidate): Candidate {
    this.candidates.set(candidate.id, candidate);
    this.createCandidateChunks(candidate);
    return candidate;
  }

  public updateCandidateStatus(id: string, status: Candidate['status']): Candidate | undefined {
    const cand = this.candidates.get(id);
    if (cand) {
      cand.status = status;
      this.candidates.set(id, cand);
      return cand;
    }
    return undefined;
  }

  // Job DB Operations
  public getJobs(): Job[] {
    return Array.from(this.jobs.values());
  }

  public getJobById(id: string): Job | undefined {
    return this.jobs.get(id);
  }

  public addJob(job: Job): Job {
    this.jobs.set(job.id, job);
    return job;
  }

  // Weights Operations
  public getWeights(): ScoringWeights {
    return { ...this.weights };
  }

  public updateWeights(newWeights: Partial<ScoringWeights>): ScoringWeights {
    this.weights = { ...this.weights, ...newWeights };
    return this.weights;
  }

  // Recruiter Notes Operations
  public getNotesForCandidate(candidateId: string): RecruiterNote[] {
    return this.notes.get(candidateId) || [];
  }

  public addNote(candidateId: string, note: RecruiterNote): RecruiterNote {
    const list = this.notes.get(candidateId) || [];
    list.push(note);
    this.notes.set(candidateId, list);
    return note;
  }

  // Interview Plan Operations
  public saveInterviewPlan(plan: InterviewPlan): InterviewPlan {
    this.interviewPlans.set(plan.id, plan);
    return plan;
  }

  public getInterviewPlan(id: string): InterviewPlan | undefined {
    return this.interviewPlans.get(id);
  }

  // RAG / Document Chunk Operations
  public getAllDocumentChunks(): DocumentChunk[] {
    const all: DocumentChunk[] = [];
    this.documentChunks.forEach(chunks => all.push(...chunks));
    return all;
  }

  public getChunksForCandidate(candidateId: string): DocumentChunk[] {
    return this.documentChunks.get(candidateId) || [];
  }
}

export const db = new DatabaseStore();
