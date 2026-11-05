import { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Sparkles,
  Sun,
  Moon,
  Flame,
  Trophy,
  History,
  LayoutDashboard,
  Grid,
  Menu,
  X,
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { activeTab, setActiveTab, startDailyChallenge, dailyStatus } = useQuiz();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleNav = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDailyClick = () => {
    startDailyChallenge();
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => handleNav('home')}>
          <div className="brand-logo-icon">
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="brand-text-group">
            <span className="brand-name">
              Quiz<span className="brand-gradient-text">Zone</span>
            </span>
            <span className="brand-tag">PRO</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links">
          <button
            type="button"
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            <span>Home</span>
          </button>

          <button
            type="button"
            className={`nav-link ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => handleNav('categories')}
          >
            <Grid size={16} />
            <span>Topics</span>
          </button>

          <button
            type="button"
            className={`nav-link nav-daily-btn ${activeTab === 'daily' ? 'active' : ''}`}
            onClick={handleDailyClick}
          >
            <Flame size={16} className="text-amber-400 animate-pulse" />
            <span>Daily Quiz</span>
            <span className="daily-streak-badge">
              🔥 {dailyStatus?.streakCount || 4}d
            </span>
          </button>

          <button
            type="button"
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNav('dashboard')}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className={`nav-link ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => handleNav('leaderboard')}
          >
            <Trophy size={16} />
            <span>Leaderboard</span>
          </button>

          <button
            type="button"
            className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => handleNav('history')}
          >
            <History size={16} />
            <span>History</span>
          </button>
        </nav>

        {/* Right Action Group */}
        <div className="navbar-actions">
          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              <Sun size={19} className="text-amber-300" />
            ) : (
              <Moon size={19} className="text-indigo-600" />
            )}
          </button>

          {/* User Account / Auth Section */}
          {isAuthenticated && user ? (
            <div className="profile-dropdown-container">
              <button
                type="button"
                className="profile-pill-btn"
                onClick={() => setProfileDropdownOpen(prev => !prev)}
              >
                <span className="profile-avatar-emoji">{user.avatar || '⚡'}</span>
                <span className="profile-pill-name">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className="profile-chevron" />
              </button>

              {profileDropdownOpen && (
                <div className="profile-menu-dropdown animate-fade-in-down">
                  <div className="dropdown-user-header">
                    <p className="dropdown-user-name">{user.name}</p>
                    <p className="dropdown-user-email">{user.email}</p>
                  </div>
                  <div className="dropdown-divider" />
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleNav('dashboard')}
                  >
                    <LayoutDashboard size={16} />
                    <span>My Dashboard</span>
                  </button>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleNav('history')}
                  >
                    <History size={16} />
                    <span>My Quiz History</span>
                  </button>
                  <div className="dropdown-divider" />
                  <button
                    type="button"
                    className="dropdown-item logout"
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons-group">
              <button
                type="button"
                className="btn-text-login"
                onClick={() => openAuthModal('login')}
              >
                Login
              </button>
              <button
                type="button"
                className="btn-signup-glow"
                onClick={() => openAuthModal('register')}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-glass animate-slide-down">
          <div className="mobile-drawer-links">
            <button
              type="button"
              className={`mobile-nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleNav('home')}
            >
              <span>Home</span>
            </button>
            <button
              type="button"
              className={`mobile-nav-link ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => handleNav('categories')}
            >
              <Grid size={18} />
              <span>Explore Topics</span>
            </button>
            <button
              type="button"
              className={`mobile-nav-link ${activeTab === 'daily' ? 'active' : ''}`}
              onClick={handleDailyClick}
            >
              <Flame size={18} className="text-amber-400" />
              <span>Daily Challenge</span>
              <span className="daily-streak-badge">🔥 {dailyStatus?.streakCount || 4}d</span>
            </button>
            <button
              type="button"
              className={`mobile-nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNav('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
            <button
              type="button"
              className={`mobile-nav-link ${activeTab === 'leaderboard' ? 'active' : ''}`}
              onClick={() => handleNav('leaderboard')}
            >
              <Trophy size={18} />
              <span>Leaderboard</span>
            </button>
            <button
              type="button"
              className={`mobile-nav-link ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => handleNav('history')}
            >
              <History size={18} />
              <span>Quiz History</span>
            </button>
          </div>

          <div className="mobile-drawer-footer">
            {isAuthenticated && user ? (
              <div className="mobile-user-row">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{user.avatar || '⚡'}</span>
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-danger-sm"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex gap-2 w-full">
                <button
                  type="button"
                  className="btn-secondary flex-1"
                  onClick={() => {
                    openAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn-primary flex-1"
                  onClick={() => {
                    openAuthModal('register');
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
