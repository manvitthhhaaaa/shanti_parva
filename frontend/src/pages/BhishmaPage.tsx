import React, { useState } from 'react';
import { ShieldAlert, BookOpen, Send, HelpCircle, RefreshCw } from 'lucide-react';
import { sendBhishmaScenario } from '../services/api';
import type { BhishmaResponse } from '../types';

export const BhishmaPage: React.FC = () => {
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<BhishmaResponse | null>(null);

  const sampleScenarios = [
    "I need to choose between personal benefit and responsibility.",
    "My superior is ordering me to take an unethical action.",
    "I am leading a team during a severe organizational crisis.",
    "I feel overwhelmed by competing demands on my time."
  ];

  const handleSubmit = async (textToSubmit?: string) => {
    const text = textToSubmit || situation;
    if (!text.trim() || loading) return;
    
    setLoading(true);
    try {
      const res = await sendBhishmaScenario(text);
      setResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-mono text-[#d4af37]">
          <ShieldAlert className="w-4 h-4" />
          <span>SPECIAL INTERACTIVE FEATURE</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#f4ecd8]">
          What Would Bhishma Teach?
        </h1>
        <p className="text-base text-[#a0a5b8] max-w-xl mx-auto">
          Describe an ethical dilemma, leadership trial, or complex situation to explore teachings associated with Bhishma's deathbed discourse.
        </p>
      </div>

      {/* Input Box */}
      <div className="bg-[#11131c] border border-[#242838] focus-within:border-[#d4af37]/60 rounded-2xl p-6 shadow-card-dark space-y-4 transition-all">
        <label className="block text-xs font-mono uppercase text-[#d4af37] tracking-wider">
          Describe Your Dilemma or Situation
        </label>
        <textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder="Example: 'I need to choose between personal benefit and responsibility.'"
          rows={3}
          className="w-full bg-transparent text-[#e0e2ec] placeholder-[#62677a] focus:outline-none text-base resize-none"
        />

        <div className="flex items-center justify-between pt-2 border-t border-[#242838]">
          <span className="text-xs text-[#757a8f] font-mono">
            Framed accurately via historical context
          </span>
          <button
            onClick={() => handleSubmit()}
            disabled={loading || !situation.trim()}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b88d29] disabled:opacity-50 text-[#0b0c10] font-bold text-xs uppercase tracking-wider hover:shadow-gold-glow flex items-center gap-2 transition-all cursor-pointer"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>Seek Teaching</span>
          </button>
        </div>
      </div>

      {/* Sample Scenario Buttons */}
      {!response && !loading && (
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase text-[#a0a5b8] tracking-wider">
            Sample Ethical Dilemmas
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sampleScenarios.map((sc, i) => (
              <button
                key={i}
                onClick={() => {
                  setSituation(sc);
                  handleSubmit(sc);
                }}
                className="bg-[#11131c] hover:bg-[#181b28] border border-[#242838] hover:border-[#d4af37]/40 p-4 rounded-xl text-left text-xs text-[#c5a059] transition-all"
              >
                "{sc}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Response Box */}
      {response && !loading && (
        <div className="bg-[#11131c] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
          
          <div className="border-b border-[#242838] pb-4 space-y-1">
            <div className="text-xs font-mono text-[#a0a5b8] uppercase">SITUATION</div>
            <p className="text-sm font-medium text-[#f4ecd8]">{response.situation_summary}</p>
          </div>

          <div className="border-b border-[#242838] pb-4 space-y-1">
            <div className="text-xs font-mono text-[#d4af37] uppercase">RELEVANT PRINCIPLE</div>
            <p className="text-base text-[#e0e2ec] font-serif italic">"{response.relevant_principle}"</p>
          </div>

          <div className="bg-[#0b0c10] border border-[#242838] p-5 rounded-xl space-y-2">
            <div className="text-xs font-mono text-[#d4af37] uppercase flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>SHANTI PARVA SOURCE ({response.source.section})</span>
            </div>
            <p className="text-xs text-[#a0a5b8] leading-relaxed">
              "{response.source.translation}"
            </p>
          </div>

          <div className="bg-[#181b28]/80 p-5 rounded-xl border border-[#242838] space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-[#d4af37] uppercase">AI INTERPRETATION</div>
              <span className="text-[10px] font-mono text-[#a0a5b8]">Grounded Analysis</span>
            </div>
            <p className="text-sm text-[#c5a059] leading-relaxed">
              {response.ai_interpretation}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono text-[#f4ecd8] uppercase flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#d4af37]" />
              <span>REFLECTION</span>
            </div>
            <ul className="space-y-2">
              {response.reflection.map((ref, idx) => (
                <li key={idx} className="text-xs text-[#e0e2ec] bg-[#0b0c10] p-3 rounded-lg border border-[#242838]">
                  • {ref}
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
};
