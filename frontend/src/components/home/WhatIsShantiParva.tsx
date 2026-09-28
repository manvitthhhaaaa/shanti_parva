import React from 'react';
import { Landmark, HeartHandshake, Sparkles } from 'lucide-react';

export const WhatIsShantiParva: React.FC = () => {
  return (
    <section className="py-20 bg-[#0b0c10] border-t border-[#242838]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="text-xs font-mono text-[#d4af37] uppercase tracking-widest">
            HISTORICAL & PHILOSOPHICAL CONTEXT
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#f4ecd8]">
            What is Shanti Parva?
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
        </div>

        {/* Content Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#11131c] p-6 rounded-2xl border border-[#242838] hover:border-[#d4af37]/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#f4ecd8]">
              Rajadharma Parva
            </h3>
            <p className="text-sm text-[#a0a5b8] leading-relaxed">
              Discourses on governance, leadership, duty, and statecraft delivered by the dying patriarch Bhishma to Yudhishthira on the bed of arrows after the Kurukshetra war.
            </p>
          </div>

          <div className="bg-[#11131c] p-6 rounded-2xl border border-[#242838] hover:border-[#d4af37]/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#f4ecd8]">
              Apaddharma Parva
            </h3>
            <p className="text-sm text-[#a0a5b8] leading-relaxed">
              Ethical guidance during times of severe crisis, moral distress, and breakdown of normal social rules, examining how to preserve life and integrity when ideal paths fail.
            </p>
          </div>

          <div className="bg-[#11131c] p-6 rounded-2xl border border-[#242838] hover:border-[#d4af37]/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#f4ecd8]">
              Mokshadharma Parva
            </h3>
            <p className="text-sm text-[#a0a5b8] leading-relaxed">
              Profound spiritual and psychological investigations into self-control, overcoming anger, managing grief, achieving mental tranquility, and understanding true freedom.
            </p>
          </div>

        </div>

        {/* Academic Note */}
        <div className="bg-[#181b28]/80 border border-[#d4af37]/30 p-6 rounded-2xl max-w-4xl mx-auto text-center space-y-3">
          <p className="font-serif italic text-base text-[#e2d4b7] leading-relaxed">
            "Shanti Parva is the 12th of the 18 books of the Mahabharata, comprising 365 chapters and over 13,000 verses. It remains one of humanity's most comprehensive classical treatises on ethics, governance, and human vulnerability."
          </p>
          <div className="text-xs font-mono text-[#a0a5b8]">
            Source Reference: Bhandarkar Oriental Research Institute (BORI) Critical Edition
          </div>
        </div>

      </div>
    </section>
  );
};
