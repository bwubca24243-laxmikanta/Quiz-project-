import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { X, Lock, Mail, User, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const AVATARS = ['⚡', '🚀', '🧠', '👩‍💻', '🎯', '🔥', '🏆', '💎', '🌟', '💻'];

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, login, register, loginAsDemo } = useAuth();
  const { showToast } = useQuiz();

  const [mode, setMode] = useState(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('⚡');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync mode with parent prop when modal opens
  const activeMode = isAuthModalOpen ? mode : authModalMode;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (activeMode === 'register' && !name) {
      setError('Please provide your full name');
      return;
    }

    setIsLoading(true);
    try {
      if (activeMode === 'login') {
        const res = await login(email, password);
        if (res.success) {
          showToast('Welcome back! Successfully logged in.', 'success');
        } else {
          setError(res.message || 'Login failed');
        }
      } else {
        const res = await register(name, email, password, selectedAvatar);
        if (res.success) {
          showToast('Account created successfully! Welcome to QuizZone.', 'success');
        } else {
          setError(res.message || 'Registration failed');
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    showToast('Logged in as Demo User (Alex Vance)', 'success');
  };

  return (
    <div className="modal-backdrop" onClick={closeAuthModal}>
      <div className="auth-modal-glass" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={closeAuthModal}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="auth-header">
          <div className="brand-pill">
            <Sparkles size={14} className="text-violet-400" />
            <span>QuizZone SaaS Authentication</span>
          </div>
          <h2 className="auth-title">
            {activeMode === 'login' ? 'Welcome Back, Challenger' : 'Join the Elite Quiz Community'}
          </h2>
          <p className="auth-subtitle">
            {activeMode === 'login'
              ? 'Access your performance metrics, streaks, and global rankings.'
              : 'Sign up to compete on the global leaderboard and track your mastery.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${activeMode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError(''); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${activeMode === 'register' ? 'active' : ''}`}
            onClick={() => { setMode('register'); setError(''); }}
          >
            Create Account
          </button>
        </div>

        {/* Error message */}
        {error && <div className="auth-error-banner">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {activeMode === 'register' && (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Alex Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Choose Your Avatar</label>
                <div className="avatar-grid">
                  {AVATARS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      className={`avatar-choice ${selectedAvatar === av ? 'selected' : ''}`}
                      onClick={() => setSelectedAvatar(av)}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                {activeMode === 'login' ? 'Sign In to Account' : 'Register Now'}
                <ArrowRight size={18} />
              </span>
            )}
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="demo-login-divider">
          <span>OR QUICK TEST</span>
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="btn-demo-login"
        >
          <ShieldCheck size={18} className="text-emerald-400" />
          <span>One-Click Demo Login (Instant Access)</span>
        </button>

        <div className="auth-footer-note">
          {activeMode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                className="text-violet-400 hover:underline"
                onClick={() => { setMode('register'); setError(''); }}
              >
                Sign up free
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button
                type="button"
                className="text-violet-400 hover:underline"
                onClick={() => { setMode('login'); setError(''); }}
              >
                Sign in here
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
