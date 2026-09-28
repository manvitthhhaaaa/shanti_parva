import React, { useState } from 'react';
import { BookOpen, Sparkles, Compass, ShieldAlert, BookBookmark, Cpu, GraduationCap, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLiveApi: boolean;
  setIsLiveApi: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isLiveApi, setIsLiveApi }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'chat', label: 'Ask Shanti AI', icon: Sparkles },
    { id: 'bhishma', label: 'What Would Bhishma Teach?', icon: ShieldAlert },
    { id: 'explore', label: 'Explore Shanti Parva', icon: Compass },
    { id: 'journal', label: 'Wisdom Journal', icon: BookBookmark },
    { id: 'architecture', label: 'How RAG Works', icon: Cpu },
    { id: 'academic', label: 'Academic Project', icon: GraduationCap },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0c10]/90 backdrop-blur-md border-b border-[#242838]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#997a15] via-[#d4af37] to-[#f4ecd8] p-0.5 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b0c10] rounded-full flex items-center justify-center">
                <span className="font-heading font-black text-lg text-[#d4af37]">शं</span>
              </div>
            </div>
            <div>
              <div className="font-heading text-xl font-bold tracking-wider text-gold-gradient">
                SHANTI AI
              </div>
              <div className="text-[10px] tracking-widest text-[#a0a5b8] font-mono uppercase">
                Ancient Wisdom • Modern Questions
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#d4af37]/15 text-[#f4ecd8] border border-[#d4af37]/40 shadow-gold-glow'
                      : 'text-[#a0a5b8] hover:text-[#f4ecd8] hover:bg-[#181b28]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#d4af37]' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mode Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center bg-[#181b28] border border-[#242838] p-1 rounded-full text-xs">
              <button
                onClick={() => setIsLiveApi(false)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                  !isLiveApi ? 'bg-[#d4af37] text-[#0b0c10] font-bold shadow-md' : 'text-[#a0a5b8] hover:text-white'
                }`}
              >
                Demo RAG
              </button>
              <button
                onClick={() => setIsLiveApi(true)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                  isLiveApi ? 'bg-[#d4af37] text-[#0b0c10] font-bold shadow-md' : 'text-[#a0a5b8] hover:text-white'
                }`}
              >
                Live API
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#a0a5b8] hover:text-white rounded-lg bg-[#181b28]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0b0c10] border-b border-[#242838] px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-[#d4af37]/20 text-[#f4ecd8] border border-[#d4af37]/40'
                    : 'text-[#a0a5b8] hover:bg-[#181b28]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#d4af37]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
