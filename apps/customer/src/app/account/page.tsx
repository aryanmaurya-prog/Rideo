'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { API_URL } from '../../lib/api';
import { notifyAuthStateChanged } from '../../lib/auth';

type UserProfile = {
  displayName: string;
  email: string;
  phone: string | null;
  city: string | null;
  avatarUrl: string | null;
  totalRides: number;
  bookingsCount: number;
};

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem('token');

    if (!token) {
      router.replace('/auth');
      return () => controller.abort();
    }

    async function loadProfile() {
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        if (response.status === 401) {
          localStorage.removeItem('token');
          notifyAuthStateChanged();
          router.replace('/auth');
          return;
        }
        if (!response.ok) throw new Error('Unable to load your account. Please try again.');

        const user = (await response.json()) as UserProfile;
        setProfile(user);
        setDisplayName(user.displayName || '');
        setCity(user.city || '');
      } catch (loadError) {
        if (loadError instanceof Error && loadError.name !== 'AbortError') {
          setError(loadError.message);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadProfile();
    return () => controller.abort();
  }, [retryCount, router]);

  async function handleProfileSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/auth');
      return;
    }

    setSaving(true);
    setError('');
    setNotice('');

    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ displayName, city }),
      });
      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem('token');
        notifyAuthStateChanged();
        router.replace('/auth');
        return;
      }
      if (!response.ok) throw new Error(data.message || 'Unable to update your profile.');

      setProfile((current) => current ? { ...current, ...data } : current);
      setNotice('Your profile has been updated.');
      notifyAuthStateChanged();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to update your profile.');
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordError('');
    setNotice('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/auth');
      return;
    }

    setSavingPassword(true);
    try {
      const response = await fetch(`${API_URL}/users/me/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = (await response.json()) as { message?: string | string[] };
      if (response.status === 401) {
        localStorage.removeItem('token');
        notifyAuthStateChanged();
        router.replace('/auth');
        return;
      }
      if (!response.ok) {
        throw new Error(Array.isArray(data.message) ? data.message.join(', ') : data.message || 'Unable to change your password.');
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setNotice('Your password has been changed successfully.');
    } catch (passwordSubmitError: unknown) {
      setPasswordError(passwordSubmitError instanceof Error ? passwordSubmitError.message : 'Unable to change your password.');
    } finally {
      setSavingPassword(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    notifyAuthStateChanged();
    router.push('/');
  }

  if (loading) {
    return <main className="container account-page"><div className="content-panel">Loading your account…</div></main>;
  }

  if (error && !profile) {
    return (
      <main className="container account-page">
        <div className="content-panel account-error" role="alert">
          <h1>We couldn’t load your account</h1>
          <p>{error}</p>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => {
              setError('');
              setLoading(true);
              setRetryCount((count) => count + 1);
            }}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!profile) return null;

  return (
    <main className="container account-page">
      <section className="account-heading">
        <div>
          <span className="eyebrow">Your Rideo profile</span>
          <h1>Account settings</h1>
          <p>Manage your personal details and sign-in preferences.</p>
        </div>
        <Link className="button button-secondary" href="/dashboard">View my rides</Link>
      </section>

      {error && <p className="notice" role="alert">{error}</p>}
      {notice && <p className="notice notice-success" role="status">{notice}</p>}

      <div className="account-grid">
        <section className="content-panel account-summary">
          <div className="account-avatar account-avatar-large" aria-hidden="true">
            {profile.displayName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('') || 'A'}
          </div>
          <h2>{profile.displayName}</h2>
          <p className="muted">{profile.email}</p>
          <div className="account-facts">
            <div><span>Phone</span><strong>{profile.phone || 'Not provided'}</strong></div>
            <div><span>City</span><strong>{profile.city || 'Not provided'}</strong></div>
            <div><span>Total rides</span><strong>{profile.totalRides}</strong></div>
            <div><span>Bookings</span><strong>{profile.bookingsCount}</strong></div>
          </div>
          <button className="button button-secondary account-logout" type="button" onClick={handleLogout}>
            Logout
          </button>
        </section>

        <div className="account-forms">
          <section className="content-panel account-form-panel">
            <h2>Edit profile</h2>
            <p className="muted">Update the name and city shown on your account.</p>
            <form className="form-stack" onSubmit={handleProfileSave}>
              <label htmlFor="account-name">Name</label>
              <input
                id="account-name"
                name="displayName"
                autoComplete="name"
                minLength={2}
                required
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
              />
              <label htmlFor="account-email">Email</label>
              <input id="account-email" type="email" value={profile.email} readOnly />
              <label htmlFor="account-phone">Phone</label>
              <input id="account-phone" value={profile.phone || 'Not provided'} readOnly />
              <label htmlFor="account-city">City</label>
              <input
                id="account-city"
                name="city"
                autoComplete="address-level2"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
              <button className="button" type="submit" disabled={saving}>
                {saving ? 'Saving…' : 'Save profile'}
              </button>
            </form>
          </section>

          <section className="content-panel account-form-panel">
            <h2>Change password</h2>
            <p className="muted">Enter your current password and choose a new password for your account.</p>
            {passwordError && <p className="notice" role="alert">{passwordError}</p>}
            <form className="form-stack" onSubmit={handlePasswordSubmit}>
              <label htmlFor="current-password">Current password</label>
              <input
                id="current-password"
                type="password"
                autoComplete="current-password"
                minLength={6}
                required
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
              <label htmlFor="new-password">New password</label>
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                minLength={6}
                required
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <label htmlFor="confirm-password">Confirm new password</label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                minLength={6}
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <button className="button button-secondary" type="submit" disabled={savingPassword}>
                {savingPassword ? 'Changing password...' : 'Change password'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
