import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider, useQuiz } from './context/QuizContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryCards from './components/CategoryCards';
import QuizInterface from './components/QuizInterface';
import ResultView from './components/ResultView';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import HistoryView from './components/HistoryView';
import QuizConfigModal from './components/QuizConfigModal';
import AuthModal from './components/AuthModal';
import NotificationToast from './components/NotificationToast';
import Footer from './components/Footer';

function MainContent() {
  const { activeTab } = useQuiz();

  return (
    <div className="app-layout min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* View Routing based on activeTab */}
        {activeTab === 'home' && (
          <>
            <Hero />
            <CategoryCards />
          </>
        )}

        {activeTab === 'categories' && (
          <div className="pt-8">
            <CategoryCards />
          </div>
        )}

        {activeTab === 'quiz' && <QuizInterface />}

        {activeTab === 'result' && <ResultView />}

        {activeTab === 'dashboard' && <Dashboard />}

        {activeTab === 'leaderboard' && <Leaderboard />}

        {activeTab === 'history' && <HistoryView />}
      </main>

      {/* Footer is displayed on non-quiz pages for clean focus */}
      {activeTab !== 'quiz' && <Footer />}

      {/* Global Modals & Notifications */}
      <QuizConfigModal />
      <AuthModal />
      <NotificationToast />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QuizProvider>
          <MainContent />
        </QuizProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
