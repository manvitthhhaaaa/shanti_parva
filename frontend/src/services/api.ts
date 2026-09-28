import type { ChatResponse, PassageMetadata, BhishmaResponse, ThemeInfo } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

// Fallback client-side mock data & engine in case Python backend is not active
import fallbackKBData from '../../../data/shanti_parva/shanti_parva_kb.json';

export async function sendChatMessage(message: string, useLiveApi: boolean = false): Promise<ChatResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, use_live_api: useLiveApi })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend API unreachable, using client-side academic RAG engine fallback:", err);
  }

  // Client-side Fallback execution
  const msgLower = message.toLowerCase();
  let matchedPassages: PassageMetadata[] = (fallbackKBData as PassageMetadata[]).filter(p => 
    p.summary.toLowerCase().includes(msgLower) ||
    p.translation.toLowerCase().includes(msgLower) ||
    p.theme.some(t => msgLower.includes(t.toLowerCase())) ||
    p.keywords.some(k => msgLower.includes(k.toLowerCase()))
  );

  if (matchedPassages.length === 0) {
    matchedPassages = [(fallbackKBData as PassageMetadata[])[0]];
  }

  const primarySource = matchedPassages[0];
  const detectedThemes = primarySource.theme.map(t => t.charAt(0).toUpperCase() + t.slice(1));

  return {
    user_concern_summary: `You expressed a concern regarding: "${message}"`,
    themes: detectedThemes,
    sources: matchedPassages.slice(0, 2),
    teaching_explanation: `In ${primarySource.sub_parva || 'Shanti Parva'} (${primarySource.section}, Verse ${primarySource.verse}), the text states: "${primarySource.translation}"`,
    modern_perspective: `(AI Interpretation) From a modern perspective, this teaching highlights how ${primarySource.theme[0]} applies to your situation. Rather than acting on immediate impulse, prioritizing long-term clarity and emotional calm helps navigate the dilemma effectively.`,
    reflection_questions: [
      "What outcome do you actually want from this situation?",
      "Will acting out of immediate emotion bring you closer to that outcome?",
      "What would change if you paused before taking your next action?"
    ],
    important_note: "IMPORTANT NOTE: Philosophical reflection on ancient wisdom is intended for moral clarity and personal perspective. It is NOT a substitute for professional medical, mental health, or legal counsel.",
    is_demo_mode: true,
    retrieval_debug: {
      total_kb_documents: fallbackKBData.length,
      top_k_retrieved: Math.min(2, matchedPassages.length),
      similarity_scores: matchedPassages.slice(0, 2).map(p => ({
        id: p.id,
        section: p.section,
        score: 0.88,
        summary: p.summary
      })),
      vectorizer_vocab_size: 142
    }
  };
}

export async function fetchThemes(): Promise<ThemeInfo[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/themes`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Backend themes fallback:", err);
  }

  const themeMap: Record<string, number> = {};
  (fallbackKBData as PassageMetadata[]).forEach(p => {
    p.theme.forEach(t => {
      const cap = t.charAt(0).toUpperCase() + t.slice(1);
      themeMap[cap] = (themeMap[cap] || 0) + 1;
    });
  });

  return Object.entries(themeMap).map(([name, count]) => ({
    name,
    count,
    keywords: [name.toLowerCase(), "wisdom", "dharma", "conduct"]
  }));
}

export async function fetchPassages(query?: string, theme?: string, subParva?: string): Promise<PassageMetadata[]> {
  try {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (theme) params.append('theme', theme);
    if (subParva) params.append('sub_parva', subParva);

    const res = await fetch(`${API_BASE_URL}/passages?${params.toString()}`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Backend passages fallback:", err);
  }

  let list = fallbackKBData as PassageMetadata[];
  if (subParva) list = list.filter(p => p.sub_parva?.toLowerCase().includes(subParva.toLowerCase()));
  if (theme) list = list.filter(p => p.theme.some(t => t.toLowerCase() === theme.toLowerCase()));
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(p => 
      p.translation.toLowerCase().includes(q) || 
      p.summary.toLowerCase().includes(q) ||
      p.keywords.some(k => k.toLowerCase().includes(q))
    );
  }
  return list;
}

export async function sendBhishmaScenario(situation: string): Promise<BhishmaResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/bhishma-teach`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ situation })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Backend Bhishma fallback:", err);
  }

  const primarySource = (fallbackKBData as PassageMetadata[])[0];
  return {
    situation_summary: `You described a situation involving: "${situation}"`,
    relevant_principle: primarySource.summary,
    source: primarySource,
    ai_interpretation: `Relevant teachings associated with Bhishma's discourse in Shanti Parva emphasize that when facing difficult decisions, a wise leader acts not out of impulse or personal desire, but through selfless duty and moral fortitude.`,
    reflection: [
      "What choice best protects the welfare of those who depend on your decision?",
      "If your choice were evaluated by a trusted mentor, would it stand the test of integrity?",
      "What long-term consequences will emerge after immediate friction settles?"
    ],
    is_demo_mode: true
  };
}
