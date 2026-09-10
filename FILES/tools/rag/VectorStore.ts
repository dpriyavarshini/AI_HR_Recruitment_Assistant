import { DocumentChunk, ResumeEvidence } from '../types';
import { db } from '../db/store';

export class VectorStoreEngine {
  /**
   * Simple TF-IDF / Term-based vector similarity calculation
   * providing cosine similarity matching over document chunks.
   */
  private static calculateSimilarity(query: string, text: string): number {
    const queryTerms = query.toLowerCase().split(/\W+/).filter(t => t.length > 2);
    const textTerms = text.toLowerCase().split(/\W+/).filter(t => t.length > 2);

    if (queryTerms.length === 0 || textTerms.length === 0) return 0;

    let matchCount = 0;
    const textSet = new Set(textTerms);

    queryTerms.forEach(term => {
      if (textSet.has(term)) {
        matchCount += 1;
      }
    });

    // Jaccard / Cosine overlap score normalize 0 to 1
    const unionSize = new Set([...queryTerms, ...textTerms]).size;
    return matchCount / Math.max(1, Math.min(queryTerms.length, unionSize / 2));
  }

  /**
   * Search vector chunks across all candidates or for a specific candidate
   */
  public static searchChunks(query: string, candidateId?: string, limit: number = 5): ResumeEvidence[] {
    const chunks = candidateId
      ? db.getChunksForCandidate(candidateId)
      : db.getAllDocumentChunks();

    const scored = chunks.map(chunk => {
      const relevanceScore = this.calculateSimilarity(query, chunk.text);
      return {
        claim: `Evidence matching "${query}"`,
        snippet: chunk.text,
        relevanceScore: Math.min(1.0, relevanceScore * 1.5),
        chunkId: chunk.id
      };
    });

    return scored
      .filter(item => item.relevanceScore > 0.1)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }

  /**
   * Extracts evidence snippets for specific skills or requirements
   */
  public static getEvidenceForSkill(candidateId: string, skill: string): ResumeEvidence | null {
    const results = this.searchChunks(skill, candidateId, 1);
    if (results.length > 0) {
      return results[0];
    }
    return null;
  }
}
