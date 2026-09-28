import React from 'react';
import { Hero } from '../components/home/Hero';
import { WhatIsShantiParva } from '../components/home/WhatIsShantiParva';
import { HowItWorks } from '../components/home/HowItWorks';
import { ThemeGrid } from '../components/home/ThemeGrid';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  setSelectedThemeForChat: (theme: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, setSelectedThemeForChat }) => {
  const handleSelectTheme = (theme: string) => {
    setSelectedThemeForChat(theme);
    setActiveTab('chat');
  };

  return (
    <div className="space-y-0">
      <Hero setActiveTab={setActiveTab} />
      <WhatIsShantiParva />
      <HowItWorks />
      <ThemeGrid onSelectTheme={handleSelectTheme} />
    </div>
  );
};
