import { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import {
  History as HistoryIcon,
  Search,
  Trash2,
  RotateCcw,
  BookOpen,
  Calendar,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function HistoryView() {
  const {
    quizHistory,
    reviewPastQuiz,
    startQuiz,
    clearHistory,
    setActiveTab
  } = useQuiz();

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filter logic
  const filteredHistory = quizHistory.filter((item) => {
    const matchesCat = selectedCategoryFilter === 'all' || item.category === selectedCategoryFilter;
    const matchesSearch =
      item.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.grade.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="history-wrapper">
      {/* Header Banner */}
      <div className="history-header glass-panel">
        <div className="history-header-left">
          <div className="section-eyebrow">
            <HistoryIcon size={16} className="text-violet-400" />
            <span>Audit Trail & Progress</span>
          </div>
          <h1 className="history-title">Assessment History</h1>
          <p className="history-subtitle">
            Review detailed question rationales, track score improvements, and revisit previous diagnostic evaluations.
          </p>
        </div>

        {quizHistory.length > 0 && (
          <button
            type="button"
            className="btn-danger-sm flex items-center gap-2"
            onClick={() => setShowClearConfirm(true)}
          >
            <Trash2 size={16} />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="history-controls glass-panel">
        <div className="category-filter-pills">
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'programming', label: 'Programming' },
            { id: 'dbms', label: 'DBMS' },
            { id: 'networks', label: 'Networks' },
            { id: 'ai', label: 'AI' },
            { id: 'gk', label: 'General' },
            { id: 'daily', label: 'Daily Sprints' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`filter-pill ${selectedCategoryFilter === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategoryFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="history-search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search completed quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="history-search-input"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 ? (
        <div className="empty-history-card glass-panel">
          <div className="empty-icon-wrap">
            <HistoryIcon size={36} className="text-violet-400" />
          </div>
          <h3 className="empty-title">No assessment records found</h3>
          <p className="empty-desc">
            {quizHistory.length === 0
              ? 'You have not completed any quizzes yet. Start your first session to build your portfolio!'
              : 'No records matched your search or category filter.'}
          </p>
          <button
            type="button"
            className="btn-primary mt-4"
            onClick={() => setActiveTab('categories')}
          >
            Explore Quiz Topics <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        /* History Cards List */
        <div className="history-cards-grid">
          {filteredHistory.map((item) => {
            const dateObj = new Date(item.completedAt || 0);
            const formattedDate = dateObj.toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            const formattedTime = dateObj.toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit'
            });

            const mins = Math.floor((item.timeSpent || 60) / 60);
            const secs = (item.timeSpent || 60) % 60;

            return (
              <div key={item.id} className="history-card glass-panel">
                <div className="history-card-top">
                  <div>
                    <span className="history-cat-tag">
                      {item.isDaily ? 'Daily Sprint 🔥' : item.categoryTitle}
                    </span>
                    <h3 className="history-card-title">{item.categoryTitle}</h3>
                    <div className="history-date-row">
                      <Calendar size={13} />
                      <span>{formattedDate} at {formattedTime}</span>
                    </div>
                  </div>

                  <div className="history-score-badge">
                    <span className="history-score-num">{item.percentage}%</span>
                    <span className="history-score-label">
                      {item.score}/{item.maxScore || item.totalQuestions * 10} pts
                    </span>
                  </div>
                </div>

                <div className="history-breakdown-row">
                  <div className="history-mini-stat">
                    <span className="label">Difficulty</span>
                    <span className="value capitalize">{item.difficulty}</span>
                  </div>
                  <div className="history-mini-stat">
                    <span className="label">Questions</span>
                    <span className="value">{item.totalQuestions}</span>
                  </div>
                  <div className="history-mini-stat">
                    <span className="label">Duration</span>
                    <span className="value">{mins}m {secs}s</span>
                  </div>
                  <div className="history-mini-stat">
                    <span className="label">Performance</span>
                    <span className="value text-violet-400 font-semibold">{item.grade}</span>
                  </div>
                </div>

                <div className="history-card-actions">
                  <button
                    type="button"
                    className="btn-review-answers"
                    onClick={() => reviewPastQuiz(item)}
                  >
                    <BookOpen size={16} />
                    <span>Review Answers & Explanations</span>
                  </button>

                  <button
                    type="button"
                    className="btn-retake-sm"
                    onClick={() =>
                      startQuiz({
                        category: item.category,
                        difficulty: item.difficulty,
                        count: item.totalQuestions || 10,
                        timed: true
                      })
                    }
                    title="Retake Quiz"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-backdrop" onClick={() => setShowClearConfirm(false)}>
          <div className="confirm-modal-glass" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrap bg-rose-500/10">
              <AlertTriangle size={28} className="text-rose-400" />
            </div>
            <h3 className="confirm-title">Clear Complete History?</h3>
            <p className="confirm-desc">
              This action will permanently wipe all your saved assessment records, scores, and answer breakdowns from this device.
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={() => {
                  clearHistory();
                  setShowClearConfirm(false);
                }}
              >
                Yes, Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
