import React from 'react';
import { MessageSquare, Cpu, Database, Lightbulb } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "You Share",
      subtitle: "Tell us about your problem",
      description: "Describe what you are facing in simple everyday language—whether it is anger, a tough decision, grief, or conflict.",
      icon: MessageSquare
    },
    {
      num: "02",
      title: "AI Understands",
      subtitle: "Theme identification",
      description: "The system analyzes your query and maps it to underlying ancient ethical themes like Dharma, Self-Control, or Anger.",
      icon: Cpu
    },
    {
      num: "03",
      title: "Wisdom Retrieved",
      subtitle: "Source grounding via RAG",
      description: "Vector search queries the authentic Shanti Parva knowledge base to retrieve verified passages with complete source metadata.",
      icon: Database
    },
    {
      num: "04",
      title: "Modern Reflection",
      subtitle: "Grounded guidance",
      description: "AI translates the ancient teaching, provides a clearly labeled modern perspective, and offers 2-3 reflection questions.",
      icon: Lightbulb
    }
  ];

  return (
    <section className="py-20 bg-[#11131c] border-t border-[#242838]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs font-mono text-[#d4af37] uppercase tracking-widest">
            TRANSPARENT SYSTEM ARCHITECTURE
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#f4ecd8]">
            How Shanti AI Works
          </h2>
          <p className="text-sm text-[#a0a5b8] max-w-xl mx-auto">
            A 4-step Retrieval-Augmented Generation workflow designed to guarantee historical accuracy while enabling meaningful reflection.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-[#0b0c10] border border-[#242838] p-6 rounded-2xl relative space-y-4 hover:border-[#d4af37]/50 transition-all group"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-[#d4af37]/40 group-hover:text-[#d4af37] transition-colors">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[#181b28] border border-[#242838] flex items-center justify-center text-[#d4af37]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-bold text-[#f4ecd8]">
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono text-[#d4af37] mt-0.5">
                    {step.subtitle}
                  </div>
                </div>

                <p className="text-xs text-[#a0a5b8] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
