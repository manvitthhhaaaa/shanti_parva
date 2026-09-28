import React from 'react';
import { 
  ShieldCheck, Briefcase, Crown, Flame, HeartHandshake, Scale, 
  Sparkles, Swords, Gavel, BookOpen, Anchor, Compass 
} from 'lucide-react';

interface ThemeGridProps {
  onSelectTheme: (theme: string) => void;
}

export const ThemeGrid: React.FC<ThemeGridProps> = ({ onSelectTheme }) => {
  const themes = [
    { name: "Dharma", desc: "Righteous action and moral foundation", icon: ShieldCheck },
    { name: "Duty", desc: "Fulfilling responsibility without attachment to outcome", icon: Briefcase },
    { name: "Leadership", desc: "Selfless stewardship and governance for collective good", icon: Crown },
    { name: "Anger", desc: "Transforming destructive rage into emotional calm", icon: Flame },
    { name: "Grief", desc: "Understanding impermanence and processing loss", icon: HeartHandshake },
    { name: "Self-Control", desc: "Mastery over mind, senses, and impulsive reactions", icon: Scale },
    { name: "Desire", desc: "Freedom from endless craving and seeking true contentment", icon: Sparkles },
    { name: "Conflict", desc: "Resolving enmity through patience and moral courage", icon: Swords },
    { name: "Justice", desc: "Impartial protection and equity in authority", icon: Gavel },
    { name: "Knowledge", desc: "Illuminating fear and ignorance through discernment", icon: BookOpen },
    { name: "Detachment", desc: "Finding autonomy and inner peace independent of circumstances", icon: Anchor },
    { name: "Decision Making", desc: "Navigating ethical crossroads with reason over impulse", icon: Compass },
  ];

  return (
    <section className="py-20 bg-[#0b0c10] border-t border-[#242838]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs font-mono text-[#d4af37] uppercase tracking-widest">
            CATEGORIZED KNOWLEDGE MAP
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#f4ecd8]">
            Explore Ancient Themes
          </h2>
          <p className="text-sm text-[#a0a5b8] max-w-xl mx-auto">
            Click on any theme to explore how Shanti Parva addresses these fundamental human experiences.
          </p>
        </div>

        {/* Theme Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {themes.map((t, i) => {
            const Icon = t.icon;
            return (
              <div
                key={i}
                onClick={() => onSelectTheme(t.name)}
                className="bg-[#11131c] border border-[#242838] hover:border-[#d4af37]/60 p-5 rounded-2xl cursor-pointer hover:scale-[1.03] transition-all space-y-3 group shadow-card-dark"
              >
                <div className="w-10 h-10 rounded-xl bg-[#181b28] border border-[#242838] group-hover:border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-[#f4ecd8] group-hover:text-[#d4af37] transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-xs text-[#a0a5b8] leading-relaxed mt-1 line-clamp-2">
                    {t.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
