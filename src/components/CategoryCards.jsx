import { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import {
  Code2,
  Database,
  Network,
  BrainCircuit,
  Globe2,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';

const ICON_MAP = {
  Code2: Code2,
  Database: Database,
  Network: Network,
  BrainCircuit: BrainCircuit,
  Globe2: Globe2
};

export default function CategoryCards() {
  const { categories, openConfigModal, startDailyChallenge } = useQuiz();
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch =
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <section className="categories-section" id="categories-section">
      <div className="section-header">
        <div className="section-eyebrow">
          <Sparkles size={14} className="text-violet-400" />
          <span>Curated Learning Paths</span>
        </div>
        <h2 className="section-title">Explore Core Technical Domains</h2>
        <p className="section-subtitle">
          Select your discipline below to initiate a focused diagnostic assessment or practice session.
        </p>

        {/* Filter & Search Bar */}
        <div className="categories-controls">
          <div className="difficulty-pills">
            <span className="filter-label">
              <Filter size={14} /> Difficulty:
            </span>
            {[
              { id: 'all', label: 'All Levels' },
              { id: 'easy', label: 'Beginner' },
              { id: 'medium', label: 'Intermediate' },
              { id: 'hard', label: 'Advanced' }
            ].map(lvl => (
              <button
                key={lvl.id}
                type="button"
                className={`filter-pill ${selectedDifficultyFilter === lvl.id ? 'active' : ''}`}
                onClick={() => setSelectedDifficultyFilter(lvl.id)}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          <div className="search-input-wrap">
            <input
              type="text"
              placeholder="Search topics (e.g. SQL, TCP, Neural)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Grid of Subject Cards */}
      <div className="categories-grid">
        {filteredCategories.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Code2;
          return (
            <div
              key={cat.id}
              className="category-card-glass"
              style={{ '--cat-accent': cat.accentColor }}
            >
              <div className="cat-card-top">
                <div className="cat-icon-container">
                  <IconComponent size={28} style={{ color: cat.accentColor }} />
                </div>
                <span className="cat-badge">{cat.badge}</span>
              </div>

              <h3 className="cat-title">{cat.title}</h3>
              <p className="cat-description">{cat.description}</p>

              {/* Topics Pills */}
              <div className="cat-topics-list">
                {cat.topics.map((topic, i) => (
                  <span key={i} className="topic-pill">
                    {topic}
                  </span>
                ))}
              </div>

              {/* Card Meta & Action */}
              <div className="cat-card-footer">
                <div className="cat-meta-info">
                  <span className="meta-questions">{cat.totalQuestions}+ Questions</span>
                  <span className="meta-dot">•</span>
                  <span className="meta-level">All Levels</span>
                </div>

                <button
                  type="button"
                  className="btn-start-quiz"
                  onClick={() => openConfigModal(cat.id)}
                >
                  <span>Start Quiz</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Challenge Callout Banner */}
      <div className="daily-banner-card">
        <div className="daily-banner-content">
          <span className="daily-banner-tag">TODAY'S SPECIAL CHALLENGE</span>
          <h3 className="daily-banner-title">Ready for Today's 5-Question Sprint?</h3>
          <p className="daily-banner-desc">
            Test a hand-picked mix of Programming, DBMS, Networks, and AI. Keep your daily streak blazing!
          </p>
        </div>
        <button
          type="button"
          className="btn-daily-banner-cta"
          onClick={() => startDailyChallenge()}
        >
          <span>Play Daily Sprint 🔥</span>
        </button>
      </div>
    </section>
  );
}
