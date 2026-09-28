import React, { useState, useEffect } from 'react';
import { BookBookmark, Trash2, Calendar, BookOpen, Download, Plus } from 'lucide-react';
import { getJournalEntries, deleteJournalEntry, saveJournalEntry } from '../services/storage';
import type { JournalEntry } from '../types';
import { ThemeBadge } from '../components/common/ThemeBadge';

export const JournalPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newReflection, setNewReflection] = useState('');

  useEffect(() => {
    loadJournal();
  }, []);

  const loadJournal = () => {
    setEntries(getJournalEntries());
  };

  const handleDelete = (id: string) => {
    deleteJournalEntry(id);
    loadJournal();
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newReflection.trim()) return;

    saveJournalEntry({
      question: newQuestion,
      theme: ['Self-Reflection', 'Personal Growth'],
      teaching: 'Self-governance and moral integrity preserve clarity in every circumstance.',
      sourceId: 'SP-MOK-220-15',
      sourceSection: 'Shanti Parva Section 220',
      personalReflection: newReflection
    });

    setNewQuestion('');
    setNewReflection('');
    setShowAddForm(false);
    loadJournal();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `shanti_ai_journal_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-mono text-[#d4af37]">
          <BookBookmark className="w-3.5 h-3.5" />
          <span>PERSONAL REFLECTION NOTEBOOK</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#f4ecd8]">
          Wisdom Journal
        </h1>
        <p className="text-base text-[#a0a5b8] max-w-xl mx-auto">
          Review saved AI reflections, teachings from Shanti Parva, and your personal insights over time.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#11131c] p-4 rounded-xl border border-[#242838]">
        <div className="text-xs font-mono text-[#a0a5b8]">
          Total Entries: <span className="text-[#d4af37] font-bold">{entries.length}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#181b28] text-xs text-[#e0e2ec] border border-[#242838] hover:border-[#d4af37] transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Add Personal Reflection</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#d4af37]/20 text-xs text-[#f4ecd8] border border-[#d4af37]/40 hover:bg-[#d4af37]/30 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Export Journal</span>
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleManualAdd} className="bg-[#11131c] border border-[#d4af37]/40 p-6 rounded-2xl space-y-4 animate-fadeIn">
          <h3 className="font-heading text-lg font-bold text-[#f4ecd8]">
            New Journal Entry
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#a0a5b8]">YOUR QUESTION OR CONCERN</label>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="What situation or dilemma were you examining?"
              className="w-full bg-[#0b0c10] border border-[#242838] focus:border-[#d4af37] text-sm text-[#e0e2ec] px-4 py-2.5 rounded-xl focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#a0a5b8]">YOUR PERSONAL REFLECTION</label>
            <textarea
              value={newReflection}
              onChange={(e) => setNewReflection(e.target.value)}
              placeholder="What insight or action step did you take away from this teaching?"
              rows={3}
              className="w-full bg-[#0b0c10] border border-[#242838] focus:border-[#d4af37] text-sm text-[#e0e2ec] px-4 py-2.5 rounded-xl focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-lg text-xs text-[#a0a5b8] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#d4af37] text-[#0b0c10] font-bold text-xs uppercase"
            >
              Save Entry
            </button>
          </div>
        </form>
      )}

      {/* Journal Entry List */}
      <div className="space-y-6">
        {entries.length === 0 ? (
          <div className="text-center py-16 bg-[#11131c] rounded-2xl border border-[#242838] space-y-3">
            <BookBookmark className="w-12 h-12 text-[#62677a] mx-auto" />
            <div className="text-sm font-medium text-[#a0a5b8]">Your journal is currently empty.</div>
            <p className="text-xs text-[#757a8f] max-w-sm mx-auto">
              Save AI reflections from the 'Ask Shanti AI' page to start building your personal wisdom notebook.
            </p>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-[#11131c] border border-[#242838] p-6 rounded-2xl space-y-4 shadow-card-dark relative group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#242838] pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#a0a5b8]">
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{entry.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-wrap gap-1">
                    {entry.theme.map((t, idx) => (
                      <ThemeBadge key={idx} theme={t} />
                    ))}
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-1.5 text-[#757a8f] hover:text-rose-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono uppercase text-[#a0a5b8]">QUESTION / SITUATION</div>
                <p className="text-sm font-semibold text-[#f4ecd8]">"{entry.question}"</p>
              </div>

              <div className="bg-[#0b0c10] border border-[#242838] p-4 rounded-xl space-y-1">
                <div className="text-xs font-mono uppercase text-[#d4af37] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>RELEVANT TEACHING ({entry.sourceSection})</span>
                </div>
                <blockquote className="font-serif italic text-xs text-[#e2d4b7]">
                  "{entry.teaching}"
                </blockquote>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono uppercase text-[#c5a059]">PERSONAL REFLECTION</div>
                <p className="text-xs text-[#e0e2ec] leading-relaxed">
                  {entry.personalReflection}
                </p>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
