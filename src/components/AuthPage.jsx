// src/components/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import DarkToggle from './DarkToggle';
import Spinner    from './Spinner';

export default function AuthPage() {
  const { login, signup } = useAuth();

  const [mode,        setMode]        = useState('login');       // 'login' or 'signup'
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error,       setError]       = useState('');
  const [canSubmit,   setCanSubmit]   = useState(false);
  const [submitting,  setSubmitting]  = useState(false);

  // Validate form fields
  useEffect(() => {
    if (mode === 'login') {
      setCanSubmit(email.trim() !== '' && password.length >= 6);
    } else {
      setCanSubmit(
        email.trim() !== '' &&
        password.length >= 6 &&
        confirmPass.length >= 6 &&
        password === confirmPass
      );
    }
  }, [mode, email, password, confirmPass]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (mode === 'signup' && password !== confirmPass) {
      setError('Passwords do not match.');
      setSubmitting(false);
      return;
    }

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 transition-colors duration-500 p-4">
      {/* Dark-mode toggle in top-right */}
      <div className="absolute top-4 right-4">
        <DarkToggle />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow transition-colors duration-500"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-neutral-900 dark:text-neutral-100">
          {mode === 'login' ? 'Log In' : 'Sign Up'}
        </h2>

        {submitting && (
          <div className="flex justify-center mb-4">
            <Spinner size={8} />
          </div>
        )}

        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Email */}
        <label className="block mb-4">
          <span className="text-sm text-neutral-700 dark:text-neutral-200">Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring focus:ring-primary/50"
          />
        </label>

        {/* Password */}
        <label className="block mb-4">
          <span className="text-sm text-neutral-700 dark:text-neutral-200">
            Password <small>(min 6 chars)</small>
          </span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={6}
            required
            className="mt-1 block w-full rounded border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring focus:ring-primary/50"
          />
        </label>

        {/* Confirm Password (only on signup) */}
        {mode === 'signup' && (
          <label className="block mb-4">
            <span className="text-sm text-neutral-700 dark:text-neutral-200">Confirm Password</span>
            <input
              type="password"
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)}
              minLength={6}
              required
              className="mt-1 block w-full rounded border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring focus:ring-primary/50"
            />
            {confirmPass && password !== confirmPass && (
              <p className="mt-1 text-xs text-red-500">Passwords must match.</p>
            )}
          </label>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className={`
            w-full py-2 mb-2 text-white rounded transition
            ${canSubmit && !submitting
              ? 'bg-primary hover:bg-primary-light cursor-pointer'
              : 'bg-neutral-300 dark:bg-neutral-600 cursor-not-allowed'}
          `}
        >
          {submitting
            ? mode === 'login'
              ? 'Logging In…'
              : 'Signing Up…'
            : mode === 'login'
              ? 'Log In'
              : 'Sign Up'}
        </button>

        {/* Toggle mode */}
        <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already have one?'}{' '}
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
            }}
            className="text-primary hover:underline"
          >
            {mode === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </form>
    </div>
  );
}
