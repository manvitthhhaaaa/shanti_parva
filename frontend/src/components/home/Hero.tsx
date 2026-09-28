import React from 'react';
import { Sparkles, Compass, Shield, ArrowRight } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-manuscript-pattern pt-12 pb-20">
      
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        
        {/* Academic Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181b28] border border-[#d4af37]/40 text-xs font-mono text-[#d4af37] shadow-gold-glow animate-fade-in">
          <Shield className="w-3.5 h-3.5" />
          <span>ACADEMIC AI RESEARCH • SHANTI PARVA RAG PIPELINE</span>
        </div>

        {/* Main Title */}
        <div className="space-y-4">
          <h1 className="font-heading font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-gold-gradient">
            SHANTI AI
          </h1>
          <p className="font-heading text-xl sm:text-3xl text-[#f4ecd8] font-semibold tracking-wide italic">
            "Ancient Wisdom. Modern Questions."
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#a0a5b8] max-w-3xl mx-auto leading-relaxed">
          Explore timeless teachings from <strong className="text-[#f4ecd8] font-normal">Shanti Parva</strong> of the Mahabharata and discover how their enduring principles can help you reflect on the complex ethical, emotional, and personal challenges of modern life.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setActiveTab('chat')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b88d29] text-[#0b0c10] font-bold text-sm tracking-wider uppercase hover:shadow-gold-glow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask Shanti AI</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => setActiveTab('explore')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#181b28] text-[#f4ecd8] border border-[#d4af37]/40 hover:border-[#d4af37] font-semibold text-sm tracking-wider uppercase hover:bg-[#242838] transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span>Explore Shanti Parva</span>
          </button>
        </div>

        {/* Feature Highlights Pills */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#757a8f] font-mono border-t border-[#242838]/60 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
            <span>Zero Hallucinated Verses</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
            <span>Grounded Source RAG</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
            <span>Self-Reflection Framework</span>
          </div>
        </div>

      </div>
    </div>
  );
};
