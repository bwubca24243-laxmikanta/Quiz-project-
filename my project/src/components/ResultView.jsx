import { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import ConfettiCanvas from './ConfettiCanvas';
import {
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Home,
  Share2,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  Trophy,
  HelpCircle,
  BookOpen
} from 'lucide-react';

export default function ResultView() {
  const {
    quizResults,
    retakeCurrentQuiz,
    resetToHome,
    setActiveTab,
    showToast
  } = useQuiz();

  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'incorrect' | 'correct'

  if (!quizResults) {
    return (
      <div className="result-empty-container">
        <p>No quiz results available to display.</p>
        <button onClick={resetToHome} className="btn-primary mt-4">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const {
    percentage,
    score,
    maxScore,
    correctCount,
    wrongCount,
    unattemptedCount,
    grade,
    timeSpent,
    categoryTitle,
    difficulty,
    isDaily,
    reviewList = []
  } = quizResults;

  const isCelebration = percentage >= 60;

  // Format time
  const mins = Math.floor(timeSpent / 60);
  const secs = timeSpent % 60;
  const formattedDuration = `${mins}m ${secs}s`;

  // Toggle accordion item
  const toggleAccordion = (qId) => {
    setExpandedQuestion(prev => (prev === qId ? null : qId));
  };

  // Copy share message
  const handleShare = () => {
    const text = `🎯 I just scored ${percentage}% (${score}/${maxScore} pts) in QuizZone's ${categoryTitle} challenge! Can you beat my score? 🚀`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('Score copied to clipboard! Share it with your peers.', 'success');
    } else {
      showToast(text, 'info');
    }
  };

  // Filter questions for review
  const filteredReview = reviewList.filter((item) => {
    if (filterMode === 'correct') return item.isCorrect;
    if (filterMode === 'incorrect') return !item.isCorrect;
    return true;
  });

  return (
    <div className="result-view-container">
      {/* Celebration Confetti */}
      <ConfettiCanvas trigger={isCelebration} />

      {/* Hero Score Showcase Card */}
      <div className="result-hero-card glass-panel">
        <div className="result-hero-badge">
          <Sparkles size={14} className="text-violet-400" />
          <span>{isDaily ? 'Daily Challenge Complete' : 'Assessment Overview'}</span>
        </div>

        <h1 className="result-title">
          {percentage >= 80 ? 'Outstanding Mastery! 🎉' : percentage >= 50 ? 'Solid Effort! 👏' : 'Keep Pushing Forward! 💪'}
        </h1>
        <p className="result-subtitle">
          You finished the <strong>{categoryTitle}</strong> ({difficulty.toUpperCase()}) session.
        </p>

        {/* Circular Progress & Key Score Ring */}
        <div className="score-ring-wrapper">
          <div className="score-radial-gauge">
            <svg viewBox="0 0 160 160" className="gauge-svg">
              <circle
                className="gauge-bg"
                cx="80"
                cy="80"
                r="68"
              />
              <circle
                className="gauge-fill"
                cx="80"
                cy="80"
                r="68"
                style={{
                  strokeDashoffset: 427 - (427 * percentage) / 100,
                  stroke: percentage >= 75 ? '#8b5cf6' : percentage >= 50 ? '#3b82f6' : '#f59e0b'
                }}
              />
            </svg>
            <div className="gauge-inner-content">
              <span className="gauge-percentage">{percentage}%</span>
              <span className="gauge-label">Accuracy</span>
            </div>
          </div>

          <div className="result-grade-badge">
            <Award size={18} className="text-amber-400" />
            <span>Grade: {grade}</span>
          </div>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="result-metrics-grid">
          <div className="result-metric-tile correct-tile">
            <div className="metric-icon">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <div className="metric-details">
              <span className="metric-value text-emerald-400">{correctCount}</span>
              <span className="metric-name">Correct</span>
            </div>
          </div>

          <div className="result-metric-tile wrong-tile">
            <div className="metric-icon">
              <XCircle size={20} className="text-rose-400" />
            </div>
            <div className="metric-details">
              <span className="metric-value text-rose-400">{wrongCount}</span>
              <span className="metric-name">Incorrect</span>
            </div>
          </div>

          <div className="result-metric-tile unattempted-tile">
            <div className="metric-icon">
              <HelpCircle size={20} className="text-amber-400" />
            </div>
            <div className="metric-details">
              <span className="metric-value text-amber-400">{unattemptedCount}</span>
              <span className="metric-name">Skipped</span>
            </div>
          </div>

          <div className="result-metric-tile time-tile">
            <div className="metric-icon">
              <Clock size={20} className="text-violet-400" />
            </div>
            <div className="metric-details">
              <span className="metric-value text-violet-300">{formattedDuration}</span>
              <span className="metric-name">Duration</span>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="result-actions-bar">
          <button
            type="button"
            className="btn-primary"
            onClick={retakeCurrentQuiz}
          >
            <RotateCcw size={18} />
            <span>Retake Quiz</span>
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={handleShare}
          >
            <Share2 size={18} />
            <span>Share Result</span>
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => setActiveTab('leaderboard')}
          >
            <Trophy size={18} />
            <span>Leaderboard</span>
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={resetToHome}
          >
            <Home size={18} />
            <span>Home</span>
          </button>
        </div>
      </div>

      {/* Detailed Question Review Section */}
      <div className="review-section-container">
        <div className="review-section-header">
          <div>
            <h3 className="review-title">Detailed Question Review</h3>
            <p className="review-subtitle">
              Inspect answer rationales, review mistakes, and reinforce conceptual knowledge.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="review-filter-pills">
            <button
              type="button"
              className={`review-pill ${filterMode === 'all' ? 'active' : ''}`}
              onClick={() => setFilterMode('all')}
            >
              All ({reviewList.length})
            </button>
            <button
              type="button"
              className={`review-pill ${filterMode === 'incorrect' ? 'active' : ''}`}
              onClick={() => setFilterMode('incorrect')}
            >
              Mistakes ({wrongCount + unattemptedCount})
            </button>
            <button
              type="button"
              className={`review-pill ${filterMode === 'correct' ? 'active' : ''}`}
              onClick={() => setFilterMode('correct')}
            >
              Correct ({correctCount})
            </button>
          </div>
        </div>

        {/* List of Questions with In-Depth Explanations */}
        <div className="review-cards-list">
          {filteredReview.map((item, index) => {
            const isExpanded = expandedQuestion === item.id;

            return (
              <div
                key={item.id}
                className={`review-item-card glass-panel ${
                  item.isCorrect ? 'status-correct' : item.userSelected !== undefined ? 'status-wrong' : 'status-skipped'
                }`}
              >
                <div
                  className="review-card-head"
                  onClick={() => toggleAccordion(item.id)}
                >
                  <div className="review-status-badge">
                    {item.isCorrect ? (
                      <span className="badge-correct">
                        <CheckCircle2 size={16} /> Correct
                      </span>
                    ) : item.userSelected !== undefined ? (
                      <span className="badge-wrong">
                        <XCircle size={16} /> Incorrect
                      </span>
                    ) : (
                      <span className="badge-skipped">
                        <HelpCircle size={16} /> Unattempted
                      </span>
                    )}
                  </div>

                  <h4 className="review-question-heading">
                    <span className="q-num">Q{index + 1}:</span> {item.question}
                  </h4>

                  <button
                    type="button"
                    className="review-toggle-icon"
                    aria-label="Toggle details"
                  >
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="review-card-body animate-fade-in">
                    {item.codeSnippet && (
                      <pre className="review-code-snippet">
                        <code>{item.codeSnippet}</code>
                      </pre>
                    )}

                    <div className="review-options-grid">
                      {item.options.map((opt, optIdx) => {
                        const isUserChoice = item.userSelected === optIdx;
                        const isTheCorrectChoice = item.correctAnswer === optIdx;
                        const optLetter = String.fromCharCode(65 + optIdx);

                        let optClass = 'opt-neutral';
                        if (isTheCorrectChoice) optClass = 'opt-is-correct';
                        else if (isUserChoice && !item.isCorrect) optClass = 'opt-is-wrong';

                        return (
                          <div key={optIdx} className={`review-option-row ${optClass}`}>
                            <span className="opt-key">{optLetter}</span>
                            <span className="opt-text">{opt}</span>
                            {isTheCorrectChoice && (
                              <span className="opt-verdict-badge correct">Correct Answer</span>
                            )}
                            {isUserChoice && !item.isCorrect && (
                              <span className="opt-verdict-badge wrong">Your Pick</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Box */}
                    <div className="explanation-callout">
                      <div className="explanation-header">
                        <BookOpen size={16} className="text-violet-400" />
                        <span>Concept Explanation & Rationale</span>
                      </div>
                      <p className="explanation-text">{item.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
