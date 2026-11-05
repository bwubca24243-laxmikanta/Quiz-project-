import { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import {
  Trophy,
  Search
} from 'lucide-react';

export default function Leaderboard() {
  const { leaderboard } = useQuiz();
  const { user } = useAuth();

  const [timeFilter, setTimeFilter] = useState('all'); // 'all' | 'week' | 'today'
  const [searchQuery, setSearchQuery] = useState('');

  // Filter list
  const filteredList = leaderboard.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const topThree = filteredList.slice(0, 3);

  return (
    <div className="leaderboard-wrapper">
      {/* Header Banner */}
      <div className="leaderboard-header glass-panel">
        <div className="leaderboard-header-content">
          <div className="section-eyebrow">
            <Trophy size={16} className="text-amber-400" />
            <span>Global Knowledge Benchmark</span>
          </div>
          <h1 className="leaderboard-title">Hall of Fame & Leaderboard</h1>
          <p className="leaderboard-subtitle">
            Compete with engineers worldwide. Climb the ranks by scoring high accuracy and maintaining your daily streak.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="leaderboard-controls">
          <div className="timeframe-tabs">
            {[
              { id: 'all', label: 'All-Time' },
              { id: 'week', label: 'This Week' },
              { id: 'today', label: 'Today' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                className={`time-tab-btn ${timeFilter === t.id ? 'active' : ''}`}
                onClick={() => setTimeFilter(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="leaderboard-search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search challengers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="leader-search-input"
            />
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {topThree.length >= 3 && (
        <div className="podium-container">
          {/* Rank 2 (Silver) */}
          <div className="podium-card silver glass-panel animate-fade-in-up">
            <div className="podium-medal-pill silver-pill">
              <span>🥈 2nd Place</span>
            </div>
            <div className="podium-avatar-wrap silver-glow">
              <span className="podium-avatar">{topThree[1].avatar}</span>
            </div>
            <h3 className="podium-name">{topThree[1].name}</h3>
            <p className="podium-title">{topThree[1].title}</p>
            <div className="podium-score-box">
              <span className="podium-score-val">{topThree[1].score.toLocaleString()}</span>
              <span className="podium-score-label">Points</span>
            </div>
            <div className="podium-sub-stats">
              <span>🎯 {topThree[1].accuracy}% Acc</span>
              <span>🔥 {topThree[1].streak}d Streak</span>
            </div>
          </div>

          {/* Rank 1 (Gold) */}
          <div className="podium-card gold glass-panel animate-fade-in-up featured-gold">
            <div className="podium-crown">👑</div>
            <div className="podium-medal-pill gold-pill">
              <span>🥇 Grandmaster</span>
            </div>
            <div className="podium-avatar-wrap gold-glow">
              <span className="podium-avatar">{topThree[0].avatar}</span>
            </div>
            <h3 className="podium-name">{topThree[0].name}</h3>
            <p className="podium-title">{topThree[0].title}</p>
            <div className="podium-score-box">
              <span className="podium-score-val">{topThree[0].score.toLocaleString()}</span>
              <span className="podium-score-label">Points</span>
            </div>
            <div className="podium-sub-stats">
              <span>🎯 {topThree[0].accuracy}% Acc</span>
              <span>🔥 {topThree[0].streak}d Streak</span>
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="podium-card bronze glass-panel animate-fade-in-up">
            <div className="podium-medal-pill bronze-pill">
              <span>🥉 3rd Place</span>
            </div>
            <div className="podium-avatar-wrap bronze-glow">
              <span className="podium-avatar">{topThree[2].avatar}</span>
            </div>
            <h3 className="podium-name">{topThree[2].name}</h3>
            <p className="podium-title">{topThree[2].title}</p>
            <div className="podium-score-box">
              <span className="podium-score-val">{topThree[2].score.toLocaleString()}</span>
              <span className="podium-score-label">Points</span>
            </div>
            <div className="podium-sub-stats">
              <span>🎯 {topThree[2].accuracy}% Acc</span>
              <span>🔥 {topThree[2].streak}d Streak</span>
            </div>
          </div>
        </div>
      )}

      {/* Complete Rankings Table */}
      <div className="leaderboard-table-card glass-panel">
        <div className="table-responsive">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="w-16">Rank</th>
                <th>Participant</th>
                <th>Specialization</th>
                <th>Accuracy</th>
                <th>Streak</th>
                <th>Total Score</th>
                <th>Badge</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((player, index) => {
                const isCurrentUser = user && (user.name === player.name || user.id === player.id);
                const rankNumber = index + 1;

                return (
                  <tr
                    key={player.id || index}
                    className={`leaderboard-row ${isCurrentUser ? 'current-user-row' : ''}`}
                  >
                    <td>
                      <div className="rank-badge-cell">
                        {rankNumber === 1 && <span className="medal-emoji">🥇</span>}
                        {rankNumber === 2 && <span className="medal-emoji">🥈</span>}
                        {rankNumber === 3 && <span className="medal-emoji">🥉</span>}
                        {rankNumber > 3 && (
                          <span className="rank-num">#{rankNumber}</span>
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="player-profile-cell">
                        <span className="player-avatar-icon">{player.avatar}</span>
                        <div>
                          <p className="player-name">
                            {player.name}
                            {isCurrentUser && (
                              <span className="current-user-tag">You</span>
                            )}
                          </p>
                          <p className="player-sub">{player.quizzesTaken} quizzes completed</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="player-domain-pill capitalize">
                        {player.category === 'all' ? 'Multi-Domain' : player.category}
                      </span>
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <div className="table-acc-bar">
                          <div
                            className="table-acc-fill"
                            style={{ width: `${player.accuracy}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs">{player.accuracy}%</span>
                      </div>
                    </td>

                    <td>
                      <span className="streak-tag">
                        🔥 {player.streak}d
                      </span>
                    </td>

                    <td>
                      <span className="font-mono font-bold text-violet-400">
                        {player.score.toLocaleString()}
                      </span>
                    </td>

                    <td>
                      <span className="honor-badge-pill">{player.badge || 'Contender'}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
