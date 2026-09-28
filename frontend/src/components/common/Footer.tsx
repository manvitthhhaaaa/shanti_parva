import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#07080a] border-t border-[#242838] pt-12 pb-8 text-[#a0a5b8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] font-heading font-bold text-sm">
                शं
              </div>
              <span className="font-heading text-lg font-bold text-gold-gradient">SHANTI AI</span>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              An academic AI project bridging Artificial Intelligence with Shanti Parva of the Mahabharata. 
              Built with Retrieval-Augmented Generation (RAG) to explore ancient Indian wisdom through structured modern reflection.
            </p>
            <div className="text-xs font-mono text-[#d4af37]/80 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Academic Student Project • 2nd-Year Robotics & AI</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[#f4ecd8] uppercase tracking-wider mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-[#d4af37] transition-colors">Home</button></li>
              <li><button onClick={() => setActiveTab('chat')} className="hover:text-[#d4af37] transition-colors">Ask Shanti AI</button></li>
              <li><button onClick={() => setActiveTab('bhishma')} className="hover:text-[#d4af37] transition-colors">What Would Bhishma Teach?</button></li>
              <li><button onClick={() => setActiveTab('explore')} className="hover:text-[#d4af37] transition-colors">Explore Shanti Parva</button></li>
              <li><button onClick={() => setActiveTab('journal')} className="hover:text-[#d4af37] transition-colors">Wisdom Journal</button></li>
            </ul>
          </div>

          {/* Academic & Architecture */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[#f4ecd8] uppercase tracking-wider mb-3">Architecture</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setActiveTab('architecture')} className="hover:text-[#d4af37] transition-colors">RAG Pipeline Flowchart</button></li>
              <li><button onClick={() => setActiveTab('academic')} className="hover:text-[#d4af37] transition-colors">Viva Presentation Guide</button></li>
              <li><span className="text-xs text-[#757a8f]">Vector Cosine Similarity Engine</span></li>
              <li><span className="text-xs text-[#757a8f]">Authentic Passage Grounding</span></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="gold-divider mb-6"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#62677a] gap-4">
          <div>
            © 2026 SHANTI AI. Academic Research Prototype. Based on Mahabharata Shanti Parva (Book 12).
          </div>
          <div className="flex items-center gap-4">
            <span>FastAPI • React • TypeScript • Tailwind</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
