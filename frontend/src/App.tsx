import { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import { BhishmaPage } from './pages/BhishmaPage';
import { ExplorePage } from './pages/ExplorePage';
import { JournalPage } from './pages/JournalPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AcademicPage } from './pages/AcademicPage';

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedThemeForChat, setSelectedThemeForChat] = useState<string | undefined>(undefined);
  const [isLiveApi, setIsLiveApi] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e0e2ec] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#f4ecd8]">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLiveApi={isLiveApi}
        setIsLiveApi={setIsLiveApi}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            setSelectedThemeForChat={setSelectedThemeForChat}
          />
        )}
        
        {activeTab === 'chat' && (
          <ChatPage
            initialTheme={selectedThemeForChat}
            isLiveApi={isLiveApi}
          />
        )}

        {activeTab === 'bhishma' && (
          <BhishmaPage />
        )}

        {activeTab === 'explore' && (
          <ExplorePage />
        )}

        {activeTab === 'journal' && (
          <JournalPage />
        )}

        {activeTab === 'architecture' && (
          <HowItWorksPage />
        )}

        {activeTab === 'academic' && (
          <AcademicPage />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export default App;
