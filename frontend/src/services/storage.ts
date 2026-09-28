import type { JournalEntry } from '../types';

const JOURNAL_KEY = 'shanti_ai_wisdom_journal_v1';

export function getJournalEntries(): JournalEntry[] {
  try {
    const data = localStorage.getItem(JOURNAL_KEY);
    return data ? JSON.parse(data) : getInitialDefaultEntries();
  } catch (err) {
    console.error("Failed to read journal entries:", err);
    return getInitialDefaultEntries();
  }
}

export function saveJournalEntry(entry: Omit<JournalEntry, 'id' | 'date'>): JournalEntry {
  const entries = getJournalEntries();
  const newEntry: JournalEntry = {
    ...entry,
    id: 'entry-' + Date.now(),
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  };
  const updated = [newEntry, ...entries];
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
  return newEntry;
}

export function deleteJournalEntry(id: string): void {
  const entries = getJournalEntries();
  const updated = entries.filter(e => e.id !== id);
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
}

function getInitialDefaultEntries(): JournalEntry[] {
  return [
    {
      id: 'entry-default-1',
      date: 'Sep 27, 2026',
      question: 'I keep getting angry at people who disrespect me.',
      theme: ['Anger', 'Self-Control', 'Peace'],
      teaching: 'He who remains calm amidst the angry, who gives rather than takes, and who controls the tempest of his own mind overcomes all insurmountable life perils.',
      sourceId: 'SP-MOK-160-6',
      sourceSection: 'Section 160, Verse 160.6',
      personalReflection: 'I realized that my anger is triggered by my desire for external validation. Pausing before reacting gives me back my self-governance.'
    }
  ];
}
