import { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import {
  Clock,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertTriangle,
  X,
  Code2
} from 'lucide-react';

export default function QuizInterface() {
  const {
    activeQuizConfig,
    activeQuestions,
    currentQuestionIndex,
    currentQuestion,
    selectedAnswers,
    bookmarkedQuestions,
    timeRemaining,
    selectAnswer,
    toggleBookmark,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    submitQuiz,
    resetToHome
  } = useQuiz();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // Keyboard shortcut listeners (1-4 or A-D to select answer, arrows for nav)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if modifier keys are pressed
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (['1', '2', '3', '4'].includes(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        selectAnswer(index);
      } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
        const mapping = { a: 0, b: 1, c: 2, d: 3, A: 0, B: 1, C: 2, D: 3 };
        selectAnswer(mapping[e.key]);
      } else if (e.key === 'ArrowRight') {
        nextQuestion();
      } else if (e.key === 'ArrowLeft') {
        prevQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectAnswer, nextQuestion, prevQuestion]);

  if (!currentQuestion) {
    return (
      <div className="quiz-empty-state">
        <p>No questions currently loaded.</p>
        <button onClick={resetToHome} className="btn-primary mt-4">
          Return to Home
        </button>
      </div>
    );
  }

  const totalQuestions = activeQuestions.length;
  const isBookmarked = bookmarkedQuestions.includes(currentQuestion.id);
  const userSelectedOption = selectedAnswers[currentQuestion.id];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  // Unanswered count
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;

  // Format time remaining
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const isTimerLow = timeRemaining <= 10 && activeQuizConfig.timed;

  return (
    <div className="quiz-interface-wrapper">
      {/* Quiz Header Bar */}
      <div className="quiz-top-bar">
        <div className="quiz-top-left">
          <button
            type="button"
            className="btn-exit-quiz"
            onClick={() => setShowExitModal(true)}
            title="Exit Quiz"
          >
            <ChevronLeft size={18} />
            <span>Quit</span>
          </button>
          <div className="quiz-topic-indicator">
            <span className="quiz-topic-pill">
              {activeQuizConfig.isDaily ? 'Daily Challenge 🔥' : currentQuestion.category.toUpperCase()}
            </span>
            <span className="quiz-difficulty-pill capitalize">
              {currentQuestion.difficulty}
            </span>
          </div>
        </div>

        {/* Center: Live Timer */}
        {activeQuizConfig.timed && (
          <div className={`quiz-timer-box ${isTimerLow ? 'timer-warning animate-pulse' : ''}`}>
            <Clock size={18} className={isTimerLow ? 'text-rose-400' : 'text-violet-400'} />
            <span className="timer-digits">{formattedTime}</span>
          </div>
        )}

        {/* Right: Bookmark & Counter */}
        <div className="quiz-top-right">
          <button
            type="button"
            className={`btn-bookmark ${isBookmarked ? 'active' : ''}`}
            onClick={() => toggleBookmark(currentQuestion.id)}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
          >
            {isBookmarked ? (
              <BookmarkCheck size={18} className="text-amber-400" />
            ) : (
              <Bookmark size={18} />
            )}
            <span className="bookmark-text">{isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>

          <div className="question-counter-pill">
            <span className="current-num">{currentQuestionIndex + 1}</span>
            <span className="divider">/</span>
            <span className="total-num">{totalQuestions}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="quiz-progress-track">
        <div
          className="quiz-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Grid: Question Card (Left) + Question Palette (Right) */}
      <div className="quiz-main-layout">
        {/* Left: Active Question Card */}
        <div className="quiz-question-card glass-panel">
          <div className="question-stem-header">
            <span className="question-order-badge">Question #{currentQuestionIndex + 1}</span>
            {isBookmarked && (
              <span className="bookmarked-indicator">
                <Bookmark size={14} className="text-amber-400" /> Bookmarked
              </span>
            )}
          </div>

          <h2 className="question-text">{currentQuestion.question}</h2>

          {/* Optional Code Snippet */}
          {currentQuestion.codeSnippet && (
            <div className="code-snippet-box">
              <div className="code-header">
                <Code2 size={14} className="text-violet-400" />
                <span>Code Preview</span>
              </div>
              <pre className="code-content">
                <code>{currentQuestion.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Options List */}
          <div className="quiz-options-list">
            {currentQuestion.options.map((optionText, idx) => {
              const isSelected = userSelectedOption === idx;
              const letter = String.fromCharCode(65 + idx); // A, B, C, D

              return (
                <button
                  key={idx}
                  type="button"
                  className={`quiz-option-button ${isSelected ? 'selected' : ''}`}
                  onClick={() => selectAnswer(idx)}
                >
                  <div className="option-letter-badge">{letter}</div>
                  <div className="option-content-text">{optionText}</div>
                  <div className="option-radio-indicator">
                    {isSelected && <div className="option-radio-dot" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation Controls */}
          <div className="quiz-nav-actions">
            <button
              type="button"
              className="btn-quiz-prev"
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <div className="quiz-middle-actions">
              <span className="keyboard-tip">
                Tip: Press keys <kbd>1</kbd>-<kbd>4</kbd> or <kbd>A</kbd>-<kbd>D</kbd>
              </span>
            </div>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                type="button"
                className="btn-quiz-next"
                onClick={nextQuestion}
              >
                <span>Next Question</span>
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                className="btn-quiz-submit"
                onClick={() => setShowConfirmModal(true)}
              >
                <Send size={16} />
                <span>Submit Quiz</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Question Navigation Palette */}
        <aside className="quiz-sidebar-palette glass-panel">
          <div className="palette-header">
            <h4 className="palette-title">Question Grid</h4>
            <span className="palette-status-count">
              {answeredCount}/{totalQuestions} Answered
            </span>
          </div>

          {/* Grid of Number Badges */}
          <div className="palette-grid">
            {activeQuestions.map((q, index) => {
              const isCurrent = index === currentQuestionIndex;
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isMarked = bookmarkedQuestions.includes(q.id);

              let statusClass = 'unanswered';
              if (isAnswered) statusClass = 'answered';
              if (isCurrent) statusClass += ' active-current';

              return (
                <button
                  key={q.id}
                  type="button"
                  className={`palette-tile ${statusClass}`}
                  onClick={() => goToQuestion(index)}
                  title={`Go to Question ${index + 1}`}
                >
                  <span>{index + 1}</span>
                  {isMarked && <div className="palette-bookmark-dot" />}
                </button>
              );
            })}
          </div>

          {/* Palette Legend */}
          <div className="palette-legend">
            <div className="legend-item">
              <span className="legend-dot answered-dot" />
              <span>Answered ({answeredCount})</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot unanswered-dot" />
              <span>Unanswered ({unansweredCount})</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot bookmarked-dot" />
              <span>Bookmarked ({bookmarkedQuestions.length})</span>
            </div>
          </div>

          {/* Quick Submit from Sidebar */}
          <button
            type="button"
            className="btn-sidebar-submit w-full mt-4"
            onClick={() => setShowConfirmModal(true)}
          >
            <Send size={16} />
            <span>Finish & Submit</span>
          </button>
        </aside>
      </div>

      {/* Confirmation Modal before Submit */}
      {showConfirmModal && (
        <div className="modal-backdrop" onClick={() => setShowConfirmModal(false)}>
          <div className="confirm-modal-glass" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrap">
              <AlertTriangle size={28} className="text-amber-400" />
            </div>

            <h3 className="confirm-title">Submit Assessment?</h3>
            <p className="confirm-desc">
              You have answered <strong>{answeredCount}</strong> out of{' '}
              <strong>{totalQuestions}</strong> questions.
              {unansweredCount > 0 && (
                <span className="unanswered-warning block mt-2 text-rose-300">
                  ⚠️ You still have {unansweredCount} unattempted question{unansweredCount > 1 ? 's' : ''}!
                </span>
              )}
            </p>

            <div className="confirm-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                Keep Reviewing
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setShowConfirmModal(false);
                  submitQuiz();
                }}
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="modal-backdrop" onClick={() => setShowExitModal(false)}>
          <div className="confirm-modal-glass" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrap bg-rose-500/10">
              <X size={28} className="text-rose-400" />
            </div>

            <h3 className="confirm-title">Quit Active Session?</h3>
            <p className="confirm-desc">
              Your current progress in this quiz will be discarded and will not count towards your completion history.
            </p>

            <div className="confirm-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowExitModal(false)}
              >
                Resume Quiz
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={() => {
                  setShowExitModal(false);
                  resetToHome();
                }}
              >
                Quit Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
