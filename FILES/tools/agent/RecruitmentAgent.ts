import { toolsRegistry } from './tools';
import { db } from '../db/store';
import { AgentToolTrace, ChatMessage, CandidateMatchResult, InterviewQuestion } from '../types';

export class RecruitmentAgent {
  /**
   * Process a natural language request from a recruiter and route through appropriate tools & RAG.
   */
  public async handleChatPrompt(userPrompt: string): Promise<ChatMessage> {
    const promptLower = userPrompt.toLowerCase();
    const toolTraces: AgentToolTrace[] = [];
    let responseText = '';
    let candidateCards: CandidateMatchResult[] | undefined = undefined;
    let interviewQuestions: InterviewQuestion[] | undefined = undefined;

    // Detect user intent based on prompt keywords & entities
    const activeJobs = db.getJobs();
    const candidates = db.getCandidates();

    // Intent 1: Ranking / Best candidates request
    if (promptLower.includes('best') || promptLower.includes('top') || promptLower.includes('find candidates') || promptLower.includes('rank')) {
      const selectedJob = activeJobs.find(j => promptLower.includes(j.title.toLowerCase()) || promptLower.includes('react') || promptLower.includes('frontend')) || activeJobs[0];

      toolTraces.push({
        toolName: 'CandidateRankingTool',
        input: { jobId: selectedJob.id },
        output: `Ranked ${candidates.length} candidates for ${selectedJob.title}`,
        timestamp: new Date().toISOString()
      });

      const ranked = await toolsRegistry.CandidateRankingTool.execute({ jobId: selectedJob.id });
      candidateCards = ranked.slice(0, 3);

      responseText = `I have analyzed all active candidates in the knowledge base against **${selectedJob.title}** using multi-factor scoring (Skills, Experience, Responsibilities, Domain, Certifications). Here are the top 3 recommended candidates:`;
    }
    // Intent 2: Candidate Comparison
    else if (promptLower.includes('compare') || promptLower.includes('vs') || (promptLower.includes('better') && promptLower.includes('than'))) {
      const candA = candidates[0];
      const candB = candidates[1];
      const selectedJob = activeJobs[0];

      toolTraces.push({
        toolName: 'CandidateComparisonTool',
        input: { candidateIdA: candA.id, candidateIdB: candB.id, jobId: selectedJob.id },
        output: 'Compared candidates side-by-side',
        timestamp: new Date().toISOString()
      });

      const comparison = await toolsRegistry.CandidateComparisonTool.execute({
        candidateIdA: candA.id,
        candidateIdB: candB.id,
        jobId: selectedJob.id
      });

      candidateCards = [comparison.candidateA, comparison.candidateB];
      responseText = `**Candidate Comparison Summary:**\n\n${comparison.verdict}\n\n**Key Differentiators:**\n${comparison.keyDifferentiators.map(d => `- ${d}`).join('\n')}`;
    }
    // Intent 3: Generate Interview Questions
    else if (promptLower.includes('interview') || promptLower.includes('question') || promptLower.includes('questions')) {
      const targetCandidate = candidates.find(c => promptLower.includes(c.name.toLowerCase())) || candidates[0];
      const targetJob = activeJobs[0];

      toolTraces.push({
        toolName: 'InterviewQuestionGeneratorTool',
        input: { candidateId: targetCandidate.id, jobId: targetJob.id },
        output: `Generated 5 tailored interview questions for ${targetCandidate.name}`,
        timestamp: new Date().toISOString()
      });

      interviewQuestions = await toolsRegistry.InterviewQuestionGeneratorTool.execute({
        candidateId: targetCandidate.id,
        jobId: targetJob.id
      });

      responseText = `Here are personalized interview questions generated for **${targetCandidate.name}** applying for **${targetJob.title}**. These questions specifically probe their resume claims and test role requirements:`;
    }
    // Intent 4: Skill search / RAG evidence search
    else if (promptLower.includes('aws') || promptLower.includes('experience') || promptLower.includes('skill') || promptLower.includes('rag')) {
      const query = promptLower.includes('aws') ? 'AWS cloud' : 'React TypeScript';

      toolTraces.push({
        toolName: 'RAGSearchTool',
        input: { query, limit: 3 },
        output: 'Retrieved relevant candidate resume vector chunks',
        timestamp: new Date().toISOString()
      });

      const ragResults = await toolsRegistry.RAGSearchTool.execute({ query, limit: 3 });

      responseText = `**RAG Semantic Evidence Results for "${query}":**\n\n` +
        ragResults.map((r: any) => `> "${r.snippet}"\n*Relevance score: ${(r.relevanceScore * 100).toFixed(0)}%*`).join('\n\n');
    }
    // Fallback general recruitment assistance
    else {
      toolTraces.push({
        toolName: 'CandidateSearchTool',
        input: { query: userPrompt },
        output: 'Found candidates in knowledge base',
        timestamp: new Date().toISOString()
      });

      const searched = await toolsRegistry.CandidateSearchTool.execute({ query: userPrompt });

      responseText = `I searched the recruitment knowledge base for **"${userPrompt}"**. Found ${searched.length} matching candidates. You can ask me to rank candidates for a job, generate interview questions, or compare profiles side-by-side.`;
    }

    return {
      id: `msg-${Date.now().toString(36)}`,
      sender: 'assistant',
      content: responseText,
      timestamp: new Date().toISOString(),
      toolTraces,
      candidateCards,
      interviewQuestions
    };
  }
}

export const agent = new RecruitmentAgent();
