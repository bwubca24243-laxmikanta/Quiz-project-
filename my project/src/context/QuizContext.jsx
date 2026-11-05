/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { CATEGORIES, ALL_QUESTIONS, DAILY_CHALLENGE_QUESTIONS } from '../data/questions';
import { INITIAL_LEADERBOARD } from '../data/mockLeaderboard';
import { quizService } from '../services/firebase';
import { useAuth } from './AuthContext';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const { user, updateProfile } = useAuth();

  // Navigation State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'categories' | 'quiz' | 'result' | 'dashboard' | 'leaderboard' | 'history'

  // Quiz Configuration Modal
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [configCategory, setConfigCategory] = useState(null);

  // Active Quiz State
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [activeQuizConfig, setActiveQuizConfig] = useState({
    category: 'programming',
    difficulty: 'all',
    count: 10,
    timed: true,
    timePerQuestion: 30,
    isDaily: false
  });
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  // Results & Review
  const [quizResults, setQuizResults] = useState(null);

  // Local Persisted History & Leaderboard
  const [quizHistory, setQuizHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('quizzone_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'hist-sample-1',
        category: 'programming',
        categoryTitle: 'Programming & CS',
        difficulty: 'medium',
        score: 80,
        percentage: 80,
        correctCount: 4,
        wrongCount: 1,
        unattemptedCount: 0,
        totalQuestions: 5,
        timeSpent: 85,
        completedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        grade: 'Proficient',
        isDaily: false
      },
      {
        id: 'hist-sample-2',
        category: 'dbms',
        categoryTitle: 'Database Management',
        difficulty: 'hard',
        score: 100,
        percentage: 100,
        correctCount: 5,
        wrongCount: 0,
        unattemptedCount: 0,
        totalQuestions: 5,
        timeSpent: 72,
        completedAt: new Date(Date.now() - 3600000 * 26).toISOString(),
        grade: 'Quiz Master',
        isDaily: true
      }
    ];
  });

  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      const saved = localStorage.getItem('quizzone_leaderboard');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_LEADERBOARD;
  });

  // Daily Streak State
  const [dailyStatus, setDailyStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('quizzone_daily_status');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      lastCompletedDate: null,
      streakCount: 4,
      isCompletedToday: false
    };
  });

  // Toast Notification
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  const showToast = useCallback((message, type = 'info') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ id: Date.now(), message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('quizzone_history', JSON.stringify(quizHistory));
    } catch (e) {
      console.warn(e);
    }
  }, [quizHistory]);

  useEffect(() => {
    try {
      localStorage.setItem('quizzone_leaderboard', JSON.stringify(leaderboard));
    } catch (e) {
      console.warn(e);
    }
  }, [leaderboard]);

  useEffect(() => {
    try {
      localStorage.setItem('quizzone_daily_status', JSON.stringify(dailyStatus));
    } catch (e) {
      console.warn(e);
    }
  }, [dailyStatus]);

  // Submit Quiz Calculation
  const calculateResults = useCallback(() => {
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    const reviewList = activeQuestions.map((q) => {
      const userSelected = selectedAnswers[q.id];
      const isAttempted = userSelected !== undefined;
      const isCorrect = isAttempted && userSelected === q.correctAnswer;

      if (!isAttempted) {
        unattemptedCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }

      return {
        ...q,
        userSelected,
        isAttempted,
        isCorrect
      };
    });

    const total = activeQuestions.length || 1;
    const percentage = Math.round((correctCount / total) * 100);
    const score = correctCount * 10;
    const maxScore = total * 10;

    let grade = 'Needs Practice';
    if (percentage >= 90) grade = 'Quiz Master 🏆';
    else if (percentage >= 75) grade = 'Proficient 🌟';
    else if (percentage >= 50) grade = 'Intermediate 👍';

    const categoryObj = CATEGORIES.find(c => c.id === activeQuizConfig.category);
    const categoryTitle = activeQuizConfig.isDaily ? 'Daily Challenge 🔥' : (categoryObj ? categoryObj.title : 'Mixed Topics');

    const resultRecord = {
      id: 'result_' + Date.now().toString(36),
      category: activeQuizConfig.category,
      categoryTitle,
      difficulty: activeQuizConfig.difficulty,
      isDaily: activeQuizConfig.isDaily,
      totalQuestions: total,
      correctCount,
      wrongCount,
      unattemptedCount,
      score,
      maxScore,
      percentage,
      grade,
      timeSpent: totalTimeSpent,
      avgSpeed: Math.max(1, Math.round(totalTimeSpent / total)),
      completedAt: new Date().toISOString(),
      reviewList
    };

    return resultRecord;
  }, [activeQuestions, selectedAnswers, activeQuizConfig, totalTimeSpent]);

  // Submit Quiz Action
  const submitQuiz = useCallback(() => {
    setIsQuizActive(false);

    const results = calculateResults();
    setQuizResults(results);

    quizService.saveQuizResult(results);
    setQuizHistory(prev => [results, ...prev]);

    if (activeQuizConfig.isDaily) {
      const today = new Date().toDateString();
      setDailyStatus(prev => ({
        lastCompletedDate: today,
        streakCount: prev.streakCount + 1,
        isCompletedToday: true
      }));
    }

    if (user && updateProfile) {
      const updatedTotalScore = (user.totalScore || 0) + results.score;
      const updatedQuizzes = (user.quizzesTaken || 0) + 1;
      const updatedAccuracy = Math.round(
        ((user.accuracy || 85) * (updatedQuizzes - 1) + results.percentage) / updatedQuizzes
      );
      updateProfile({
        totalScore: updatedTotalScore,
        quizzesTaken: updatedQuizzes,
        accuracy: updatedAccuracy,
        streak: activeQuizConfig.isDaily ? (user.streak || 0) + 1 : (user.streak || 1)
      });

      setLeaderboard(prev => {
        const userEntryIndex = prev.findIndex(p => p.id === user.id || p.name === user.name);
        let list = [...prev];
        if (userEntryIndex >= 0) {
          list[userEntryIndex] = {
            ...list[userEntryIndex],
            score: list[userEntryIndex].score + results.score,
            accuracy: updatedAccuracy,
            streak: (user.streak || 1) + 1
          };
        } else {
          list.push({
            id: user.id || 'user_current',
            name: user.name || 'Alex Vance',
            avatar: user.avatar || '⚡',
            title: user.title || 'Rising Challenger',
            category: activeQuizConfig.category,
            score: updatedTotalScore,
            quizzesTaken: updatedQuizzes,
            accuracy: updatedAccuracy,
            streak: user.streak || 1,
            badge: 'Contender',
            rank: list.length + 1
          });
        }
        list.sort((a, b) => b.score - a.score);
        return list.map((item, idx) => ({ ...item, rank: idx + 1 }));
      });
    }

    setActiveTab('result');
    showToast('Quiz submitted successfully! Great effort!', 'success');
  }, [calculateResults, activeQuizConfig, user, updateProfile, showToast]);

  // Quiz Timer Engine
  useEffect(() => {
    if (!isQuizActive) return;

    const timer = setInterval(() => {
      setTotalTimeSpent(prev => prev + 1);

      if (activeQuizConfig.timed) {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            if (currentQuestionIndex < activeQuestions.length - 1) {
              setCurrentQuestionIndex(i => i + 1);
              return activeQuizConfig.timePerQuestion || 30;
            } else {
              submitQuiz();
              return 0;
            }
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizActive, activeQuizConfig.timed, activeQuizConfig.timePerQuestion, currentQuestionIndex, activeQuestions.length, submitQuiz]);

  const openConfigModal = (category) => {
    setConfigCategory(category);
    setIsConfigModalOpen(true);
  };

  const closeConfigModal = () => {
    setIsConfigModalOpen(false);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = ({ category = 'programming', difficulty = 'all', count = 10, timed = true, timePerQuestion = 30 }) => {
    let pool = ALL_QUESTIONS;

    if (category !== 'all') {
      pool = pool.filter(q => q.category === category);
    }

    if (difficulty !== 'all') {
      pool = pool.filter(q => q.difficulty === difficulty);
    }

    if (pool.length === 0) {
      pool = ALL_QUESTIONS.filter(q => q.category === category);
    }

    const shuffled = shuffleArray(pool).slice(0, Math.min(count, pool.length));

    setActiveQuestions(shuffled);
    setActiveQuizConfig({
      category,
      difficulty,
      count: shuffled.length,
      timed,
      timePerQuestion,
      isDaily: false
    });
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setBookmarkedQuestions([]);
    setTimeRemaining(timePerQuestion);
    setTotalTimeSpent(0);
    setQuizResults(null);
    setIsQuizActive(true);
    setIsConfigModalOpen(false);
    setActiveTab('quiz');

    const catObj = CATEGORIES.find(c => c.id === category);
    showToast(`Started ${catObj ? catObj.title : 'Quiz'} (${shuffled.length} Questions)`, 'success');
  };

  const startDailyChallenge = () => {
    const shuffledDaily = shuffleArray(DAILY_CHALLENGE_QUESTIONS).slice(0, 5);

    setActiveQuestions(shuffledDaily);
    setActiveQuizConfig({
      category: 'daily',
      difficulty: 'medium',
      count: shuffledDaily.length,
      timed: true,
      timePerQuestion: 30,
      isDaily: true
    });
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setBookmarkedQuestions([]);
    setTimeRemaining(30);
    setTotalTimeSpent(0);
    setQuizResults(null);
    setIsQuizActive(true);
    setActiveTab('quiz');

    showToast('Daily Challenge loaded! Complete to extend your streak 🔥', 'info');
  };

  const selectAnswer = (optionIndex) => {
    if (!isQuizActive) return;
    const currentQuestion = activeQuestions[currentQuestionIndex];
    if (!currentQuestion) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const toggleBookmark = (questionId) => {
    setBookmarkedQuestions(prev => {
      const exists = prev.includes(questionId);
      if (exists) {
        showToast('Bookmark removed', 'info');
        return prev.filter(id => id !== questionId);
      } else {
        showToast('Question bookmarked for review', 'success');
        return [...prev, questionId];
      }
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      if (activeQuizConfig.timed) {
        setTimeRemaining(activeQuizConfig.timePerQuestion || 30);
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      if (activeQuizConfig.timed) {
        setTimeRemaining(activeQuizConfig.timePerQuestion || 30);
      }
    }
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < activeQuestions.length) {
      setCurrentQuestionIndex(index);
      if (activeQuizConfig.timed) {
        setTimeRemaining(activeQuizConfig.timePerQuestion || 30);
      }
    }
  };

  const retakeCurrentQuiz = () => {
    if (activeQuizConfig.isDaily) {
      startDailyChallenge();
    } else {
      startQuiz(activeQuizConfig);
    }
  };

  const reviewPastQuiz = (historyItem) => {
    setQuizResults(historyItem);
    setActiveTab('result');
  };

  const clearHistory = () => {
    setQuizHistory([]);
    localStorage.removeItem('quizzone_history');
    showToast('Quiz history cleared', 'info');
  };

  const resetToHome = () => {
    setIsQuizActive(false);
    setActiveTab('home');
  };

  return (
    <QuizContext.Provider
      value={{
        categories: CATEGORIES,
        activeTab,
        setActiveTab,
        isConfigModalOpen,
        configCategory,
        openConfigModal,
        closeConfigModal,
        isQuizActive,
        activeQuizConfig,
        activeQuestions,
        currentQuestionIndex,
        currentQuestion: activeQuestions[currentQuestionIndex],
        selectedAnswers,
        bookmarkedQuestions,
        timeRemaining,
        totalTimeSpent,
        startQuiz,
        startDailyChallenge,
        selectAnswer,
        toggleBookmark,
        nextQuestion,
        prevQuestion,
        goToQuestion,
        submitQuiz,
        retakeCurrentQuiz,
        resetToHome,
        quizResults,
        quizHistory,
        reviewPastQuiz,
        clearHistory,
        leaderboard,
        dailyStatus,
        toast,
        showToast
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
