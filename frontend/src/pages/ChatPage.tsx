import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Send, BookOpen, CheckCircle, 
  HelpCircle, Bookmark, Copy, ExternalLink, Cpu, RefreshCw, AlertTriangle
} from 'lucide-react';
import { sendChatMessage } from '../services/api';
import { saveJournalEntry } from '../services/storage';
import type { ChatResponse, PassageMetadata } from '../types';
import { ThemeBadge } from '../components/common/ThemeBadge';
import { SourceDrawer } from '../components/common/SourceDrawer';

interface ChatPageProps {
  initialTheme?: string;
  isLiveApi: boolean;
}

export const ChatPage: React.FC<ChatPageProps> = ({ initialTheme, isLiveApi }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [selectedSource, setSelectedSource] = useState<PassageMetadata | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const examplePrompts = [
    "I am struggling to make an important decision.",
    "I am angry with someone and want revenge.",
    "I feel like I failed.",
    "I am struggling with my responsibilities.",
    "I don't know how to deal with conflict.",
    "I am afraid of losing someone."
  ];

  const demoQueries = [
    { label: "Anger & Revenge", query: "I am struggling with anger." },
    { label: "Duty & Responsibility", query: "I don't know what my responsibility is." },
    { label: "Fear of Failure", query: "I am afraid of failure." },
    { label: "Interpersonal Conflict", query: "I am dealing with conflict." },
    { label: "Difficult Decision", query: "I have to make a difficult decision." }
  ];

  useEffect(() => {
    if (initialTheme) {
      setQuery(`I am dealing with issues related to ${initialTheme.toLowerCase()}.`);
    }
  }, [initialTheme]);

  const handleSubmit = async (textToSubmit?: string) => {
    const text = textToSubmit || query;
    if (!text.trim() || loading) return;

    setLoading(true);
    setResponse(null);
    setSavedSuccess(false);

    // Simulate RAG step-by-step progress visually for academic presentation
    setCurrentStep(1); // Step 1: Query Understanding
    await new Promise(r => setTimeout(r, 300));
    setCurrentStep(2); // Step 2: Theme Classification
    await new Promise(r => setTimeout(r, 400));
    setCurrentStep(3); // Step 3: KB Vector Search
    await new Promise(r => setTimeout(r, 400));
    setCurrentStep(4); // Step 4: Passage Retrieval & Grounding
    await new Promise(r => setTimeout(r, 300));
    setCurrentStep(5); // Step 5: Response Generation

    try {
      const res = await sendChatMessage(text, isLiveApi);
      setResponse(res);
    } catch (err) {
      console.error("Chat API error:", err);
    } finally {
      setLoading(false);
      setCurrentStep(0);
    }
  };

  const handleSaveToJournal = () => {
    if (!response || !response.sources.length) return;
    const primarySource = response.sources[0];
    saveJournalEntry({
      question: query || response.user_concern_summary,
      theme: response.themes,
      teaching: primarySource.translation,
      sourceId: primarySource.id,
      sourceSection: `${primarySource.sub_parva || 'Shanti Parva'} ${primarySource.section}`,
      personalReflection: response.modern_perspective
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopy = () => {
    if (!response) return;
    const textToCopy = `
SHANTI AI REFLECTION
Concern: ${response.user_concern_summary}
Themes: ${response.themes.join(', ')}

Source (${response.sources[0]?.section}):
"${response.sources[0]?.translation}"

Meaning: ${response.teaching_explanation}

Modern Perspective: ${response.modern_perspective}

Reflection Questions:
${response.reflection_questions.map(q => `- ${q}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-mono text-[#d4af37]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>RAG-POWERED CONVERSATIONAL AI</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#f4ecd8]">
          Ask Shanti AI
        </h1>
        <p className="text-base text-[#a0a5b8] max-w-xl mx-auto">
          Share what you're facing. Explore what ancient wisdom may teach us about it.
        </p>
      </div>

      {/* Input Form Box */}
      <div className="bg-[#11131c] border border-[#242838] focus-within:border-[#d4af37]/60 rounded-2xl p-6 shadow-card-dark space-y-4 transition-all">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your current struggle, emotional dilemma, or question... (e.g. 'I keep getting angry at people who disrespect me.')"
          rows={4}
          className="w-full bg-transparent text-[#e0e2ec] placeholder-[#62677a] focus:outline-none text-base resize-none"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#242838]">
          
          {/* Mode Tag */}
          <div className="text-xs font-mono text-[#757a8f] flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isLiveApi ? 'bg-emerald-500' : 'bg-[#d4af37]'}`}></span>
            <span>{isLiveApi ? 'Live API RAG Mode' : 'Academic Demo RAG Mode'}</span>
          </div>

          <button
            onClick={() => handleSubmit()}
            disabled={loading || !query.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b88d29] disabled:opacity-50 text-[#0b0c10] font-bold text-sm uppercase tracking-wider hover:shadow-gold-glow flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Retrieving Wisdom...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Query</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Example Prompts & Demo Scenarios */}
      {!response && !loading && (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-[#a0a5b8] tracking-wider">
              Example Prompts
            </div>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(promptText);
                    handleSubmit(promptText);
                  }}
                  className="text-xs bg-[#181b28] hover:bg-[#242838] border border-[#242838] hover:border-[#d4af37]/40 text-[#c5a059] px-3.5 py-2 rounded-xl text-left transition-all"
                >
                  "{promptText}"
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono uppercase text-[#d4af37] tracking-wider flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Academic Demo Queries (Full RAG Pipeline)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {demoQueries.map((demo, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(demo.query);
                    handleSubmit(demo.query);
                  }}
                  className="bg-[#11131c] hover:bg-[#181b28] border border-[#d4af37]/30 hover:border-[#d4af37] p-3 rounded-xl text-left space-y-1 transition-all group"
                >
                  <div className="text-xs font-semibold text-[#f4ecd8] group-hover:text-[#d4af37]">
                    {demo.label}
                  </div>
                  <div className="text-[11px] text-[#757a8f]">
                    "{demo.query}"
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step-by-Step Progress Visualizer during loading */}
      {loading && (
        <div className="bg-[#11131c] border border-[#d4af37]/40 p-8 rounded-2xl space-y-6 text-center animate-pulse">
          <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto">
            <Cpu className="w-6 h-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading text-lg font-bold text-[#f4ecd8]">
              Executing Retrieval-Augmented Generation
            </h3>
            <p className="text-xs font-mono text-[#d4af37]">
              Grounding response in authentic Shanti Parva source texts...
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2 max-w-2xl mx-auto pt-4 text-[10px] font-mono">
            <div className={`p-2 rounded border ${currentStep >= 1 ? 'bg-[#d4af37]/20 border-[#d4af37] text-white' : 'border-[#242838] text-[#62677a]'}`}>
              1. Understand
            </div>
            <div className={`p-2 rounded border ${currentStep >= 2 ? 'bg-[#d4af37]/20 border-[#d4af37] text-white' : 'border-[#242838] text-[#62677a]'}`}>
              2. Classify Theme
            </div>
            <div className={`p-2 rounded border ${currentStep >= 3 ? 'bg-[#d4af37]/20 border-[#d4af37] text-white' : 'border-[#242838] text-[#62677a]'}`}>
              3. Vector Search
            </div>
            <div className={`p-2 rounded border ${currentStep >= 4 ? 'bg-[#d4af37]/20 border-[#d4af37] text-white' : 'border-[#242838] text-[#62677a]'}`}>
              4. Passage RAG
            </div>
            <div className={`p-2 rounded border ${currentStep >= 5 ? 'bg-[#d4af37]/20 border-[#d4af37] text-white' : 'border-[#242838] text-[#62677a]'}`}>
              5. Reflection
            </div>
          </div>
        </div>
      )}

      {/* Structured AI Response Output */}
      {response && !loading && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#181b28] p-4 rounded-xl border border-[#242838]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37]">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>RAG RESPONSE GENERATED</span>
              {response.is_demo_mode && (
                <span className="bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded text-[10px]">
                  DEMO GROUNDED MODE
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11131c] text-xs text-[#e0e2ec] border border-[#242838] hover:border-[#d4af37] transition-all"
              >
                <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{copiedSuccess ? 'Copied!' : 'Copy Reflection'}</span>
              </button>
              
              <button
                onClick={handleSaveToJournal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d4af37]/20 text-xs text-[#f4ecd8] border border-[#d4af37]/40 hover:bg-[#d4af37]/30 transition-all"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{savedSuccess ? 'Saved to Journal!' : 'Save to Journal'}</span>
              </button>
            </div>
          </div>

          {/* MAIN RESPONSE CARD STRUCTURE */}
          <div className="bg-[#11131c] border border-[#242838] rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
            
            {/* SECTION 1: YOUR CONCERN */}
            <div className="space-y-2 border-b border-[#242838] pb-6">
              <div className="text-xs font-mono uppercase text-[#a0a5b8] tracking-wider">
                YOUR CONCERN
              </div>
              <p className="text-base text-[#e0e2ec] font-medium leading-relaxed">
                {response.user_concern_summary}
              </p>
            </div>

            {/* SECTION 2: THEME IDENTIFIED */}
            <div className="space-y-3 border-b border-[#242838] pb-6">
              <div className="text-xs font-mono uppercase text-[#d4af37] tracking-wider">
                THEMES IDENTIFIED
              </div>
              <div className="flex flex-wrap gap-2">
                {response.themes.map((t, idx) => (
                  <ThemeBadge key={idx} theme={t} />
                ))}
              </div>
            </div>

            {/* SECTION 3: FROM SHANTI PARVA */}
            {response.sources.length > 0 && (
              <div className="bg-[#0b0c10] border border-[#d4af37]/40 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono uppercase text-[#d4af37] tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>FROM SHANTI PARVA (AUTHENTIC SOURCE)</span>
                  </div>
                  <button
                    onClick={() => setSelectedSource(response.sources[0])}
                    className="text-xs text-[#d4af37] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>View Full Metadata</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <blockquote className="font-serif italic text-base sm:text-lg text-[#f4ecd8] leading-relaxed pl-4 border-l-2 border-[#d4af37]">
                  "{response.sources[0].translation}"
                </blockquote>

                <div className="flex flex-wrap items-center justify-between text-xs text-[#a0a5b8] font-mono pt-2 border-t border-[#242838]">
                  <div>
                    Source: <strong className="text-[#f4ecd8]">{response.sources[0].sub_parva || 'Shanti Parva'}</strong> • {response.sources[0].section}, Verse {response.sources[0].verse}
                  </div>
                  {response.sources[0].similarity_score !== undefined && (
                    <div className="text-[#d4af37]">
                      RAG Similarity: {response.sources[0].similarity_score}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SECTION 4: WHAT THE TEACHING MEANS */}
            <div className="space-y-2 border-b border-[#242838] pb-6">
              <div className="text-xs font-mono uppercase text-[#a0a5b8] tracking-wider">
                WHAT THE TEACHING MEANS
              </div>
              <p className="text-sm sm:text-base text-[#e0e2ec] leading-relaxed">
                {response.teaching_explanation}
              </p>
            </div>

            {/* SECTION 5: A MODERN PERSPECTIVE */}
            <div className="space-y-3 bg-[#181b28]/60 p-6 rounded-2xl border border-[#242838]">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono uppercase text-[#d4af37] tracking-wider">
                  A MODERN PERSPECTIVE
                </div>
                <span className="text-[10px] uppercase font-mono bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded">
                  AI Interpretation
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#c5a059] leading-relaxed">
                {response.modern_perspective}
              </p>
            </div>

            {/* SECTION 6: REFLECT ON THIS */}
            <div className="space-y-4 border-b border-[#242838] pb-6">
              <div className="text-xs font-mono uppercase text-[#f4ecd8] tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#d4af37]" />
                <span>REFLECT ON THIS</span>
              </div>
              <ul className="space-y-3">
                {response.reflection_questions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-[#0b0c10] p-4 rounded-xl border border-[#242838]">
                    <span className="w-6 h-6 rounded-full bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-[#e0e2ec] font-medium leading-relaxed">
                      {q}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SECTION 7: IMPORTANT NOTE */}
            <div className="bg-[#181b28] p-4 rounded-xl border border-[#242838] flex items-start gap-3 text-xs text-[#a0a5b8]">
              <AlertTriangle className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {response.important_note}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Source Modal */}
      <SourceDrawer
        passage={selectedSource}
        onClose={() => setSelectedSource(null)}
      />

    </div>
  );
};
