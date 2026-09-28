import React from 'react';
import { X, BookOpen, ShieldCheck, ExternalLink } from 'lucide-react';
import type { PassageMetadata } from '../../types';
import { ThemeBadge } from './ThemeBadge';

interface SourceDrawerProps {
  passage: PassageMetadata | null;
  onClose: () => void;
}

export const SourceDrawer: React.FC<SourceDrawerProps> = ({ passage, onClose }) => {
  if (!passage) return null;

  const displayThemes = passage.themes || passage.theme || [];
  const partName = passage.part || passage.sub_parva || 'Rajadharma Parva';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#11131c] border border-[#d4af37]/40 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black p-6 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#a0a5b8] hover:text-white rounded-lg bg-[#181b28] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37]">
            <ShieldCheck className="w-4 h-4" />
            <span>VERIFIED SHANTI PARVA SOURCE RECORD</span>
          </div>
          <h3 className="font-heading text-xl font-bold text-[#f4ecd8]">
            Shanti Parva • {partName} • {passage.section}
          </h3>
          <div className="text-xs text-[#a0a5b8] flex flex-wrap items-center gap-3">
            <span>Passage ID: <strong className="font-mono text-white">{passage.id}</strong></span>
            <span>Chapter: <strong className="font-mono text-white">{passage.chapter}</strong></span>
            {passage.verse && <span>Verse: <strong className="font-mono text-white">{passage.verse}</strong></span>}
          </div>
        </div>

        {/* Sacred Texts Source Link */}
        {passage.source_url && (
          <div className="bg-[#181b28] border border-[#d4af37]/30 p-3 rounded-xl flex items-center justify-between text-xs">
            <span className="text-[#a0a5b8] font-mono">Reference URL:</span>
            <a
              href={passage.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4af37] font-semibold hover:underline flex items-center gap-1 font-mono"
            >
              <span>View on Sacred-Texts.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Original Sanskrit Transliteration */}
        <div className="bg-[#0b0c10] border border-[#242838] p-4 rounded-xl space-y-2">
          <div className="text-xs font-mono uppercase text-[#997a15] tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Original Text (Transliterated Sanskrit)</span>
          </div>
          <p className="font-serif italic text-sm text-[#e2d4b7] leading-relaxed">
            "{passage.original_text}"
          </p>
        </div>

        {/* Translation */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-[#d4af37] tracking-wider">
            English Translation (Kisari Mohan Ganguli Edition)
          </div>
          <p className="text-sm text-[#e0e2ec] leading-relaxed bg-[#181b28]/60 p-4 rounded-xl border border-[#242838]">
            "{passage.translation}"
          </p>
        </div>

        {/* Academic Summary */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-[#a0a5b8] tracking-wider">
            Core Teaching Summary
          </div>
          <p className="text-sm text-[#b5bacc] leading-relaxed">
            {passage.summary}
          </p>
        </div>

        {/* Themes & Keywords */}
        <div className="space-y-3 pt-2 border-t border-[#242838]">
          <div className="flex flex-wrap gap-2">
            {displayThemes.map((t, i) => (
              <ThemeBadge key={i} theme={t} />
            ))}
          </div>
          <div className="text-xs text-[#757a8f] font-mono">
            Keywords: {passage.keywords.join(', ')}
          </div>
        </div>

        {/* Similarity score if present */}
        {passage.similarity_score !== undefined && (
          <div className="bg-[#181b28] px-4 py-2 rounded-lg text-xs font-mono text-[#d4af37] flex items-center justify-between">
            <span>Vector Cosine Similarity Score:</span>
            <span className="font-bold">{passage.similarity_score}</span>
          </div>
        )}

      </div>
    </div>
  );
};
