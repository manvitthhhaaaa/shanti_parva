import React from 'react';

interface ThemeBadgeProps {
  theme: string;
  onClick?: () => void;
  selected?: boolean;
}

export const ThemeBadge: React.FC<ThemeBadgeProps> = ({ theme, onClick, selected }) => {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      } ${
        selected
          ? 'bg-[#d4af37] text-[#0b0c10] font-bold shadow-gold-glow'
          : 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37]/60'
      }`}
    >
      #{theme}
    </span>
  );
};
