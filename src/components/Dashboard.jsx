import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { CATEGORIES } from '../data/questions';
import {
  Trophy,
  Flame,
  Award,
  Zap,
  Target,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BarChart3,
  Calendar
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const {
    quizHistory,
    openConfigModal,
    startDailyChallenge,
    reviewPastQuiz,
    setActiveTab,
    dailyStatus
  } = useQuiz();

  const totalQuizzes = user?.quizzesTaken || quizHistory.length || 0;
  const avgAccuracy = user?.accuracy || 92;
  const streak = dailyStatus?.streakCount || user?.streak || 5;
  const totalScore = user?.totalScore || 4280;

  // Compute category breakdown from history
  const categoryStats = CATEGORIES.map((cat) => {
    const historyForCat = quizHistory.filter(h => h.category === cat.id);
    const count = historyForCat.length;
    const fallbackScore = 75 + (cat.id.length * 3) % 20;
    const avgScore = count > 0
      ? Math.round(historyForCat.reduce((acc, curr) => acc + curr.percentage, 0) / count)
      : fallbackScore;
    return {
      ...cat,
      playedCount: count,
      masteryScore: avgScore
    };
  });

  return (
    <div className="dashboard-wrapper">
      {/* Dashboard Top Greeting Banner */}
      <div className="dashboard-welcome-banner glass-panel">
        <div className="welcome-info-left">
          <div className="welcome-avatar-wrap">
            <span className="welcome-avatar-emoji">{user?.avatar || '⚡'}</span>
          </div>
          <div>
            <div className="welcome-status-pill">
              <span className="welcome-dot" />
              <span>Elite SaaS Member</span>
            </div>
            <h1 className="welcome-heading">
              Welcome back, <span className="text-gradient">{user?.name || 'Alex Vance'}</span>
            </h1>
            <p className="welcome-subtitle">
              Ready to sharpen your engineering knowledge? Here is your personalized performance breakdown.
            </p>
          </div>
        </div>

        <div className="welcome-actions-right">
          <button
            type="button"
            className="btn-primary"
            onClick={() => openConfigModal('programming')}
          >
            <Zap size={18} />
            <span>Launch Quick Assessment</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="dashboard-stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-card-icon bg-violet-500/10 text-violet-400">
            <Target size={24} />
          </div>
          <div className="stat-card-body">
            <span className="stat-card-label">Quizzes Completed</span>
            <span className="stat-card-value">{totalQuizzes}</span>
            <span className="stat-card-sub text-emerald-400 flex items-center gap-1">
              <TrendingUp size={12} /> +3 this week
            </span>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-card-icon bg-amber-500/10 text-amber-400">
            <Flame size={24} />
          </div>
          <div className="stat-card-body">
            <span className="stat-card-label">Active Streak</span>
            <span className="stat-card-value">{streak} Days 🔥</span>
            <span className="stat-card-sub text-amber-300">Keep it blazing!</span>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-card-icon bg-blue-500/10 text-blue-400">
            <Award size={24} />
          </div>
          <div className="stat-card-body">
            <span className="stat-card-label">Average Accuracy</span>
            <span className="stat-card-value">{avgAccuracy}%</span>
            <span className="stat-card-sub text-blue-300">Top 5% of learners</span>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-card-icon bg-emerald-500/10 text-emerald-400">
            <Trophy size={24} />
          </div>
          <div className="stat-card-body">
            <span className="stat-card-label">Total Knowledge Score</span>
            <span className="stat-card-value">{totalScore}</span>
            <span className="stat-card-sub text-emerald-400">Rank Tier: Master</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Subject Mastery (Left) + Daily Sprint & Trend (Right) */}
      <div className="dashboard-main-grid">
        {/* Left: Domain Mastery Breakdown */}
        <div className="dashboard-card glass-panel">
          <div className="card-header-row">
            <div>
              <h3 className="card-title flex items-center gap-2">
                <BarChart3 size={18} className="text-violet-400" />
                <span>Subject Mastery Analytics</span>
              </h3>
              <p className="card-subtitle">Performance distribution across technical domains</p>
            </div>
            <button
              type="button"
              className="btn-text-sm"
              onClick={() => setActiveTab('categories')}
            >
              View Topics <ArrowRight size={14} />
            </button>
          </div>

          <div className="subject-mastery-list">
            {categoryStats.map((item) => (
              <div key={item.id} className="mastery-item">
                <div className="mastery-info-row">
                  <span className="mastery-name">{item.title}</span>
                  <span className="mastery-score font-bold" style={{ color: item.accentColor }}>
                    {item.masteryScore}% Mastery
                  </span>
                </div>
                <div className="mastery-bar-track">
                  <div
                    className="mastery-bar-fill"
                    style={{
                      width: `${item.masteryScore}%`,
                      backgroundColor: item.accentColor
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mastery-footnote">
            <Sparkles size={14} className="text-amber-400" />
            <span>Scores adjust automatically as you complete tests in each subject.</span>
          </div>
        </div>

        {/* Right: Daily Sprint Action + Recent Activity */}
        <div className="dashboard-side-col flex flex-col gap-6">
          {/* Daily Sprint Card */}
          <div className="daily-sprint-widget glass-panel">
            <div className="sprint-header">
              <span className="sprint-pill">DAILY CHALLENGE</span>
              <span className="sprint-streak">🔥 {streak} Days</span>
            </div>
            <h3 className="sprint-title">Today's Curated Technical Sprint</h3>
            <p className="sprint-desc">
              Complete 5 high-yield questions across topics to extend your streak and gain +50 XP.
            </p>
            <button
              type="button"
              className="btn-sprint-action"
              onClick={() => startDailyChallenge()}
            >
              <span>{dailyStatus?.isCompletedToday ? 'Play Daily Again' : 'Start Today\'s Sprint'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Achievement Badges */}
          <div className="achievements-widget glass-panel">
            <h3 className="card-title text-base flex items-center gap-2 mb-3">
              <Award size={18} className="text-amber-400" />
              <span>Earned Badges & Honors</span>
            </h3>
            <div className="badge-showcase-grid">
              <div className="honor-badge-item" title="Completed a quiz with 100% accuracy">
                <span className="honor-emoji">🎯</span>
                <span className="honor-name">Sharpshooter</span>
              </div>
              <div className="honor-badge-item" title="Maintained a 5-day active quiz streak">
                <span className="honor-emoji">🔥</span>
                <span className="honor-name">Streak Ace</span>
              </div>
              <div className="honor-badge-item" title="Completed 10 programming quizzes">
                <span className="honor-emoji">💻</span>
                <span className="honor-name">Code Titan</span>
              </div>
              <div className="honor-badge-item" title="Mastered DBMS normalization">
                <span className="honor-emoji">🗄️</span>
                <span className="honor-name">Data Architect</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="dashboard-history-card glass-panel">
        <div className="card-header-row">
          <div>
            <h3 className="card-title flex items-center gap-2">
              <Calendar size={18} className="text-violet-400" />
              <span>Recent Assessment Activity</span>
            </h3>
            <p className="card-subtitle">Your last completed quizzes and score performance</p>
          </div>
          <button
            type="button"
            className="btn-text-sm"
            onClick={() => setActiveTab('history')}
          >
            Full History <ArrowRight size={14} />
          </button>
        </div>

        {quizHistory.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            No quiz records yet. Take your first quiz to see stats here!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="quiz-history-table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Difficulty</th>
                  <th>Score</th>
                  <th>Accuracy</th>
                  <th>Time</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {quizHistory.slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className="font-semibold">{item.categoryTitle}</span>
                    </td>
                    <td>
                      <span className="difficulty-tag capitalize">{item.difficulty}</span>
                    </td>
                    <td>
                      <span className="font-mono font-bold text-violet-400">
                        {item.score}/{item.maxScore || item.totalQuestions * 10}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="table-acc-bar">
                          <div
                            className="table-acc-fill"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono">{item.percentage}%</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs text-slate-400">
                        {Math.floor(item.timeSpent / 60)}m {item.timeSpent % 60}s
                      </span>
                    </td>
                    <td>
                      <span className="grade-pill">{item.grade}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-review-sm"
                        onClick={() => reviewPastQuiz(item)}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
