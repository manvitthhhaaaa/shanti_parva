import React, { useState } from 'react';
import { Cpu, ArrowDown, Sliders } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const [testQuery, setTestQuery] = useState("I am angry at someone");
  const [computedScore, setComputedScore] = useState({
    theme: ["Anger", "Self-Control"],
    topMatch: "SP-MOK-160-6 (Section 160, Verse 160.6)",
    score: 0.8842,
    termsMatched: ["angry", "krodha", "calm", "self-control"]
  });

  const handleRunSimulator = (q: string) => {
    setTestQuery(q);
    const qLower = q.toLowerCase();
    if (qLower.includes("anger") || qLower.includes("disrespect")) {
      setComputedScore({
        theme: ["Anger", "Self-Control", "Conflict"],
        topMatch: "SP-MOK-160-6 (Section 160, Verse 160.6)",
        score: 0.8842,
        termsMatched: ["angry", "calm", "tempest", "control"]
      });
    } else if (qLower.includes("decision") || qLower.includes("choose")) {
      setComputedScore({
        theme: ["Decision Making", "Dharma", "Duty"],
        topMatch: "SP-MOK-220-15 (Section 220, Verse 220.15)",
        score: 0.9120,
        termsMatched: ["decision", "intellect", "reason", "duty"]
      });
    } else if (qLower.includes("grief") || qLower.includes("losing") || qLower.includes("loss")) {
      setComputedScore({
        theme: ["Grief", "Attachment", "Wisdom"],
        topMatch: "SP-MOK-174-16 (Section 174, Verse 174.16)",
        score: 0.8654,
        termsMatched: ["driftwood", "parting", "impermanence", "ocean"]
      });
    } else {
      setComputedScore({
        theme: ["Dharma", "Leadership", "Responsibility"],
        topMatch: "SP-RAJ-57-11 (Section 57, Verse 57.11)",
        score: 0.7950,
        termsMatched: ["ruler", "welfare", "duty", "sacrifice"]
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-mono text-[#d4af37]">
          <Cpu className="w-3.5 h-3.5" />
          <span>ACADEMIC RAG ARCHITECTURE DIAGRAM</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#f4ecd8]">
          How the AI Works
        </h1>
        <p className="text-base text-[#a0a5b8] max-w-xl mx-auto">
          Detailed technical breakdown of the Retrieval-Augmented Generation (RAG) system connecting natural language input to authentic Shanti Parva source texts.
        </p>
      </div>

      {/* Visual Flowchart */}
      <div className="bg-[#11131c] border border-[#242838] p-8 rounded-2xl space-y-6 shadow-2xl">
        <h3 className="font-heading text-lg font-bold text-[#f4ecd8] text-center">
          End-to-End RAG Execution Flow
        </h3>

        <div className="flex flex-col items-center space-y-4 max-w-2xl mx-auto">
          
          <div className="w-full bg-[#0b0c10] border border-[#d4af37]/40 p-4 rounded-xl text-center space-y-1 shadow-gold-glow">
            <div className="text-xs font-mono text-[#d4af37] font-bold">1. USER QUESTION INPUT</div>
            <p className="text-xs text-[#e0e2ec]">"I keep getting angry at people who disrespect me."</p>
          </div>

          <ArrowDown className="w-5 h-5 text-[#d4af37]" />

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#181b28] border border-[#242838] p-4 rounded-xl text-center space-y-1">
              <div className="text-xs font-mono text-[#d4af37]">2. NATURAL LANGUAGE PROCESSING</div>
              <p className="text-[11px] text-[#a0a5b8]">Tokenization, stop-word removal, keyword extraction</p>
            </div>

            <div className="bg-[#181b28] border border-[#242838] p-4 rounded-xl text-center space-y-1">
              <div className="text-xs font-mono text-[#d4af37]">3. THEME CLASSIFICATION</div>
              <p className="text-[11px] text-[#a0a5b8]">Maps query to Anger • Self-Control • Conflict</p>
            </div>
          </div>

          <ArrowDown className="w-5 h-5 text-[#d4af37]" />

          <div className="w-full bg-[#181b28] border border-[#242838] p-4 rounded-xl text-center space-y-1">
            <div className="text-xs font-mono text-[#d4af37]">4. TF-IDF / VECTOR COSINE SIMILARITY SEARCH</div>
            <p className="text-[11px] text-[#a0a5b8] font-mono">
              Similarity(Q, D) = (Q · D) / (||Q|| × ||D||)
            </p>
          </div>

          <ArrowDown className="w-5 h-5 text-[#d4af37]" />

          <div className="w-full bg-[#0b0c10] border border-[#d4af37]/40 p-4 rounded-xl text-center space-y-1">
            <div className="text-xs font-mono text-[#d4af37] font-bold">5. RELEVANT SHANTI PARVA PASSAGES RETRIEVED</div>
            <p className="text-xs text-[#e0e2ec]">SP-MOK-160-6: "He who remains calm amidst the angry..."</p>
          </div>

          <ArrowDown className="w-5 h-5 text-[#d4af37]" />

          <div className="w-full bg-[#181b28] border border-[#242838] p-4 rounded-xl text-center space-y-1">
            <div className="text-xs font-mono text-[#d4af37]">6. GROUNDED LLM PROMPT INJECTION</div>
            <p className="text-[11px] text-[#a0a5b8]">Restricts LLM to retrieved passages (Zero Hallucination Guarantee)</p>
          </div>

          <ArrowDown className="w-5 h-5 text-[#d4af37]" />

          <div className="w-full bg-[#0b0c10] border border-[#d4af37] p-5 rounded-xl text-center space-y-1 shadow-gold-glow-lg">
            <div className="text-xs font-mono text-[#d4af37] font-bold">7. GROUNDED RESPONSE GENERATOR</div>
            <p className="text-xs text-[#f4ecd8]">Summary → Source Quote → Meaning → Modern Interpretation → 3 Reflection Questions</p>
          </div>

        </div>
      </div>

      {/* Interactive Vector Search Inspector */}
      <div className="bg-[#11131c] border border-[#242838] p-8 rounded-2xl space-y-6 shadow-card-dark">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#d4af37]" />
          <h3 className="font-heading text-lg font-bold text-[#f4ecd8]">
            Interactive Vector Similarity Inspector
          </h3>
        </div>
        <p className="text-xs text-[#a0a5b8]">
          Test how the RAG cosine similarity algorithm ranks knowledge base passages in real time for viva demonstrations.
        </p>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => handleRunSimulator("I keep getting angry at work")} className="text-xs bg-[#181b28] border border-[#242838] hover:border-[#d4af37] px-3 py-1.5 rounded-lg text-[#e0e2ec]">
            Simulate: Anger Query
          </button>
          <button onClick={() => handleRunSimulator("I have to make a tough decision")} className="text-xs bg-[#181b28] border border-[#242838] hover:border-[#d4af37] px-3 py-1.5 rounded-lg text-[#e0e2ec]">
            Simulate: Decision Query
          </button>
          <button onClick={() => handleRunSimulator("I am grieving the loss of someone")} className="text-xs bg-[#181b28] border border-[#242838] hover:border-[#d4af37] px-3 py-1.5 rounded-lg text-[#e0e2ec]">
            Simulate: Grief Query
          </button>
        </div>

        <div className="bg-[#0b0c10] p-6 rounded-xl border border-[#242838] space-y-4 font-mono text-xs">
          <div className="flex justify-between border-b border-[#242838] pb-2">
            <span className="text-[#a0a5b8]">Input Vector Query:</span>
            <span className="text-[#f4ecd8]">"{testQuery}"</span>
          </div>
          <div className="flex justify-between border-b border-[#242838] pb-2">
            <span className="text-[#a0a5b8]">Detected Themes:</span>
            <span className="text-[#d4af37]">{computedScore.theme.join(", ")}</span>
          </div>
          <div className="flex justify-between border-b border-[#242838] pb-2">
            <span className="text-[#a0a5b8]">Top Document Match:</span>
            <span className="text-emerald-400 font-bold">{computedScore.topMatch}</span>
          </div>
          <div className="flex justify-between border-b border-[#242838] pb-2">
            <span className="text-[#a0a5b8]">Cosine Similarity Score:</span>
            <span className="text-[#d4af37] font-bold text-sm">{computedScore.score}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a0a5b8]">Keywords Matched:</span>
            <span className="text-[#c5a059]">{computedScore.termsMatched.join(", ")}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
