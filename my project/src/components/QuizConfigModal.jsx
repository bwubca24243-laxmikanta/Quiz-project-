import { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { CATEGORIES } from '../data/questions';
import { X, Play, Clock, Target, Layers } from 'lucide-react';

export default function QuizConfigModal() {
  const { isConfigModalOpen, closeConfigModal, configCategory, startQuiz } = useQuiz();

  const [difficulty, setDifficulty] = useState('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [isTimed, setIsTimed] = useState(true);

  const selectedCat = CATEGORIES.find(c => c.id === configCategory) || CATEGORIES[0];

  if (!isConfigModalOpen) return null;

  const handleStart = () => {
    startQuiz({
      category: configCategory || selectedCat.id,
      difficulty,
      count: questionCount,
      timed: isTimed,
      timePerQuestion: 30
    });
  };

  return (
    <div className="modal-backdrop" onClick={closeConfigModal}>
      <div className="config-modal-glass" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={closeConfigModal}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="config-modal-header">
          <div className="category-tag-pill" style={{ borderColor: selectedCat.accentColor }}>
            <span className="dot" style={{ backgroundColor: selectedCat.accentColor }} />
            <span>{selectedCat.badge} Category</span>
          </div>
          <h2 className="config-title">{selectedCat.title} Quiz Setup</h2>
          <p className="config-subtitle">
            Configure your session preferences to tailor the challenge to your skill level.
          </p>
        </div>

        {/* Configuration Options */}
        <div className="config-body">
          {/* Difficulty */}
          <div className="config-section">
            <label className="config-section-label">
              <Target size={16} className="text-violet-400" />
              <span>Select Difficulty</span>
            </label>
            <div className="options-grid-4">
              {[
                { id: 'all', label: 'Mixed', desc: 'Balanced variety' },
                { id: 'easy', label: 'Beginner', desc: 'Fundamentals' },
                { id: 'medium', label: 'Intermediate', desc: 'Core logic' },
                { id: 'hard', label: 'Advanced', desc: 'Deep nuances' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`config-tile ${difficulty === opt.id ? 'active' : ''}`}
                  onClick={() => setDifficulty(opt.id)}
                >
                  <span className="tile-title">{opt.label}</span>
                  <span className="tile-desc">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="config-section">
            <label className="config-section-label">
              <Layers size={16} className="text-violet-400" />
              <span>Question Count</span>
            </label>
            <div className="options-grid-4">
              {[
                { count: 5, label: '5 Quick', desc: '~3 mins' },
                { count: 10, label: '10 Standard', desc: '~6 mins' },
                { count: 15, label: '15 Deep', desc: '~9 mins' },
                { count: 20, label: '20 Complete', desc: '~12 mins' }
              ].map((opt) => (
                <button
                  key={opt.count}
                  type="button"
                  className={`config-tile ${questionCount === opt.count ? 'active' : ''}`}
                  onClick={() => setQuestionCount(opt.count)}
                >
                  <span className="tile-title">{opt.label}</span>
                  <span className="tile-desc">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mode / Timer Toggle */}
          <div className="config-section">
            <label className="config-section-label">
              <Clock size={16} className="text-violet-400" />
              <span>Timer & Pace</span>
            </label>
            <div className="timer-switch-card">
              <div className="timer-info">
                <span className="timer-mode-name">
                  {isTimed ? 'Timed Mode (30s per question)' : 'Casual Practice Mode (Untimed)'}
                </span>
                <span className="timer-mode-desc">
                  {isTimed
                    ? 'Simulates real assessment constraints with countdown adrenaline.'
                    : 'Take all the time you need to study and analyze each question.'}
                </span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${isTimed ? 'on' : 'off'}`}
                onClick={() => setIsTimed(prev => !prev)}
                aria-label="Toggle timed mode"
              >
                <div className="switch-thumb" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="config-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={closeConfigModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleStart}
          >
            <Play size={18} fill="currentColor" />
            <span>Launch Quiz Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
