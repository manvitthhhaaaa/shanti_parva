import React from 'react';
import { GraduationCap, HelpCircle, CheckCircle } from 'lucide-react';

export const AcademicPage: React.FC = () => {
  const vivaQA = [
    {
      q: "Q1: What is the main objective of SHANTI AI?",
      a: "The main objective is to connect Artificial Intelligence with classical Sanskrit literature—specifically Shanti Parva of the Mahabharata—by using Retrieval-Augmented Generation (RAG) to help modern users reflect on real-life challenges through grounded ancient ethical principles."
    },
    {
      q: "Q2: How does SHANTI AI prevent LLM hallucination of verses?",
      a: "By employing strict RAG grounding. The system vectorizes authentic passages from a verified JSON database. When a user queries the app, top matching passages are retrieved and injected into the prompt context with strict instructions that prohibit the AI from inventing verses, chapter numbers, or quotes."
    },
    {
      q: "Q3: How does the system differentiate between ancient source and AI interpretation?",
      a: "The response is strictly divided into 7 distinct sections. The ancient quote and metadata are isolated under 'FROM SHANTI PARVA', while modern contextual application is explicitly labeled as 'A MODERN PERSPECTIVE (AI Interpretation)'."
    },
    {
      q: "Q4: What vector similarity method is used in local development?",
      a: "The system uses Term Frequency-Inverse Document Frequency (TF-IDF) and Cosine Similarity on passage summaries, translations, themes, and keywords to rank and retrieve top-k documents."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-mono text-[#d4af37]">
          <GraduationCap className="w-4 h-4" />
          <span>ACADEMIC PROJECT DOCUMENTATION</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#f4ecd8]">
          Project Overview & Viva Guide
        </h1>
        <p className="text-base text-[#a0a5b8] max-w-2xl mx-auto">
          Academic project specification for 2nd-Year Robotics & Artificial Intelligence evaluation.
        </p>
      </div>

      {/* Problem Statement & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-[#11131c] border border-[#242838] p-6 rounded-2xl space-y-4">
          <div className="text-xs font-mono text-rose-400 uppercase tracking-wider">
            EXISTING PROBLEM STATEMENT
          </div>
          <h3 className="font-heading text-xl font-bold text-[#f4ecd8]">
            Accessibility of Classical Literature
          </h3>
          <p className="text-sm text-[#a0a5b8] leading-relaxed">
            Ancient philosophical literature such as Shanti Parva contains vast wisdom regarding ethics, self-control, leadership, and crisis management, but remains difficult for modern students and users to navigate, interpret, and apply to contemporary daily situations. Generic LLMs often hallucinate verses or misquote chapters when asked about classical Sanskrit texts.
          </p>
        </div>

        <div className="bg-[#11131c] border border-[#242838] p-6 rounded-2xl space-y-4">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
            PROPOSED SOLUTION
          </div>
          <h3 className="font-heading text-xl font-bold text-[#f4ecd8]">
            Source-Grounded RAG Reflection Engine
          </h3>
          <p className="text-sm text-[#a0a5b8] leading-relaxed">
            SHANTI AI introduces a Retrieval-Augmented Generation (RAG) conversational pipeline. It retrieves authentic, verified Shanti Parva passages, presents the source text transparently, explains the core principle in simple language, connects it to modern scenarios via explicit AI interpretation, and prompts self-reflection.
          </p>
        </div>

      </div>

      {/* Objectives */}
      <div className="bg-[#11131c] border border-[#242838] p-8 rounded-2xl space-y-6">
        <h3 className="font-heading text-xl font-bold text-[#f4ecd8]">
          Project Objectives
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 bg-[#0b0c10] p-4 rounded-xl border border-[#242838]">
            <CheckCircle className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="text-xs text-[#e0e2ec] leading-relaxed">
              <strong>Source Transparency:</strong> Strictly isolate authentic text from AI interpretation to preserve textual integrity.
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#0b0c10] p-4 rounded-xl border border-[#242838]">
            <CheckCircle className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="text-xs text-[#e0e2ec] leading-relaxed">
              <strong>Anti-Hallucination Grounding:</strong> Utilize RAG vector search to prevent fake verse creation.
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#0b0c10] p-4 rounded-xl border border-[#242838]">
            <CheckCircle className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="text-xs text-[#e0e2ec] leading-relaxed">
              <strong>Reflection-Oriented UX:</strong> Encourage active personal reflection rather than passive automated advice.
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#0b0c10] p-4 rounded-xl border border-[#242838]">
            <CheckCircle className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="text-xs text-[#e0e2ec] leading-relaxed">
              <strong>Dual Mode Execution:</strong> Provide both live LLM capability and a deterministic academic demo engine.
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Used */}
      <div className="bg-[#11131c] border border-[#242838] p-8 rounded-2xl space-y-6">
        <h3 className="font-heading text-xl font-bold text-[#f4ecd8]">
          Technologies Stack
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-[#181b28] p-4 rounded-xl border border-[#242838] space-y-1">
            <div className="text-xs font-mono text-[#d4af37]">FRONTEND</div>
            <div className="text-sm font-bold text-[#f4ecd8]">React + TypeScript</div>
            <div className="text-[10px] text-[#757a8f]">Tailwind CSS + Vite</div>
          </div>

          <div className="bg-[#181b28] p-4 rounded-xl border border-[#242838] space-y-1">
            <div className="text-xs font-mono text-[#d4af37]">BACKEND</div>
            <div className="text-sm font-bold text-[#f4ecd8]">Python FastAPI</div>
            <div className="text-[10px] text-[#757a8f]">Uvicorn REST API</div>
          </div>

          <div className="bg-[#181b28] p-4 rounded-xl border border-[#242838] space-y-1">
            <div className="text-xs font-mono text-[#d4af37]">RAG ENGINE</div>
            <div className="text-sm font-bold text-[#f4ecd8]">TF-IDF / Cosine</div>
            <div className="text-[10px] text-[#757a8f]">Scikit-Learn Vectors</div>
          </div>

          <div className="bg-[#181b28] p-4 rounded-xl border border-[#242838] space-y-1">
            <div className="text-xs font-mono text-[#d4af37]">KNOWLEDGE BASE</div>
            <div className="text-sm font-bold text-[#f4ecd8]">Shanti Parva JSON</div>
            <div className="text-[10px] text-[#757a8f]">BORI Metadata Standard</div>
          </div>
        </div>
      </div>

      {/* Viva Defense Guide */}
      <div className="bg-[#11131c] border border-[#d4af37]/40 p-8 rounded-2xl space-y-6 shadow-2xl">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#d4af37]" />
          <h3 className="font-heading text-xl font-bold text-[#f4ecd8]">
            Academic Viva Defense Preparation Guide
          </h3>
        </div>
        <p className="text-xs text-[#a0a5b8]">
          Use these prepared responses when explaining the project to professors and academic examiners during your viva.
        </p>

        <div className="space-y-4">
          {vivaQA.map((item, idx) => (
            <div key={idx} className="bg-[#0b0c10] border border-[#242838] p-5 rounded-xl space-y-2">
              <div className="text-xs font-mono font-bold text-[#d4af37]">{item.q}</div>
              <p className="text-xs text-[#e0e2ec] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
