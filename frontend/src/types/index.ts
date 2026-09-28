export interface PassageMetadata {
  id: string;
  parva: string;
  part?: string;
  sub_parva?: string;
  section: string;
  chapter: string;
  verse?: string;
  source_url?: string;
  themes?: string[];
  theme: string[];
  original_text: string;
  translation: string;
  summary: string;
  keywords: string[];
  similarity_score?: number;
}

export interface ChatResponse {
  user_concern_summary: string;
  themes: string[];
  sources: PassageMetadata[];
  teaching_explanation: string;
  modern_perspective: string;
  reflection_questions: string[];
  important_note: string;
  is_demo_mode: boolean;
  retrieval_debug?: {
    total_kb_documents: number;
    top_k_retrieved: number;
    similarity_scores: {
      id: string;
      section: string;
      score: number;
      summary: string;
      source_url?: string;
    }[];
    vectorizer_vocab_size: number;
  };
}

export interface BhishmaResponse {
  situation_summary: string;
  relevant_principle: string;
  source: PassageMetadata;
  ai_interpretation: string;
  reflection: string[];
  is_demo_mode: boolean;
}

export interface ThemeInfo {
  name: string;
  count: number;
  keywords: string[];
}

export interface JournalEntry {
  id: string;
  date: string;
  question: string;
  theme: string[];
  teaching: string;
  sourceId: string;
  sourceSection: string;
  personalReflection: string;
}
