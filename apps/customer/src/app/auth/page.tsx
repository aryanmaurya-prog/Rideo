'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { API_URL } from '../../lib/api';
import { notifyAuthStateChanged } from '../../lib/auth';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/${isSignup ? 'signup' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isSignup ? { email, password, displayName } : { email, password },
        ),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (!data.accessToken) {
        throw new Error('Authentication succeeded without a session token');
      }

      localStorage.setItem('token', data.accessToken);
      notifyAuthStateChanged();
      setSuccess(
        isSignup
          ? `Welcome to Rideo, ${data.user?.displayName || displayName}! Your account is ready.`
          : `Welcome back${data.user?.displayName ? `, ${data.user.displayName}` : ''}! You're signed in.`,
      );
      const requestedDestination = new URLSearchParams(window.location.search).get('next');
      const destination = requestedDestination?.startsWith('/') && !requestedDestination.startsWith('//')
        ? requestedDestination
        : '/dashboard';
      window.setTimeout(() => router.push(destination), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container auth-wrap">
      <section className="auth-card">
        <Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">↗</span>rideo</Link>
        <h1>Welcome to your next ride.</h1>
        <p>Sign in or create an account with your email address and password.</p>
        {error && <p className="notice" role="alert">{error}</p>}
        {success && <p className="notice notice-success" role="status">{success} Taking you to your dashboard…</p>}
        <form className="form-stack" onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <label htmlFor="displayName">Name</label>
              <input
                id="displayName"
                name="displayName"
                autoComplete="name"
                minLength={2}
                required
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
              />
            </>
          )}
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            minLength={6}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Please wait...' : isSignup ? 'Create account' : 'Sign in'}
          </button>
        </form>
        <p style={{ marginTop: 18 }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            className="text-link"
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
            }}
          >
            {isSignup ? 'Sign in' : 'Create one'}
          </button>
        </p>
        <p style={{ marginTop: 18, fontSize: 12 }}>By continuing, you agree to our <Link className="text-link" href="/terms">Terms</Link> and <Link className="text-link" href="/privacy">Privacy Policy</Link>.</p>
      </section>
    </main>
  );
}
