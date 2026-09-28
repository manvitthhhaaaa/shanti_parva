import React, { useState, useEffect } from 'react';
import { Search, Compass, ExternalLink } from 'lucide-react';
import { fetchPassages } from '../services/api';
import type { PassageMetadata } from '../types';
import { ThemeBadge } from '../components/common/ThemeBadge';
import { SourceDrawer } from '../components/common/SourceDrawer';

export const ExplorePage: React.FC = () => {
  const [passages, setPassages] = useState<PassageMetadata[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedSubParva, setSelectedSubParva] = useState('');
  const [selectedPassage, setSelectedPassage] = useState<PassageMetadata | null>(null);
  const [loading, setLoading] = useState(false);

  const subParvas = ['Rajadharma Parva', 'Apaddharma Parva', 'Mokshadharma Parva'];
  const popularThemes = ['Dharma', 'Anger', 'Self-Control', 'Grief', 'Leadership', 'Conflict', 'Decision Making', 'Justice'];

  useEffect(() => {
    loadData();
  }, [selectedTheme, selectedSubParva]);

  const loadData = async (searchQuery?: string) => {
    setLoading(true);
    try {
      const data = await fetchPassages(searchQuery || query, selectedTheme, selectedSubParva);
      setPassages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData(query);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-mono text-[#d4af37]">
          <Compass className="w-3.5 h-3.5" />
          <span>SHANTI PARVA CATALOG</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#f4ecd8]">
          Explore Shanti Parva
        </h1>
        <p className="text-base text-[#a0a5b8] max-w-xl mx-auto">
          Browse verified source passages, English translations, and theme classifications from Book 12 of the Mahabharata.
        </p>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-[#11131c] border border-[#242838] p-6 rounded-2xl space-y-6 shadow-card-dark">
        
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search passages by keyword, verse, or summary (e.g. 'anger', 'driftwood', 'ruler')..."
            className="w-full bg-[#0b0c10] border border-[#242838] focus:border-[#d4af37] text-sm text-[#e0e2ec] pl-12 pr-28 py-3.5 rounded-xl focus:outline-none"
          />
          <Search className="w-5 h-5 text-[#757a8f] absolute left-4 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#d4af37] text-[#0b0c10] font-bold text-xs rounded-lg uppercase tracking-wider hover:bg-[#e5c158]"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#242838]">
          
          {/* Sub-Parva Selector */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-mono text-[#757a8f] uppercase">Section:</span>
            <button
              onClick={() => setSelectedSubParva('')}
              className={`px-3 py-1 rounded-lg transition-all ${
                !selectedSubParva ? 'bg-[#d4af37] text-[#0b0c10] font-bold' : 'bg-[#181b28] text-[#a0a5b8] hover:text-white'
              }`}
            >
              All Sections
            </button>
            {subParvas.map(sp => (
              <button
                key={sp}
                onClick={() => setSelectedSubParva(selectedSubParva === sp ? '' : sp)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedSubParva === sp ? 'bg-[#d4af37] text-[#0b0c10] font-bold' : 'bg-[#181b28] text-[#a0a5b8] hover:text-white'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>

          {/* Theme Badges filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-xs text-[#757a8f] uppercase">Theme:</span>
            {popularThemes.slice(0, 5).map(t => (
              <ThemeBadge
                key={t}
                theme={t}
                selected={selectedTheme === t}
                onClick={() => setSelectedTheme(selectedTheme === t ? '' : t)}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-mono text-[#a0a5b8]">
        <div>
          Showing <span className="text-[#d4af37] font-bold">{passages.length}</span> verified passages
        </div>
        {(selectedTheme || selectedSubParva || query) && (
          <button
            onClick={() => {
              setSelectedTheme('');
              setSelectedSubParva('');
              setQuery('');
              loadData('');
            }}
            className="text-[#d4af37] hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="text-center py-12 text-xs font-mono text-[#d4af37]">Loading Shanti Parva passages...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {passages.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPassage(p)}
            className="bg-[#11131c] border border-[#242838] hover:border-[#d4af37]/60 p-6 rounded-2xl cursor-pointer hover:scale-[1.01] transition-all space-y-4 group flex flex-col justify-between shadow-card-dark"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded">
                  {p.sub_parva || 'Shanti Parva'} • {p.section}
                </span>
                <span className="text-xs font-mono text-[#757a8f]">
                  Verse {p.verse}
                </span>
              </div>

              <blockquote className="font-serif italic text-sm text-[#f4ecd8] leading-relaxed line-clamp-3">
                "{p.translation}"
              </blockquote>

              <p className="text-xs text-[#a0a5b8] line-clamp-2">
                {p.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#242838] flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {p.theme.map((t, idx) => (
                  <ThemeBadge key={idx} theme={t} />
                ))}
              </div>
              <span className="text-xs text-[#d4af37] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                View <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Detail Modal */}
      <SourceDrawer
        passage={selectedPassage}
        onClose={() => setSelectedPassage(null)}
      />

    </div>
  );
};
