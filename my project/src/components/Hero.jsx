import { useQuiz } from '../context/QuizContext';
import {
  Play,
  Flame,
  Sparkles,
  Award,
  Zap,
  ArrowRight,
  Code2,
  CheckCircle2
} from 'lucide-react';

export default function Hero() {
  const { openConfigModal, startDailyChallenge, dailyStatus } = useQuiz();

  return (
    <section className="hero-section">
      <div className="hero-glow-blob-1" />
      <div className="hero-glow-blob-2" />

      <div className="hero-container">
        {/* Left Column: Headlines & CTAs */}
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <span className="badge-glow-dot" />
            <Sparkles size={14} className="text-violet-400" />
            <span>Next-Gen Assessment & Interactive Learning</span>
          </div>

          <h1 className="hero-title animate-fade-in-up">
            Master Tech Concepts with <br />
            <span className="hero-gradient-headline">Precision Quizzes</span>
          </h1>

          <p className="hero-lead">
            Elevate your engineering and technical acumen through high-yield challenges in{' '}
            <strong>Programming</strong>, <strong>DBMS</strong>, <strong>Computer Networks</strong>,{' '}
            <strong>AI & ML</strong>, and <strong>Tech Trivia</strong>. Complete with in-depth explanations, real-time analytics, and global leaderboards.
          </p>

          {/* Action CTAs */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={() => openConfigModal('programming')}
            >
              <Play size={20} fill="currentColor" />
              <span>Start Instant Quiz</span>
            </button>

            <button
              type="button"
              className="btn-hero-secondary"
              onClick={() => startDailyChallenge()}
            >
              <Flame size={18} className="text-amber-400" />
              <span>Daily Challenge</span>
              <span className="hero-streak-pill">🔥 5 Qs</span>
            </button>
          </div>

          {/* Social Proof & Features Pills */}
          <div className="hero-pills-row">
            <div className="hero-feature-item">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>500+ Curated Questions</span>
            </div>
            <div className="hero-feature-item">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Instant Concept Explanations</span>
            </div>
            <div className="hero-feature-item">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Real-Time Benchmarking</span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Interactive Floating Preview */}
        <div className="hero-visual">
          <div className="hero-card-stack">
            {/* Main Interactive Quiz Mockup Card */}
            <div className="hero-glass-card hero-main-card animate-float">
              <div className="hero-card-header">
                <div className="hero-card-tag">
                  <Code2 size={14} className="text-violet-400" />
                  <span>Programming • Question 4 of 10</span>
                </div>
                <div className="hero-timer-pill">
                  <Zap size={14} className="text-amber-400" />
                  <span>00:24</span>
                </div>
              </div>

              <h3 className="hero-question-preview">
                What is the time complexity of searching an element in a balanced Binary Search Tree?
              </h3>

              <div className="hero-options-preview">
                <div className="hero-option-item">
                  <span className="opt-letter">A</span>
                  <span>O(1)</span>
                </div>
                <div className="hero-option-item selected">
                  <span className="opt-letter">B</span>
                  <span>O(log n)</span>
                  <CheckCircle2 size={16} className="text-violet-400 ml-auto" />
                </div>
                <div className="hero-option-item">
                  <span className="opt-letter">C</span>
                  <span>O(n)</span>
                </div>
              </div>

              <div className="hero-card-footer">
                <div className="hero-accuracy-metric">
                  <span className="text-xs text-slate-400">Community Accuracy</span>
                  <div className="hero-metric-bar">
                    <div className="hero-metric-fill" style={{ width: '88%' }} />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-card-action"
                  onClick={() => openConfigModal('programming')}
                >
                  Solve Now
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Floating Floating Badge 1: Daily Streak */}
            <div className="hero-badge-float badge-top-right animate-float-delayed">
              <div className="streak-icon-wrap">
                <Flame size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Daily Streak</p>
                <p className="text-sm font-bold text-white">
                  {dailyStatus?.streakCount || 5} Days Active 🔥
                </p>
              </div>
            </div>

            {/* Floating Badge 2: Mastery Rank */}
            <div className="hero-badge-float badge-bottom-left animate-float">
              <div className="trophy-icon-wrap">
                <Award size={20} className="text-violet-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Global Ranking</p>
                <p className="text-sm font-bold text-white">Top 2.5% Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stats Row */}
      <div className="hero-stats-band">
        <div className="hero-stats-grid">
          <div className="stat-item">
            <span className="stat-number">50,000+</span>
            <span className="stat-label">Quizzes Completed</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">5 Major</span>
            <span className="stat-label">Technical Domains</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">98.4%</span>
            <span className="stat-label">User Satisfaction</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">100% Free</span>
            <span className="stat-label">No Hidden Paywalls</span>
          </div>
        </div>
      </div>
    </section>
  );
}
